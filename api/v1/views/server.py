from django.http import Http404
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from django.db.models.fields.json import KT
from v1.serializers.server import ServerDetailsSerializer, ServerSerializer
from v1.models.server import Server
from rest_framework import status
from django.core.exceptions import ValidationError


class ServerViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

    CONFIG_MAPPING = {
        "name": {
            "annotate_field": "settings__MAIN.SERVER_NAME",
            "filter_type": "startswith",
        },
    }

    def get_queryset(self):
        queryset = self.queryset

        # Iterate through the configuration mapping and apply dynamic annotation and filtering
        for param, config in self.CONFIG_MAPPING.items():
            value = self.request.query_params.get(param)
            if value:
                annotate_field = config["annotate_field"]
                filter_type = config["filter_type"]
                annotate_name = f"{param}_annotated"

                # Annotate the queryset with the specified annotation field and filter type
                queryset = queryset.annotate(
                    **{annotate_name: KT(annotate_field)}
                ).filter(**{f"{annotate_name}__{filter_type}": value})

        # Clear the result cache to ensure fresh data
        queryset._result_cache = None

        return queryset


class ServerDetailsViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Server.objects.all()
    serializer_class = ServerDetailsSerializer

    def get_object(self):
        """
        Override get_object to retrieve server by URL query parameter.
        """
        queryset = self.filter_queryset(self.get_queryset())
        url_param = self.request.query_params.get("url")
        if url_param:
            url_param = url_param.lower()
            try:
                return queryset.get(url=url_param)
            except Server.DoesNotExist:
                raise Http404("Server not found with the provided URL.")
        return super().get_object()

    def handle_server_by_url(self, url_param):
        """
        Check for existing server or create a new one if not found.
        """
        url_param = url_param.lower()
        try:
            server = Server.objects.get(url=url_param)
            serializer = self.get_serializer(server)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Server.DoesNotExist:
            serializer = self.get_serializer(data={"url": url_param})
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"url": e.messages}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        """
        Handle POST request to retrieve or create server.
        """
        url_param = request.data.get("url")
        if url_param:
            return self.handle_server_by_url(url_param)
        return Response(
            {"detail": "URL parameter is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    def list(self, request, *args, **kwargs):
        """
        Handle GET request to retrieve or create server.
        """
        queryset = self.filter_queryset(self.get_queryset())
        url_param = self.request.query_params.get("url")
        if url_param:
            url_param = url_param.lower()
            queryset = queryset.filter(url=url_param)
            if not queryset.exists():
                return self.handle_server_by_url(url_param)
            return self.retrieve(request, *args, **kwargs)
        raise Http404("No URL provided.")

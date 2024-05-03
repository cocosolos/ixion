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

        # TODO: This probably isn't very efficient
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
        queryset = self.filter_queryset(self.get_queryset())
        url_param = self.request.query_params.get("url")
        if url_param:
            url_param = url_param.lower()
            try:
                return queryset.get(url=url_param)
            except Server.DoesNotExist:
                raise Http404("Server not found with the provided URL.")
        return super().get_object()

    def create_server(self, url_param):
        serializer = self.get_serializer(data={"url": url_param})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return serializer.instance

    def create(self, request, *args, **kwargs):
        url_param = request.data.get("url")
        if url_param:
            url_param = url_param.lower()
            try:
                server = Server.objects.get(url=url_param)
                serializer = self.get_serializer(server)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Server.DoesNotExist:
                try:
                    instance = self.create_server(url_param)
                    serializer = self.get_serializer(instance)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except ValidationError as e:
                    return Response(
                        {"url": e.messages}, status=status.HTTP_400_BAD_REQUEST
                    )

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        url_param = self.request.query_params.get("url")
        if url_param:
            url_param = url_param.lower()
            queryset = queryset.filter(url=url_param)
            if not queryset.exists():
                try:
                    instance = self.create_server(url_param)
                    serializer = self.get_serializer(instance)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except ValidationError as e:
                    return Response(
                        {"url": e.messages}, status=status.HTTP_400_BAD_REQUEST
                    )
            return self.retrieve(request, *args, **kwargs)
        raise Http404("No URL provided.")

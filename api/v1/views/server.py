from rest_framework import viewsets, mixins
from django.db.models.fields.json import KT
from v1.serializers.server import ServerSerializer
from v1.models.server import Server


class ServerView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = ServerSerializer
    queryset = Server.objects.all()


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
        "level_cap_min": {
            "annotate_field": "settings__MAIN.MAX_LEVEL",
            "filter_type": "gte",
        },
        "level_cap_max": {
            "annotate_field": "settings__MAIN.MAX_LEVEL",
            "filter_type": "lte",
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

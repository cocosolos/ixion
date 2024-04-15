from rest_framework import serializers
from v1.models.server import Server
from django.core.exceptions import ValidationError


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = [
            "id",
            "name",
            "url",
            "max_level",
            "customizations",
            "login_limit",
            "active_sessions",
            "updated",
            "inactivity_counter",
        ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except ValidationError as e:
            raise serializers.ValidationError({"url": e.messages})


class ServerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = "__all__"

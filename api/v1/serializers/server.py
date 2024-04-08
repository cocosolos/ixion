from rest_framework import serializers
from v1.models.server import Server
from django.core.exceptions import ValidationError


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = "__all__"

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except ValidationError as e:
            raise serializers.ValidationError({"url": e.messages})

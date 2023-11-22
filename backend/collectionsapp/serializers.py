from rest_framework import serializers
from .models import Collection, CollectionTheme
from django.core.validators import FileExtensionValidator
from itemsapp.models import Item
from django.contrib.auth import get_user_model
from config.utils import is_unique_fields
from config.constants import CUSTOM_FIELD_TYPES

CustomUser = get_user_model()


class CollectionThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionTheme
        fields = "__all__"


class CollectionCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')


class CollectionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', "custom_fields", "likes")


class CollectionSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(write_only=True, allow_null=True, validators=[
                                   FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])

    items = CollectionItemSerializer(many=True, read_only=True)

    common_fields = ('id', 'name', 'description', 'creator',
                     'created_at', 'image_url', 'custom_fields_classes', 'theme', 'image', 'items')

    class Meta:
        model = Collection
        extra_kwargs = {
            'creator': {'read_only': True},
            'image_url': {'read_only': True},
            'custom_fields_classes': {'default': list}
        }

    def get_field_names(self, declared_fields, info):
        return self.common_fields

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context['request'].method == 'GET':
            representation['theme'] = CollectionThemeSerializer(
                instance.theme).data
            representation['creator'] = CollectionCreatorSerializer(
                instance.creator).data
        return representation

    def validate_custom_fields_classes(self, value):

        allowed_field_keys = ['name', 'type']

        if type(value) != list:
            raise serializers.ValidationError(
                "Must be correct JSON list or null")

        for field in value:
            if type(field) != dict:
                raise serializers.ValidationError(
                    "Fields must be correct JSON dicts")
            for key in field.keys():
                if key not in allowed_field_keys:
                    raise serializers.ValidationError(
                        f"Every field must include only {allowed_field_keys}")
            for key in allowed_field_keys:
                if key not in field.keys():
                    raise serializers.ValidationError(
                        f"Every field must include only {allowed_field_keys}")
            if field["type"] not in CUSTOM_FIELD_TYPES:
                raise serializers.ValidationError(
                    f"Value 'type' must be one of {CUSTOM_FIELD_TYPES}")

        if not is_unique_fields(value):
            raise serializers.ValidationError(
                f"Names must unique")

        return value

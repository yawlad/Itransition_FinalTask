from rest_framework import serializers

from config.dropbox import upload_to_dropbox_and_get_url
from .models import Collection, CollectionTheme


class CollectionThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionTheme
        fields = ('id', 'name')


class CollectionSerializer(serializers.ModelSerializer):

    theme = CollectionThemeSerializer(read_only=True)
    theme_id = serializers.IntegerField(write_only=True)
    custom_fields = serializers.JSONField()
    image = serializers.ImageField(write_only=True)

    class Meta:
        model = Collection
        fields = ('id', 'name', 'description', 'theme',
                  'creator', 'created_at', 'image', 'image_url', 'custom_fields', 'theme_id')
        extra_kwargs = {
            'id': {'read_only': True},
            'creator': {'read_only': True},
            'created_at': {'read_only': True},
            'image_url': {'read_only': True}
        }

    def validate_custom_fields(self, value):
        if not value:
            value = []
        return value

    def validate_theme_id(self, value):
        theme = CollectionTheme.objects.filter(id=value)
        if not theme.exists():
            raise serializers.ValidationError(
                "Theme with that id doesn't exist")
        return theme[0]

    def create(self, validated_data):
        theme = validated_data.pop('theme_id')
        validated_data.pop('image')
        collection = Collection.objects.create(theme=theme, **validated_data)
        return collection

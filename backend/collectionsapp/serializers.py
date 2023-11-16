from rest_framework import serializers
from .models import Collection, CollectionTheme
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class CollectionThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionTheme
        fields = ('id', 'name')

class CollectionCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')

class CollectionSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(write_only=True, allow_null=True)

    common_fields = ('id', 'name', 'description', 'creator',
                     'created_at', 'image_url', 'custom_fields', 'theme', 'image')

    class Meta:
        model = Collection
        extra_kwargs = {
            'id': {'read_only': True},
            'creator': {'read_only': True},
            'created_at': {'read_only': True},
            'image_url': {'read_only': True}
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

    def validate_custom_fields(self, value):
        
        ############################
        
        if not value:
            value = []
        return value

    def create(self, validated_data):
        validated_data.pop('image')
        collection = Collection.objects.create(**validated_data)
        return collection

from rest_framework import serializers
from .models import Item, ItemComment, ItemLike, ItemTag
from authapp.models import CustomUser
from collectionsapp.models import Collection
from config.utils import have_allowed_fields, is_synced_with_field_classes, is_unique_fields


class CommentOrLikeCreatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username')


class ItemCollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collection
        fields = ('id', 'name', )


class ItemTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemTag
        fields = ('name',)


class ItemLikeSerializer(serializers.ModelSerializer):
    creator = CommentOrLikeCreatorSerializer()

    class Meta:
        model = ItemLike
        fields = "__all__"


class ItemCommentSerializer(serializers.ModelSerializer):
    creator = CommentOrLikeCreatorSerializer()

    class Meta:
        model = ItemComment
        fields = ('id', 'creator', 'content', 'created_at')


class ItemSerializer(serializers.ModelSerializer):
    comments = ItemCommentSerializer(many=True, read_only=True)
    likes = ItemLikeSerializer(many=True, read_only=True)
    tags = ItemTagSerializer(many=True, read_only=True)

    new_tags = serializers.JSONField(write_only=True, default=list)
    common_fields = ('id', 'name', 'created_at',
                     'collection', 'comments', 'likes', 'tags', 'custom_fields', 'new_tags')

    class Meta:
        model = Item
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Item.objects.all(),
                fields=['collection', 'name'],
                message='Item with this collection and name already exists.'
            )
        ]

    def get_field_names(self, declared_fields, info):
        return self.common_fields

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context['request'].method == 'GET':
            representation['collection'] = ItemCollectionSerializer(
                instance.collection).data
            representation['tags'] = ItemTagSerializer(
                instance.tags).data
        return representation

    def validate_custom_fields(self, value):
        allowed_field_keys = ['name', 'value']
        if type(value) != list:
            raise serializers.ValidationError(
                "Must be correct JSON list")

        for field in value:
            if type(field) != dict:
                raise serializers.ValidationError(
                    "Fields must be correct JSON dicts")
            if not have_allowed_fields(field, allowed_field_keys):
                raise serializers.ValidationError(
                    f"Every field must include only {allowed_field_keys}")

        required_fields = Collection.objects.get(
            id=self.initial_data.get("collection")).custom_fields_classes

        if (not is_synced_with_field_classes(required_fields, value)):
            raise serializers.ValidationError(
                f"Must be comparable to {required_fields}. Checkbox values must be in lowercase")

        if not is_unique_fields(value):
            raise serializers.ValidationError(
                f"Names must unique")

        return value

    def validate_new_tags(self, value):
        if type(value) != list:
            raise serializers.ValidationError(
                "Must be correct JSON list")

        for field in value:
            if type(field) != str:
                raise serializers.ValidationError(
                    "Must be correct JSON list with strings")

        return value

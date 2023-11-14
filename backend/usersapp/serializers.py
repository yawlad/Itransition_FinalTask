from rest_framework import serializers
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username',
                  'is_superuser', 'is_blocked', 'date_joined')


class DetailUserSerializer(serializers.ModelSerializer):
    
    new_is_blocked = serializers.BooleanField(required=False)
    new_is_superuser = serializers.BooleanField(required=False)

    class Meta:
        model = CustomUser
        fields = ("new_is_blocked", "new_is_superuser", 'id', 'email', 'username',
                  'is_superuser', 'is_blocked', 'date_joined')
        extra_kwargs = {
            'new_is_blocked': {'write_only': True},
            'new_is_superuser': {'write_only': True},
            'id': {'read_only': True},
            'email': {'read_only': True},
            'username': {'read_only': True},
            'is_superuser': {'read_only': True},
            'is_blocked': {'read_only': True},
            'date_joined': {'read_only': True},
        }

    def update(self, instance, validated_data):
        instance.is_blocked = validated_data.get(
            "new_is_blocked", instance.is_blocked)
        instance.is_superuser = validated_data.get(
            "new_is_superuser", instance.is_superuser)
        instance.save()
        return instance


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username',
                  'is_superuser', 'is_blocked', 'date_joined')

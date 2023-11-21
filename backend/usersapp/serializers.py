from rest_framework import serializers
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    common_fields = ('id', 'email', 'username',
                     'is_superuser', 'is_blocked', 'date_joined')
    common_extra_kwargs = {
            'id': {'read_only': True},
            'date_joined': {'read_only': True},
            'is_superuser': {'read_only': True},
            'is_blocked': {'read_only': True},
        }
    superuser_extra_kwargs = {
            'id': {'read_only': True},
            'date_joined': {'read_only': True},
        }
    class Meta:
        model = CustomUser

    def get_extra_kwargs(self):
        user = self.context['request'].user
        if user.is_superuser:
            return self.superuser_extra_kwargs
        return self.common_extra_kwargs
    
    def get_field_names(self, declared_fields, info):
        return self.common_fields

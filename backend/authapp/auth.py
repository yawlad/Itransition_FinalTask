from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication
from rest_framework import status


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token_key = request.COOKIES.get('auth_token')
        if not token_key:
            return None
        try:
            user, token = super().authenticate_credentials(token_key)
        except exceptions.AuthenticationFailed:
            return None
        return user, token

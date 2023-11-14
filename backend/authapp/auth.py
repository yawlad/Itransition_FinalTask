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
            print(user.is_blocked)
            if user and user.is_blocked:
                raise exceptions.AuthenticationFailed()
        except exceptions.AuthenticationFailed:
            raise exceptions.AuthenticationFailed(
                detail="User is blocked", code=status.HTTP_403_FORBIDDEN)
        return user, token

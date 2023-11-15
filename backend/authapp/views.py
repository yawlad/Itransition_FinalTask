from rest_framework import generics
from rest_framework.views import APIView
from .models import CustomUser
from .serializers import UserRegisterSerializer, UserLoginSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.settings import api_settings

class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny,]
    authentication_classes = []

class CustomObtainAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny,]
    authentication_classes = []
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        response_data = UserLoginSerializer(user).data
        response = Response(data=response_data)
        
        if user.is_blocked:
            return Response({'detail': 'User is blocked.'}, status=status.HTTP_403_FORBIDDEN)

        token, created = Token.objects.get_or_create(user=user)
        response.set_cookie(key='auth_token', value=token.key,
                            secure=True, samesite="None", max_age=3600 * 24 * 7)

        return response


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        token_key = request.COOKIES.get('auth_token')
        response = Response(
            {'detail': 'User logged out successfully.'}, status=status.HTTP_200_OK)
        response.delete_cookie(key='auth_token')
        if token_key:
            try:
                user_token = Token.objects.get(key=token_key)
                user_token.delete()
                return response
            except Token.DoesNotExist:
                return Response({'detail': 'Invalid token.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'detail': 'No authentication token found in cookies.'}, status=status.HTTP_401_UNAUTHORIZED)

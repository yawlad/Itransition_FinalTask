from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from config.permissions import IsSuperUserPermission, IsSuperUserOrOwnerPermission
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status

CustomUser = get_user_model()


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperUserPermission, ]


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperUserPermission, ]


class UserMeView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

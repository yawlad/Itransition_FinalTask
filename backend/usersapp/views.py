from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from config.permissions import IsSuperUserPermission
from .serializers import UserSerializer, UserMeSerializer, DetailUserSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status

CustomUser = get_user_model()


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperUserPermission, ]


class DetailUserView(generics.RetrieveUpdateDestroyAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = DetailUserSerializer
    permission_classes = [IsAuthenticated, IsSuperUserPermission, ]

    def get_object(self):
        user_id = self.kwargs['pk']
        try:
            user = CustomUser.objects.get(id=user_id)
            return user
        except CustomUser.DoesNotExist:
            return None

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'User updated successfully'}, status=status.HTTP_200_OK)


class UserMeView(generics.RetrieveAPIView):
    serializer_class = UserMeSerializer

    def get_object(self):
        return self.request.user

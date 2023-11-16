from django.urls import path, include
from .views import UserListView, UserMeView, UserRetrieveUpdateDestroyView


urlpatterns = [
    path('', UserListView.as_view(), name="users"),
    path('<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name="detail_user"),
    path('me/', UserMeView.as_view(), name='user_me'),
]

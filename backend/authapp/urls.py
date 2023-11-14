from django.urls import path
from .views import RegisterUserView, CustomObtainAuthToken, LogoutView

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path('login/', CustomObtainAuthToken.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout")
]

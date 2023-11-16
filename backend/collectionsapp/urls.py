
from django.urls import path
from .views import CollectionListCreateView, CollectionThemeListView, CollectionRetrieveUpdateDestroyView

urlpatterns = [
    path('', CollectionListCreateView.as_view()),
    path('themes/', CollectionThemeListView.as_view()),
    path('<int:pk>/', CollectionRetrieveUpdateDestroyView.as_view())
]


from django.urls import path
from .views import CollectionListCreateView, CollectionThemeListView

urlpatterns = [
    path('', CollectionListCreateView.as_view()),
    path('themes/', CollectionThemeListView.as_view()),
]

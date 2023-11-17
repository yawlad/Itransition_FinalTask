
from django.urls import path
from .views import ItemListCreateView, ItemRetrieveUpdateDestroyView, ItemTagListView

urlpatterns = [
    path('tags/', ItemTagListView.as_view()),
    path('', ItemListCreateView.as_view()),
    path('<int:pk>/', ItemRetrieveUpdateDestroyView.as_view()),
    # path('like/<int:pk>/', ItemRetrieveUpdateDestroyView.as_view()),
    # path('comment/<int:pk>/', ItemRetrieveUpdateDestroyView.as_view()),
]

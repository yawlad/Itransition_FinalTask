
from django.urls import path
from .views import CommentDestroyView, ItemListCreateView, ItemRetrieveUpdateDestroyView, ItemTagListView, LikeCreateView, CommentCreateView, LikeDestroyView

urlpatterns = [
    path('tags/', ItemTagListView.as_view()),
    path('', ItemListCreateView.as_view()),
    path('<int:pk>/', ItemRetrieveUpdateDestroyView.as_view()),
    path('likes/', LikeCreateView.as_view()),
    path('likes/<int:pk>/', LikeDestroyView.as_view()),
    path('comments/', CommentCreateView.as_view()),
    path('comments/<int:pk>/', CommentDestroyView.as_view()),
]

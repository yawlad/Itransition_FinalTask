from rest_framework import generics, response, status
from .models import Item, ItemTag, ItemLike, ItemComment
from .serializers import ItemSerializer, ItemTagSerializer, ItemLikeSerializer, ItemCommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from config.permissions import IsSuperUserOrItemOwner, IsSuperUserOrOwner
from django.db.utils import IntegrityError


class ItemTagListView(generics.ListAPIView):
    queryset = ItemTag.objects.all()
    serializer_class = ItemTagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]


class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def perform_create(self, serializer):
        new_tags = serializer.validated_data.pop('new_tags')
        tags_ids = []
        for tag in new_tags:
            tags_ids.append(ItemTag.objects.get_or_create(name=tag)[0].id)
        serializer.save(tags=tags_ids)
        return super().perform_create(serializer)


class ItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsSuperUserOrItemOwner(),]
        else:
            return [IsAuthenticatedOrReadOnly(),]

    def perform_update(self, serializer):
        new_tags = serializer.validated_data.pop('new_tags')
        tags_ids = []
        for tag in new_tags:
            tags_ids.append(ItemTag.objects.get_or_create(name=tag)[0].id)
        serializer.save(tags=tags_ids)
        return super().perform_update(serializer)


class LikeCreateView(generics.CreateAPIView):
    queryset = ItemLike.objects.all()
    serializer_class = ItemLikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super().perform_create(serializer)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return response.Response(data={"detail": "Only one like for one item"}, status=status.HTTP_400_BAD_REQUEST)


class LikeDestroyView(generics.DestroyAPIView):
    queryset = ItemLike.objects.all()
    serializer_class = ItemLikeSerializer
    permission_classes = [IsSuperUserOrOwner,]


class CommentCreateView(generics.CreateAPIView):
    queryset = ItemComment.objects.all()
    serializer_class = ItemCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super().perform_create(serializer)


class CommentDestroyView(generics.DestroyAPIView):
    queryset = ItemComment.objects.all()
    serializer_class = ItemCommentSerializer
    permission_classes = [IsSuperUserOrOwner,]

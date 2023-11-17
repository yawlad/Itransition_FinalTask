from rest_framework import generics
from .models import Item, ItemTag
from .serializers import ItemSerializer, ItemTagSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from config.permissions import IsSuperUserOrOwner

class ItemTagListView(generics.ListAPIView):
    queryset = ItemTag.objects.all()
    serializer_class = ItemTagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    # def perform_create(self, serializer):
    #     direct_link = create_image_link(self.request.data.get('name'),
    #                                     serializer.validated_data.pop('image'))
    #     serializer.save(creator=self.request.user, image_url=direct_link)
    #     return super().perform_create(serializer)
        
class ItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsSuperUserOrOwner(),]
        else:
            return [IsAuthenticatedOrReadOnly(),]

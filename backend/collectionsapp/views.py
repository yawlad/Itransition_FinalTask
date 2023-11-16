from rest_framework import generics
from config.permissions import IsSuperUserOrOwnerPermission
from .models import Collection, CollectionTheme
from .serializers import CollectionSerializer, CollectionThemeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from config.dropbox import upload_to_dropbox_and_get_url


class CollectionThemeListView(generics.ListAPIView):
    queryset = CollectionTheme.objects.all()
    serializer_class = CollectionThemeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]


class CollectionListCreateView(generics.ListCreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]

    def perform_create(self, serializer):
        image_data = self.request.data.get('image')
        if image_data:
            collection_name = self.request.data.get('name')
            file_name = f"{collection_name}.{image_data.name.split('.')[-1]}"
            direct_link = upload_to_dropbox_and_get_url(file_name, image_data)
            serializer.save(creator=self.request.user, image_url=direct_link)
        else:
            serializer.save(creator=self.request.user)


class CollectionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsSuperUserOrOwnerPermission(),]
        else:
            return [IsAuthenticatedOrReadOnly(),]

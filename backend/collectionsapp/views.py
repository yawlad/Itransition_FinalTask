from rest_framework import generics
from config.permissions import IsSuperUserOrOwner
from .models import Collection, CollectionTheme
from .serializers import CollectionSerializer, CollectionThemeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from config.dropbox import create_image_link, upload_to_dropbox_and_get_url, delete_from_dropbox


class CollectionThemeListView(generics.ListAPIView):
    queryset = CollectionTheme.objects.all()
    serializer_class = CollectionThemeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]


class CollectionListCreateView(generics.ListCreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]

    def perform_create(self, serializer):
        direct_link = create_image_link(self.request.data.get('name'),
                                        serializer.validated_data.pop('image'))
        serializer.save(creator=self.request.user, image_url=direct_link)
        return super().perform_create(serializer)


class CollectionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsSuperUserOrOwner(),]
        else:
            return [IsAuthenticatedOrReadOnly(),]

    def perform_update(self, serializer):
        instance = self.get_object()
        if (instance.name != self.request.data.get('name')):
            delete_from_dropbox(instance.name)
        direct_link = create_image_link(self.request.data.get('name'),
                                        serializer.validated_data.pop('image'))
        serializer.save(creator=self.request.user, image_url=direct_link)
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        if (instance.image_url):
            delete_from_dropbox(instance.name)
        return super().perform_destroy(instance)

from django.db import models
from collectionsapp.models import Collection
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class ItemTag(models.Model):

    name = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return self.name


class Item(models.Model):
    collection = models.ForeignKey(
        Collection, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    tags = models.ManyToManyField(ItemTag, blank=True)

    custom_fields = models.JSONField(default=dict, blank=True, null=True)

    def __str__(self):
        return self.name


class ItemComment(models.Model):

    content = models.TextField(blank=False, null=False)
    creator = models.ForeignKey(
        CustomUser, blank=False, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f"Comment to {self.item.name} by {self.creator.username}"


class ItemLike(models.Model):
    creator = models.ForeignKey(
        CustomUser, blank=False, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return f"Like {self.id} by {self.creator.username}"

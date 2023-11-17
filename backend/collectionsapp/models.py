import markdown2
from django.db import models
from django.utils.safestring import mark_safe
from django.contrib.auth import get_user_model

from config.constants import CUSTOM_FIELD_TYPES

CustomUser = get_user_model()


class CollectionTheme(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Collection(models.Model):

    name = models.CharField(max_length=255, blank=False,
                            null=False, unique=True)
    description = models.TextField(blank=False, null=False)
    theme = models.ForeignKey(
        CollectionTheme, blank=False, null=True, on_delete=models.SET_NULL, related_name='collections')
    creator = models.ForeignKey(CustomUser,
                                blank=False, null=True, on_delete=models.SET_NULL, related_name='collections')
    created_at = models.DateTimeField(auto_now_add=True)
    image_url = models.URLField(blank=True, null=True)
    custom_fields_classes = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.name

    def get_markdown_description(self):
        return mark_safe(markdown2.markdown(self.description))

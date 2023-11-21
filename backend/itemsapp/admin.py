from django.contrib import admin
from .models import Item, ItemComment, ItemTag, ItemLike

admin.site.register(Item)
admin.site.register(ItemComment)
admin.site.register(ItemTag)
admin.site.register(ItemLike)
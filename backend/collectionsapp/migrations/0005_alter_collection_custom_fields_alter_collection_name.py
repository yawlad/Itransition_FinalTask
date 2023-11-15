# Generated by Django 4.2.6 on 2023-11-15 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collectionsapp', '0004_remove_collection_image_link_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='custom_fields',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='collection',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]

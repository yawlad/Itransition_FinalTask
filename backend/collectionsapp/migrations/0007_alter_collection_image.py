# Generated by Django 4.2.6 on 2023-11-15 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collectionsapp', '0006_alter_collection_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='collection_images/'),
        ),
    ]
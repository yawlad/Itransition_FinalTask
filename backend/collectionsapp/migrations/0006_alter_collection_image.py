# Generated by Django 4.2.6 on 2023-11-15 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collectionsapp', '0005_alter_collection_custom_fields_alter_collection_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='image',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
    ]
from django.core.management.base import BaseCommand
from collectionsapp.models import CollectionTheme


class Command(BaseCommand):
    help = 'Create 50 CollectionTheme objects'

    def handle(self, *args, **options):
        themes = [
            'Technology', 'Science', 'Nature', 'Art', 'History',
            'Music', 'Travel', 'Food', 'Sports', 'Fashion',
            'Health', 'Business', 'Education', 'Movies', 'Books',
            'Fitness', 'Gaming', 'Photography', 'Politics', 'Animals',
            'Design', 'Space', 'Cooking', 'DIY', 'Cars',
            'Environment', 'Spirituality', 'Mindfulness', 'Family', 'Relationships',
            'Architecture', 'Celebrities', 'Hobbies', 'Crafts', 'Comics',
            'Finance', 'Television', 'Wellness', 'Science Fiction',
            'Astrology', 'Mental Health', 'Pop Culture', 'Travel', 'History',
            'Languages', 'Outdoors', 'Pets', 'Social Media', 'Sustainability'
        ]

        try:
            for theme_name in themes:
                CollectionTheme.objects.create(name=theme_name)
        except:
            print("Themes already set")

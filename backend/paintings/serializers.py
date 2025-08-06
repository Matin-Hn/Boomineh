from rest_framework import serializers
from .models import Painting

class PaintingSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='liked_by.count', read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Painting
        fields = ['id', 'title', 'description', 'image', 'created_at', 'liked_by', 'is_liked', 'likes_count']


    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user in obj.liked_by.all()
        return False
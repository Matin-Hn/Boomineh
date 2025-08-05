from rest_framework import serializers
from .models import Painting

class PaintingSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='liked_by.count', read_only=True)

    class Meta:
        model = Painting
        fields = '__all__'

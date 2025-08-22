from rest_framework import serializers
from .models import Painting, Cart, CartItem

class PaintingSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='liked_by.count', read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Painting
        fields = ['id', 'title', 'description', 'image', 'created_at', 'liked_by', 'is_liked', 'likes_count', 'year', 'price', 'size', 'material', 'availability', 'category']



    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user in obj.liked_by.all()
        return False
    

class CartItemSerializer(serializers.ModelSerializer):
    painting = PaintingSerializer(read_only=True)
    painting_id = serializers.PrimaryKeyRelatedField(
        queryset=Painting.objects.all(), source="painting", write_only=True
    )

    class Meta:
        model = CartItem
        fields = ["id", "painting", "painting_id", "price_snapshot"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "user", "items", "total_items", "total_price"]


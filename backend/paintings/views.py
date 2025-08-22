from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Painting, Cart, CartItem
from .serializers import PaintingSerializer, CartSerializer, CartItemSerializer

class PaintingViewSet(viewsets.ModelViewSet):
    queryset = Painting.objects.all().order_by('-created_at')
    serializer_class = PaintingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {'request': self.request}

    # Custom action: Like
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        painting = self.get_object()
        painting.liked_by.add(request.user)
        return Response({'status': 'painting liked'})

    # Custom action: Unlike
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def unlike(self, request, pk=None):
        painting = self.get_object()
        painting.liked_by.remove(request.user)
        return Response({'status': 'painting unliked'})

    # Custom action: Get all liked paintings by current user
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        paintings = Painting.objects.filter(liked_by=request.user)
        serializer = self.get_serializer(paintings, many=True)
        return Response(serializer.data)


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        return Response(self.get_serializer(cart).data)

    @action(detail=False, methods=["post"])
    def add(self, request):
        painting_id = request.data.get("painting_id")

        painting = get_object_or_404(Painting, id=painting_id)
        if not painting.availability:
            return Response({"error": "Painting not available"}, status=400)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        item, created = CartItem.objects.get_or_create(
            cart=cart,
            painting=painting,
            defaults={"price_snapshot": painting.price},
        )
        if not created:
            item.save()

        return Response(CartSerializer(cart).data)
    

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)


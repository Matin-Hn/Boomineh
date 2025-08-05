from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Painting
from .serializers import PaintingSerializer

class PaintingViewSet(viewsets.ModelViewSet):
    queryset = Painting.objects.all().order_by('-created_at')
    serializer_class = PaintingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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

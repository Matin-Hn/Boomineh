from rest_framework import generics, permissions
from .models import Painting
from .serializers import PaintingSerializer


class PaintingListCreateView(generics.ListCreateAPIView):
    queryset = Painting.objects.all().order_by('-created_at')
    serializer_class = PaintingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PaintingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


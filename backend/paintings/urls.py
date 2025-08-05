from django.urls import path
from .views import PaintingListCreateView, PaintingRetrieveUpdateDestroyView

urlpatterns = [
    path('', PaintingListCreateView.as_view(), name='painting-list'),
    path('<int:pk>/', PaintingRetrieveUpdateDestroyView.as_view(), name='painting-detail'),
]

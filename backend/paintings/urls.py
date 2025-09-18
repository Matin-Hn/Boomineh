from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PaintingViewSet, CartViewSet, CartItemViewSet


router = DefaultRouter()
router.register(r'paintings', PaintingViewSet, basename='painting')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart/items', CartItemViewSet, basename='cartitem')


urlpatterns = [

] + router.urls

from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PaintingViewSet


router = DefaultRouter()
router.register(r'', PaintingViewSet, basename='painting')

urlpatterns = [

] + router.urls

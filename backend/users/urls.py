from django.urls import path
from .views import RegisterView, CustomTokenRefreshView, current_user_view
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('user/', current_user_view, name='user_detail'),
]

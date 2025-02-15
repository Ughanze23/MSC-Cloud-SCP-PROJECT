from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from api import views

urlpatterns = [
    path('token/', views.MytokenObtainPairView.as_view(), name='token_refresh'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('api/', include('api.urls')),
]

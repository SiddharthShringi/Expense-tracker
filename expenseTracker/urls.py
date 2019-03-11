from django.urls import path
from .views import RegistrationAPIView

app_name = 'expenseTracker'

urlpatterns = [
    path('users/', RegistrationAPIView.as_view()),
]
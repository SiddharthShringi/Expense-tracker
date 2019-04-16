from django.urls import path
from .views import (UserRetrieveUpdateAPIView, LoginAPIView,
                    RegistrationAPIView, CategoryAPIView, ExpenseAPIView, IncomeAPIView)

app_name = 'expenseTracker'

urlpatterns = [
    path('user', UserRetrieveUpdateAPIView.as_view()),
    path('users/', RegistrationAPIView.as_view()),
    path('users/login/', LoginAPIView.as_view()),
    path('category/', CategoryAPIView.as_view()),
    path('expense/', ExpenseAPIView.as_view()),
    path('income/', IncomeAPIView.as_view()),
]

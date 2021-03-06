from .renderers import UserJSONRenderer
from .models import Category, Expense, Income
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (ExpenseSerializer, ExpenseCreateSerializer, IncomeSerializer, IncomeCreateSerializer, UserSerializer,
                          LoginSerializer, RegistrationSerializer, CategorySerializer)


class RegistrationAPIView(APIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer, )
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # Notice here that we do not call `serializer.save()` like we did for
        # the registration endpoint. This is because we don't  have
        # anything to save. Instead, the `validate` method on our serializer
        # handles everything we need.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        # There is nothing to validate or save here. Instead, we just want the
        # serializer to handle turning our `User` object into something that
        # can be JSONified and sent to the client.
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})

        # Here is that serialize, validate, save pattern we talked about
        # before.
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()

    def get(self, request):
        categories = self.queryset.filter(
            user=self.request.user) | self.queryset.filter(default=True)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = CategorySerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExpenseAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = Expense.objects.all()

    def get(self, request):
        expnese = self.queryset.filter(user=self.request.user)
        serializer = ExpenseSerializer(expnese, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print(data, "fasfasdf")
        data['expense_type'] = data['expenseType']
        data.pop('expenseType')
        write_serializer = ExpenseCreateSerializer(data=data)
        if write_serializer.is_valid(raise_exception=True):
            write_serializer.save(user=request.user)
            return Response(write_serializer.data, status=status.HTTP_201_CREATED)
        return Response(write_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncomeAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = Income.objects.all()

    def get(self, request):
        incomes = self.queryset.filter(user=self.request.user)
        serializer = IncomeSerializer(incomes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print(data, "Income APIView")
        write_serializer= IncomeCreateSerializer(data=data)
        if write_serializer.is_valid(raise_exception=True):
            write_serializer.save(user=request.user)
            return Response(write_serializer.data, status=status.HTTP_201_CREATED)
        return Response(write_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class CategoryViewsets(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     permission_classes = (IsAuthenticated,)
#     serializer_class = CategorySerializer

#     def perform_create(self, serializer):
#         return serializer.save(user=self.request.user)

#     def get_queryset(self):
#         return self.queryset.filter(user=self.request.user) | self.queryset.filter(default=True)


# class ExpenseViewsets(viewsets.ModelViewSet):
#     queryset = Expense.objects.all()
#     permission_classes = (IsAuthenticated,)
#     serializer_class = ExpenseSerializer

#     def perform_create(self, serializer):
#         return serializer.save(user=self.request.user)

#     def get_queryset(self):
#         return self.queryset.filter(user=self.request.user)


# class IncomeViewsets(viewsets.ModelViewSet):
#     queryset = Income.objects.all()
#     permission_classes = (IsAuthenticated,)
#     serializer_class = IncomeSerializer

#     def perform_create(self, serializer):
#         return serializer.save(user=self.request.user)

#     def get_queryset(self):
#         return self.queryset.filter(user=self.request.user)

from rest_framework import serializers
from .models import Income, Expense, Category


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# create a endpoint for registering a user
class RegistrationSerializer(serializers.ModelSerializer):
    """Serializer for registering request and create new user"""

    # Ensure passowrds are atleast 8 characters long, no longer than 128
    # character and can not read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['email', 'username', 'password', 'token']

    def create(self, validated_data):
        # Use the create_user function to create a new user.
        return User.objects.create_user(**validated_data)
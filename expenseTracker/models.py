import jwt

from datetime import datetime, timedelta, date

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.db import models

# Create your models here.
class UserManager(BaseUserManager):
    """Override create_user and create_superuser function to create user objects"""

    def create_user(self, username, email, password=None):
        """Create and return a 'User' with email, username and password."""

        if username is None:
            raise TypeError('Users must have username.')

        if email is None:
            raise TypeError('Users must have email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        """Create and return a 'User' with admin permission."""

        if password is None:
            raise TypeError('Superusers must have password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, db_index=True, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # A timestamp representing when this object was created.
    created_at = models.DateTimeField(auto_now_add=True)

    # A timestamp reprensenting when this object was last updated.
    updated_at = models.DateTimeField(auto_now=True)

    # `USERNAME_FIELD` property tells us that which field we will use to login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def _generate_jwt_token(self):
        """
        Generate JSON web token that stores this user's ID and has
        expiry date of 60 days
        """ 

        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')

#models class for creating timestamp
class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True, editable=False)
    modified_date = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True

class Category(BaseModel):
    CATEGORY_TYPE = (
        ('Income', 'Income'),
        ('Expense', 'Expense')
    )
    default = models.BooleanField(default=False)
    name = models.CharField(max_length=30)
    type = models.CharField(max_length=10, choices=CATEGORY_TYPE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Income(BaseModel):
    date = models.DateField(default=date.today)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.IntegerField()
    note = models.CharField(max_length=500, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.category} - {self.amount}"

    class Meta:
        verbose_name = 'Income'
        verbose_name_plural = 'All Income'


class Expense(BaseModel):
    EXPENSE_TYPE = (
        ('Fixed', 'Fixed'),
        ('Variable', 'Variable')
    )
    date = models.DateField(default=date.today)
    expense_type = models.CharField(max_length=100, choices=EXPENSE_TYPE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.IntegerField()
    note = models.CharField(max_length=500, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.category} - {self.amount}"

    class Meta:
        verbose_name = 'Expense'
        verbose_name_plural = 'All Expenses'
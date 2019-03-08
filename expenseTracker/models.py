from django.db import models

# Create your models here.

class Category(models.Model):
    CATEGORY_TYPE = (
        ('Income', 'Income'),
        ('Expense', 'Expense')
    )
    name = models.CharField(max_length=30)
    type = models.CharField(max_length = 10, choices=CATEGORY_TYPE)

    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Income(models.Model):
    date = models.DateField(auto_now_add=True, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.IntegerField()
    note = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.category} - {self.amount}"

    class Meta:
        verbose_name = 'Income'
        verbose_name_plural = 'All Income'


class Expense(models.Model):
    EXPENSE_TYPE = (
        ('Fixed', 'Fixed'),
        ('Variable', 'Variable')
    )
    date = models.DateField(auto_now_add=True, editable=False)
    expense_type = models.CharField(max_length=100, choices=EXPENSE_TYPE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.IntegerField()
    note = models.CharField(max_length=500)    

    def __str__(self):
        return f"{self.category} - {self.amount}"

    class Meta:
        verbose_name = 'Expense'
        verbose_name_plural = 'All Expenses'
from django.db import models
from CustomerApp.models import Customer


class Purchase(models.Model):
    customer = models.ForeignKey(
        Customer,
        related_name='purchases',
        on_delete=models.CASCADE,
        default=1  # Replace 1 with the ID of an actual customer
    )
    product_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    email = models.EmailField(max_length=20,blank=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, editable=False)

    
    
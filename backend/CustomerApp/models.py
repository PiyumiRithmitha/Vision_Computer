from django.db import models

# Create your models here.
class Customer(models.Model):
    CId = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100,blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    roll = models.IntegerField(default=0) #is-Customer -> roll = 0

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
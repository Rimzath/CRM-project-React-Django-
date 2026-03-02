from django.db import models
from django.contrib.auth.models import User


class Customer(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=255)

    email = models.EmailField()

    phone = models.CharField(max_length=20)

    company = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
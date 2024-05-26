from django.db import models


    
class User(models.Model):
    ROLE_CHOICES = (
        ('STUDENT', 'Student'),
        ('ADMIN', 'Admin')
    )
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    cnic = models.CharField(max_length=100, unique=True)
    phone = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    image = models.ImageField(upload_to='users')
    standard = models.CharField(max_length=30, blank=True, null=True)
    major = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
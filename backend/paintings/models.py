from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()

class Painting(models.Model):
    title = models.CharField(max_length=200, unique=True)
    image = models.ImageField(upload_to='paintings/', blank=True)
    size = models.CharField(max_length=10)
    description = models.TextField(blank=True)
    material = models.TextField()
    staus = models.BooleanField(default=True)
    year = models.IntegerField()                                       # "Year Of Manufacture"
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    category = models.CharField(max_length=50, null=True)
    liked_by = models.ManyToManyField(User, related_name='liked_paintings', blank=True)
    

    def __str__(self):
        return self.title


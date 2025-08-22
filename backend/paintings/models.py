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
    availability = models.BooleanField(default=True)
    year = models.IntegerField()                                       # "Year Of Manufacture"
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    category = models.CharField(max_length=50, null=True)
    liked_by = models.ManyToManyField(User, related_name='liked_paintings', blank=True, null=models.CASCADE)
    

    def __str__(self):
        return self.title
    


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart {self.id} for {self.user}"

    @property
    def total_items(self):
        return len(self.items.all())
    
    @property
    def total_price(self):
        return sum(item.painting.price for item in self.items.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    painting = models.ForeignKey(Painting, on_delete=models.CASCADE)
    price_snapshot = models.IntegerField(max_length=12)


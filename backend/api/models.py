from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    STATUS = [('pending','Pending'),('completed','Completed'),('cancelled','Cancelled')]
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total_price = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    review_text = models.TextField()
    sentiment = models.CharField(max_length=20, blank=True)
    is_fake = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
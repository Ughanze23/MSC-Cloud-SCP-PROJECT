from django.db import models
from django.contrib.auth.models import User


class StockTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('BUY', 'Buy'),
        ('SELL', 'Sell'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=10)
    units = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=4, choices=TRANSACTION_TYPES)
    transaction_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.ticker} - {self.transaction_type} - {self.units} units"
        
    class Meta:
        ordering = ['-transaction_date']

class CryptoTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('BUY', 'Buy'),
        ('SELL', 'Sell'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=10)
    units = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=4, choices=TRANSACTION_TYPES)
    transaction_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.ticker} - {self.transaction_type} - {self.units} units"
        
    class Meta:
        ordering = ['-transaction_date']

class PriceAlert(models.Model):
    ALERT_TYPES = [
        ('STOCK', 'Stock'),
        ('CRYPTO', 'Cryptocurrency'),
    ]
    
    TRIGGER_TYPES = [
        ('ABOVE', 'Price Above Target'),
        ('BELOW', 'Price Below Target'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset_type = models.CharField(max_length=6, choices=ALERT_TYPES)
    ticker = models.CharField(max_length=10)
    price_target = models.DecimalField(max_digits=15, decimal_places=2)
    trigger_condition = models.CharField(max_length=5, choices=TRIGGER_TYPES)
    
    def __str__(self):
        return f"{self.ticker} - {self.get_trigger_condition_display()} {self.price_target}"
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import StockTransaction

#user serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    


class StockTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockTransaction
        fields = ['id', 'ticker', 'units', 'price_per_unit', 'transaction_type', 'transaction_date']
        read_only_fields = ['transaction_date']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class StockSummarySerializer(serializers.Serializer):
    ticker = serializers.CharField()
    total_units = serializers.DecimalField(max_digits=10, decimal_places=2)
    average_price = serializers.DecimalField(max_digits=10, decimal_places=2)
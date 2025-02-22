from django.shortcuts import render
from rest_framework import generics,status
from django.contrib.auth.models import User
from api.serializer import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum, Avg
from django.db.models.functions import Cast
from decimal import Decimal
from .models import StockTransaction,CryptoTransaction
from .serializer import StockTransactionSerializer, StockSummarySerializer,CryptoSummarySerializer,CryptoTransactionSerializer

#Create user view
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

#stock transaction views
#create stock transaction
class StockTransactionCreateView(generics.CreateAPIView):
    serializer_class = StockTransactionSerializer
    permission_classes = [IsAuthenticated]

#list all stock transactions
class StockTransactionListView(generics.ListAPIView):
    serializer_class = StockTransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return StockTransaction.objects.filter(user=self.request.user)

#stock transaction summary
class StockSummaryView(generics.ListAPIView):
    serializer_class = StockSummarySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user_transactions = StockTransaction.objects.filter(user=self.request.user)
        summary = {}
        
        for transaction in user_transactions:
            if transaction.ticker not in summary:
                summary[transaction.ticker] = {
                    'total_units': Decimal('0'),
                    'total_cost': Decimal('0')
                }
            
            if transaction.transaction_type == 'BUY':
                summary[transaction.ticker]['total_units'] += transaction.units
                summary[transaction.ticker]['total_cost'] += transaction.units * transaction.price_per_unit
            else:  # SELL
                summary[transaction.ticker]['total_units'] -= transaction.units
        
        result = []
        for ticker, data in summary.items():
            if data['total_units'] > 0:  #show stocks with more than 0 units
                result.append({
                    'ticker': ticker,
                    'total_units': data['total_units'],
                    'average_price': data['total_cost'] / data['total_units']
                })
        
        return result

#view transaction details
class StockTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StockTransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return StockTransaction.objects.filter(user=self.request.user)

#view transactions of a single stock
class StockSpecificTransactionsView(generics.ListAPIView):
    serializer_class = StockTransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        ticker = self.kwargs['ticker']
        return StockTransaction.objects.filter(
            user=self.request.user,
            ticker=ticker
        )
    
#crypto transaction views
class CryptoTransactionCreateView(generics.CreateAPIView):
    serializer_class = CryptoTransactionSerializer
    permission_classes = [IsAuthenticated]

#list all crypto transactions
class CryptoTransactionListView(generics.ListAPIView):
    serializer_class = CryptoTransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CryptoTransaction.objects.filter(user=self.request.user)
    
#crypto transaction summary
class CryptoSummaryView(generics.ListAPIView):
    serializer_class = CryptoSummarySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_transactions = CryptoTransaction.objects.filter(user=self.request.user)
        summary = {}

        for transaction in user_transactions:
            if transaction.ticker not in summary:
                summary[transaction.ticker] = {
                    'total_units': Decimal('0'),
                    'total_cost': Decimal('0')
                }

            if transaction.transaction_type == 'BUY':
                summary[transaction.ticker]['total_units'] += transaction.units
                summary[transaction.ticker]['total_cost'] += transaction.units * transaction.price_per_unit
            else:  # SELL
                summary[transaction.ticker]['total_units'] -= transaction.units

        result = []
        for ticker, data in summary.items():
            if data['total_units'] > 0:  #show stocks with more than 0 units
                result.append({
                    'ticker': ticker,
                    'total_units': data['total_units'],
                    'average_price': data['total_cost'] / data['total_units']
                })

        return result

#view crypto transaction details
class CryptoTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CryptoTransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CryptoTransaction.objects.filter(user=self.request.user)

#view transactions of a single crypto
class CryptoSpecificTransactionsView(generics.ListAPIView):
    serializer_class = CryptoTransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        ticker = self.kwargs['ticker']
        return CryptoTransaction.objects.filter(
            user=self.request.user,
            ticker=ticker
        )
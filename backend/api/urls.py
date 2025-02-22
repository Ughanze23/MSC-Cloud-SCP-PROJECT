from django.urls import path
from .views import (
    StockTransactionCreateView,
    StockTransactionListView,
    StockSummaryView,
    StockTransactionDetailView,
    StockSpecificTransactionsView,
    CryptoTransactionCreateView,
    CryptoTransactionListView,
    CryptoSummaryView,
    CryptoTransactionDetailView,
    CryptoSpecificTransactionsView
)

urlpatterns = [
    path('transactions/', StockTransactionCreateView.as_view(), name='stock-transaction-create'),
    path('transactions/all/', StockTransactionListView.as_view(), name='stock-transaction-list'),
    path('transactions/summary/', StockSummaryView.as_view(), name='stock-summary'),
    path('transactions/<int:pk>/', StockTransactionDetailView.as_view(), name='stock-transaction-detail'),
    path('transactions/stock/<str:ticker>/', StockSpecificTransactionsView.as_view(), name='stock-specific-transactions'),
    path('transactions/crypto', CryptoTransactionCreateView.as_view(), name='crypto-transaction-create'),
    path('crypto/all/', CryptoTransactionListView.as_view(), name='crypto-transaction-list'),
    path('crypto/summary/', CryptoSummaryView.as_view(), name='crypto-summary'),
    path('transactions/crypto/<int:pk>/', CryptoTransactionDetailView.as_view(), name='crypto-transaction-detail'),
    path('transactions/crypto/<str:ticker>/', CryptoSpecificTransactionsView.as_view(), name='crypto-specific-transactions'),

]


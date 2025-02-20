from django.urls import path
from .views import (
    StockTransactionCreateView,
    StockTransactionListView,
    StockSummaryView,
    StockTransactionDetailView,
    StockSpecificTransactionsView,
)

urlpatterns = [
    path('transactions/', StockTransactionCreateView.as_view(), name='stock-transaction-create'),
    path('transactions/all/', StockTransactionListView.as_view(), name='stock-transaction-list'),
    path('transactions/summary/', StockSummaryView.as_view(), name='stock-summary'),
    path('transactions/<int:pk>/', StockTransactionDetailView.as_view(), name='stock-transaction-detail'),
    path('transactions/stock/<str:ticker>/', StockSpecificTransactionsView.as_view(), name='stock-specific-transactions'),
]


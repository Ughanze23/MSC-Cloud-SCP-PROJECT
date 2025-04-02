import os
import requests
from decimal import Decimal
from django.conf import settings
from .models import PriceAlert

def check_price_alerts():
    """
    Check all price alerts against current prices and send notifications
    for triggered alerts via custom email API. Delete alerts after they're triggered.
    """
    # Get all price alerts
    alerts = PriceAlert.objects.all()
    
    # Group alerts by ticker to minimize API calls
    stock_tickers = {}
    crypto_tickers = {}
    
    for alert in alerts:
        if alert.asset_type == 'STOCK':
            if alert.ticker not in stock_tickers:
                stock_tickers[alert.ticker] = []
            stock_tickers[alert.ticker].append(alert)
        else:  # CRYPTO
            if alert.ticker not in crypto_tickers:
                crypto_tickers[alert.ticker] = []
            crypto_tickers[alert.ticker].append(alert)
    
    # Process stock alerts
    process_stock_alerts(stock_tickers)
    
    # Process crypto alerts
    process_crypto_alerts(crypto_tickers)

def process_stock_alerts(stock_tickers):
    """Process all stock price alerts"""
    for ticker, alerts in stock_tickers.items():
        try:
            # Get current stock price from some API
            current_price = get_stock_price(ticker)
            
            for alert in alerts:
                check_alert_and_notify(alert, current_price)
        except Exception as e:
            print(f"Error checking stock price for {ticker}: {str(e)}")

def process_crypto_alerts(crypto_tickers):
    """Process all crypto price alerts"""
    for ticker, alerts in crypto_tickers.items():
        try:
            # Get current crypto price from some API
            current_price = get_crypto_price(ticker)
            
            for alert in alerts:
                check_alert_and_notify(alert, current_price)
        except Exception as e:
            print(f"Error checking crypto price for {ticker}: {str(e)}")

def get_stock_price(ticker):
    """
    Get current stock price from Alpha Vantage API
    """
    try:
        # Alpha Vantage API endpoint
        api_key = "OH87FZGISJPOZDCT"
        url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={api_key}"
        
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if "Global Quote" in data and "05. price" in data["Global Quote"]:
                price = data["Global Quote"]["05. price"]
                return Decimal(price)
            else:
                print(f"Invalid data format or no price found for {ticker}: {data}")
                return Decimal('100.00')  # Fallback price
        else:
            print(f"Failed to fetch stock price for {ticker}. Status: {response.status_code}")
            return Decimal('100.00')  # Fallback price
    except Exception as e:
        print(f"Error fetching stock price for {ticker}: {str(e)}")
        return Decimal('100.00')  # Fallback price

def get_crypto_price(ticker):
    """
    Get current crypto price from CoinMarketCap API
    """
    try:
        # CoinMarketCap API endpoint
        api_key = "14d64274-02da-49a0-86a0-1f1b2e75aed9"
        url = f"https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol={ticker}"
        
        # Set headers with API key
        headers = {
            "X-CMC_PRO_API_KEY": api_key
        }
        
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            
            # Check if data and ticker exist in the response
            if 'data' in data and ticker in data['data'] and len(data['data'][ticker]) > 0:
                # Get the first result (normally the main coin, not tokens with the same symbol)
                crypto_data = data['data'][ticker][0]
                
                if 'quote' in crypto_data and 'USD' in crypto_data['quote'] and 'price' in crypto_data['quote']['USD']:
                    price = crypto_data['quote']['USD']['price']
                    return Decimal(str(price))  # Convert to string first to avoid float precision issues
                else:
                    print(f"Price not found in response for {ticker}")
            else:
                print(f"Ticker {ticker} not found in response: {data}")
        else:
            print(f"Failed to fetch crypto price for {ticker}. Status: {response.status_code}, Response: {response.text}")
        
        # Return fallback price if any issues occur
        return Decimal('30000.00')  # Fallback price
    except Exception as e:
        print(f"Error fetching crypto price for {ticker}: {str(e)}")
        return Decimal('30000.00')  # Fallback price

def check_alert_and_notify(alert, current_price):
    """Check if alert conditions are met and send notification if needed"""
    is_triggered = False
    
    # Check if the alert condition is met
    if alert.trigger_condition == 'ABOVE' and current_price > alert.price_target:
        is_triggered = True
    elif alert.trigger_condition == 'BELOW' and current_price < alert.price_target:
        is_triggered = True
    
    if is_triggered:
        print(f"Alert triggered: {alert} (Current price: {current_price})")
        
        # Send notification using custom email API
        send_email_notification(alert, current_price)
        
        # Delete the alert after it's triggered
        alert.delete()

def send_email_notification(alert, current_price):
    """Send notification via custom email API"""
    try:
        # API endpoint
        api_url = "http://GenericEmailSendingApi-env.eba-34zkmvsr.us-east-1.elasticbeanstalk.com/api/sendemail"
        
        # Authentication token
        bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0MTY1NDQyOX0.FKCNiMFGrS5SR45kBxp6fbglPx5CXmrHH56GjqXQeRY"
        
        # Prepare subject
        subject = f"Price Alert: {alert.ticker}"
        
        # Prepare message
        message = (
            f"Your price alert for {alert.ticker} has been triggered.\n\n"
            f"Trigger condition: {alert.get_trigger_condition_display()}\n"
            f"Target price: {alert.price_target}\n"
            f"Current price: {current_price}\n\n"
        )
        
        # Prepare request payload
        payload = {
            "userId": 1,
            "subject": subject,
            "message": message,
            "email": "x23384069@student.ncirl.ie"
        }
        
        # Set headers with Bearer token
        headers = {
            "Authorization": f"Bearer {bearer_token}",
            "Content-Type": "application/json"
        }
        
        # Send POST request to the API
        response = requests.post(api_url, json=payload, headers=headers)
        
        # Check response
        if response.status_code == 200:
            print(f"Notification sent for alert {alert.id}")
        else:
            print(f"Failed to send notification. Status code: {response.status_code}, Response: {response.text}")
            
    except Exception as e:
        print(f"Error sending email notification: {str(e)}")
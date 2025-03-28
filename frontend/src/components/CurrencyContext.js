import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available currencies with their symbols and default rates
export const CURRENCIES = {
  USD: { symbol: '$', name: 'USD', defaultRate: 0.92 },
  CNY: { symbol: '¥', name: 'CNY', defaultRate: 0.13 },
  GBP: { symbol: '£', name: 'GBP', defaultRate: 1.17 },
  INR: { symbol: '₹', name: 'INR', defaultRate: 0.011 },
  EUR: { symbol: '€', name: 'EUR', defaultRate: 1.00 }
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // Default to EUR
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingDefaultRate, setUsingDefaultRate] = useState(false);

  // Fetch exchange rate when currency changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      // If EUR is selected, no need to fetch
      if (selectedCurrency === 'EUR') {
        setExchangeRate(1.0);
        setUsingDefaultRate(false);
        return;
      }

      setLoading(true);
      setError(null);
      setUsingDefaultRate(false);

      try {
        const response = await fetch('https://5ss3rebhtf.execute-api.us-east-1.amazonaws.com/currencyConverter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currency: selectedCurrency })
        });
        
        const data = await response.json();
        
        if (response.ok && data.exchange_rate) {
          setExchangeRate(data.exchange_rate);
        } else {
          // Fallback to default rate if API doesn't return expected data
          console.warn('API missing exchange_rate, using default for', selectedCurrency);
          setExchangeRate(CURRENCIES[selectedCurrency].defaultRate);
          setUsingDefaultRate(true);
        }
      } catch (err) {
        console.error('Error fetching exchange rate:', err);
        setError('Failed to fetch exchange rate');
        // Fallback to default rate
        console.warn('Using default exchange rate for', selectedCurrency);
        setExchangeRate(CURRENCIES[selectedCurrency].defaultRate);
        setUsingDefaultRate(true);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [selectedCurrency]);

  // Convert a EUR value to the selected currency
  const convertCurrency = (valueInEur) => {
    if (!valueInEur && valueInEur !== 0) return '';
    if (typeof valueInEur !== 'number') {
      valueInEur = parseFloat(valueInEur);
      if (isNaN(valueInEur)) return '';
    }
    
    return valueInEur / exchangeRate;
  };

  // Format a value in the selected currency with symbol
  const formatCurrency = (valueInEur, options = {}) => {
    const convertedValue = convertCurrency(valueInEur);
    if (convertedValue === '') return '';
    
    const symbol = CURRENCIES[selectedCurrency].symbol;
    const formattedValue = convertedValue.toLocaleString(undefined, {
      minimumFractionDigits: options.minimumFractionDigits || 2,
      maximumFractionDigits: options.maximumFractionDigits || 2,
      ...options
    });
    
    return `${symbol}${formattedValue}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        exchangeRate,
        loading,
        error,
        usingDefaultRate,
        convertCurrency,
        formatCurrency,
        currencies: CURRENCIES
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyContext;
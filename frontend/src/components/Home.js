import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, Divider, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import api from '../api';
import { useCurrency } from './CurrencyContext';

function Home() {
  const [stats, setStats] = useState({
    totalCryptos: 0,
    totalStocks: 0,
    portfolioValue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get currency conversion functions
  const { formatCurrency, selectedCurrency, loading: currencyLoading } = useCurrency();
  
  // Fetch stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Use the correct API endpoints based on your backend URLs
        const [cryptoResponse, stockResponse] = await Promise.all([
          api.get('/api/crypto/summary/'),
          api.get('/api/transactions/summary/')
        ]);
        
        const cryptoData = cryptoResponse.data;
        const stockData = stockResponse.data;
        
        // Calculate portfolio value from your data structure
        // For each item, multiply total_units by average_price
        const cryptoValue = cryptoData.reduce((sum, item) => 
          sum + (parseFloat(item.total_units) * parseFloat(item.average_price)), 0);
          
        const stockValue = stockData.reduce((sum, item) => 
          sum + (parseFloat(item.total_units) * parseFloat(item.average_price)), 0);
        
        setStats({
          totalCryptos: cryptoData.length,
          totalStocks: stockData.length,
          portfolioValue: cryptoValue + stockValue // Store as number for better formatting
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError('Failed to load portfolio data');
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: '100%' }}>
      {/* 1. Welcome Banner */}
      <Paper 
        elevation={1}
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: '8px',
          backgroundImage:  'linear-gradient(to right, #007bff, #0056b3)',
          color: 'white'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your Investment Portfolio
        </Typography>
        <Typography variant="body1" paragraph>
          Track, manage, and analyze your crypto and stock investments in one place.
        </Typography>
      </Paper>

      {/* 2. Simple Stats Overview */}
      <Paper 
        elevation={1}
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: '8px'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Portfolio Overview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Total Portfolio Value ({selectedCurrency})
              </Typography>
              <Typography variant="h4" color="primary">
                {loading ? (
                  <CircularProgress size={24} sx={{ my: 1 }} />
                ) : currencyLoading ? (
                  <CircularProgress size={24} sx={{ my: 1 }} />
                ) : (
                  formatCurrency(stats.portfolioValue)
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Cryptocurrencies
              </Typography>
              <Typography variant="h4" color="primary">
                {loading ? '...' : stats.totalCryptos}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Stocks
              </Typography>
              <Typography variant="h4" color="primary">
                {loading ? '...' : stats.totalStocks}
              </Typography>
            </Box>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* 3. Navigation Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            component={Link}
            to="/crypto"
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: '8px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            <MonetizationOnIcon sx={{ fontSize: 60, color: '#f7931a', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Crypto Portfolio
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Manage your cryptocurrency investments
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            component={Link}
            to="/stock"
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: '8px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            <ShowChartIcon sx={{ fontSize: 60, color: '#0288d1', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Stock Portfolio
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Track your stock market investments
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
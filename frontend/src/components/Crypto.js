import React, { useState, useEffect } from 'react';
import CryptoForm from '../components/CryptoForm';
import CryptoSummaryTable from '../components/CryptoSummaryTable';
import CryptoTransactionList from '../components/CryptoTransactionList';
import { Button, Typography, Box, Paper, CircularProgress, Divider } from '@mui/material';
import { CryptoProvider, useCrypto } from './CryptoContext';
import api from '../api';

// Inline Portfolio Value Component
const InlineCryptoPortfolioValue = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useCrypto();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/crypto/summary/');
        const cryptoData = response.data;
        
        // Calculate total portfolio value
        const value = cryptoData.reduce((sum, item) => 
          sum + (parseFloat(item.total_units) * parseFloat(item.average_price)), 0);
        
        setTotalValue(value);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio value:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]); // Refresh when transactions change

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
        Total Portfolio Value:
      </Typography>
      {loading ? (
        <CircularProgress size={16} sx={{ ml: 1 }} />
      ) : (
        <Typography variant="h6" sx={{ fontWeight: 500, color: '#007bff' }}>
          ${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </Typography>
      )}
    </Box>
  );
};

function Crypto() {
  const [showTransactions, setShowTransactions] = useState(false);

  return (
    <CryptoProvider>
      <Box sx={{ p: 3, maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          My Crypto Portfolio
        </Typography>
        <CryptoForm />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: '24px',
            mt: 4,
            mb: 4,
          }}
        >
          <Paper 
            sx={{ 
              p: 3,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              height: 'fit-content',
              backgroundColor: '#fff'
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                mb: 2,
                fontWeight: 500
              }}
            >
              Crypto Summary
            </Typography>
            
            {/* Total Value displayed inline inside the card */}
            <InlineCryptoPortfolioValue />
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ width: '100%' }}>
              <CryptoSummaryTable />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Button
            onClick={() => setShowTransactions(prev => !prev)}
            variant="contained"
            sx={{
              bgcolor: '#007bff',
              '&:hover': { bgcolor: '#0056b3' },
              mb: 3,
              textTransform: 'uppercase',
              px: 3,
              py: 1
            }}
          >
            {showTransactions ? 'Hide All Transactions' : 'Show All Transactions'}
          </Button>

          {showTransactions && (
            <Box>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  mb: 3,
                  fontWeight: 500
                }}
              >
                All Transactions
              </Typography>
              <Paper 
                sx={{ 
                  width: '100%',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  backgroundColor: '#fff'
                }}
              >
                <Box sx={{ p: 3 }}>
                  <CryptoTransactionList />
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </CryptoProvider>
  );
}

export default Crypto;
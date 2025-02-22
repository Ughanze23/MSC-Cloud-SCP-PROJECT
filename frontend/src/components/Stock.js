import React, { useState } from 'react';
import StockForm from '../components/StockForm';
import StockSummaryTable from '../components/StockSummaryTable';
import StockTransactionList from '../components/StockTransactionList';
import { Button, Typography, Box, Paper } from '@mui/material';
import { StockProvider } from './StockContext';

function Stock() {
  const [showTransactions, setShowTransactions] = useState(false);

  return (
    <StockProvider>
      <Box sx={{ p: 3, maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          My Stock Portfolio
        </Typography>
        <StockForm />

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
                mb: 3,
                fontWeight: 500
              }}
            >
              Stock Summary
            </Typography>
            <Box sx={{ width: '100%' }}>
              <StockSummaryTable />
            </Box>
          </Paper>

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
                mb: 3,
                fontWeight: 500
              }}
            >
              Additional Content
            </Typography>
            <Typography>
              This space can be used for other components or widgets.
            </Typography>
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
                  <StockTransactionList />
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </StockProvider>
  );
}

export default Stock;
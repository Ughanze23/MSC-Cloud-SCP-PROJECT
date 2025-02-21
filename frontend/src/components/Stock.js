import React, { useState } from 'react';
import StockForm from '../components/StockForm';
import StockSummaryTable from '../components/StockSummaryTable';
import StockTransactionList from '../components/StockTransactionList';
import { Button, Typography, Box, Paper } from '@mui/material';

function Stock() {
  const [showTransactions, setShowTransactions] = useState(false);

  return (
    <Box sx={{ p: 3, maxWidth: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Stock Portfolio
      </Typography>
      <StockForm />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          mt: 3,
          '& > *': {
            minWidth: 0, // This prevents grid items from expanding beyond their container
          }
        }}
      >
        {/* Left Column */}
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Stock Summary
          </Typography>
          
          <Paper sx={{ 
            width: '100%',
            overflow: 'auto', // Enable horizontal scroll if needed
            mb: 3
          }}>
            <Box sx={{ minWidth: '600px' }}> {/* Minimum width for the table */}
              <StockSummaryTable />
            </Box>
          </Paper>

          <Button
            onClick={() => setShowTransactions(prev => !prev)}
            variant="contained"
            sx={{
              bgcolor: '#007bff',
              '&:hover': { bgcolor: '#0056b3' },
              mb: 3
            }}
          >
            {showTransactions ? 'Hide All Transactions' : 'Show All Transactions'}
          </Button>

          {showTransactions && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                All Transactions
              </Typography>
              <Paper sx={{ 
                width: '100%',
                overflow: 'auto', // Enable horizontal scroll if needed
              }}>
                <Box sx={{ minWidth: '600px' }}> {/* Minimum width for the table */}
                  <StockTransactionList />
                </Box>
              </Paper>
            </Box>
          )}
        </Box>

        {/* Right Column */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Additional Content
          </Typography>
          <Typography>
            This space can be used for other components or widgets.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Stock;
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import api from "../api";
import { useCrypto } from './CryptoContext';

const CryptoForm = () => {
  const { refreshData } = useCrypto();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    ticker: '',
    units: '',
    price_per_unit: '',
    transaction_type: 'BUY'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const resetForm = () => {
    setFormData({
      ticker: '',
      units: '',
      price_per_unit: '',
      transaction_type: 'BUY'
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleTickerChange = (e) => {
    const upperCaseTicker = e.target.value.toUpperCase();
    setFormData({ 
      ...formData, 
      ticker: upperCaseTicker 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/transactions/crypto", {
        ticker: formData.ticker.toUpperCase(),
        units: parseInt(formData.units),
        price_per_unit: parseFloat(formData.price_per_unit),
        transaction_type: formData.transaction_type
      });

      refreshData(); // Trigger refresh in other components

      setSnackbar({
        open: true,
        message: 'Transaction added successfully!',
        severity: 'success'
      });
      handleClose();
      resetForm();
      
    } catch (error) {
      console.error('Error adding transaction:', error);
      setSnackbar({
        open: true,
        message: 'Error creating transaction. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{ 
          bgcolor: '#007bff',
          '&:hover': { bgcolor: '#0056b3' }
        }}
      >
        Add Transaction
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Crypto Transaction</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Crypto Ticker"
                value={formData.ticker}
                onChange={handleTickerChange}
                inputProps={{ 
                  style: { textTransform: 'uppercase' } 
                }}
                required
              />
              
              <TextField
                label="Number of Units"
                type="number"
                value={formData.units}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  units: e.target.value 
                })}
                required
              />
              
              <TextField
                label="Price per Unit"
                type="number"
                value={formData.price_per_unit}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  price_per_unit: e.target.value 
                })}
                required
              />
              
              <TextField
                select
                label="Transaction Type"
                value={formData.transaction_type}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  transaction_type: e.target.value 
                })}
                required
              >
                <MenuItem value="BUY">Buy</MenuItem>
                <MenuItem value="SELL">Sell</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              type="submit"
              variant="contained"
              sx={{ 
                bgcolor: '#007bff',
                '&:hover': { bgcolor: '#0056b3' }
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CryptoForm;
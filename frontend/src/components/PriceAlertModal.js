import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert
} from '@mui/material';
import api from '../api';
import { useCurrency } from './CurrencyContext';

const PriceAlertModal = ({ open, onClose, ticker, assetType }) => {
  const [priceTarget, setPriceTarget] = useState('');
  const [triggerCondition, setTriggerCondition] = useState('ABOVE');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Get currency formatting function
  const { selectedCurrency } = useCurrency();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess(false);
    
    // Validate form
    if (!priceTarget || isNaN(parseFloat(priceTarget)) || parseFloat(priceTarget) <= 0) {
      setError('Please enter a valid price target');
      return;
    }
    
    // Prepare data
    const alertData = {
      asset_type: assetType,
      ticker: ticker,
      price_target: parseFloat(priceTarget),
      trigger_condition: triggerCondition
    };
    
    setLoading(true);
    
    try {
      // Create alert
      await api.post('/api/alerts/', alertData);
      setSuccess(true);
      setPriceTarget('');
      setTriggerCondition('ABOVE');
      
   
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating price alert:', error);
      setError(error.response?.data?.detail || 'Failed to create alert');
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    // Reset form
    setPriceTarget('');
    setTriggerCondition('ABOVE');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Create Price Alert for {ticker}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Alert created successfully!</Alert>}
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            You'll receive an email notification when the price condition is met.
          </Typography>
          
          <TextField
            fullWidth
            label={`Price Target (${selectedCurrency})`}
            type="number"
            value={priceTarget}
            onChange={(e) => setPriceTarget(e.target.value)}
            inputProps={{ step: "0.01", min: "0" }}
            margin="normal"
            required
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Trigger Condition</InputLabel>
            <Select
              value={triggerCondition}
              label="Trigger Condition"
              onChange={(e) => setTriggerCondition(e.target.value)}
            >
              <MenuItem value="ABOVE">Price Above Target</MenuItem>
              <MenuItem value="BELOW">Price Below Target</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Alert'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceAlertModal;
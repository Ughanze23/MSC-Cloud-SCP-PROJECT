import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import { Typography, Button, Box, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../api';
import { CryptoProvider, useCrypto } from './CryptoContext';

const CryptoSpecificTransactionsContent = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, transaction: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, transaction: null });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Get context if available, or use a fallback
  const cryptoContext = useCrypto();
  const refreshData = cryptoContext?.refreshData || (() => {
    console.log('Context not available, using local refresh only');
  });

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/api/transactions/crypto/${ticker}/`);
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching transactions for ${ticker}:`, error);
      setError('Failed to load transactions. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [ticker]);

  const handleBack = () => {
    navigate('/crypto');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/transactions/crypto/${editModal.transaction.id}/`, {
        ticker: editModal.transaction.ticker,
        units: parseInt(editModal.transaction.units),
        price_per_unit: parseFloat(editModal.transaction.price_per_unit),
        transaction_type: editModal.transaction.transaction_type
      });
      
      // Try to refresh global context if available
      refreshData();
      
      // Refresh local data
      fetchTransactions();
      
      setSnackbar({
        open: true,
        message: 'Transaction updated successfully!',
        severity: 'success'
      });
      setEditModal({ open: false, transaction: null });
    } catch (error) {
      console.error('Error updating transaction:', error);
      setSnackbar({
        open: true,
        message: 'Error updating transaction',
        severity: 'error'
      });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/transactions/crypto/${deleteModal.transaction.id}/`);
      
      // Try to refresh global context if available
      refreshData();
      
      // Refresh local data
      fetchTransactions();
      
      setSnackbar({
        open: true,
        message: 'Transaction deleted successfully!',
        severity: 'success'
      });
      setDeleteModal({ open: false, transaction: null });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting transaction',
        severity: 'error'
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'transaction_date',
        header: 'Date',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: 'transaction_type',
        header: 'Type',
      },
      {
        accessorKey: 'units',
        header: 'Units',
      },
      {
        accessorKey: 'price_per_unit',
        header: 'Price',
        Cell: ({ cell }) => `$${parseFloat(cell.getValue()).toFixed(2)}`,
      },
      {
        accessorKey: 'id',
        header: 'Transaction ID',
        hidden: true
      },
      {
        header: 'Actions',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => setEditModal({ open: true, transaction: { ...row.original } })}
            >
              Edit
            </Button>
            <Button 
              variant="contained" 
              color="error"
              size="small"
              onClick={() => setDeleteModal({ open: true, transaction: row.original })}
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Portfolio
        </Button>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Portfolio
      </Button>

      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        {ticker} Transactions
      </Typography>

      {transactions.length === 0 ? (
        <Paper sx={{ p: 3 }}>
          <Typography>No transactions found for {ticker}.</Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 2 }}>
          <MaterialReactTable
            columns={columns}
            data={transactions}
            enableSorting
            enableColumnFilters
            initialState={{
              sorting: [
                {
                  id: 'transaction_date',
                  desc: true,
                },
              ],
              columnVisibility: {
                id: false,
              },
            }}
          />
        </Paper>
      )}

      {/* Edit Modal */}
      <Dialog open={editModal.open} onClose={() => setEditModal({ open: false, transaction: null })}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '300px' }}>
              <TextField
                label="Units"
                type="number"
                value={editModal.transaction?.units || ''}
                onChange={(e) => setEditModal(prev => ({
                  ...prev,
                  transaction: { ...prev.transaction, units: e.target.value }
                }))}
                required
              />
              <TextField
                label="Price per Unit"
                type="number"
                value={editModal.transaction?.price_per_unit || ''}
                onChange={(e) => setEditModal(prev => ({
                  ...prev,
                  transaction: { ...prev.transaction, price_per_unit: e.target.value }
                }))}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModal({ open: false, transaction: null })}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal.open} onClose={() => setDeleteModal({ open: false, transaction: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction for {deleteModal.transaction?.ticker}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal({ open: false, transaction: null })}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Wrapper component that ensures the content is wrapped with CryptoProvider
const CryptoSpecificTransactions = () => {
  return (
    <CryptoProvider>
      <CryptoSpecificTransactionsContent />
    </CryptoProvider>
  );
};

export default CryptoSpecificTransactions;
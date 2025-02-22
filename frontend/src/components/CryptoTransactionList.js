import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import api from '../api';
import { useCrypto } from './CryptoContext';

const CryptoTransactionList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({ open: false, transaction: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, transaction: null });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const { refreshTrigger, refreshData } = useCrypto();
  
  const fetchTransactions = async () => {
    try {
      const response = await api.get('/api/crypto/all/');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto transactions:', error);
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'Error fetching crypto transactions',
        severity: 'error'
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/crypto/transactions/${editModal.transaction.id}/`, {
        ticker: editModal.transaction.ticker,
        units: parseInt(editModal.transaction.units),
        price_per_unit: parseFloat(editModal.transaction.price_per_unit),
        transaction_type: editModal.transaction.transaction_type
      });
      
      refreshData(); // Trigger refresh for all components
      
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
      await api.delete(`/api/crypto/transactions/${deleteModal.transaction.id}/`);
      
      refreshData(); // Trigger refresh for all components
      
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
        header: 'Transaction Date',
      },
      {
        accessorKey: 'id',
        header: 'ID',
        hidden: true
      },
      {
        accessorKey: 'ticker',
        header: 'Ticker',
      },
      {
        accessorKey: 'units',
        header: 'Units',
      },
      {
        accessorKey: 'price_per_unit',
        header: 'Price per Unit',
      },
      {
        accessorKey: 'transaction_type',
        header: 'Transaction Type',
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

  return (
    <div style={{ marginTop: '20px' }}>
      <MaterialReactTable 
        columns={columns} 
        data={data} 
        state={{ isLoading: loading ,
          columnVisibility: {
            id: false, 
          },}}
        enableSorting
        enableColumnFilters
      />

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
    </div>
  );
};

export default CryptoTransactionList;
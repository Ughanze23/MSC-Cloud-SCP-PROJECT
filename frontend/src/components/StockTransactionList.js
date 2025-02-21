import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import api from '../api';
import Modal from 'react-modal';

// Set app element for accessibility
Modal.setAppElement('#root');

const StockTransactionList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch transactions from API
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    setLoading(true);
    api.get('/api/transactions/all/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      })
      .finally(() => setLoading(false));
  };

  // Open Edit Modal
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = (event) => {
    event.preventDefault();
    api.put(`/api/transactions/${selectedTransaction.id}/`, selectedTransaction)
      .then(() => {
        fetchTransactions();  // Refresh table after update
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating transaction:', error));
  };

  // Open Delete Confirmation Modal
  const handleDelete = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Transaction
  const confirmDelete = () => {
    api.delete(`/api/transactions/${selectedTransaction.id}/`)
      .then(() => {
        fetchTransactions();  // Refresh table after deletion
        setIsDeleteModalOpen(false);
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  // Define table columns
  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'ticker', header: 'Ticker' },
    { accessorKey: 'units', header: 'Units' },
    { accessorKey: 'price_per_unit', header: 'Price per Unit' },
    { accessorKey: 'transaction_type', header: 'Transaction Type' },
    { accessorKey: 'transaction_date', header: 'Transaction Date' },
    {
      header: 'Actions',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleEdit(row.original)} 
            style={{ backgroundColor: 'orange', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            Edit
          </button>
          <button 
            onClick={() => handleDelete(row.original)} 
            style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <div style={{ marginTop: '20px' }}>
      <MaterialReactTable 
        columns={columns} 
        data={data} 
        state={{ isLoading: loading }}
        enableSorting
        enableColumnFilters
      />

      {/* Edit Transaction Modal */}
      <Modal isOpen={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)} style={modalStyles}>
        <h2>Edit Transaction</h2>
        {selectedTransaction && (
          <form onSubmit={handleEditSubmit}>
            <label>
              Ticker:
              <input 
                type="text" 
                value={selectedTransaction.ticker} 
                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, ticker: e.target.value })}
              />
            </label>
            <label>
              Units:
              <input 
                type="number" 
                value={selectedTransaction.units} 
                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, units: e.target.value })}
              />
            </label>
            <label>
              Price per Unit:
              <input 
                type="number" 
                value={selectedTransaction.price_per_unit} 
                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, price_per_unit: e.target.value })}
              />
            </label>
            <br />
            <button type="submit" style={modalButtonStyle}>Save Changes</button>
            <button type="button" onClick={() => setIsEditModalOpen(false)} style={modalCancelStyle}>Cancel</button>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onRequestClose={() => setIsDeleteModalOpen(false)} style={modalStyles}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this transaction?</p>
        <button onClick={confirmDelete} style={modalButtonStyle}>Yes, Delete</button>
        <button onClick={() => setIsDeleteModalOpen(false)} style={modalCancelStyle}>Cancel</button>
      </Modal>
    </div>
  );
};

// Modal Styling
const modalStyles = {
  content: {
    width: '400px',
    height: 'auto',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
};

const modalButtonStyle = {
  backgroundColor: 'green', 
  color: 'white', 
  padding: '10px 15px', 
  border: 'none', 
  cursor: 'pointer', 
  borderRadius: '4px',
  marginRight: '10px'
};

const modalCancelStyle = {
  backgroundColor: 'gray', 
  color: 'white', 
  padding: '10px 15px', 
  border: 'none', 
  cursor: 'pointer', 
  borderRadius: '4px'
};

export default StockTransactionList;

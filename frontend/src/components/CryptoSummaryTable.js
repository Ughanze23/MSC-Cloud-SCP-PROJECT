import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useCrypto } from './CryptoContext';

const CryptoSummaryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useCrypto();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/crypto/summary/');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Crypto portfolio summary:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  // Use useCallback to memoize the function
  const handleViewTransactions = useCallback((ticker) => {
    navigate(`/crypto/${ticker}`);
  }, [navigate]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'ticker',
        header: 'Ticker',
      },
      {
        accessorKey: 'total_units',
        header: 'Total Units',
      },
      {
        accessorKey: 'average_price',
        header: 'Average Price',
      },
      {
        header: 'Actions',
        Cell: ({ row }) => (
          <Box>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => handleViewTransactions(row.original.ticker)}
            >
              View Transactions
            </Button>
          </Box>
        ),
      },
    ],
    [handleViewTransactions]
  );

  return (
    <div style={{ marginTop: '20px' }}>
      <MaterialReactTable 
        columns={columns} 
        data={data} 
        state={{ isLoading: loading }}
        enableSorting
        enableColumnFilters
      />
    </div>
  );
};

export default CryptoSummaryTable;
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, Box, Tooltip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import api from '../api';
import { useCrypto } from './CryptoContext';
import { useCurrency } from './CurrencyContext';
import PriceAlertModal from './PriceAlertModal';

const CryptoSummaryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useCrypto();
  const navigate = useNavigate();
  
  // Alert modal state
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState('');
  
  // Get currency formatting function and state
  const { formatCurrency, selectedCurrency, usingDefaultRate } = useCurrency();

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
  
  // Handler for opening the alert modal
  const handleOpenAlertModal = useCallback((ticker) => {
    setSelectedTicker(ticker);
    setAlertModalOpen(true);
  }, []);

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
        header: `Average Price (${selectedCurrency})`,
        Cell: ({ cell }) => {
          const formattedPrice = formatCurrency(cell.getValue());
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {formattedPrice}
              {usingDefaultRate && (
                <Tooltip title="Using estimated exchange rate" arrow>
                  <InfoIcon sx={{ ml: 0.5, fontSize: 14, color: 'orange' }} />
                </Tooltip>
              )}
            </Box>
          );
        }
      },
      {
        id: 'total_value',
        header: `Total Value (${selectedCurrency})`,
        accessorFn: (row) => parseFloat(row.total_units) * parseFloat(row.average_price),
        Cell: ({ cell }) => {
          const totalValue = cell.getValue();
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {formatCurrency(totalValue)}
              {usingDefaultRate && (
                <Tooltip title="Using estimated exchange rate" arrow>
                  <InfoIcon sx={{ ml: 0.5, fontSize: 14, color: 'orange' }} />
                </Tooltip>
              )}
            </Box>
          );
        }
      },
      {
        header: 'Actions',
        Cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => handleViewTransactions(row.original.ticker)}
            >
              View Transactions
            </Button>
            <Button 
              variant="outlined" 
              color="secondary"
              size="small"
              startIcon={<NotificationsIcon />}
              onClick={() => handleOpenAlertModal(row.original.ticker)}
            >
              Set Alert
            </Button>
          </Stack>
        ),
      },
    ],
    [handleViewTransactions, handleOpenAlertModal, formatCurrency, selectedCurrency, usingDefaultRate]
  );

  return (
    <div style={{ marginTop: '20px' }}>
      <MaterialReactTable 
        columns={columns} 
        data={data} 
        state={{ isLoading: loading }}
        enableSorting
        enableColumnFilters
        initialState={{
          sorting: [
            {
              id: 'total_value',
              desc: true,
            },
          ],
        }}
      />
      
      {/* Price Alert Modal */}
      <PriceAlertModal 
        open={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        ticker={selectedTicker}
        assetType="CRYPTO"
      />
    </div>
  );
};

export default CryptoSummaryTable;
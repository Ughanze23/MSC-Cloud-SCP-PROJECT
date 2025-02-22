import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import api from '../api';
import { useStock } from './StockContext';

const StockSummaryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useStock();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/transactions/summary/');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock summary:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

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
    ],
    []
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

export default StockSummaryTable;
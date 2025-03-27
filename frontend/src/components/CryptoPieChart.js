import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useCrypto } from './CryptoContext';

// Array of colors to use for pie chart sections
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57', '#FFC658'];

const CryptoPieChart = () => {
  const { refreshTrigger } = useCrypto();
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/crypto/summary/');
        if (response.ok) {
          const data = await response.json();
          
          // Transform data for pie chart
          const chartData = data.map(crypto => ({
            name: crypto.symbol,
            value: parseFloat(crypto.current_value || 0)
          })).filter(item => item.value > 0);
          
          setPieData(chartData);
          
          // Calculate total value
          const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
          setTotalValue(total);
        }
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [refreshTrigger]);
  
  // Custom tooltip to show both value and percentage
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / totalValue) * 100).toFixed(2);
      return (
        <Box sx={{ 
          backgroundColor: 'white', 
          p: 1, 
          border: '1px solid #ccc',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px'
        }}>
          <Typography variant="body2">{`${payload[0].name}: $${payload[0].value.toFixed(2)}`}</Typography>
          <Typography variant="body2">{`${percentage}% of portfolio`}</Typography>
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // If no data, show a message
  if (pieData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No crypto holdings to display
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 300, width: '100%' }}>
      <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>
        Portfolio Allocation
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CryptoPieChart;
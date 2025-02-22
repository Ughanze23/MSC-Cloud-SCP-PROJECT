import React, { createContext, useContext, useState } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <StockContext.Provider value={{ refreshTrigger, refreshData }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);
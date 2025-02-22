import React, { createContext, useContext, useState } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <CryptoContext.Provider value={{ refreshTrigger, refreshData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
import React, { createContext, useContext, useState, useEffect } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [cryptoSummary, setCryptoSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchCryptoSummary = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crypto/summary/');
        if (response.ok) {
          const data = await response.json();
          setCryptoSummary(data);
        } else {
          console.error('Failed to fetch crypto summary');
        }
      } catch (error) {
        console.error('Error fetching crypto summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoSummary();
  }, [refreshTrigger]);

  return (
    <CryptoContext.Provider value={{ 
      refreshTrigger, 
      refreshData, 
      cryptoSummary, 
      isLoading 
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
export { CryptoContext };
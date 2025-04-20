import React, { createContext, useContext, useEffect, useState } from 'react';
import { PriceData, fetchAllPrices, getAllCachedPrices } from '../services/priceService';

interface PriceContextType {
  prices: Map<string, PriceData>;
  loading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
}

const PriceContext = createContext<PriceContextType>({
  prices: new Map(),
  loading: true,
  error: null,
  lastUpdated: null,
});

export const usePrices = () => useContext(PriceContext);

export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<Map<string, PriceData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const updatePrices = async () => {
    try {
      setLoading(true);
      const newPrices = await fetchAllPrices();
      setPrices(newPrices);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch prices'));
      // If there's an error, use cached prices if available
      const cachedPrices = getAllCachedPrices();
      if (cachedPrices.size > 0) {
        setPrices(cachedPrices);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    updatePrices();

    // Set up 15-minute interval for updates
    const interval = setInterval(updatePrices, 15 * 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <PriceContext.Provider value={{ prices, loading, error, lastUpdated }}>
      {children}
    </PriceContext.Provider>
  );
}; 
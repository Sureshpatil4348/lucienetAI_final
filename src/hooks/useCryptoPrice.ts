import { useState, useEffect } from 'react';
import { fetchCryptoPrice, fetchMultipleCryptoPrices, fetchForexPrices, CryptoPrice, ForexPrice } from '@/lib/api';

// Custom hook for fetching a single cryptocurrency price
export const useCryptoPrice = (symbol: string) => {
  const [data, setData] = useState<CryptoPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCryptoPrice(symbol);
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Set up polling for real-time updates (every 5 minutes)
    const intervalId = setInterval(fetchData, 300000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [symbol]);

  return { data, isLoading, error };
};

// Custom hook for fetching multiple cryptocurrency prices
export const useMultipleCryptoPrices = (symbols: string[]) => {
  const [data, setData] = useState<Record<string, CryptoPrice>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const results = await fetchMultipleCryptoPrices(symbols);
        
        if (isMounted) {
          setData(results);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Set up polling for real-time updates (every 5 minutes)
    const intervalId = setInterval(fetchData, 300000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [symbols.join(',')]);

  return { data, isLoading, error };
};

// Custom hook for fetching forex prices
export const useForexPrices = () => {
  const [data, setData] = useState<Record<string, ForexPrice>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const results = await fetchForexPrices();
        
        if (isMounted) {
          setData(results);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Set up polling for real-time updates (every 5 minutes)
    const intervalId = setInterval(fetchData, 300000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return { data, isLoading, error };
}; 
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCryptoPrice, fetchForexPrices, CryptoPrice, ForexPrice, TimeframeData, InstrumentTimeframeData } from '../lib/api';

// Extended interfaces for timeframe analysis
interface TimeframeAnalysis {
  timeframe: string;
  trend: 'up' | 'down' | 'neutral';
  strength: number;
  support: number;
  resistance: number;
  lastUpdated: string;
}

interface MarketDataContextType {
  cryptoPrices: Record<string, CryptoPrice>;
  forexPrices: Record<string, ForexPrice>;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  getTimeframeAnalysis: (symbol: string, timeframe: string) => TimeframeAnalysis | null;
  getTimeframeData: (symbol: string, timeframe: string) => TimeframeData[] | null;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

// Utility functions for timeframe analysis
const calculateMA50 = (data: TimeframeData[]): number => {
  if (data.length < 50) return 0;
  const closes = data.slice(0, 50).map(d => d.close);
  return closes.reduce((a, b) => a + b, 0) / closes.length;
};

const calculateMA200 = (data: TimeframeData[]): number => {
  if (data.length < 200) return 0;
  const closes = data.map(d => d.close);
  return closes.reduce((a, b) => a + b, 0) / closes.length;
};

const calculateTrend = (data: TimeframeData[]): 'up' | 'down' | 'neutral' => {
  if (data.length < 200) return 'neutral';
  
  const currentPrice = data[0].close;
  const ma50 = calculateMA50(data);
  const ma200 = calculateMA200(data);
  
  if (currentPrice > ma50 && currentPrice > ma200) return 'up';
  if (currentPrice < ma50 && currentPrice < ma200) return 'down';
  return 'neutral';
};

const calculateStrength = (data: TimeframeData[]): number => {
  if (data.length < 2) return 0;
  
  const recentData = data.slice(0, 20); // Look at last 20 candles
  const closes = recentData.map(d => d.close);
  const returns = closes.slice(1).map((price, i) => (price - closes[i]) / closes[i]);
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  
  return Math.abs(avgReturn) * 100; // Convert to percentage
};

const calculateSupportResistance = (data: TimeframeData[]): { support: number; resistance: number } => {
  if (data.length < 20) return { support: 0, resistance: 0 };
  
  const recentData = data.slice(0, 20);
  const lows = recentData.map(d => d.low);
  const highs = recentData.map(d => d.high);
  
  return {
    support: Math.min(...lows),
    resistance: Math.max(...highs)
  };
};

export const MarketDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, CryptoPrice>>({});
  const [forexPrices, setForexPrices] = useState<Record<string, ForexPrice>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch current prices only
  const fetchCurrentPrices = async () => {
    try {
      setError(null);

      // Fetch all required crypto prices
      const cryptoPromises = ['BTC', 'ETH', 'XRP', 'SOL'].map(symbol =>
        fetchCryptoPrice(symbol, 'USD', false) // Pass false to skip historical data
      );

      const cryptoResults = await Promise.all(cryptoPromises);
      const newCryptoPrices = cryptoResults.reduce((acc, result) => ({
        ...acc,
        [result.symbol]: result
      }), {} as Record<string, CryptoPrice>);

      // Fetch forex prices
      const forexData = await fetchForexPrices(false); // Pass false to skip historical data

      setCryptoPrices(newCryptoPrices);
      setForexPrices(forexData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // Function to fetch historical data
  const fetchHistoricalData = async () => {
    try {
      setError(null);

      // Fetch all required crypto prices with historical data
      const cryptoPromises = ['BTC', 'ETH', 'XRP', 'SOL'].map(symbol =>
        fetchCryptoPrice(symbol, 'USD', true) // Pass true to include historical data
      );

      const cryptoResults = await Promise.all(cryptoPromises);
      const newCryptoPrices = cryptoResults.reduce((acc, result) => ({
        ...acc,
        [result.symbol]: result
      }), {} as Record<string, CryptoPrice>);

      // Fetch forex prices with historical data
      const forexData = await fetchForexPrices(true); // Pass true to include historical data

      setCryptoPrices(newCryptoPrices);
      setForexPrices(forexData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // Utility function to get timeframe analysis
  const getTimeframeAnalysis = (symbol: string, timeframe: string): TimeframeAnalysis | null => {
    const data = getTimeframeData(symbol, timeframe);
    if (!data || data.length === 0) return null;

    const trend = calculateTrend(data);
    const strength = calculateStrength(data);
    const { support, resistance } = calculateSupportResistance(data);

    return {
      timeframe,
      trend,
      strength,
      support,
      resistance,
      lastUpdated: new Date().toISOString()
    };
  };

  // Utility function to get timeframe data
  const getTimeframeData = (symbol: string, timeframe: string): TimeframeData[] | null => {
    // Check if symbol is a crypto or forex pair
    const isCrypto = symbol.includes('/USD');
    const data = isCrypto ? cryptoPrices[symbol] : forexPrices[symbol];
    
    if (!data || !data.timeframeData) return null;
    return data.timeframeData[timeframe] || null;
  };

  // Initial data fetch
  useEffect(() => {
    const initialFetch = async () => {
      setIsLoading(true);
      await fetchHistoricalData(); // Fetch everything on initial load
      setIsLoading(false);
    };
    initialFetch();
  }, []);

  // Set up intervals for regular updates
  useEffect(() => {
    // Update current prices every 5 minutes
    const priceInterval = setInterval(fetchCurrentPrices, 300000);

    // Update historical data every 15 minutes to avoid rate limits
    const historicalInterval = setInterval(fetchHistoricalData, 900000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(historicalInterval);
    };
  }, []);

  return (
    <MarketDataContext.Provider value={{
      cryptoPrices,
      forexPrices,
      isLoading,
      error,
      refreshData: fetchHistoricalData,
      getTimeframeAnalysis,
      getTimeframeData
    }}>
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (context === undefined) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
}; 
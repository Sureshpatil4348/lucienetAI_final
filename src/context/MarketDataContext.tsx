import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCryptoPrice, fetchForexPrices, CryptoPrice, ForexPrice, TimeframeData, InstrumentTimeframeData } from '../lib/api';

// Extended interfaces for timeframe analysis
interface TimeframeAnalysis {
  timeframe: string;
  trend: "uptrend" | "downtrend" | "sideways";
  signal: "buy" | "sell" | "neutral";
  strength: number;
  support: number;
  resistance: number;
  lastUpdated: string;
}

interface SignalInfo {
  status: string;
  color: string;
  successProbability: number;
}

// Add these constants after the interfaces
const TIMEFRAME_WEIGHTAGES: Record<string, number> = {
  "5min": 5,
  "15min": 10,
  "30min": 10,
  "1hour": 20,
  "4hour": 25,
  "1day": 30
};

interface MarketDataContextType {
  cryptoPrices: Record<string, CryptoPrice>;
  forexPrices: Record<string, ForexPrice>;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  getTimeframeAnalysis: (symbol: string, timeframe: string) => TimeframeAnalysis | null;
  getTimeframeData: (symbol: string, timeframe: string) => TimeframeData[] | null;
  getSignalInfo: (pair: string) => SignalInfo;
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

const calculateTrend = (data: TimeframeData[]): "uptrend" | "downtrend" | "sideways" => {
  if (data.length < 200) return 'sideways';
  
  const currentPrice = data[0].close;
  const ma50 = calculateMA50(data);
  const ma200 = calculateMA200(data);
  
  if (currentPrice > ma50 && currentPrice > ma200) return 'uptrend';
  if (currentPrice < ma50 && currentPrice < ma200) return 'downtrend';
  return 'sideways';
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

const calculateSuccessProbability = (analyses: TimeframeAnalysis[]): number => {
  let uptrendWeight = 0;
  let downtrendWeight = 0;

  analyses.forEach(analysis => {
    const weight = TIMEFRAME_WEIGHTAGES[analysis.timeframe] || 0;
    if (analysis.trend === "uptrend") {
      uptrendWeight += weight;
    } else if (analysis.trend === "downtrend") {
      downtrendWeight += weight;
    }
  });

  return Math.max(uptrendWeight, downtrendWeight);
};

const generateTimeframeAnalysis = (pair: string): TimeframeAnalysis[] => {
  const timeframes = ["5min", "15min", "30min", "1hour", "4hour", "1day"];
  const trends = ["uptrend", "downtrend", "sideways"] as const;
  
  return timeframes.map(timeframe => {
    const trendSeed = (pair.charCodeAt(0) + timeframe.length) % 3;
    const trend = trends[trendSeed];
    
    return {
      timeframe,
      trend,
      signal: trend === "uptrend" ? "buy" : trend === "downtrend" ? "sell" : "neutral",
      strength: Math.random() * 100,
      support: 0,
      resistance: 0,
      lastUpdated: new Date().toISOString()
    };
  });
};

export const MarketDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, CryptoPrice>>({});
  const [forexPrices, setForexPrices] = useState<Record<string, ForexPrice>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframeAnalyses, setTimeframeAnalyses] = useState<Record<string, TimeframeAnalysis[]>>({});

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
      signal: trend === "uptrend" ? "buy" : trend === "downtrend" ? "sell" : "neutral",
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

  // Add this useEffect to generate timeframe analyses
  useEffect(() => {
    if (!isLoading) {
      const analyses: Record<string, TimeframeAnalysis[]> = {};
      const allPairs = [
        ...Object.keys(cryptoPrices).map(symbol => `${symbol}/USD`),
        ...Object.keys(forexPrices)
      ];
      
      allPairs.forEach(pair => {
        analyses[pair] = generateTimeframeAnalysis(pair);
      });
      
      setTimeframeAnalyses(analyses);
    }
  }, [isLoading, cryptoPrices, forexPrices]);

  // Add this function before the return statement
  const getSignalInfo = (pair: string): SignalInfo => {
    if (!timeframeAnalyses[pair]) {
      return { status: "Loading", color: "text-gray-400", successProbability: 0 };
    }
    
    const analyses = timeframeAnalyses[pair];
    const successProbability = calculateSuccessProbability(analyses);
    
    // Calculate weightages for uptrend and downtrend
    let uptrendWeight = 0;
    let downtrendWeight = 0;
    
    analyses.forEach(analysis => {
      const weight = TIMEFRAME_WEIGHTAGES[analysis.timeframe] || 0;
      if (analysis.trend === "uptrend") {
        uptrendWeight += weight;
      } else if (analysis.trend === "downtrend") {
        downtrendWeight += weight;
      }
    });
    
    // Determine base trend based on higher weightage
    let baseTrend: string;
    if (uptrendWeight > downtrendWeight) {
      baseTrend = "Uptrend";
    } else if (downtrendWeight > uptrendWeight) {
      baseTrend = "Downtrend";
    } else {
      baseTrend = "Sideways";
    }
    
    // Add strength based on success probability
    let strength: string;
    if (successProbability > 80) {
      strength = "Strong";
    } else if (successProbability <= 50) {
      strength = "Weak";
    } else {
      strength = ""; // Empty string for normal strength
    }
    
    // Combine trend and strength (only add strength if it's not empty)
    const status = strength ? `${strength} ${baseTrend}` : baseTrend;
    
    // Determine color based on trend and strength
    let color: string;
    if (baseTrend === "Uptrend") {
      color = successProbability > 80 ? "text-green-500" : 
              successProbability > 50 ? "text-green-400" : 
              "text-green-300";
    } else if (baseTrend === "Downtrend") {
      color = successProbability > 80 ? "text-red-500" : 
              successProbability > 50 ? "text-red-400" : 
              "text-red-300";
    } else {
      color = successProbability > 80 ? "text-yellow-500" : 
              successProbability > 50 ? "text-yellow-400" : 
              "text-yellow-300";
    }
    
    return { status, color, successProbability };
  };

  return (
    <MarketDataContext.Provider value={{
      cryptoPrices,
      forexPrices,
      isLoading,
      error,
      refreshData: fetchHistoricalData,
      getTimeframeAnalysis,
      getTimeframeData,
      getSignalInfo
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
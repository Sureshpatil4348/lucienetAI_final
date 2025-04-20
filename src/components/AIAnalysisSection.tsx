import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceData {
  symbol: string;
  price: number;
  timestamp: string;
}

interface TrendAnalysis {
  symbol: string;
  timeframe: string;
  trend: 'up' | 'down' | 'neutral';
  weight: number;
}

const ALPHA_VANTAGE_API_KEY = 'BXTKALNMUIDY2O5G';
const SYMBOLS = ['EURUSD', 'XAUUSD', 'BTCUSD', 'ETHUSD'];
const TIMEFRAMES = [
  { label: '5m', weight: 0.1 },
  { label: '15m', weight: 0.15 },
  { label: '30m', weight: 0.2 },
  { label: '1h', weight: 0.25 },
  { label: '4h', weight: 0.15 },
  { label: '1d', weight: 0.15 },
];

const AIAnalysisSection = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPriceData = async (symbol: string) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol.slice(0,3)}&to_currency=${symbol.slice(3,6)}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      
      const data = response.data['Realtime Currency Exchange Rate'];
      return {
        symbol,
        price: parseFloat(data['5. Exchange Rate']),
        timestamp: data['6. Last Refreshed'],
      };
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      throw error;
    }
  };

  const calculateSuperTrend = (prices: number[], period: number = 10, multiplier: number = 3): 'up' | 'down' | 'neutral' => {
    if (prices.length < period) return 'neutral';
    
    // Basic trend calculation (simplified for example)
    const avg = prices.slice(-period).reduce((a, b) => a + b, 0) / period;
    const current = prices[prices.length - 1];
    const previous = prices[prices.length - 2];
    
    if (current > avg * (1 + multiplier * 0.01)) return 'up';
    if (current < avg * (1 - multiplier * 0.01)) return 'down';
    return 'neutral';
  };

  const analyzeTrends = (symbol: string, prices: number[]) => {
    return TIMEFRAMES.map(({ label, weight }) => ({
      symbol,
      timeframe: label,
      trend: calculateSuperTrend(prices),
      weight,
    }));
  };

  const calculateProbability = (trends: TrendAnalysis[]): number => {
    const weightedSum = trends.reduce((sum, { trend, weight }) => {
      const trendValue = trend === 'up' ? 1 : trend === 'down' ? -1 : 0;
      return sum + trendValue * weight;
    }, 0);
    
    // Convert to probability (0 to 100)
    return (weightedSum + 1) * 50;
  };

  useEffect(() => {
    const fetchAllPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const prices = await Promise.all(SYMBOLS.map(fetchPriceData));
        setPriceData(prices);
        
        // For demo, using current price as historical data
        const mockHistoricalPrices = prices.map(p => Array(20).fill(p.price));
        const allTrends = SYMBOLS.flatMap((symbol, index) => 
          analyzeTrends(symbol, mockHistoricalPrices[index])
        );
        setTrendAnalysis(allTrends);
      } catch (err) {
        setError('Failed to fetch market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPrices();
    const interval = setInterval(fetchAllPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {SYMBOLS.map((symbol) => {
        const symbolData = priceData.find(d => d.symbol === symbol);
        const symbolTrends = trendAnalysis.filter(t => t.symbol === symbol);
        const probability = calculateProbability(symbolTrends);
        
        return (
          <div key={symbol} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{symbol}</h3>
              <span className="text-lg font-medium">
                {symbolData?.price.toFixed(6)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              {symbolTrends.map(({ timeframe, trend }) => (
                <div
                  key={timeframe}
                  className={`p-3 rounded-lg text-center ${
                    trend === 'up'
                      ? 'bg-green-100 text-green-800'
                      : trend === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="font-medium">{timeframe}</div>
                  <div className="text-sm capitalize">{trend}</div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center">
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    probability > 50 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${probability}%` }}
                />
              </div>
              <span className="ml-4 font-medium">
                {probability.toFixed(1)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AIAnalysisSection; 
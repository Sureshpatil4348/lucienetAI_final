import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PriceData {
  timestamp: string;
  price: number;
  superTrend: number;
  atr: number;
  upperBand: number;
  lowerBand: number;
  trend: 'up' | 'down';
}

interface TradingPair {
  symbol: string;
  name: string;
  data: PriceData[];
  probability: number;
  trendStrength: number;
}

const ALPHA_VANTAGE_API_KEY = 'BXTKALNMUIDY2O5G';
const TIME_FRAMES = ['5min', '15min', '30min', '1hour', '4hour', '1day'];
const TRADING_PAIRS = [
  { symbol: 'EURUSD', name: 'EUR/USD' },
  { symbol: 'XAUUSD', name: 'Gold' },
  { symbol: 'BTCUSD', name: 'Bitcoin' },
  { symbol: 'ETHUSD', name: 'Ethereum' }
];

const TIMEFRAME_WEIGHTS = {
  '5min': 0.1,
  '15min': 0.15,
  '30min': 0.2,
  '1hour': 0.25,
  '4hour': 0.15,
  '1day': 0.15
};

const AIAnalysisPage: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('5min');
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateATR = (high: number[], low: number[], close: number[], period: number = 14): number[] => {
    const tr: number[] = [];
    const atr: number[] = [];
    
    // Calculate True Range
    for (let i = 0; i < high.length; i++) {
      if (i === 0) {
        tr[i] = high[i] - low[i];
      } else {
        const hl = high[i] - low[i];
        const hpc = Math.abs(high[i] - close[i - 1]);
        const lpc = Math.abs(low[i] - close[i - 1]);
        tr[i] = Math.max(hl, hpc, lpc);
      }
    }
    
    // Calculate ATR
    for (let i = 0; i < tr.length; i++) {
      if (i < period) {
        atr[i] = tr[i];
      } else {
        atr[i] = (atr[i - 1] * (period - 1) + tr[i]) / period;
      }
    }
    
    return atr;
  };

  const calculateSuperTrend = (
    high: number[],
    low: number[],
    close: number[],
    period: number = 10,
    multiplier: number = 3
  ): PriceData[] => {
    const atr = calculateATR(high, low, close);
    const upperBand: number[] = [];
    const lowerBand: number[] = [];
    const superTrend: number[] = [];
    const trend: ('up' | 'down')[] = [];
    
    // Calculate Bands
    for (let i = 0; i < close.length; i++) {
      const basicUpperBand = (high[i] + low[i]) / 2 + multiplier * atr[i];
      const basicLowerBand = (high[i] + low[i]) / 2 - multiplier * atr[i];
      
      upperBand[i] = i === 0 ? basicUpperBand : 
        basicUpperBand < upperBand[i - 1] || close[i - 1] > upperBand[i - 1] ?
        basicUpperBand : upperBand[i - 1];
      
      lowerBand[i] = i === 0 ? basicLowerBand :
        basicLowerBand > lowerBand[i - 1] || close[i - 1] < lowerBand[i - 1] ?
        basicLowerBand : lowerBand[i - 1];
      
      if (i === 0) {
        superTrend[i] = close[i] > basicUpperBand ? lowerBand[i] : upperBand[i];
        trend[i] = close[i] > basicUpperBand ? 'up' : 'down';
      } else {
        if (superTrend[i - 1] === upperBand[i - 1]) {
          superTrend[i] = close[i] < upperBand[i] ? upperBand[i] : lowerBand[i];
          trend[i] = close[i] < upperBand[i] ? 'down' : 'up';
        } else {
          superTrend[i] = close[i] > lowerBand[i] ? lowerBand[i] : upperBand[i];
          trend[i] = close[i] > lowerBand[i] ? 'up' : 'down';
        }
      }
    }
    
    return close.map((price, i) => ({
      timestamp: '', // Will be filled later
      price,
      superTrend: superTrend[i],
      atr: atr[i],
      upperBand: upperBand[i],
      lowerBand: lowerBand[i],
      trend: trend[i]
    }));
  };

  const calculateProbability = (data: PriceData[]): { probability: number; trendStrength: number } => {
    if (data.length < 2) return { probability: 50, trendStrength: 0 };
    
    // Calculate trend strength based on price position relative to Super Trend
    let upCount = 0;
    let totalCount = 0;
    let trendStrength = 0;
    
    for (let i = 1; i < data.length; i++) {
      const priceDiff = ((data[i].price - data[i].superTrend) / data[i].price) * 100;
      if (data[i].trend === 'up') {
        upCount++;
        trendStrength += priceDiff;
      } else {
        trendStrength -= priceDiff;
      }
      totalCount++;
    }
    
    // Normalize trend strength to 0-100 range
    trendStrength = Math.min(Math.max((trendStrength / totalCount) * 10 + 50, 0), 100);
    
    // Calculate base probability from trend direction
    const baseProbability = (upCount / totalCount) * 100;
    
    // Weight the probability based on trend strength
    const probability = baseProbability * 0.7 + trendStrength * 0.3;
    
    return {
      probability: Math.min(Math.max(probability, 0), 100),
      trendStrength
    };
  };

  const fetchPriceData = async (symbol: string) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${symbol.slice(0,3)}&to_symbol=${symbol.slice(3)}&interval=${selectedTimeFrame}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      
      // Transform the data
      const timeSeries = data[`Time Series FX (${selectedTimeFrame})`];
      const timeSeriesData = Object.entries(timeSeries).map(([timestamp, values]: [string, any]) => ({
        timestamp,
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close'])
      }));
      
      // Prepare arrays for Super Trend calculation
      const high = timeSeriesData.map(d => d.high);
      const low = timeSeriesData.map(d => d.low);
      const close = timeSeriesData.map(d => d.close);
      
      // Calculate Super Trend
      const superTrendData = calculateSuperTrend(high, low, close);
      
      // Combine timestamp with Super Trend data
      const prices = superTrendData.map((std, i) => ({
        ...std,
        timestamp: timeSeriesData[i].timestamp
      }));
      
      // Calculate probability and trend strength
      const { probability, trendStrength } = calculateProbability(prices);

      return {
        symbol,
        name: TRADING_PAIRS.find(p => p.symbol === symbol)?.name || symbol,
        data: prices,
        probability,
        trendStrength
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const results = await Promise.all(
        TRADING_PAIRS.map(pair => fetchPriceData(pair.symbol))
      );
      setTradingPairs(results.filter((r): r is TradingPair => r !== null));
      setLoading(false);
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [selectedTimeFrame]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Market Analysis</h1>
      
      <Tabs defaultValue={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
        <TabsList>
          {TIME_FRAMES.map(tf => (
            <TabsTrigger key={tf} value={tf}>{tf}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {loading ? (
          <p>Loading market data...</p>
        ) : (
          tradingPairs.map(pair => (
            <Card key={pair.symbol} className={pair.data[0]?.trend === 'up' ? 'border-green-500' : 'border-red-500'}>
              <CardHeader>
                <CardTitle>{pair.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <LineChart width={500} height={300} data={pair.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
                    <Line type="monotone" dataKey="superTrend" stroke="#82ca9d" name="Super Trend" />
                    <Line type="monotone" dataKey="upperBand" stroke="#ff7300" name="Upper Band" />
                    <Line type="monotone" dataKey="lowerBand" stroke="#ff7300" name="Lower Band" />
                  </LineChart>
                </div>
                <div className="text-lg">
                  <div>Probability of Upward Movement: {pair.probability.toFixed(2)}%</div>
                  <div>Trend Strength: {pair.trendStrength.toFixed(2)}%</div>
                  <div className={`font-bold ${pair.data[0]?.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    Current Trend: {pair.data[0]?.trend.toUpperCase()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AIAnalysisPage; 
import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = 'BXTKALNMUIDY2O5G';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface PriceData {
  symbol: string;
  price: number;
  timestamp: string;
  change: number;
  changePercent: number;
}

// Cache to store the last fetched prices
const priceCache = new Map<string, PriceData>();

// Function to fetch forex data
async function fetchForexData(fromCurrency: string, toCurrency: string): Promise<PriceData> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: fromCurrency,
        to_currency: toCurrency,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const data = response.data['Realtime Currency Exchange Rate'];
    const currentPrice = parseFloat(data['5. Exchange Rate']);
    const lastPrice = priceCache.get(`${fromCurrency}${toCurrency}`)?.price || currentPrice;
    
    const priceData: PriceData = {
      symbol: `${fromCurrency}/${toCurrency}`,
      price: currentPrice,
      timestamp: data['6. Last Refreshed'],
      change: currentPrice - lastPrice,
      changePercent: ((currentPrice - lastPrice) / lastPrice) * 100,
    };

    priceCache.set(`${fromCurrency}${toCurrency}`, priceData);
    return priceData;
  } catch (error) {
    console.error(`Error fetching forex data for ${fromCurrency}/${toCurrency}:`, error);
    throw error;
  }
}

// Function to fetch crypto data
async function fetchCryptoData(symbol: string): Promise<PriceData> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: symbol,
        to_currency: 'USD',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const data = response.data['Realtime Currency Exchange Rate'];
    const currentPrice = parseFloat(data['5. Exchange Rate']);
    const lastPrice = priceCache.get(`${symbol}USD`)?.price || currentPrice;
    
    const priceData: PriceData = {
      symbol: `${symbol}/USD`,
      price: currentPrice,
      timestamp: data['6. Last Refreshed'],
      change: currentPrice - lastPrice,
      changePercent: ((currentPrice - lastPrice) / lastPrice) * 100,
    };

    priceCache.set(`${symbol}USD`, priceData);
    return priceData;
  } catch (error) {
    console.error(`Error fetching crypto data for ${symbol}:`, error);
    throw error;
  }
}

// Function to fetch commodity data (Gold)
async function fetchGoldData(): Promise<PriceData> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: 'XAU',
        to_currency: 'USD',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const data = response.data['Realtime Currency Exchange Rate'];
    const currentPrice = parseFloat(data['5. Exchange Rate']);
    const lastPrice = priceCache.get('XAUUSD')?.price || currentPrice;
    
    const priceData: PriceData = {
      symbol: 'XAU/USD',
      price: currentPrice,
      timestamp: data['6. Last Refreshed'],
      change: currentPrice - lastPrice,
      changePercent: ((currentPrice - lastPrice) / lastPrice) * 100,
    };

    priceCache.set('XAUUSD', priceData);
    return priceData;
  } catch (error) {
    console.error('Error fetching gold data:', error);
    throw error;
  }
}

// Function to fetch all required prices
export async function fetchAllPrices(): Promise<Map<string, PriceData>> {
  try {
    const [eurUsd, btcUsd, ethUsd, xauUsd] = await Promise.all([
      fetchForexData('EUR', 'USD'),
      fetchCryptoData('BTC'),
      fetchCryptoData('ETH'),
      fetchGoldData(),
    ]);

    const prices = new Map<string, PriceData>();
    prices.set('EURUSD', eurUsd);
    prices.set('BTCUSD', btcUsd);
    prices.set('ETHUSD', ethUsd);
    prices.set('XAUUSD', xauUsd);

    return prices;
  } catch (error) {
    console.error('Error fetching all prices:', error);
    throw error;
  }
}

// Function to get cached price data
export function getCachedPrice(symbol: string): PriceData | undefined {
  return priceCache.get(symbol);
}

// Function to get all cached prices
export function getAllCachedPrices(): Map<string, PriceData> {
  return new Map(priceCache);
} 
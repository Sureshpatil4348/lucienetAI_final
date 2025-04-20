import React from 'react';
import { usePrices } from '../contexts/PriceContext';
import { cn } from '../lib/utils';

interface PriceDisplayProps {
  symbol: string;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ symbol, className }) => {
  const { prices, loading, error, lastUpdated } = usePrices();
  const priceData = prices.get(symbol);

  if (loading && !priceData) {
    return <div className={cn("animate-pulse", className)}>Loading...</div>;
  }

  if (error && !priceData) {
    return <div className={cn("text-red-500", className)}>Error loading price</div>;
  }

  if (!priceData) {
    return <div className={cn("text-gray-500", className)}>No data available</div>;
  }

  const isPositive = priceData.change >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  const changeSign = isPositive ? '+' : '';

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{priceData.symbol}</span>
        <span className="text-xl">{priceData.price.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className={changeColor}>
          {changeSign}{priceData.change.toFixed(2)} ({changeSign}{priceData.changePercent.toFixed(2)}%)
        </span>
        <span className="text-gray-500 text-xs">
          {lastUpdated && `Updated: ${lastUpdated.toLocaleTimeString()}`}
        </span>
      </div>
    </div>
  );
}; 

import React, { useState, useEffect } from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart2, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Play,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Trade {
  id: number;
  pair: string;
  type: "buy" | "sell";
  entry: number;
  current: number;
  profit: number;
  time: string;
  probability: number;
}

const generateTrade = (id: number): Trade => {
  const pairs = ["EUR/USD", "BTC/USD", "ETH/USD", "GBP/JPY", "XRP/USD"];
  const types: ("buy" | "sell")[] = ["buy", "sell"];
  const pair = pairs[Math.floor(Math.random() * pairs.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const isCrypto = pair.includes("BTC") || pair.includes("ETH") || pair.includes("XRP");
  
  let entry = 0;
  if (isCrypto) {
    entry = pair.includes("BTC") ? 
      Math.random() * 10000 + 40000 : 
      pair.includes("ETH") ? 
        Math.random() * 1000 + 2000 : 
        Math.random() * 1 + 0.5;
  } else {
    entry = Math.random() * 1 + 1;
  }
  
  const profitPercent = (Math.random() * 4 - (type === "buy" ? 0.5 : 2)) / 100;
  const current = entry * (1 + profitPercent);
  const profit = type === "buy" ? 
    ((current - entry) / entry) * 100 : 
    ((entry - current) / entry) * 100;
  
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const time = `${hours}h ${minutes}m ago`;
  
  const probability = Math.floor(Math.random() * 30) + 70;

  return {
    id,
    pair,
    type,
    entry: parseFloat(entry.toFixed(isCrypto && !pair.includes("XRP") ? 0 : 4)),
    current: parseFloat(current.toFixed(isCrypto && !pair.includes("XRP") ? 0 : 4)),
    profit: parseFloat(profit.toFixed(2)),
    time,
    probability
  };
};

const TradingInterface = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isAutoTrading, setIsAutoTrading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'analysis'>('active');

  // Generate initial trades
  useEffect(() => {
    const initialTrades = Array.from({ length: 5 }, (_, i) => generateTrade(i + 1));
    setTrades(initialTrades);
    
    // Simulate analysis completion
    const timer = setTimeout(() => {
      setAnalysisComplete(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Update trades periodically
  useEffect(() => {
    if (!isAutoTrading) return;
    
    const interval = setInterval(() => {
      setTrades(prevTrades => {
        // Update existing trades
        const updatedTrades = prevTrades.map(trade => {
          const profitChange = (Math.random() * 0.4 - 0.2) / 100;
          const newCurrent = trade.entry * (1 + (trade.profit / 100) + (trade.type === "buy" ? profitChange : -profitChange));
          const newProfit = trade.type === "buy" ? 
            ((newCurrent - trade.entry) / trade.entry) * 100 : 
            ((trade.entry - newCurrent) / trade.entry) * 100;
          
          return {
            ...trade,
            current: parseFloat(newCurrent.toFixed(trade.pair.includes("XRP") ? 4 : trade.pair.includes("BTC") || trade.pair.includes("ETH") ? 0 : 4)),
            profit: parseFloat(newProfit.toFixed(2)),
            probability: Math.min(99, Math.floor(trade.probability + (Math.random() * 2 - 0.8)))
          };
        });
        
        // Occasionally add new trade
        if (Math.random() > 0.7 && prevTrades.length < 10) {
          updatedTrades.push(generateTrade(Math.max(...prevTrades.map(t => t.id)) + 1));
        }
        
        return updatedTrades;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoTrading]);

  return (
    <div className="bg-lucent-deep-blue border border-white/10 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
        <div>
          <h3 className="text-white font-semibold text-lg">Master Trader AI</h3>
          <p className="text-gray-400 text-sm">AI-driven trade monitoring and control</p>
        </div>
        <div className="flex items-center">
          <div className="mr-4 flex items-center">
            <div className={`h-2 w-2 rounded-full mr-2 ${isAutoTrading ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
            <span className="text-sm text-gray-400">
              {isAutoTrading ? 'Auto-Trading On' : 'Monitoring Mode'}
            </span>
          </div>
          <Button 
            variant="outline" 
            className={`border-white/20 ${isAutoTrading ? 'hover:bg-red-500/20 hover:text-red-400' : 'hover:bg-green-500/20 hover:text-green-400'}`}
            onClick={() => setIsAutoTrading(!isAutoTrading)}
          >
            {isAutoTrading ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white/5 border-b border-white/10">
        <div className="flex">
          <button 
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'active' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('active')}
          >
            Active Trades
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lucent-purple"></div>}
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'history' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('history')}
          >
            Trade History
            {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lucent-purple"></div>}
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'analysis' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('analysis')}
          >
            AI Analysis
            {activeTab === 'analysis' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lucent-purple"></div>}
          </button>
        </div>
      </div>
      
      {/* Active Trades */}
      {activeTab === 'active' && (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left pb-3">Pair</th>
                  <th className="text-left pb-3">Type</th>
                  <th className="text-right pb-3">Entry</th>
                  <th className="text-right pb-3">Current</th>
                  <th className="text-right pb-3">Profit %</th>
                  <th className="text-right pb-3">Time</th>
                  <th className="text-right pb-3">AI Success Probability</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-white">{trade.pair}</td>
                    <td className={`py-3 ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                      {trade.type === 'buy' ? (
                        <>
                          BUY <ArrowUpRight size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          SELL <ArrowDownRight size={16} className="ml-1" />
                        </>
                      )}
                    </td>
                    <td className="py-3 text-right text-gray-300">{trade.entry.toLocaleString()}</td>
                    <td className="py-3 text-right text-white">{trade.current.toLocaleString()}</td>
                    <td className={`py-3 text-right ${trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit}%
                    </td>
                    <td className="py-3 text-right text-gray-400">{trade.time}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end">
                        <div className="w-20 bg-white/10 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              trade.probability > 85 ? 'bg-green-500' : 
                              trade.probability > 75 ? 'bg-yellow-500' : 'bg-orange-500'
                            }`} 
                            style={{ width: `${trade.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-white">{trade.probability}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Trade History Tab (Simple placeholder) */}
      {activeTab === 'history' && (
        <div className="p-6 text-center text-gray-400">
          <Clock size={32} className="mx-auto mb-2 opacity-50" />
          <p>Trade history will appear here</p>
        </div>
      )}
      
      {/* AI Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-white font-medium mb-2">Market Sentiment Analysis</h4>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              {analysisComplete ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">EUR/USD</span>
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-white/10 rounded-full mr-2">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-yellow-500">Neutral</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">BTC/USD</span>
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-white/10 rounded-full mr-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '82%' }}></div>
                      </div>
                      <span className="text-green-500">Bullish</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">ETH/USD</span>
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-white/10 rounded-full mr-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '77%' }}></div>
                      </div>
                      <span className="text-green-500">Bullish</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">GBP/JPY</span>
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-white/10 rounded-full mr-2">
                        <div className="h-2 rounded-full bg-red-500" style={{ width: '68%' }}></div>
                      </div>
                      <span className="text-red-500">Bearish</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <div className="w-6 h-6 border-2 border-lucent-purple border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-gray-400">Analyzing market trends...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <TrendingUp size={16} className="mr-2 text-lucent-purple" />
                Trend Predictions (24h)
              </h4>
              {analysisComplete ? (
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle size={16} className="mr-2 text-green-500" />
                    BTC expected to continue upward trend
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle size={16} className="mr-2 text-green-500" />
                    ETH/USD support level at 2,150
                  </li>
                  <li className="flex items-center text-gray-300">
                    <AlertCircle size={16} className="mr-2 text-yellow-500" />
                    EUR/USD shows mixed signals
                  </li>
                </ul>
              ) : (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              )}
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <BarChart2 size={16} className="mr-2 text-lucent-purple" />
                Risk Assessment
              </h4>
              {analysisComplete ? (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Overall Market Risk</span>
                      <span className="text-yellow-500">Medium</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Volatility Index</span>
                      <span className="text-green-500">Low</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <div className="h-4 bg-white/10 rounded w-1/3"></div>
                      <div className="h-4 bg-white/10 rounded w-16"></div>
                    </div>
                    <div className="h-2 bg-white/10 rounded w-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <div className="h-4 bg-white/10 rounded w-1/3"></div>
                      <div className="h-4 bg-white/10 rounded w-16"></div>
                    </div>
                    <div className="h-2 bg-white/10 rounded w-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingInterface;

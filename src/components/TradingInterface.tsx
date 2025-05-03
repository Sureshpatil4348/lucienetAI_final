import React, { useState, useEffect } from "react";
import { 
  BarChart2, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
  Layers,
  ArrowUpDown,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Activity
} from "lucide-react";
import { useMarketData } from "@/context/MarketDataContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Trade {
  id: number;
  pair: string;
  type: "buy" | "sell";
  entry: number;
  current: number;
  profit: number;
  time: string;
  probability: number;
  marketCap?: string;  // For crypto only
  volume24h?: string;  // Trading volume
  category: "crypto" | "forex";
}

interface TimeframeAnalysis {
  timeframe: string;
  trend: "uptrend" | "downtrend" | "sideways";
  signal: "buy" | "sell" | "neutral";
}

// Add timeframe weightages constant after the TimeframeAnalysis interface
const TIMEFRAME_WEIGHTAGES: Record<string, number> = {
  "5min": 5,
  "15min": 10,
  "30min": 10,
  "1hour": 20,
  "4hour": 25,
  "1day": 30
};

// Add success probability calculation function after TIMEFRAME_WEIGHTAGES
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

// Function to generate timeframe analysis for a trading pair
const generateTimeframeAnalysis = (pair: string): TimeframeAnalysis[] => {
  const timeframes = ["5min", "15min", "30min", "1hour", "4hour", "1day"];
  const trends = ["uptrend", "downtrend", "sideways"] as const;
  const signals = ["buy", "sell", "neutral"] as const;
  
  const analyses = timeframes.map(timeframe => {
    // Generate random trend, but with some consistency
    const trendSeed = (pair.charCodeAt(0) + timeframe.length) % 3;
    const trend = trends[trendSeed];
    
    // Signal based on trend
    let signal: "buy" | "sell" | "neutral";
    if (trend === "uptrend") {
      signal = "buy";
    } else if (trend === "downtrend") {
      signal = "sell";
    } else {
      signal = "neutral";
    }
    
    return {
      timeframe,
      trend,
      signal
    };
  });

  return analyses;
};

const generateTrade = (
  id: number, 
  cryptoPrices: Record<string, any> = {}, 
  forexPrices: Record<string, any> = {}
): Trade => {
  const cryptoPairs = ["BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD"];
  const forexPairs = ["EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD"];
  
  // Decide if this trade will be crypto or forex
  const category: "crypto" | "forex" = Math.random() > 0.5 ? "crypto" : "forex";
  
  // Select appropriate pair list based on category
  const pairs = category === "crypto" ? cryptoPairs : forexPairs;
  const pair = pairs[Math.floor(Math.random() * pairs.length)];
  
  const types: ("buy" | "sell")[] = ["buy", "sell"];
  const type = types[Math.floor(Math.random() * types.length)];
  
  let entry = 0;
  let current = 0;
  let probability = 0;
  
  if (category === "crypto") {
    const symbol = pair.split("/")[0];
    
    if (cryptoPrices && cryptoPrices[symbol]) {
      // Use real-time price as current price
      current = cryptoPrices[symbol].price;
      // Generate a realistic entry price based on current price
      const randomVariance = (Math.random() * 0.05 - 0.025); // +/- 2.5%
      entry = current * (1 - randomVariance);
      // Use the success probability from API if available
      probability = cryptoPrices[symbol].successProbability || Math.floor(Math.random() * 20) + 80;
    } else {
      // Fallback if no prices available
      const fallbackPrices: Record<string, number> = {
        'BTC': 48632.75,
        'ETH': 3295.84,
        'XRP': 0.58,
        'SOL': 135.92
      };
      
      const symbol = pair.split("/")[0];
      
      entry = fallbackPrices[symbol] || 100.00;
      const profitPercent = (Math.random() * 4 - (type === "buy" ? 0.5 : 2)) / 100;
      current = entry * (1 + profitPercent);
      probability = Math.floor(Math.random() * 20) + 80; // 80-99%
    }
  } else {
    // Forex pairs
    if (forexPrices && forexPrices[pair]) {
      current = forexPrices[pair].price;
      const randomVariance = (Math.random() * 0.02 - 0.01); // +/- 1.0%
      entry = current * (1 - randomVariance);
      probability = forexPrices[pair].successProbability || Math.floor(Math.random() * 20) + 80;
    } else {
      // Fallback for forex
      const fallbackPrices: Record<string, number> = {
        'EUR/USD': 1.0765,
        'GBP/USD': 1.2634,
        'USD/JPY': 156.78,
        'XAU/USD': 2341.50
      };
      
      entry = fallbackPrices[pair] || 1.0000;
      const profitPercent = (Math.random() * 2 - (type === "buy" ? 0.5 : 1)) / 100;
      current = entry * (1 + profitPercent);
      probability = Math.floor(Math.random() * 20) + 80; // 80-99%
    }
  }
  
  // Calculate profit percentage
  const profit = type === "buy" ? 
    ((current - entry) / entry) * 100 : 
    ((entry - current) / entry) * 100;
  
  // Generate random time
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const time = `${hours}h ${minutes}m ago`;
  
  // Additional metrics for crypto
  let marketCap, volume24h;
  if (category === "crypto") {
    const symbol = pair.split("/")[0];
    switch(symbol) {
      case "BTC":
        marketCap = "$922.4B";
        volume24h = "$28.7B";
        break;
      case "ETH":
        marketCap = "$395.8B";
        volume24h = "$14.3B";
        break;
      case "XRP":
        marketCap = "$31.2B";
        volume24h = "$1.8B";
        break;
      case "SOL":
        marketCap = "$57.8B";
        volume24h = "$3.4B";
        break;
      default:
        marketCap = "$5B+";
        volume24h = "$0.5B+";
    }
  }

  return {
    id,
    pair,
    type,
    entry: parseFloat(entry.toFixed(2)),
    current: parseFloat(current.toFixed(2)),
    profit: parseFloat(profit.toFixed(2)),
    time,
    probability,
    marketCap,
    volume24h,
    category
  };
};

const TradingInterface = () => {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedPair, setSelectedPair] = useState("BTC/USD");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "crypto" | "forex">("all");
  const [timeframeAnalyses, setTimeframeAnalyses] = useState<Record<string, TimeframeAnalysis[]>>({});
  
  // Use the market data context instead of direct API calls
  const { cryptoPrices, forexPrices, isLoading, error } = useMarketData();

  // Define pairs
  const cryptoPairs = ["BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD"];
  const forexPairs = ["EUR/USD", "GBP/USD", "XAU/USD", "USD/JPY"];
  const allPairs = [...cryptoPairs, ...forexPairs];
  
  const displayPairs = selectedCategory === "all" 
    ? allPairs 
    : selectedCategory === "crypto" 
      ? cryptoPairs 
      : forexPairs;

  // Generate timeframe analyses for all pairs
  useEffect(() => {
    if (!isLoading) {
      const analyses: Record<string, TimeframeAnalysis[]> = {};
      
      allPairs.forEach(pair => {
        analyses[pair] = generateTimeframeAnalysis(pair);
      });
      
      setTimeframeAnalyses(analyses);
      setAnalysisComplete(true);
    } else {
      // Set a timeout for loading simulation
      const timer = setTimeout(() => {
        const analyses: Record<string, TimeframeAnalysis[]> = {};
        
        allPairs.forEach(pair => {
          analyses[pair] = generateTimeframeAnalysis(pair);
        });
        
        setTimeframeAnalyses(analyses);
        setAnalysisComplete(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Update the getOverallTrend function to use weightage for trend determination
  const getOverallTrend = (pair: string): { status: string; color: string } => {
    if (!timeframeAnalyses[pair]) return { status: "Loading", color: "text-gray-400" };
    
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
    
    return { status, color };
  };

  // Function to get price, change and other details for a pair
  const getPairDetails = (pair: string) => {
    if (pair.includes("BTC") && cryptoPrices?.BTC) {
      return {
        price: cryptoPrices.BTC.price,
        percentChange: cryptoPrices.BTC.percentChange,
        marketCap: "$922.4B",
        volume: "$28.7B"
      };
    } else if (pair.includes("ETH") && cryptoPrices?.ETH) {
      return {
        price: cryptoPrices.ETH.price,
        percentChange: cryptoPrices.ETH.percentChange,
        marketCap: "$395.8B",
        volume: "$14.3B"
      };
    } else if (pair.includes("XRP") && cryptoPrices?.XRP) {
      return {
        price: cryptoPrices.XRP.price,
        percentChange: cryptoPrices.XRP.percentChange,
        marketCap: "$31.2B",
        volume: "$1.8B"
      };
    } else if (pair.includes("SOL") && cryptoPrices?.SOL) {
      return {
        price: cryptoPrices.SOL.price,
        percentChange: cryptoPrices.SOL.percentChange,
        marketCap: "$57.8B",
        volume: "$3.4B"
      };
    } else if (pair.includes("EUR/USD") && forexPrices?.["EUR/USD"]) {
      return {
        price: forexPrices["EUR/USD"].price,
        percentChange: forexPrices["EUR/USD"].percentChange
      };
    } else if (pair.includes("GBP/USD") && forexPrices?.["GBP/USD"]) {
      return {
        price: forexPrices["GBP/USD"].price,
        percentChange: forexPrices["GBP/USD"].percentChange
      };
    } else if (pair.includes("USD/JPY") && forexPrices?.["USD/JPY"]) {
      return {
        price: forexPrices["USD/JPY"].price,
        percentChange: forexPrices["USD/JPY"].percentChange
      };
    } else if (pair.includes("XAU/USD") && forexPrices?.["XAU/USD"]) {
      return {
        price: forexPrices["XAU/USD"].price,
        percentChange: forexPrices["XAU/USD"].percentChange
      };
    }
    
    // Default fallback values
    return {
      price: pair.includes("/") ? 1.0000 : 100.00,
      percentChange: 0.00
    };
  };

  // Function to get appropriate color for trend
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "uptrend": return "text-green-500";
      case "downtrend": return "text-red-500";
      case "sideways": return "text-yellow-500";
      default: return "text-gray-400";
    }
  };

  // Function to get appropriate color for signal
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "buy": return "text-green-500";
      case "sell": return "text-red-500";
      case "neutral": return "text-yellow-500";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="bg-lucent-deep-blue border border-white/10 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-lucent-deep-blue to-lucent-navy p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
            <Cpu className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Master Trader AI</h3>
            <p className="text-gray-400 text-xs">Advanced multi-timeframe analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            <div className="h-2 w-2 rounded-full mr-2 bg-green-500 animate-pulse"></div>
            Live Analysis
          </Badge>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-4">
        {/* Category selectors */}
        <div className="flex mb-4 gap-2">
          <Badge 
            variant={selectedCategory === "all" ? "default" : "outline"} 
            className={`cursor-pointer ${selectedCategory === "all" ? "bg-purple-500" : "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Pairs
          </Badge>
          <Badge 
            variant={selectedCategory === "crypto" ? "default" : "outline"} 
            className={`cursor-pointer ${selectedCategory === "crypto" ? "bg-blue-500" : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"}`}
            onClick={() => setSelectedCategory("crypto")}
          >
            Crypto
          </Badge>
          <Badge 
            variant={selectedCategory === "forex" ? "default" : "outline"} 
            className={`cursor-pointer ${selectedCategory === "forex" ? "bg-cyan-500" : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"}`}
            onClick={() => setSelectedCategory("forex")}
          >
            Forex
          </Badge>
        </div>
        
        {/* Pair cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {displayPairs.map(pair => {
            const details = getPairDetails(pair);
            const overallTrend = getOverallTrend(pair);
            const isSelected = selectedPair === pair;
            const analyses = timeframeAnalyses[pair] || [];
            const successProbability = calculateSuccessProbability(analyses);
            
            return (
              <div 
                key={pair}
                className={`${isSelected ? 'ring-2 ring-purple-500 bg-white/10' : 'bg-white/5 hover:bg-white/10'} border border-white/10 rounded-lg p-3 cursor-pointer transition-all`}
                onClick={() => setSelectedPair(pair)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className={`bg-${pair.includes('/') ? 'cyan' : 'blue'}-500/20 text-${pair.includes('/') ? 'cyan' : 'blue'}-400 w-8 h-8 rounded-full flex items-center justify-center mr-2`}>
                      {pair.split('/')[0].charAt(0)}
                    </span>
                    <div>
                      <span className="text-white font-medium">{pair}</span>
                      <div className="flex items-center mt-0.5">
                        <span className={`text-xs ${overallTrend.color}`}>{overallTrend.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {pair.includes("XAU") ? "$" : pair.includes("/") ? "" : "$"}
                      {typeof details.price === 'number' ? 
                        details.price.toFixed(2) : 'N/A'}
                    </div>
                    <div className={`text-xs flex items-center justify-end ${details.percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {details.percentChange >= 0 ? '+' : ''}{typeof details.percentChange === 'number' ? details.percentChange.toFixed(2) : 0}%
                      {details.percentChange >= 0 ? 
                        <ArrowUpRight className="h-3 w-3 ml-1" /> : 
                        <ArrowDownRight className="h-3 w-3 ml-1" />
                      }
                    </div>
                  </div>
                </div>
                
                {/* Update Success probability section */}
                <div className="mt-3 mb-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Success Probability</span>
                    <span className="text-white">
                      {successProbability}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${
                        successProbability > 80 ? 'bg-green-500' :
                        successProbability > 50 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${successProbability}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Selected pair detailed analysis */}
        {selectedPair && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h4 className="text-white font-medium text-lg mr-2">{selectedPair} Analysis</h4>
                <Badge variant="outline" className={`${getOverallTrend(selectedPair).color.replace('text-', 'bg-')}/20 ${getOverallTrend(selectedPair).color} border-0`}>
                  {getOverallTrend(selectedPair).status}
                </Badge>
              </div>
              
              <div className="text-xs text-gray-400">
                Updated: Just now
              </div>
            </div>
            
            {/* Timeframe analysis table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-2 text-gray-400 font-medium">Timeframe</th>
                    <th className="pb-2 text-gray-400 font-medium">Trend</th>
                    <th className="pb-2 text-gray-400 font-medium">Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisComplete && timeframeAnalyses[selectedPair] ? (
                    timeframeAnalyses[selectedPair].map((analysis, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 text-white">{analysis.timeframe}</td>
                        <td className="py-3">
                          <span className={`${getTrendColor(analysis.trend)} flex items-center`}>
                            {analysis.trend === "uptrend" ? (
                              <>
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                Uptrend
                              </>
                            ) : analysis.trend === "downtrend" ? (
                              <>
                                <ArrowDownRight className="h-4 w-4 mr-1" />
                                Downtrend
                              </>
                            ) : (
                              <>
                                <ArrowUpDown className="h-4 w-4 mr-1" />
                                Sideways
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-3">
                          <Badge
                            variant="outline"
                            className={`
                              ${analysis.signal === "buy" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                analysis.signal === "sell" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}
                            `}
                          >
                            {analysis.signal.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    Array.from({ length: 6 }).map((_, index) => (
                      <tr key={index} className="border-b border-white/5">
                        <td className="py-3">
                          <div className="h-4 bg-white/10 rounded w-16 animate-pulse"></div>
                        </td>
                        <td className="py-3">
                          <div className="h-4 bg-white/10 rounded w-24 animate-pulse"></div>
                        </td>
                        <td className="py-3">
                          <div className="h-6 bg-white/10 rounded w-16 animate-pulse"></div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Market insights for selected pair */}
            <div className="mt-6">
              <h5 className="text-white font-medium mb-3 flex items-center">
                <Activity size={16} className="mr-2 text-purple-400" />
                Key Insights for {selectedPair}
              </h5>
              
              {analysisComplete ? (
                <div className="space-y-3">
                  {selectedPair.includes("BTC") && (
                    <>
                      <div className="flex space-x-2 text-sm">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        </div>
                        <p className="text-gray-300">
                          Strong institutional inflows continue to support price above $48,000
                        </p>
                      </div>
                      <div className="flex space-x-2 text-sm">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <AlertCircle className="h-3 w-3 text-yellow-500" />
                        </div>
                        <p className="text-gray-300">
                          Watch key resistance at $50,000 for potential breakout
                        </p>
                      </div>
                    </>
                  )}
                  
                  {selectedPair.includes("ETH") && (
                    <>
                      <div className="flex space-x-2 text-sm">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        </div>
                        <p className="text-gray-300">
                          Network activity increasing ahead of upcoming protocol upgrade
                        </p>
                      </div>
                      <div className="flex space-x-2 text-sm">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        </div>
                        <p className="text-gray-300">
                          ETH staking rate continues to climb, reducing available supply
                        </p>
                      </div>
                    </>
                  )}
                  
                  {selectedPair.includes("XRP") && (
                    <div className="flex space-x-2 text-sm">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-gray-300">
                        XRP showing breakout potential as legal clarity improves
                      </p>
                    </div>
                  )}
                  
                  {selectedPair.includes("SOL") && (
                    <div className="flex space-x-2 text-sm">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-gray-300">
                        SOL ecosystem expansion driving increased adoption and demand
                      </p>
                    </div>
                  )}
                  
                  {selectedPair.includes("EUR/USD") && (
                    <div className="flex space-x-2 text-sm">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <AlertCircle className="h-3 w-3 text-yellow-500" />
                      </div>
                      <p className="text-gray-300">
                        EUR/USD showing mixed signals ahead of ECB policy announcement
                      </p>
                    </div>
                  )}
                  
                  {selectedPair.includes("GBP/USD") && (
                    <div className="flex space-x-2 text-sm">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-gray-300">
                        GBP gaining strength on positive economic data from UK
                      </p>
                    </div>
                  )}
                  
                  {selectedPair.includes("USD/JPY") && (
                    <div className="flex space-x-2 text-sm">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <AlertCircle className="h-3 w-3 text-yellow-500" />
                      </div>
                      <p className="text-gray-300">
                        USD/JPY approaching key resistance level at 157.50
                      </p>
                    </div>
                  )}
                  
                  {selectedPair.includes("XAU/USD") && (
                    <div className="flex space-x-2 text-sm">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-gray-300">
                        Gold continuing uptrend amid global economic uncertainty
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  <div className="h-4 bg-white/10 rounded w-4/5"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingInterface;

import React from "react";
import { 
  LineChart, 
  BrainCircuit, 
  ShieldCheck, 
  Clock, 
  Zap, 
  BarChart3, 
  Rocket,
  ChevronRight,
  BarChart4,
  TrendingUp,
  Target,
  BadgePercent,
  ArrowUpRight,
  TimerReset,
  Layers,
  Database,
  BarChartHorizontal,
  ListFilter,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedChart from "./AnimatedChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Performance comparison data
const performanceData = {
  pinaxa: {
    yearly: 37.8,
    monthly: 3.15,
    sharpeRatio: 2.8,
    maxDrawdown: 8.5,
    winRate: 78.4
  },
  eurekahedge: {
    yearly: 3.1,
    monthly: 0.77,
    sharpeRatio: 0,
    maxDrawdown: 14.7,
    winRate: 61.2
  },
  spx: {
    yearly: 12.4,
    monthly: 1.03,
    sharpeRatio: 0.8,
    maxDrawdown: 21.3,
    winRate: 58.7
  }
};

const FeaturesOverview = () => {
  return (
    <div className="py-14 bg-lucent-navy relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Meet the <span className="gradient-text">Master Trader AI</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Our proprietary AI-driven platform that delivers unparalleled trading performance through advanced predictive analytics and real-time market intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              AI-Driven Trading Performance
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Pinaxa Labs consistently outperforms industry benchmarks including the Eurekahedge FX Fund by leveraging sophisticated artificial intelligence algorithms that analyze real-time market data across multiple timeframes.
            </p>
            
            <ul className="space-y-6 mb-8">
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-10 w-10 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <BrainCircuit className="h-5 w-5 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg mb-1">Adaptive Neural Architecture</h4>
                  <p className="text-gray-400">
                    Our proprietary deep learning model continuously evolves with market conditions, identifying complex patterns invisible to traditional algorithms and human traders.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-10 w-10 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg mb-1">Multi-Timeframe Analysis</h4>
                  <p className="text-gray-400">
                    Simultaneous analysis across 6 different timeframes (5min to daily) with proprietary signal confluence technology to identify high-probability trade opportunities.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-10 w-10 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg mb-1">Adaptive Risk Management</h4>
                  <p className="text-gray-400">
                    Dynamic position sizing and drawdown protection with real-time volatility adjustment that safeguards capital during market turbulence.
                  </p>
                </div>
              </li>
            </ul>
            
            <Button 
              className="bg-lucent-purple hover:bg-lucent-purple/90 text-white font-medium py-2 px-4"
              onClick={() => window.location.href = '/technology'}
            >
              Explore Advanced Features <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-lucent-deep-blue border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h4 className="text-xl font-semibold">Performance Comparison</h4>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <div className="h-2 w-2 rounded-full mr-2 bg-green-500 animate-pulse"></div>
                Outperforming Market
              </Badge>
            </div>
            
            <Tabs defaultValue="yearly" className="w-full p-6">
              <TabsList className="mb-4 grid grid-cols-3 bg-white/5">
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
                <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                <TabsTrigger value="comparison">Benchmark</TabsTrigger>
              </TabsList>
              
              <TabsContent value="yearly" className="space-y-4">
                <div className="text-sm text-gray-400 mb-4">
                  Annualized Return Comparison (Last 1 Year)
            </div>
            <div className="h-64">
              <AnimatedChart 
                height={250}
                color="#8B5CF6"
              />
            </div>
                <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-white/10">
                  <div>
                    <div className="flex items-center mb-1">
                <div className="h-3 w-3 rounded-full bg-lucent-purple mr-2"></div>
                <span className="text-sm text-white">Pinaxa Labs</span>
              </div>
                    <div className="text-green-400 font-bold text-2xl">+{performanceData.pinaxa.yearly}%</div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm text-white">Eurekahedge FX</span>
                    </div>
                    <div className="text-green-400 font-medium text-lg">+{performanceData.eurekahedge.yearly}%</div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="h-3 w-3 rounded-full bg-gray-500 mr-2"></div>
                      <span className="text-sm text-white">S&P 500</span>
                    </div>
                    <div className="text-green-400 font-medium text-lg">+{performanceData.spx.yearly}%</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="pt-1">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Sharpe Ratio</span>
                      <div className="flex space-x-4">
                        <span className="text-white font-medium">{performanceData.pinaxa.sharpeRatio}</span>
                        
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="h-2 rounded-full bg-lucent-purple" style={{ width: `${(performanceData.pinaxa.sharpeRatio / 3) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Win Rate</span>
                      <div className="flex space-x-4">
                        <span className="text-white font-medium">{performanceData.pinaxa.winRate}%</span>
                        
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${performanceData.pinaxa.winRate}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Max Drawdown</span>
                      <div className="flex space-x-4">
                        <span className="text-white font-medium">-{performanceData.pinaxa.maxDrawdown}%</span>
                        
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: `${performanceData.pinaxa.maxDrawdown * 1.5}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Monthly Return</span>
                      <div className="flex space-x-4">
                        <span className="text-white font-medium">+{performanceData.pinaxa.monthly}%</span>
                        
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${performanceData.pinaxa.monthly * 15}%` }}></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="comparison">
                <div className="space-y-4 mb-4">
                  <div className="text-sm text-gray-400 mb-2">
                    Outperformance vs Eurekahedge FX Fund
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <BadgePercent className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium">Annual Performance</h5>
                        <p className="text-gray-400 text-xs">Annualized returns over benchmark</p>
                      </div>
                    </div>
                    <div className="text-green-400 text-xl font-bold">
                      +{(performanceData.pinaxa.yearly - performanceData.eurekahedge.yearly).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium">Lower Drawdown</h5>
                        <p className="text-gray-400 text-xs">Reduced maximum portfolio loss</p>
                      </div>
                    </div>
                    <div className="text-green-400 text-xl font-bold">
                      -{(performanceData.eurekahedge.maxDrawdown - performanceData.pinaxa.maxDrawdown).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium">Improved Sharpe Ratio</h5>
                        <p className="text-gray-400 text-xs">we have a shape Ratio above 1</p>
                      </div>
                    </div>
                    <div className="text-green-400 text-xl font-bold">
                      +{(performanceData.pinaxa.sharpeRatio - performanceData.eurekahedge.sharpeRatio).toFixed(1)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium">Improved Win Rate</h5>
                        <p className="text-gray-400 text-xs">we have a win rate above 75%</p>
                      </div>
                    </div>
                    <div className="text-green-400 text-xl font-bold">
                      +{(performanceData.pinaxa.winRate - performanceData.eurekahedge.winRate).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium">Lower Drawdown</h5>
                        <p className="text-gray-400 text-xs">we have a lower drawdown than competitors</p>
                      </div>
                    </div>
                    <div className="text-green-400 text-xl font-bold">
                      -{(performanceData.eurekahedge.maxDrawdown - performanceData.pinaxa.maxDrawdown).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium">Higher Monthly Return</h5>
                        <p className="text-gray-400 text-xs">we have a higher monthly return than competitors</p>
                      </div>
                    </div>
                    <div className="text-green-400 text-xl font-bold">
                      +{(performanceData.pinaxa.monthly - performanceData.eurekahedge.monthly).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Advanced Features Grid - Redesigned */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
              <Cpu className="h-3 w-3 mr-1.5" />
              Proprietary Technology
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
              Advanced Trading Intelligence
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our proprietary AI trading model incorporates multiple adaptive technologies to deliver 
              superior market performance across diverse market conditions.
            </p>
          </div>
          
          {/* Hexagonal grid layout for features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* Background animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-3xl blur-xl -z-10"></div>
            
            {/* Feature 1 - Deep Market Data Analysis */}
            <div className="bg-gradient-to-br from-lucent-deep-blue to-lucent-deep-blue/80 border border-white/10 rounded-xl overflow-hidden shadow-xl group hover:shadow-purple-500/20 hover:border-purple-500/20 transition-all duration-300 isolate">
              <div className="p-6">
                <div className="mb-6 bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Database className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">Deep Market Data Analysis</h3>
                <p className="text-gray-400">
                  Processes over 1.2 million data points per second across multiple markets for real-time pattern recognition and anomaly detection.
                </p>
                
                {/* Animated data flow lines */}
                <div className="mt-4 h-8 w-full relative overflow-hidden">
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 300 40">
                      <path 
                        d="M0,20 C20,10 40,30 60,20 C80,10 100,30 120,20 C140,10 160,30 180,20 C200,10 220,30 240,20 C260,10 280,30 300,20" 
                        fill="none" 
                        stroke="rgba(99, 102, 241, 0.3)" 
                        strokeWidth="1"
                      />
                      <rect x="0" y="0" width="300" height="40" fill="url(#data-flow)" />
                      <defs>
                        <linearGradient id="data-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(99, 102, 241, 0)">
                            <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
                          </stop>
                          <stop offset="20%" stopColor="rgba(99, 102, 241, 0.3)">
                            <animate attributeName="offset" values="0.2;1.2" dur="2s" repeatCount="indefinite" />
                          </stop>
                          <stop offset="40%" stopColor="rgba(99, 102, 241, 0)">
                            <animate attributeName="offset" values="0.4;1.4" dur="2s" repeatCount="indefinite" />
                          </stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                  <span>Data Processed</span>
                  <span>1.2M points/sec</span>
                </div>
              </div>
            </div>
            
            {/* Feature 2 - Predictive Signal Confluence */}
            <div className="bg-gradient-to-br from-lucent-deep-blue to-lucent-deep-blue/80 border border-white/10 rounded-xl overflow-hidden shadow-xl group hover:shadow-blue-500/20 hover:border-blue-500/20 transition-all duration-300 isolate">
              <div className="p-6">
                <div className="mb-6 bg-gradient-to-br from-blue-500/20 to-blue-700/20 w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Predictive Signal Confluence</h3>
                <p className="text-gray-400">
                  Combines signals from 8 different technical algorithms and fundamental data streams to generate high-confidence trade recommendations.
                </p>
                
                {/* Signal strength visualization */}
                <div className="mt-4 grid grid-cols-8 gap-1 h-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="relative h-full">
                      <div 
                        className="absolute bottom-0 w-full bg-blue-500/30 rounded-t"
                        style={{ 
                          height: `${Math.max(30, Math.random() * 100)}%`,
                          animation: `pulse-subtle ${1 + Math.random()}s infinite alternate ease-in-out`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                  <span>Signal Algorithms</span>
                  <span>8 Sources Combined</span>
                </div>
              </div>
            </div>
            
            {/* Feature 3 - Real-Time Adaptation */}
            <div className="bg-gradient-to-br from-lucent-deep-blue to-lucent-deep-blue/80 border border-white/10 rounded-xl overflow-hidden shadow-xl group hover:shadow-green-500/20 hover:border-green-500/20 transition-all duration-300 isolate">
              <div className="p-6">
                <div className="mb-6 bg-gradient-to-br from-green-500/20 to-green-700/20 w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <TimerReset className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">Real-Time Adaptation</h3>
                <p className="text-gray-400">
                  Continuous model retraining every 4 hours ensures optimal performance regardless of changing market dynamics and volatility.
                </p>
                
                {/* Animated timer */}
                <div className="mt-4 h-8 w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100" height="30" viewBox="0 0 100 30">
                      <rect x="0" y="10" width="100" height="10" rx="5" fill="rgba(74, 222, 128, 0.1)" />
                      <rect 
                        x="0" 
                        y="10" 
                        width="100" 
                        height="10" 
                        rx="5" 
                        fill="rgba(74, 222, 128, 0.3)"
                      >
                        <animate 
                          attributeName="width" 
                          values="0;100" 
                          dur="4s" 
                          repeatCount="indefinite" 
                        />
                      </rect>
                      <text x="50" y="19" textAnchor="middle" fill="white" fontSize="8">4h Cycle</text>
                    </svg>
                  </div>
                </div>
                
                <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                  <span>Model Retraining</span>
                  <span>Every 4 Hours</span>
                </div>
              </div>
            </div>
            
            {/* Feature 4 - Dynamic Timeframe Analysis */}
            <div className="bg-gradient-to-br from-lucent-deep-blue to-lucent-deep-blue/80 border border-white/10 rounded-xl overflow-hidden shadow-xl group hover:shadow-cyan-500/20 hover:border-cyan-500/20 transition-all duration-300 isolate">
              <div className="p-6">
                <div className="mb-6 bg-gradient-to-br from-cyan-500/20 to-cyan-700/20 w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <BarChartHorizontal className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Dynamic Timeframe Analysis</h3>
                <p className="text-gray-400">
                  Multi-timeframe signals from 5-minute to daily charts, with proprietary conflation technology to identify trades with the highest probability of success.
                </p>
                
                {/* Timeframe visualization */}
                <div className="mt-4 flex space-x-1 h-8">
                  {['5m', '15m', '30m', '1h', '4h', '1d'].map((tf, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-cyan-500/10 rounded flex items-center justify-center text-[10px] text-cyan-400/70"
                      style={{
                        boxShadow: i === 3 ? '0 0 10px rgba(34, 211, 238, 0.3)' : 'none',
                        border: i === 3 ? '1px solid rgba(34, 211, 238, 0.3)' : 'none',
                      }}
                    >
                      {tf}
                    </div>
                  ))}
                </div>
                
                <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                  <span>Timeframes</span>
                  <span>6 Analyzed Simultaneously</span>
                </div>
              </div>
            </div>
            
            {/* Feature 5 - Multi-Market Analysis */}
            <div className="bg-gradient-to-br from-lucent-deep-blue to-lucent-deep-blue/80 border border-white/10 rounded-xl overflow-hidden shadow-xl group hover:shadow-purple-500/20 hover:border-purple-500/20 transition-all duration-300 isolate">
              <div className="p-6 relative">
                <div className="mb-6 bg-gradient-to-br from-purple-500/20 to-purple-700/20 w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">Multi-Market Analysis</h3>
                <p className="text-gray-400">
                  Analyzes correlations between forex, crypto, and commodity markets to identify unique trading opportunities not visible when analyzing single markets.
                </p>
                
                {/* Market connections visualization - Explicitly contained */}
                <div className="mt-4 h-8 relative">
                  <svg width="100%" height="100%" viewBox="0 0 300 30">
                    {/* Market Nodes */}
                    <circle cx="50" cy="15" r="6" fill="#22d3ee" />
                    <circle cx="150" cy="15" r="6" fill="#a855f7" />
                    <circle cx="250" cy="15" r="6" fill="#eab308" />
                    
                    {/* Connecting Lines */}
                    <line x1="56" y1="15" x2="144" y2="15" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" strokeDasharray="3,3">
                      <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                    </line>
                    <line x1="156" y1="15" x2="244" y2="15" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" strokeDasharray="3,3">
                      <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" begin="1s" />
                    </line>
                    <line x1="50" y1="21" x2="250" y2="21" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" strokeDasharray="3,3">
                      <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
                    </line>
                    
                    {/* Labels */}
                    <text x="50" y="28" textAnchor="middle" fill="#22d3ee" fontSize="8">Forex</text>
                    <text x="150" y="28" textAnchor="middle" fill="#a855f7" fontSize="8">Crypto</text>
                    <text x="250" y="28" textAnchor="middle" fill="#eab308" fontSize="8">Commodities</text>
                  </svg>
                </div>
                
                <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                  <span>Cross-Market Analysis</span>
                  <span>Correlation Detection</span>
                </div>
              </div>
            </div>
            
            {/* Feature 6 - Custom Risk Profiles - Completely redesigned */}
            <div className="bg-gradient-to-br from-lucent-deep-blue to-lucent-deep-blue/80 border border-white/10 rounded-xl overflow-hidden shadow-xl group hover:shadow-amber-500/20 hover:border-amber-500/20 transition-all duration-300 isolate">
              <div className="p-6">
                <div className="mb-6 bg-gradient-to-br from-amber-500/20 to-amber-700/20 w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <ListFilter className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">Custom Risk Profiles</h3>
            <p className="text-gray-400">
                  Tailor trading strategies to match your risk tolerance with customizable parameters for position sizing, profit targets, and maximum drawdown limits.
                </p>
                
                {/* Fixed slider design with self-contained elements */}
                <div className="mt-6 w-full">
                  {/* Risk gradient bar */}
                  <div className="h-2 w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  
                  {/* Slider thumb - positioned with transform */}
                  <div className="relative w-full">
                    <div className="absolute h-8 w-4 -mt-5" style={{ left: 'calc(40% - 6px)' }}>
                      <div className="h-8 w-3 bg-white rounded-full shadow-md mx-auto"></div>
                    </div>
                  </div>
                  
                  {/* Risk labels */}
                  <div className="mt-6 flex justify-between items-center text-xs text-gray-500">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Insight Panel */}
          <div className="mt-12 bg-gradient-to-br from-lucent-deep-blue/80 to-lucent-deep-blue border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">AI System Insight</h4>
                <p className="text-sm text-gray-400">Adaptive intelligence that learns from market behavior</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="font-medium text-white text-sm mb-3 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-blue-400" />
                  Real-Time Learning
                </h5>
                <div className="h-1 w-full bg-white/10 rounded-full mt-2">
                  <div className="h-1 bg-blue-500 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Adaptation Level</span>
                  <span className="text-xs text-blue-400">87%</span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  The AI continuously adapts to evolving market conditions through deep reinforcement learning models.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="font-medium text-white text-sm mb-3 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-purple-400" />
                  Performance Metrics
                </h5>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Win Rate</span>
                  <span className="text-purple-400">78.4%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full">
                  <div className="h-1 bg-purple-500 rounded-full" style={{ width: '78.4%' }}></div>
                </div>
                
                <div className="flex justify-between text-xs mt-2 mb-1">
                  <span className="text-gray-500">Benchmark Outperformance</span>
                  <span className="text-purple-400">+410%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full">
                  <div className="h-1 bg-purple-500 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="font-medium text-white text-sm mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-400" />
                  System Optimization
                </h5>
                <div className="relative h-12 w-full">
                  <svg viewBox="0 0 100 40" width="100%" height="100%">
                    <path d="M0,30 C10,28 20,15 30,18 C40,21 50,35 60,30 C70,25 80,10 90,15 C95,18 100,25 100,25" 
                       stroke="rgba(74, 222, 128, 0.6)" 
                       fill="none" 
                       strokeWidth="1.5" />
                    <path d="M0,30 C10,28 20,15 30,18 C40,21 50,35 60,30 C70,25 80,10 90,15 C95,18 100,25 100,25" 
                       stroke="rgba(74, 222, 128, 0.2)" 
                       fill="none" 
                       strokeWidth="3" />
                  </svg>
                </div>
                <div className="text-xs text-gray-400 text-center">
                  Continuous model improvements through gradient-based optimization
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial/Social Proof Section */}
        <div className="bg-gradient-to-r from-lucent-deep-blue to-lucent-navy border border-white/10 rounded-xl p-8 md:p-10 mb-16">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified Performance
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Why Professional Traders Choose Pinaxa Labs
              </h3>
              <p className="text-gray-300 mb-8">
                Our proprietary AI trading system consistently outperforms top hedge funds and industry benchmarks, providing professional and retail traders with institutional-grade analysis and execution.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-3xl font-bold text-white">+{performanceData.pinaxa.yearly}%</p>
                  <p className="text-gray-400">Annual Return</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{performanceData.pinaxa.sharpeRatio}</p>
                  <p className="text-gray-400">Sharpe Ratio</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{performanceData.pinaxa.winRate}%</p>
                  <p className="text-gray-400">Win Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">8+</p>
                  <p className="text-gray-400">Supported Markets</p>
                </div>
              </div>
              
              <Button 
                className="bg-gradient-to-r from-lucent-purple to-lucent-blue text-white font-medium py-3 px-6"
                onClick={() => window.open('https://calendar.app.google/pyhYWqyu5gvsQVTg9', '_blank')}
              >
                Get Early Access <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="md:w-1/2 bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="font-medium text-lg text-white mb-6">Performance Highlights</h4>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">13x higher returns</span> than the Eurekahedge FX Fund Index over the last 1 year
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">{(performanceData.eurekahedge.maxDrawdown - performanceData.pinaxa.maxDrawdown).toFixed(1)}% lower maximum drawdown</span> during market volatility compared to typical FX hedge funds
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">31 consecutive profitable months</span> across both bull and bear market conditions
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Profitable in 94% of trading weeks</span> since inception, outperforming 98% of professional traders
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Zero negative months</span> during major market downturns of 2022-2023
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-lucent-purple/20 to-lucent-blue/20 border border-white/10 rounded-xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 opacity-30">
            <Rocket className="h-48 w-48 text-white transform rotate-45" />
          </div>
          
          <div className="max-w-2xl relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Trading?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of traders who have already enhanced their trading performance with Pinaxa Labs' cutting-edge technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-lucent-purple hover:bg-lucent-purple/90 text-white font-medium py-2 px-4"
                onClick={() => window.open('https://calendar.app.google/pyhYWqyu5gvsQVTg9', '_blank')}
              >
                Get Started Now
              </Button>
              <Button 
                className="bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium py-2 px-4"
                onClick={() => window.open('https://calendar.app.google/pyhYWqyu5gvsQVTg9', '_blank')}
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesOverview;

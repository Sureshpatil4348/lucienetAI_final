import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  BarChart2, 
  Cpu, 
  LineChart, 
  ShieldCheck, 
  MousePointer, 
  PlayCircle, 
  TrendingUp,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useMarketData } from "@/context/MarketDataContext";
import { cn, formatCryptoPrice, formatPercent } from "@/lib/utils";

// Animated background particles
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[linear-gradient(90deg,transparent_0%,rgba(139,92,246,0.05)_50%,transparent_100%)] animate-[move-x_15s_linear_infinite]"></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[linear-gradient(0deg,transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] animate-[move-y_15s_linear_infinite]"></div>
      </div>

      {/* Animated particles */}
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-lucent-purple/20 blur-xl"
          initial={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.2 + 0.1,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [Math.random() * 0.2 + 0.1, Math.random() * 0.3 + 0.15, Math.random() * 0.2 + 0.1],
          }}
          transition={{
            duration: 25 + Math.random() * 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Tilt effect based on mouse position
const TiltContainer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Get element dimensions
  useEffect(() => {
    if (!ref.current) return;
    
    const handleResize = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    // Calculate mouse position relative to container
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  // Calculate rotation based on mouse position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const tiltStrength = 12; // Max tilt amount in degrees
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    // Calculate how far the mouse is from center (as a percentage)
    const percentX = (mousePosition.x - centerX) / centerX;
    const percentY = (mousePosition.y - centerY) / centerY;
    
    // Apply negative rotation to create "following" effect
    rotateY.set(percentX * tiltStrength);
    rotateX.set(-percentY * tiltStrength);
  }, [mousePosition, dimensions]);
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  
  return (
    <motion.div 
      ref={ref}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transition: "transform 0.3s ease-out",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cryptoPrices, forexPrices, isLoading, getSignalInfo } = useMarketData();

  const scrollToTradingInterface = () => {
    const tradingInterface = document.getElementById('trading-interface');
    if (tradingInterface) {
      tradingInterface.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Get Bitcoin data with fallback values
  const btcData = cryptoPrices['BTC'] || {
    price: 48632.75,
    percentChange: 2.34,
    lastUpdated: new Date().toISOString()
  };

  // Get Ethereum data with fallback values
  const ethData = cryptoPrices['ETH'] || {
    price: 3295.84,
    percentChange: 1.87,
    lastUpdated: new Date().toISOString()
  };

  // Get signal info for BTC and ETH
  const btcSignal = getSignalInfo('BTC/USD');
  const ethSignal = getSignalInfo('ETH/USD');

  // Calculate overall market trend
  const calculateMarketTrend = () => {
    const allPairs = [
      ...Object.keys(cryptoPrices).map(symbol => `${symbol}/USD`),
      ...Object.keys(forexPrices)
    ];

    let uptrendCount = 0;
    let downtrendCount = 0;

    allPairs.forEach(pair => {
      const signal = getSignalInfo(pair);
      if (signal.status.toLowerCase().includes('uptrend')) {
        uptrendCount++;
      } else if (signal.status.toLowerCase().includes('downtrend')) {
        downtrendCount++;
      }
    });

    if (uptrendCount > downtrendCount) {
      return { trend: 'Bullish', color: 'text-green-400' };
    } else if (downtrendCount > uptrendCount) {
      return { trend: 'Bearish', color: 'text-red-400' };
    } else {
      return { trend: 'Sideways', color: 'text-yellow-400' };
    }
  };

  const marketTrend = calculateMarketTrend();

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <ParticleBackground />
        
      {/* Foreground content */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              variants={itemVariants}
              className="inline-block bg-lucent-purple/20 text-lucent-purple rounded-full px-3 py-1 text-sm font-medium mb-4"
            >
              AI-Powered Trading Analytics
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
            >
              Advanced <span className="text-transparent bg-clip-text bg-gradient-primary">AI Trading</span> Intelligence
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-300 text-lg mb-8 max-w-lg"
            >
              Leverage next-generation AI to analyze market patterns, predict trends, and execute winning trades with unprecedented accuracy.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 hover:shadow-glow-md transition-all">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5">
                <PlayCircle className="mr-2 h-5 w-5 text-lucent-purple" /> Watch Demo
              </Button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-3"
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-card rounded-lg border border-white/5 p-4 shadow-glow-sm"
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-lucent-purple/20 p-2 mr-3">
                    <BarChart2 className="h-5 w-5 text-lucent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">98.7%</h3>
                    <p className="text-sm text-gray-400">Accuracy Rate</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-card rounded-lg border border-white/5 p-4 shadow-glow-sm"
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-lucent-purple/20 p-2 mr-3">
                    <LineChart className="h-5 w-5 text-lucent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">+27%</h3>
                    <p className="text-sm text-gray-400">Avg. Return</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-card rounded-lg border border-white/5 p-4 shadow-glow-sm"
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-lucent-purple/20 p-2 mr-3">
                    <ShieldCheck className="h-5 w-5 text-lucent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">100%</h3>
                    <p className="text-sm text-gray-400">Secure</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="hidden md:flex items-center gap-2 text-sm text-gray-400 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <MousePointer className="h-4 w-4" />
              <span>Scroll down to explore</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="h-5 w-5 text-gray-400"
              >
                <ArrowRight className="rotate-90" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants}>
            <TiltContainer>
              <div className="relative">
                <div className="absolute -inset-px rounded-xl bg-gradient-primary blur-md opacity-20"></div>
                <div className="relative z-10 bg-glass-card backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  {/* Trading Interface Header */}
                  <div className="bg-gradient-to-r from-lucent-deep-blue to-lucent-navy border-b border-white/10 p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <Cpu className="h-5 w-5 text-lucent-purple mr-2" />
                      <span className="text-white font-medium">Master Trader AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-lucent-success animate-pulse"></div>
                      <span className="text-gray-300 text-sm">Live Analysis</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    {/* Bitcoin Card with Success Probability */}
                    <div className="mb-4 bg-white/5 rounded-lg border border-white/10 p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-lucent-blue/20 flex items-center justify-center mr-2.5">
                            <span className="text-white text-xs font-medium">BTC</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Bitcoin</h4>
                            <span className="text-gray-400 text-sm">BTC/USD</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <AnimatePresence mode="wait">
                            {isLoading ? (
                              <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-5 w-24 bg-white/10 rounded animate-pulse"
                              ></motion.div>
                            ) : (
                              <motion.div
                                key="price"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-white font-mono font-medium text-lg"
                              >
                                ${formatCryptoPrice(btcData.price, 'BTC')}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <AnimatePresence mode="wait">
                            {isLoading ? (
                              <motion.div 
                                key="loading-percent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-4 w-16 bg-white/10 rounded animate-pulse mt-1"
                              ></motion.div>
                            ) : (
                              <motion.div
                                key="percent"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className={cn(
                                  "text-sm flex items-center justify-end",
                                  btcData.percentChange >= 0 ? "text-green-400" : "text-red-400"
                                )}
                              >
                                {formatPercent(btcData.percentChange)} 
                                <ArrowUpRight 
                                  className={cn(
                                    "h-3 w-3 ml-1",
                                    btcData.percentChange >= 0 ? "" : "rotate-180"
                                  )} 
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      {/* Chart for BTC - simplified */}
                      <div className="relative h-10 mb-3">
                        <div className="absolute inset-0">
                          <svg className="w-full h-full" viewBox="0 0 400 50" preserveAspectRatio="none">
                            <path
                              d="M0,25 C50,15 100,40 150,25 C200,10 250,30 300,20 C350,10 400,25 400,25"
                              fill="none"
                              stroke="rgba(139, 92, 246, 0.5)"
                              strokeWidth="2"
                              className="animate-pulse-subtle"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* BTC Success Probability */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">Success Probability</span>
                          <span className="text-white font-medium">{btcSignal.successProbability}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-2 rounded-full ${
                              btcSignal.successProbability > 80 ? 'bg-green-500' :
                              btcSignal.successProbability > 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${btcSignal.successProbability}%` }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      
                      {/* BTC AI Analysis */}
                      <div className="flex justify-between items-center mt-3 text-xs">
                        <div className="flex items-center">
                          <CheckCircle size={14} className={`${btcSignal.color} mr-1.5`} />
                          <span className={btcSignal.color}>{btcSignal.status}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock size={12} />
                          Just now
                        </div>
                      </div>
                    </div>
                    
                    {/* Ethereum Card with Success Probability */}
                    <div className="mb-4 bg-white/5 rounded-lg border border-white/10 p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-lucent-purple/20 flex items-center justify-center mr-2.5">
                            <span className="text-white text-xs font-medium">ETH</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Ethereum</h4>
                            <span className="text-gray-400 text-sm">ETH/USD</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <AnimatePresence mode="wait">
                            {isLoading ? (
                              <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-5 w-24 bg-white/10 rounded animate-pulse"
                              ></motion.div>
                            ) : (
                              <motion.div
                                key="price"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-white font-mono font-medium text-lg"
                              >
                                ${formatCryptoPrice(ethData.price, 'ETH')}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <AnimatePresence mode="wait">
                            {isLoading ? (
                              <motion.div 
                                key="loading-percent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-4 w-16 bg-white/10 rounded animate-pulse mt-1"
                              ></motion.div>
                            ) : (
                              <motion.div
                                key="percent"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className={cn(
                                  "text-sm flex items-center justify-end",
                                  ethData.percentChange >= 0 ? "text-green-400" : "text-red-400"
                                )}
                              >
                                {formatPercent(ethData.percentChange)} 
                                <ArrowUpRight 
                                  className={cn(
                                    "h-3 w-3 ml-1",
                                    ethData.percentChange >= 0 ? "" : "rotate-180"
                                  )} 
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      {/* Chart for ETH - simplified */}
                      <div className="relative h-10 mb-3">
                        <div className="absolute inset-0">
                          <svg className="w-full h-full" viewBox="0 0 400 50" preserveAspectRatio="none">
                            <path
                              d="M0,30 C50,20 100,35 150,15 C200,30 250,15 300,25 C350,20 400,30 400,30"
                              fill="none"
                              stroke="rgba(59, 130, 246, 0.5)"
                              strokeWidth="2"
                              className="animate-pulse-subtle"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* ETH Success Probability */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">Success Probability</span>
                          <span className="text-white font-medium">{ethSignal.successProbability}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-2 rounded-full ${
                              ethSignal.successProbability > 80 ? 'bg-green-500' :
                              ethSignal.successProbability > 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${ethSignal.successProbability}%` }}
                            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      
                      {/* ETH AI Analysis */}
                      <div className="flex justify-between items-center mt-3 text-xs">
                        <div className="flex items-center">
                          <CheckCircle size={14} className={`${ethSignal.color} mr-1.5`} />
                          <span className={ethSignal.color}>{ethSignal.status}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock size={12} />
                          Just now
                        </div>
                      </div>
                    </div>
                    
                    {/* Overall Market Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <TrendingUp size={16} className={`${marketTrend.color} mr-2`} />
                        <span className="text-sm text-white">Market Trend: <span className={`${marketTrend.color} font-medium`}>{marketTrend.trend}</span></span>
                      </div>
                      <motion.button
                        onClick={scrollToTradingInterface}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs py-1 px-3 bg-purple-500/20 text-purple-300 rounded hover:bg-purple-500/30 transition-colors"
                      >
                        View Full Analysis
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                {/* Keep the glow effects but reduce their intensity */}
                <motion.div
                  className="absolute -top-10 -right-10 w-24 h-24 bg-lucent-purple/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-10 -left-10 w-20 h-20 bg-lucent-blue/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>
            </TiltContainer>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;

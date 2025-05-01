import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  LayoutDashboard,
  LineChart,
  BarChart2,
  Settings,
  Wallet,
  HelpCircle,
  Bell,
  AlertTriangle,
  Layers,
  CheckCircle,
  TrendingUp,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMultipleCryptoPrices } from "@/hooks/useCryptoPrice";

interface SidebarNavProps {
  className?: string;
}

const SidebarNavigation = ({ className }: SidebarNavProps) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { data: cryptoData, isLoading } = useMultipleCryptoPrices(['BTC', 'ETH']);

  // Animation variants
  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  const iconVariants = {
    expanded: { marginRight: 12 },
    collapsed: { marginRight: 0 }
  };

  const chevronVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: 180 }
  };

  // Trading status indicator
  const tradingStatus = "active"; // Can be 'active', 'warning', or 'error'
  const statusColors = {
    active: "bg-lucent-success text-lucent-success",
    warning: "bg-lucent-warning text-lucent-warning",
    error: "bg-lucent-error text-lucent-error"
  };

  // Navigation items
  const mainNavItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "AI Analysis", icon: <LineChart size={20} />, path: "/ai-analysis" },
    { name: "Trading", icon: <LineChart size={20} />, path: "/trading" },
    { name: "Market Analysis", icon: <BarChart2 size={20} />, path: "/analysis" },
    { name: "Portfolio", icon: <Layers size={20} />, path: "/portfolio" },
    { name: "Wallet", icon: <Wallet size={20} />, path: "/wallet" },
  ];

  const secondaryNavItems = [
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Help Center", icon: <HelpCircle size={20} />, path: "/help" },
  ];

  // Format price with commas and proper decimal places
  const formatPrice = (price: number, symbol: string) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Format percent change with + sign for positive values
  const formatPercentChange = (percentChange: number) => {
    const formattedValue = percentChange.toFixed(2);
    return percentChange >= 0 ? `+${formattedValue}%` : `${formattedValue}%`;
  };

  // Get default values for Bitcoin and Ethereum
  const btcData = cryptoData?.BTC || {
    price: 48632.75,
    percentChange: 2.34,
    lastUpdated: new Date().toISOString()
  };

  const ethData = cryptoData?.ETH || {
    price: 3295.84,
    percentChange: 1.87,
    lastUpdated: new Date().toISOString()
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="expanded"
      animate={expanded ? "expanded" : "collapsed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-20 bottom-0 bg-lucent-deep-blue border-r border-white/5 overflow-hidden z-40 transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="px-4 py-5 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full border border-white/10 hover:bg-white/5"
            onClick={() => setExpanded(!expanded)}
          >
            <motion.div
              variants={chevronVariants}
              initial="expanded"
              animate={expanded ? "expanded" : "collapsed"}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft size={16} />
            </motion.div>
          </Button>
        </div>

        {/* Status Bar */}
        <div className="px-4 mb-6">
          <div className={cn(
            "flex items-center p-3 rounded-lg",
            expanded ? "bg-gradient-card" : "justify-center",
            "border border-white/5"
          )}>
            <div className={cn(
              "h-2.5 w-2.5 rounded-full animate-pulse",
              statusColors[tradingStatus]
            )} />
            
            <AnimatePresence>
              {expanded && (
                <motion.div
                  variants={itemVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="ml-3 flex items-center justify-between flex-1"
                >
                  <span className="text-sm text-white font-medium">Trading Status</span>
                  <span className={cn(
                    "text-xs font-medium",
                    statusColors[tradingStatus].split(" ")[1]
                  )}>
                    {tradingStatus === 'active' ? 'Online' : tradingStatus === 'warning' ? 'Warning' : 'Offline'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Market Overview Mini Widget */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              variants={itemVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="px-4 mb-6"
            >
              <h3 className="text-gray-400 text-xs uppercase font-medium mb-3 px-2">Market Overview</h3>
              
              <div className="space-y-2">
                {/* Bitcoin Card */}
                <div className="p-3 rounded-lg bg-gradient-card border border-white/5 hover:border-lucent-purple/20 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-lucent-blue/20 flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-medium">₿</span>
                      </div>
                      <span className="text-sm font-medium text-white">Bitcoin</span>
                    </div>
                    <div className={cn(
                      "text-xs font-medium",
                      btcData.percentChange >= 0 ? "text-lucent-success" : "text-lucent-error"
                    )}>
                      {formatPercentChange(btcData.percentChange)}
                    </div>
                  </div>
                  <div className="text-white font-mono text-base">
                    ${formatPrice(btcData.price, 'BTC')}
                  </div>
                  
                  {/* Mini chart placeholder */}
                  <div className="mt-2 h-6 w-full relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 20">
                      <path
                        d="M0,10 C10,8 20,12 30,10 C40,8 50,15 60,12 C70,9 80,15 90,13 C95,12 100,10 100,10"
                        fill="none"
                        stroke={btcData.percentChange >= 0 ? "rgba(16, 185, 129, 0.5)" : "rgba(239, 68, 68, 0.5)"}
                        strokeWidth="1.5"
                        className="group-hover:stroke-lucent-purple/50 transition-colors"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Ethereum Card */}
                <div className="p-3 rounded-lg bg-gradient-card border border-white/5 hover:border-lucent-purple/20 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-lucent-purple/20 flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-medium">Ξ</span>
                      </div>
                      <span className="text-sm font-medium text-white">Ethereum</span>
                    </div>
                    <div className={cn(
                      "text-xs font-medium",
                      ethData.percentChange >= 0 ? "text-lucent-success" : "text-lucent-error"
                    )}>
                      {formatPercentChange(ethData.percentChange)}
                    </div>
                  </div>
                  <div className="text-white font-mono text-base">
                    ${formatPrice(ethData.price, 'ETH')}
                  </div>
                  
                  {/* Mini chart placeholder */}
                  <div className="mt-2 h-6 w-full relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 20">
                      <path
                        d="M0,12 C10,14 20,8 30,10 C40,12 50,8 60,9 C70,10 80,8 90,9 C95,9.5 100,10 100,10"
                        fill="none"
                        stroke={ethData.percentChange >= 0 ? "rgba(16, 185, 129, 0.5)" : "rgba(239, 68, 68, 0.5)"}
                        strokeWidth="1.5"
                        className="group-hover:stroke-lucent-purple/50 transition-colors"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation */}
        <div className="px-4 flex-1">
          <AnimatePresence>
            {expanded && (
              <motion.h3 
                variants={itemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-gray-400 text-xs uppercase font-medium mb-3 px-2"
              >
                Main Navigation
              </motion.h3>
            )}
          </AnimatePresence>
          
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-lucent-purple/10 text-lucent-purple"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  !expanded && "justify-center"
                )}
              >
                <motion.div
                  variants={iconVariants}
                  initial="expanded"
                  animate={expanded ? "expanded" : "collapsed"}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex-shrink-0",
                    expanded ? "mr-3" : "mr-0"
                  )}
                >
                  {item.icon}
                </motion.div>
                
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      variants={itemVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="text-sm font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </div>

        {/* AI Insights */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              variants={itemVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="px-4 my-4"
            >
              <div className="p-3 rounded-lg bg-gradient-card border border-white/5">
                <div className="flex items-center mb-3">
                  <Cpu size={16} className="text-lucent-purple mr-2" />
                  <h3 className="text-white text-sm font-medium">AI Insights</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <TrendingUp size={14} className="text-lucent-success mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-300">BTC expected to rise 3-5% in the next 24h</p>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle size={14} className="text-lucent-warning mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-300">Volatility alert for ETH/USD pair</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={14} className="text-lucent-success mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-300">Portfolio allocation optimal</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-center">
                  <Button variant="link" size="sm" className="text-xs text-lucent-purple hover:text-lucent-purple-light">
                    View All Insights
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secondary Navigation */}
        <div className="px-4 pb-6">
          <AnimatePresence>
            {expanded && (
              <motion.h3 
                variants={itemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-gray-400 text-xs uppercase font-medium mb-3 px-2"
              >
                Settings
              </motion.h3>
            )}
          </AnimatePresence>
          
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-lucent-purple/10 text-lucent-purple"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  !expanded && "justify-center"
                )}
              >
                <motion.div
                  variants={iconVariants}
                  initial="expanded"
                  animate={expanded ? "expanded" : "collapsed"}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex-shrink-0",
                    expanded ? "mr-3" : "mr-0"
                  )}
                >
                  {item.icon}
                </motion.div>
                
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      variants={itemVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="text-sm font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
            
            {/* Alert/Notification Button */}
            <div className={cn(
              "flex items-center px-3 py-3 rounded-lg transition-colors text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer",
              !expanded && "justify-center"
            )}>
              <motion.div
                variants={iconVariants}
                initial="expanded"
                animate={expanded ? "expanded" : "collapsed"}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex-shrink-0 relative",
                  expanded ? "mr-3" : "mr-0"
                )}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-lucent-warning rounded-full"></span>
              </motion.div>
              
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    variants={itemVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="text-sm font-medium flex-1 flex justify-between items-center"
                  >
                    <span>Notifications</span>
                    <span className="bg-lucent-warning/20 text-lucent-warning text-xs px-1.5 py-0.5 rounded-full">
                      3
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarNavigation; 
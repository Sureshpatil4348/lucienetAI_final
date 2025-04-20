import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  BarChart3,
  LineChart,
  Layers,
  Settings,
  AlertTriangle
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Track scroll position to apply effects on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Technology", path: "/technology" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const statusIndicator = (
    <motion.div
      className="flex items-center gap-1.5 text-xs px-2 py-1 bg-lucent-success/10 text-lucent-success rounded-full ml-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-lucent-success animate-pulse"></span>
      <span>All Systems Online</span>
    </motion.div>
  );

  // Animation variants
  const navbarVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  const linkVariants = {
    initial: { opacity: 0, y: -5 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.1 + i * 0.05 }
    }),
    hover: { 
      scale: 1.05, 
      color: "rgb(139, 92, 246)", 
      transition: { duration: 0.2 } 
    }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <motion.header
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3 backdrop-blur-xl bg-lucent-navy/80 shadow-md" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white font-bold text-2xl flex items-center"
            >
              <span className="text-lucent-purple-light">LUCENT</span>
              <span className="relative">
                AI
                <span className="absolute -top-1 -right-3 h-2 w-2 bg-lucent-purple rounded-full animate-pulse"></span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <motion.li key={link.name} custom={index} variants={linkVariants} initial="initial" animate="animate">
                  <Link
                    to={link.path}
                    className={cn(
                      "py-2 relative font-medium text-sm transition-colors",
                      location.pathname === link.path
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    <motion.div whileHover="hover" variants={linkVariants}>
                      {link.name}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
            
            {statusIndicator}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="ml-8"
            >
              <Button className="bg-gradient-primary hover:shadow-glow-sm transition-all duration-300">
                <span>Get Started</span>
                <span className="ml-1.5 rounded-full bg-white/20 p-0.5 flex items-center justify-center">
                  <ChevronDown size={14} className="text-white" />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {statusIndicator}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 text-white focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden fixed top-[72px] right-0 bottom-0 w-full sm:w-80 bg-lucent-deep-blue/95 backdrop-blur-xl z-50 overflow-y-auto"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <div className="p-5 space-y-6">
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center p-3 w-full rounded-lg transition-colors font-medium",
                    location.pathname === link.path
                      ? "bg-lucent-purple/10 text-lucent-purple-light"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="ml-auto">
                      <span className="h-2 w-2 bg-lucent-purple rounded-full inline-block"></span>
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                className="w-full bg-gradient-primary"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Quick Access Trading Links (Mobile Only) */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Access</h3>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="grid grid-cols-2 gap-2"
            >
              <Button variant="outline" size="sm" className="justify-start border-white/10 hover:bg-white/5">
                <BarChart3 size={16} className="mr-2 text-lucent-purple" />
                Market Overview
              </Button>
              <Button variant="outline" size="sm" className="justify-start border-white/10 hover:bg-white/5">
                <LineChart size={16} className="mr-2 text-lucent-blue" />
                Active Trades
              </Button>
              <Button variant="outline" size="sm" className="justify-start border-white/10 hover:bg-white/5">
                <Layers size={16} className="mr-2 text-lucent-gold" />
                Portfolio
              </Button>
              <Button variant="outline" size="sm" className="justify-start border-white/10 hover:bg-white/5">
                <Settings size={16} className="mr-2 text-lucent-gray" />
                Settings
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-3 rounded-lg bg-lucent-warning/10 border border-lucent-warning/20 flex items-start"
            >
              <AlertTriangle size={18} className="text-lucent-warning mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                BTC is up 2.34% in the last hour. <span className="text-lucent-warning font-medium">Check the alert.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;

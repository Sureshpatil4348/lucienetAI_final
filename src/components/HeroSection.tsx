
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Cpu, LineChart, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern is applied in global CSS */}
        <div className="absolute inset-0 bg-gradient-to-b from-lucent-navy via-lucent-navy to-lucent-deep-blue opacity-95"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-lucent-purple/20 blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-lucent-blue/20 blur-[100px] animate-float animate-delay-2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm text-white/90 backdrop-blur-sm mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-lucent-purple mr-2"></span>
              Leading AI Trading Technology
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automate Your Trading with the
              <span className="block gradient-text mt-1">Precision of Lucent AI</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Our sophisticated AI-driven algorithms consistently outperform industry benchmarks, providing you with superior trading automation for Forex and Crypto markets.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="btn-secondary">
                View Performance
              </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className={`transition-all duration-1000 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center">
                  <div className="rounded-full bg-lucent-purple/20 p-2 mr-3">
                    <BarChart2 className="h-5 w-5 text-lucent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">98.7%</h3>
                    <p className="text-sm text-gray-400">Accuracy Rate</p>
                  </div>
                </div>
              </div>
              
              <div className={`transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center">
                  <div className="rounded-full bg-lucent-purple/20 p-2 mr-3">
                    <LineChart className="h-5 w-5 text-lucent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">+27%</h3>
                    <p className="text-sm text-gray-400">Avg. Return</p>
                  </div>
                </div>
              </div>
              
              <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center">
                  <div className="rounded-full bg-lucent-purple/20 p-2 mr-3">
                    <ShieldCheck className="h-5 w-5 text-lucent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">100%</h3>
                    <p className="text-sm text-gray-400">Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Simulated Trading Interface */}
              <div className="bg-gradient-to-r from-lucent-deep-blue to-lucent-navy border-b border-white/10 p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Cpu className="h-5 w-5 text-lucent-purple mr-2" />
                  <span className="text-white font-medium">Master Trader AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-gray-300 text-sm">Live Analysis</span>
                </div>
              </div>
              
              <div className="p-5">
                {/* Animated chart lines */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-lucent-blue/20 flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-medium">BTC</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Bitcoin</h4>
                          <span className="text-gray-400 text-sm">BTC/USD</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-medium">48,632.75</div>
                        <div className="text-green-400 text-sm flex items-center justify-end">
                          +2.34% <ArrowRight className="h-3 w-3 transform rotate-45 ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative h-10">
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
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-lucent-purple/20 flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-medium">ETH</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Ethereum</h4>
                          <span className="text-gray-400 text-sm">ETH/USD</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-medium">3,295.84</div>
                        <div className="text-green-400 text-sm flex items-center justify-end">
                          +1.87% <ArrowRight className="h-3 w-3 transform rotate-45 ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative h-10">
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
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Success Probability</span>
                      <span className="text-white font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="h-2 rounded-full bg-gradient-to-r from-lucent-purple to-lucent-blue animate-pulse-subtle" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>AI Analysis: <span className="text-green-400">Strong Buy Signal</span></span>
                    <span>Updated: <span className="text-white">Just now</span></span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements behind the main interface */}
            <div className="absolute -top-5 -right-5 w-32 h-32 bg-lucent-purple/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-lucent-blue/30 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


import React from "react";
import { 
  LineChart, 
  BrainCircuit, 
  ShieldCheck, 
  Clock, 
  Zap, 
  BarChart3, 
  Rocket,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedChart from "./AnimatedChart";

const FeaturesOverview = () => {
  return (
    <div className="py-20 bg-lucent-navy relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the <span className="gradient-text">Master Trader AI</span>
          </h2>
          <p className="text-gray-300">
            Our proprietary AI-driven platform that delivers unparalleled trading performance through advanced predictive analytics and real-time market intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              AI-Driven Trading Performance
            </h3>
            <p className="text-gray-300 mb-6">
              Lucent AI consistently outperforms industry benchmarks by leveraging sophisticated artificial intelligence algorithms that analyze real-time market data and historical patterns.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <LineChart className="h-3.5 w-3.5 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Advanced Pattern Recognition</h4>
                  <p className="text-gray-400 text-sm">
                    Our AI identifies complex market patterns invisible to human traders and traditional algorithms.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <BrainCircuit className="h-3.5 w-3.5 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Predictive Analytics</h4>
                  <p className="text-gray-400 text-sm">
                    Machine learning models forecast market movements with remarkable accuracy.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <ShieldCheck className="h-3.5 w-3.5 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Risk Mitigation</h4>
                  <p className="text-gray-400 text-sm">
                    Intelligent risk assessment and automated safeguards protect your investments.
                  </p>
                </div>
              </li>
            </ul>
            
            <Button className="btn-secondary">
              Learn More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-lucent-deep-blue border border-white/10 rounded-xl overflow-hidden shadow-lg p-6">
            <h4 className="text-xl font-semibold mb-4">Performance Comparison</h4>
            <div className="text-sm text-gray-400 mb-6">
              Lucent AI vs. Market Index (Last 30 Days)
            </div>
            <div className="h-64">
              <AnimatedChart 
                uptrend={true} 
                height={250}
                color="#8B5CF6"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-lucent-purple mr-2"></div>
                <span className="text-sm text-white">Lucent AI</span>
              </div>
              <div className="text-green-400 font-medium">+27.3%</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-500 mr-2"></div>
                <span className="text-sm text-white">Market Index</span>
              </div>
              <div className="text-green-400 font-medium">+8.1%</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="feature-card">
            <div className="h-12 w-12 rounded-full bg-lucent-purple/20 mb-6 flex items-center justify-center">
              <Clock className="h-6 w-6 text-lucent-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Monitoring</h3>
            <p className="text-gray-400">
              Monitor and control all trades in real-time with our intuitive dashboard, providing complete visibility into your portfolio's performance.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="h-12 w-12 rounded-full bg-lucent-purple/20 mb-6 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-lucent-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">Success Probability</h3>
            <p className="text-gray-400">
              Our AI predicts the success probability of every trade, giving you confidence in your trading decisions with data-driven insights.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="h-12 w-12 rounded-full bg-lucent-purple/20 mb-6 flex items-center justify-center">
              <Zap className="h-6 w-6 text-lucent-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">Complete Automation</h3>
            <p className="text-gray-400">
              Set your trading parameters and let our AI handle the rest. Effortlessly automate your trading activities with precision and efficiency.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-lucent-purple/20 to-lucent-blue/20 border border-white/10 rounded-xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 opacity-30">
            <Rocket className="h-48 w-48 text-white transform rotate-45" />
          </div>
          
          <div className="max-w-2xl relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Trading?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of traders who have already enhanced their trading performance with Lucent AI's cutting-edge technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary">
                Get Started Now
              </Button>
              <Button className="btn-secondary">
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

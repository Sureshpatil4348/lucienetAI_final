
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/FeatureSection";
import FeatureDetail from "@/components/FeatureDetail";
import { 
  BrainCircuit, 
  LineChart, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  Settings, 
  Lock, 
  ArrowRightLeft, 
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturesPage = () => {
  useEffect(() => {
    document.title = "Features - Lucent AI";
  }, []);

  const features = [
    {
      id: "intelligent-order-processing",
      title: "Intelligent Order Processing",
      description: "Our AI thoroughly evaluates each trade using real-time data and advanced algorithms before execution.",
      icon: <LineChart className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Trade Placement Flow",
          description: "When a user places a trade, it is routed through Lucent AI's system."
        },
        {
          title: "AI Verification",
          description: "The trade request is instantly assessed using real-time market data, technical indicators, and probability algorithms."
        },
        {
          title: "Approve or Reject",
          description: "Based on the AI's analysis, the trade is either approved and sent to the broker or rejected with recommended alternatives."
        },
        {
          title: "Risk Analysis",
          description: "Automated evaluation of stop-loss, take-profit, and potential position sizing for optimal risk-reward."
        }
      ]
    },
    {
      id: "master-trader-ai",
      title: "Master Trader AI",
      description: "Our proprietary AI constantly monitors markets and executes optimal trading strategies.",
      icon: <BrainCircuit className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "24/7 Monitoring",
          description: "Constantly watches market movements and user accounts."
        },
        {
          title: "Real-Time Adjustments",
          description: "Dynamically modifies open positions, applying trailing stops and new entry signals."
        },
        {
          title: "Auto-Scaling",
          description: "Adjusts position sizing based on performance metrics and live volatility analysis."
        },
        {
          title: "Learning Capabilities",
          description: "Continuously improving and adapting to market changes using advanced machine learning."
        }
      ]
    },
    {
      id: "performance-dashboards",
      title: "Performance Dashboards",
      description: "Comprehensive visualization of your trading history and AI-driven insights.",
      icon: <BarChart3 className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Trade History Overview",
          description: "Clear visuals of past trades, P/L statements, and success metrics."
        },
        {
          title: "Predictive Insights",
          description: "Forward-looking predictions on currency pairs, crypto tokens, and volatility indexes."
        },
        {
          title: "Strategy Comparison",
          description: "See AI-driven suggestions vs. manual execution outcomes."
        }
      ]
    },
    {
      id: "risk-management",
      title: "Automated Risk Management",
      description: "Intelligent protection for your capital with customizable risk parameters.",
      icon: <ShieldCheck className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Customizable Thresholds",
          description: "Users can set personal risk parameters (max drawdown, leverage limits, etc.)."
        },
        {
          title: "Immediate Alert System",
          description: "Get notifications on high-risk trades and potential margin calls."
        },
        {
          title: "Stop-Loss & Take-Profit Automation",
          description: "AI ensures trades have protective measures in place."
        }
      ]
    },
    {
      id: "performance-analytics",
      title: "Performance Analytics",
      description: "Detailed reporting and benchmarking of your trading performance.",
      icon: <LineChart className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Accurate ROI Tracking",
          description: "Understand monthly and yearly returns at a glance."
        },
        {
          title: "Benchmarked Results",
          description: "Compare your portfolio's performance to major indices and benchmarks."
        },
        {
          title: "AI Attribution",
          description: "Identify how much of your profit is directly attributed to the AI's interventions."
        }
      ]
    },
    {
      id: "multi-asset",
      title: "Multi-Asset Compatibility",
      description: "Trade across multiple asset classes through a single unified interface.",
      icon: <Layers className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Forex & Crypto Support",
          description: "Trade leading currency pairs and major crypto assets."
        },
        {
          title: "Stocks & Other Markets",
          description: "Optional modules for broadening investment horizons."
        },
        {
          title: "Seamless Portfolio Integration",
          description: "Consolidated view of all assets and consolidated net worth."
        }
      ]
    },
    {
      id: "user-controls",
      title: "Advanced User Controls",
      description: "Maintain control while leveraging AI assistance with flexible settings.",
      icon: <Settings className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Manual Override",
          description: "Users can opt to manually override the AI's decisions."
        },
        {
          title: "Scheduling & Automation",
          description: "Define which hours or market conditions the AI trades automatically."
        }
      ]
    },
    {
      id: "security",
      title: "Security & Compliance",
      description: "Enterprise-grade security protocols to keep your data and assets safe.",
      icon: <Lock className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Bank-Grade Encryption",
          description: "Safeguarding user data and financial transactions."
        },
        {
          title: "Regulatory Compliance",
          description: "Complying with global standards and broker regulations."
        },
        {
          title: "Regular Audits",
          description: "Third-party checks on technology, data, and reliability."
        }
      ]
    },
    {
      id: "integration",
      title: "Seamless Integration",
      description: "Connect to your preferred brokers and get started quickly.",
      icon: <ArrowRightLeft className="h-12 w-12 text-lucent-purple" />,
      points: [
        {
          title: "Broker-Agnostic",
          description: "Connect easily to a range of supported brokers."
        },
        {
          title: "Quick Start Process",
          description: "A guided wizard for setup, ensuring even beginners can start trading immediately."
        },
        {
          title: "Dedicated Support",
          description: "Round-the-clock customer service to help with technical or account queries."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-lucent-purple/20 text-lucent-purple border-none px-3 py-1 text-sm">
                Features Overview
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Powerful Features for <span className="gradient-text">Advanced Trading</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Discover how Lucent AI's advanced system evaluates each trade, automates risk management, 
                and delivers consistent trading success through artificial intelligence.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="btn-primary">
                  Start Free Trial
                </Button>
                <Button className="btn-secondary">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="py-16 bg-lucent-deep-blue border-y border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Complete Trading <span className="gradient-text">Feature Set</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of tools and capabilities designed to optimize 
                your trading strategy and maximize your results.
              </p>
            </div>
            
            <FeatureSection features={features} />
          </div>
        </div>
        
        {/* Features Detail */}
        <div className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Detailed <span className="gradient-text">Feature Breakdown</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Learn more about each feature and how they work together to create a powerful 
                trading platform powered by artificial intelligence.
              </p>
            </div>
            
            {features.map((feature, index) => (
              <FeatureDetail key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-20 bg-lucent-deep-blue border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-r from-lucent-purple/20 to-lucent-blue/20 border-white/10 rounded-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-block p-3 bg-lucent-purple/20 rounded-full mb-6">
                    <Clock className="h-8 w-8 text-lucent-purple" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Transform Your Trading Experience?
                  </h2>
                  
                  <p className="text-xl text-gray-300 mb-8">
                    Get started with Lucent AI today and experience the power of AI-driven trading.
                    Our platform is designed to help you achieve consistent results and maximize your returns.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button className="btn-primary">
                      Start 14-Day Free Trial
                    </Button>
                    <Button className="btn-secondary">
                      Schedule a Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;

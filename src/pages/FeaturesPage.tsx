
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureDetail from "@/components/FeatureDetail";
import FeatureSection from "@/components/FeatureSection";
import { 
  ArrowUpDown, 
  Brain, 
  BarChart4, 
  ShieldCheck, 
  LineChart, 
  CandlestickChart, 
  Settings, 
  Lock, 
  ArrowRightLeft 
} from "lucide-react";

const FeaturesPage = () => {
  useEffect(() => {
    document.title = "Features - Lucent AI";
  }, []);

  const features = [
    {
      id: "intelligent-order",
      icon: <ArrowUpDown className="h-10 w-10 text-lucent-purple" />,
      title: "Intelligent Order Processing",
      description: "Our AI analyzes and processes each trade with precision and accuracy.",
      points: [
        { title: "Trade Placement Flow", description: "When a user places a trade, it is routed through Lucent AI's system." },
        { title: "AI Verification", description: "The trade request is instantly assessed using real-time market data, technical indicators, and probability algorithms." },
        { title: "Approve or Reject", description: "Based on the AI's analysis, the trade is either approved and sent to the broker or rejected with recommended alternatives." },
        { title: "Risk Analysis", description: "Automated evaluation of stop-loss, take-profit, and potential position sizing for optimal risk-reward." }
      ]
    },
    {
      id: "master-trader",
      icon: <Brain className="h-10 w-10 text-lucent-purple" />,
      title: "Master Trader AI",
      description: "Our advanced AI system provides continuous monitoring and optimization of your trades.",
      points: [
        { title: "24/7 Monitoring", description: "Constantly watches market movements and user accounts." },
        { title: "Real-Time Adjustments", description: "Dynamically modifies open positions, applying trailing stops and new entry signals." },
        { title: "Auto-Scaling", description: "Adjusts position sizing based on performance metrics and live volatility analysis." },
        { title: "Learning Capabilities", description: "Continuously improving and adapting to market changes using advanced machine learning." }
      ]
    },
    {
      id: "performance-dashboards",
      icon: <BarChart4 className="h-10 w-10 text-lucent-purple" />,
      title: "Comprehensive Performance Dashboards",
      description: "Detailed visualization of trading performance and predictive insights.",
      points: [
        { title: "Trade History Overview", description: "Clear visuals of past trades, P/L statements, and success metrics." },
        { title: "Predictive Insights", description: "Forward-looking predictions on currency pairs, crypto tokens, and volatility indexes." },
        { title: "Strategy Comparison", description: "See AI-driven suggestions vs. manual execution outcomes." }
      ]
    },
    {
      id: "risk-management",
      icon: <ShieldCheck className="h-10 w-10 text-lucent-purple" />,
      title: "Automated Risk Management",
      description: "Intelligent safeguards to protect your investments.",
      points: [
        { title: "Customizable Thresholds", description: "Users can set personal risk parameters (max drawdown, leverage limits, etc.)." },
        { title: "Immediate Alert System", description: "Get notifications on high-risk trades and potential margin calls." },
        { title: "Stop-Loss & Take-Profit Automation", description: "AI ensures trades have protective measures in place." }
      ]
    },
    {
      id: "performance-analytics",
      icon: <LineChart className="h-10 w-10 text-lucent-purple" />,
      title: "Performance Analytics & Reporting",
      description: "Comprehensive analysis and reporting on trading performance.",
      points: [
        { title: "Accurate ROI Tracking", description: "Understand monthly and yearly returns at a glance." },
        { title: "Benchmarked Results", description: "Compare your portfolio's performance to major indices and benchmarks." },
        { title: "AI Attribution", description: "Identify how much of your profit is directly attributed to the AI's interventions." }
      ]
    },
    {
      id: "multi-asset",
      icon: <CandlestickChart className="h-10 w-10 text-lucent-purple" />,
      title: "Multi-Asset Compatibility",
      description: "Trade across multiple asset classes from a single platform.",
      points: [
        { title: "Forex & Crypto Support", description: "Trade leading currency pairs and major crypto assets." },
        { title: "Stocks & Other Markets", description: "Optional modules for broadening investment horizons." },
        { title: "Seamless Portfolio Integration", description: "Consolidated view of all assets and consolidated net worth." }
      ]
    },
    {
      id: "user-controls",
      icon: <Settings className="h-10 w-10 text-lucent-purple" />,
      title: "Advanced User Controls",
      description: "Flexible options for customization and control.",
      points: [
        { title: "Manual Override", description: "Users can opt to manually override the AI's decisions." },
        { title: "Scheduling & Automation", description: "Define which hours or market conditions the AI trades automatically." }
      ]
    },
    {
      id: "security",
      icon: <Lock className="h-10 w-10 text-lucent-purple" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security and regulatory compliance.",
      points: [
        { title: "Bank-Grade Encryption", description: "Safeguarding user data and financial transactions." },
        { title: "Regulatory Compliance", description: "Complying with global standards and broker regulations." },
        { title: "Regular Audits", description: "Third-party checks on technology, data, and reliability." }
      ]
    },
    {
      id: "integration",
      icon: <ArrowRightLeft className="h-10 w-10 text-lucent-purple" />,
      title: "Seamless Integration & Onboarding",
      description: "Quick and easy setup to start trading with AI assistance.",
      points: [
        { title: "Broker-Agnostic", description: "Connect easily to a range of supported brokers." },
        { title: "Quick Start Process", description: "A guided wizard for setup, ensuring even beginners can start trading immediately." },
        { title: "Dedicated Support", description: "Round-the-clock customer service to help with technical or account queries." }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-lucent-deep-blue py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/grid-pattern.svg')" }}></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Advanced <span className="gradient-text">AI-Driven</span> Trading Features
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover how Lucent AI's sophisticated technology can transform your trading experience with automation, intelligence, and precision.
              </p>
            </div>
          </div>
        </div>
        
        {/* Features Overview */}
        <div className="py-16 bg-lucent-navy">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FeatureSection features={features} />
          </div>
        </div>
        
        {/* Detailed Features */}
        <div className="py-16 bg-lucent-deep-blue">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {features.map((feature, index) => (
              <FeatureDetail 
                key={feature.id}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;

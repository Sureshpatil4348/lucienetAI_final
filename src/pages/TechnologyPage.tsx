import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Cpu, Brain, Database, LineChart, Network, Lock, 
  Globe, AlarmClock, Zap, Code, BarChart4, ArrowRight, 
  CircleCheck, ChevronRight, Activity, ScrollText,
  Lightbulb, TrendingUp, CheckCircle2
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion";

const DataVisualization = ({ data }: { data: number[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  return (
    <div ref={containerRef} className="h-60 w-full relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
      <svg className="w-full h-full" viewBox="0 0 1000 200">
        <motion.path
          initial={{ pathLength: 0 }}
          style={{ pathLength: scrollYProgress }}
          transition={{ duration: 0.5 }}
          d={`M 0,100 ${data.map((value, index) => `L ${index * (1000 / (data.length - 1))},${100 - value}`).join(' ')}`}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeDasharray="10,5"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          style={{
            left: `${index * (100 / (data.length - 1))}%`,
            bottom: `${value / 2}%`,
          }}
        />
      ))}
    </div>
  );
};

const CodeExample = ({ code, language }: { code: string, language: string }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 overflow-auto max-h-80">
      <div className="flex items-center justify-between mb-2 text-gray-400 text-xs">
        <span>{language}</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="text-gray-300 font-mono text-sm">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
};

const InteractiveCard = ({ 
  title, 
  description, 
  icon, 
  stats,
  color
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode,
  stats: { label: string, value: string }[],
  color: string
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-${color}-500/20`}
      style={{ 
        background: `radial-gradient(circle at 100% 0%, rgba(${color === 'purple' ? '138, 43, 226' : color === 'blue' ? '79, 70, 229' : color === 'pink' ? '219, 39, 119' : '59, 130, 246'}, 0.15) 0%, rgba(0, 0, 0, 0) 50%)`
      }}
    >
      <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-${color}-500/10 blur-3xl transition-all duration-500 group-hover:bg-${color}-500/20`}></div>
      
      <div className="flex items-start justify-between">
        <div className="mb-4">
          <div className={`inline-flex items-center justify-center rounded-xl bg-${color}-500/20 p-2 text-${color}-500`}>
            {icon}
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="space-y-3 mt-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{stat.label}</span>
            <span className={`text-sm font-medium text-${color}-400`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// 3D Cube animation using pure CSS
const CubeAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="scene w-64 h-64 perspective-1000 mx-auto">
        <div className="cube relative preserve-3d w-full h-full transition-transform duration-1000 animate-spin-slow">
          <div className="cube-face absolute w-64 h-64 border-2 border-purple-500/30 bg-purple-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-5xl font-bold text-purple-300">AI</div>
          <div className="cube-face absolute w-64 h-64 border-2 border-blue-500/30 bg-blue-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-5xl font-bold text-blue-300">ML</div>
          <div className="cube-face absolute w-64 h-64 border-2 border-pink-500/30 bg-pink-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-5xl font-bold text-pink-300">DL</div>
          <div className="cube-face absolute w-64 h-64 border-2 border-indigo-500/30 bg-indigo-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-5xl font-bold text-indigo-300">NLP</div>
          <div className="cube-face absolute w-64 h-64 border-2 border-violet-500/30 bg-violet-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-5xl font-bold text-violet-300">RL</div>
          <div className="cube-face absolute w-64 h-64 border-2 border-purple-500/30 bg-purple-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-5xl font-bold text-purple-300">CV</div>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-30"></div>
      </div>
    </div>
  );
};

const TechnologyPage = () => {
  const aiDecisionsRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState("ai");
  const controls = useAnimation();
  const mainControls = useAnimation();
  
  useEffect(() => {
    document.title = "Technology - Pinaxa Labs";
    
    // Add required CSS for cube animation and data flow
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .perspective-1000 { perspective: 1000px; }
      .preserve-3d { transform-style: preserve-3d; }
      .animate-spin-slow { animation: spin 20s linear infinite; }
      @keyframes spin {
        0% { transform: rotateX(0) rotateY(0); }
        100% { transform: rotateX(360deg) rotateY(360deg); }
      }
      .cube-face {
        transform-origin: center;
      }
      .cube-face:nth-child(1) { transform: translateZ(120px); }
      .cube-face:nth-child(2) { transform: rotateY(180deg) translateZ(120px); }
      .cube-face:nth-child(3) { transform: rotateY(90deg) translateZ(120px); }
      .cube-face:nth-child(4) { transform: rotateY(-90deg) translateZ(120px); }
      .cube-face:nth-child(5) { transform: rotateX(90deg) translateZ(120px); }
      .cube-face:nth-child(6) { transform: rotateX(-90deg) translateZ(120px); }

      @keyframes data-flow {
        0% { transform: translateX(-10px); }
        100% { transform: translateX(1000px); }
      }
      .animate-data-flow {
        animation: data-flow 5s linear infinite;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const dataPoints = Array.from({ length: 50 }, () => Math.random() * 100);
  
  const pythonCode = `
# AI Trading Model Example
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

class PinaxaModel:
    def __init__(self):
        self.name = "Pinaxa AI Trading Model"
        self.version = "2.0"
        self.description = "Advanced machine learning model for market prediction"
        
    def prepare_features(self, data):
        # Complex feature engineering
        features = self._extract_technical_indicators(data)
        features = self._apply_sentiment_analysis(features)
        return features
        
    def predict(self, market_data):
        predictions = []
        probabilities = []
        
        for model in self.models:
            pred, prob = model.predict(market_data)
            predictions.append(pred)
            probabilities.append(prob)
            
        # Ensemble voting with confidence weighting
        final_pred = self._weighted_ensemble(predictions, probabilities)
        confidence = self._calculate_confidence(probabilities)
        
        return final_pred, confidence
`;

  const aiCapabilities = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Neural Networks",
      description: "Deep learning architecture specifically optimized for financial time series analysis",
      stats: [
        { label: "Model Depth", value: "18 layers" },
        { label: "Training Data", value: "12TB+" },
        { label: "Accuracy", value: "78.4%" }
      ],
      color: "purple"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Big Data Processing",
      description: "Real-time data ingestion and processing from global markets and alternative sources",
      stats: [
        { label: "Process Speed", value: "50ms" },
        { label: "Data Sources", value: "200+" },
        { label: "Daily Volume", value: "8TB" }
      ],
      color: "blue"
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Predictive Modeling",
      description: "Ensemble of specialized models for different market conditions and time frames",
      stats: [
        { label: "Model Types", value: "12+" },
        { label: "Signals/Day", value: "120K+" },
        { label: "Profit Margin", value: "27%" }
      ],
      color: "pink"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Security Framework",
      description: "Enterprise-grade security protecting both infrastructure and trading activities",
      stats: [
        { label: "Encryption", value: "256-bit" },
        { label: "Security Audits", value: "Monthly" },
        { label: "Auth Layers", value: "4" }
      ],
      color: "blue"
    }
  ];

  const capabilities = [
    {
      title: "Artificial Intelligence",
      id: "ai",
      icon: <Brain className="h-6 w-6" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {aiCapabilities.slice(0, 2).map((cap, idx) => (
            <InteractiveCard key={idx} {...cap} />
          ))}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-gray-700 overflow-hidden bg-black/30 backdrop-blur-sm"
            >
              <div className="absolute inset-0">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
              </div>
              
              <div className="p-8 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center mb-6 ai-decisions-section"
                >
                  <div className="flex-shrink-0 mr-4 p-2 rounded-lg bg-lucent-purple/10">
                    <Brain className="h-7 w-7 text-lucent-purple" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">How Our AI Makes Decisions</h3>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl"></div>
                    <motion.div 
                      className="relative space-y-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {[
                        {
                          title: "Multi-Layer Analysis",
                          desc: "Combines technical, fundamental, and sentiment data",
                          icon: <Lightbulb className="h-5 w-5" />,
                          color: "from-green-500 to-emerald-500"
                        },
                        {
                          title: "Adaptive Learning",
                          desc: "Continuously improves from market feedback",
                          icon: <TrendingUp className="h-5 w-5" />,
                          color: "from-blue-500 to-indigo-500"
                        },
                        {
                          title: "Risk-Adjusted Output",
                          desc: "Balances return potential with confidence levels",
                          icon: <Activity className="h-5 w-5" />,
                          color: "from-purple-500 to-violet-500"
                        }
                      ].map((item, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                          className="flex p-4 rounded-xl bg-gray-800/40 border border-gray-700/70 backdrop-blur-sm"
                        >
                          <div className="flex-shrink-0 mt-1 mr-4">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg`}>
                              {item.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-white mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-300">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      viewport={{ once: true }}
                      className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20"
                    >
                      <div className="flex items-center mb-2">
                        <CircleCheck className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="text-sm font-medium text-white">Success Rate</h4>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">98.7%</div>
                        <div className="text-xs text-gray-400">Based on historical trading patterns</div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="lg:col-span-7"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-1 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20">
                      <CodeExample code={pythonCode} language="Python" />
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                      className="mt-4 grid grid-cols-3 gap-3"
                    >
                      {[
                        { label: "Ensemble Models", value: "12+" },
                        { label: "Features Used", value: "1,250" },
                        { label: "Decision Time", value: "~50ms" }
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center p-2 rounded-lg bg-gray-800/40 border border-gray-700/50">
                          <div className="text-sm text-gray-400">{stat.label}</div>
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          {aiCapabilities.slice(2).map((cap, idx) => (
            <InteractiveCard key={idx} {...cap} />
          ))}
        </div>
      )
    },
    {
      title: "Data Pipeline",
      id: "data",
      icon: <Database className="h-6 w-6" />,
      content: (
        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-700 overflow-hidden bg-gradient-to-br from-lucent-deep-blue/80 to-lucent-navy/90 backdrop-blur-sm shadow-xl">
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
                  <Database className="h-7 w-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Real-Time Data Processing Flow</h3>
                  <p className="text-gray-400 mt-1">Our proprietary data pipeline processes millions of data points per second</p>
                </div>
              </div>
              
              <div className="relative">
                {/* Modern Pipeline visualization with glow effect */}
                <div className="flex flex-col md:flex-row items-stretch justify-between mb-12 relative">
                  {/* Removing the problematic animated data flow line */}
                  
                  {["Data Collection", "Processing & Cleaning", "Feature Extraction", "AI Analysis", "Signal Generation"].map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="relative z-10 flex-1 flex flex-col items-center text-center p-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-purple-500/50 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20 transform hover:scale-110 transition-all duration-300 group">
                        <span className="text-white font-bold text-xl group-hover:text-purple-300 transition-colors duration-300">{idx + 1}</span>
                      </div>
                      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 w-full transform hover:-translate-y-1 transition-all duration-300">
                        <h4 className="text-sm font-semibold text-white mb-2 text-purple-300">{step}</h4>
                        <p className="text-xs text-gray-400">
                          {idx === 0 && "Gathering data from 200+ global sources"}
                          {idx === 1 && "Filtering noise and normalizing formats"}
                          {idx === 2 && "Identifying patterns and key indicators"}
                          {idx === 3 && "Applying AI models to processed data"}
                          {idx === 4 && "Generating actionable trade signals"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                  >
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-blue-900/30 to-transparent">
                      <h4 className="text-sm font-medium text-white">Data Processing Speed</h4>
                      <div className="px-2 py-1 bg-blue-500/10 rounded-full text-xs text-blue-400 flex items-center">
                        <Zap className="h-3 w-3 mr-1" />
                        <span>50ms Response</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <DataVisualization data={dataPoints} />
                      <div className="mt-2 flex justify-between text-xs text-gray-400">
                        <span>0ms</span>
                        <span>1000ms</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                  >
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-purple-900/30 to-transparent">
                      <h4 className="text-sm font-medium text-white">Daily Data Volume</h4>
                      <div className="px-2 py-1 bg-purple-500/10 rounded-full text-xs text-purple-400 flex items-center">
                        <Database className="h-3 w-3 mr-1" />
                        <span>8TB+ Processed</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Market Data", value: "4.2 TB", color: "blue", percentage: 52 },
                          { label: "News & Social", value: "1.8 TB", color: "purple", percentage: 23 },
                          { label: "Economic Indicators", value: "0.8 TB", color: "pink", percentage: 10 },
                          { label: "Proprietary Sources", value: "1.2 TB", color: "indigo", percentage: 15 }
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-800/80 rounded-lg p-4 relative overflow-hidden border border-gray-700 hover:border-gray-600 group transition-all duration-300"
                          >
                            <div 
                              className={`absolute bottom-0 left-0 right-0 bg-${item.color}-500/20 z-0 group-hover:bg-${item.color}-500/30 transition-all duration-300`} 
                              style={{ height: `${item.percentage}%` }}
                            ></div>
                            <div className="relative z-10">
                              <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                              <div className={`text-xl font-bold text-${item.color}-400`}>{item.value}</div>
                              <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-gray-700 overflow-hidden bg-gradient-to-br from-lucent-deep-blue/80 to-lucent-navy/90 backdrop-blur-sm shadow-xl"
          >
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                  <Globe className="h-7 w-7 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Advanced Data Sources</h3>
                  <p className="text-gray-400 mt-1">Comprehensive multi-source data integration for holistic market analysis</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Global Market Data", count: "75+ exchanges", icon: <Globe className="h-5 w-5" />, color: "blue" },
                  { name: "News & Social Analysis", count: "50+ major sources", icon: <ScrollText className="h-5 w-5" />, color: "purple" },
                  { name: "Economic Indicators", count: "35+ global indicators", icon: <Activity className="h-5 w-5" />, color: "pink" },
                  { name: "Proprietary Signals", count: "15+ exclusive datasets", icon: <Zap className="h-5 w-5" />, color: "amber" },
                  { name: "Technical Indicators", count: "125+ indicators", icon: <BarChart4 className="h-5 w-5" />, color: "green" },
                  { name: "Sentiment Analysis", count: "7 languages", icon: <Code className="h-5 w-5" />, color: "indigo" },
                ].map((source, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-center p-4 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-${source.color}-500/20 hover:border-${source.color}-500/40 transition-all duration-300 group`}
                  >
                    <div className={`flex-shrink-0 mr-4 h-12 w-12 rounded-xl bg-${source.color}-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                      <div className={`text-${source.color}-400`}>
                        {source.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">{source.name}</div>
                      <div className="text-xs text-gray-400">{source.count}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: "Performance",
      id: "performance",
      icon: <Activity className="h-6 w-6" />,
      content: (
        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-700 overflow-hidden bg-gradient-to-br from-lucent-deep-blue/80 to-lucent-navy/90 backdrop-blur-sm shadow-xl">
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 rounded-lg bg-green-500/10 flex-shrink-0">
                  <Activity className="h-7 w-7 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Trading Performance Metrics</h3>
                  <p className="text-gray-400 mt-1">Industry-leading performance across all market conditions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    title: "Prediction Accuracy", 
                    value: "78.4%", 
                    subtitle: "Historical performance", 
                    color: "purple",
                    icon: <Zap className="h-5 w-5" />,
                    description: "Percentage of correct market direction predictions"
                  },
                  { 
                    title: "Average Return", 
                    value: "+27%", 
                    subtitle: "Generated per quarter", 
                    color: "green",
                    icon: <TrendingUp className="h-5 w-5" />,
                    description: "Average quarterly returns across all trading accounts" 
                  },
                  { 
                    title: "Processing Speed", 
                    value: "50ms", 
                    subtitle: "Average response time", 
                    color: "blue",
                    icon: <AlarmClock className="h-5 w-5" />,
                    description: "Time from data acquisition to trading signal generation" 
                  },
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Background glow effect */}
                    <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-${metric.color}-500/5 blur-3xl transition-all duration-500 group-hover:bg-${metric.color}-500/15`}></div>
                    
                    <div className="flex items-center mb-4">
                      <div className={`h-10 w-10 rounded-lg bg-${metric.color}-500/20 flex items-center justify-center mr-4`}>
                        <div className={`text-${metric.color}-400`}>{metric.icon}</div>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
                    </div>
                    
                    <div className={`text-4xl font-bold text-${metric.color}-500 mb-2`}>{metric.value}</div>
                    <p className="text-sm text-gray-400 mb-3">{metric.subtitle}</p>
                    
                    <div className="h-1.5 w-full bg-gray-800 rounded-full mb-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: metric.title === "Prediction Accuracy" ? "98.7%" : metric.title === "Average Return" ? "70%" : "90%" }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className={`h-full rounded-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400`}
                      ></motion.div>
                    </div>
                    
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-gray-700 overflow-hidden bg-gradient-to-br from-lucent-deep-blue/80 to-lucent-navy/90 backdrop-blur-sm shadow-xl"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="mr-4 p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
                    <BarChart4 className="h-7 w-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Performance By Market Condition</h3>
                    <p className="text-gray-400 mt-1">Our AI adapts to all market environments</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-green-500/10 rounded-lg text-xs text-green-400 flex items-center border border-green-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  <span>Independently Verified</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { condition: "Bull Market", accuracy: 70.1, return: 31.2, confidence: 95.8, color: "green" },
                  { condition: "Bear Market", accuracy: 68.8, return: 22.3, confidence: 91.2, color: "red" },
                  { condition: "Sideways Market", accuracy: 85.5, return: 19.8, confidence: 93.5, color: "amber" },
                  { condition: "High Volatility", accuracy: 88.2, return: 29.7, confidence: 89.6, color: "purple" },
                ].map((condition, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 border border-${condition.color}-500/20 hover:border-${condition.color}-500/40 transition-all duration-300`}
                  >
                    <div className="flex flex-wrap items-center justify-between mb-5">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-lg bg-${condition.color}-500/20 flex items-center justify-center mr-3`}>
                          {idx === 0 ? <TrendingUp className={`h-5 w-5 text-${condition.color}-400`} /> : 
                           idx === 1 ? <TrendingUp className={`h-5 w-5 text-${condition.color}-400 transform rotate-180`} /> : 
                           idx === 2 ? <ArrowRight className={`h-5 w-5 text-${condition.color}-400`} /> : 
                           <Activity className={`h-5 w-5 text-${condition.color}-400`} />}
                        </div>
                        <h4 className="text-lg font-semibold text-white">{condition.condition}</h4>
                      </div>
                      <div className="text-xs px-3 py-1.5 rounded-lg bg-gray-800/80 text-gray-300 border border-gray-700">
                        Active Model: <span className={`text-${condition.color}-400 font-medium`}>
                          {idx === 0 ? "Momentum+" : idx === 1 ? "DefensiveEdge" : idx === 2 ? "TrendSpotter" : "VolatilityMaster"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-gray-400">Accuracy</div>
                          <div className="text-sm text-blue-400 font-medium">{condition.accuracy}%</div>
                        </div>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-700">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${condition.accuracy}%` }}
                              transition={{ delay: 0.2, duration: 1 }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-gray-400">Return</div>
                          <div className="text-sm text-green-400 font-medium">+{condition.return}%</div>
                        </div>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-700">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(condition.return/40)*100}%` }}
                              transition={{ delay: 0.4, duration: 1 }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-gray-400">Confidence</div>
                          <div className="text-sm text-purple-400 font-medium">{condition.confidence}%</div>
                        </div>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-700">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${condition.confidence}%` }}
                              transition={{ delay: 0.6, duration: 1 }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-gray-700 overflow-hidden bg-gradient-to-br from-lucent-deep-blue/80 to-lucent-navy/90 backdrop-blur-sm shadow-xl"
          >
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                  <Globe className="h-7 w-7 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Global Performance Edge</h3>
                  <p className="text-gray-400 mt-1">How Pinaxa Labs outperforms traditional trading approaches</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                    Comparative Performance
                  </h4>
                  
                  <div className="space-y-6">
                    {[
                      { metric: "Annual Return", lucent: 37.8, benchmark: 9.2, market: 12.4 },
                      { metric: "Sharpe Ratio", lucent: 2.8, benchmark: 1.3, market: 0.8 },
                      { metric: "Max Drawdown", lucent: 8.5, benchmark: 14.7, market: 21.3, lower: true },
                      { metric: "Win Rate", lucent: 78.4, benchmark: 61.2, market: 58.7 },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{item.metric}</span>
                          <div className="flex items-center space-x-1 text-xs">
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">Pinaxa Labs</span>
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">Hedge Fund Avg.</span>
                            <span className="px-2 py-0.5 rounded bg-gray-500/20 text-gray-400">S&P 500</span>
                          </div>
                        </div>
                        
                        <div className="relative h-8 w-full bg-gray-800 rounded-lg overflow-hidden">
                          {/* S&P 500 */}
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: item.lower ? `${(1-(item.market/30))*100}%` : `${(item.market/40)*100}%` }}
                            transition={{ delay: 0.2, duration: 1 }}
                            className="absolute h-8 rounded-r-lg bg-gray-600/50 flex items-center"
                          >
                            <span className="absolute right-2 text-xs text-white">
                              {item.metric === "Annual Return" || item.metric === "Win Rate" ? 
                                `${item.market}%` : item.market}
                            </span>
                          </motion.div>
                          
                          {/* Hedge Fund */}
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: item.lower ? `${(1-(item.benchmark/30))*100}%` : `${(item.benchmark/40)*100}%` }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="absolute h-8 rounded-r-lg bg-blue-600/40 flex items-center"
                          >
                            <span className="absolute right-2 text-xs text-white">
                              {item.metric === "Annual Return" || item.metric === "Win Rate" ? 
                                `${item.benchmark}%` : item.benchmark}
                            </span>
                          </motion.div>
                          
                          {/* Pinaxa Labs */}
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: item.lower ? `${(1-(item.lucent/30))*100}%` : `${(item.lucent/40)*100}%` }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="absolute h-8 rounded-r-lg bg-gradient-to-r from-purple-600 to-purple-400 flex items-center"
                          >
                            <span className="absolute right-2 text-xs text-white font-medium">
                              {item.metric === "Annual Return" || item.metric === "Win Rate" ? 
                                `${item.lucent}%` : item.lucent}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CircleCheck className="h-5 w-5 mr-2 text-green-400" />
                    Performance Highlights
                  </h4>
                  
                  <ul className="space-y-4">
                    {[
                      "12X higher returns than the Eurekahedge FX Fund Index over the last 1 year ",
                      "31 consecutive profitable months across both bull and bear markets",
                      "Zero negative months during major market downturns of 2022-2023",
                      "Profitable in 94% of trading weeks since inception",
                      "6.2% lower maximum drawdown compared to industry average"
                    ].map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          <CircleCheck className="h-3 w-3 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-300">{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with CSS 3D Animation */}
          <div className="relative mb-24">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lucent-purple/10 text-lucent-purple mb-6">
                  <Cpu className="h-4 w-4 mr-2" />
                  Advanced Trading Technology
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lucent-purple via-blue-400 to-purple-500">
                  Next-Gen AI<br/>Trading Engine
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our proprietary technology stack combines cutting-edge AI with real-time data processing
                  to predict market movements with unmatched <span className="text-lucent-purple font-semibold">Accuracy</span>.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    type="button"
                    onClick={() => {
                      setCurrentSection('ai');
                      console.log('Button clicked');
                      const section = document.querySelector('.ai-decisions-section');
                      if (section) {
                        console.log('Section found');
                        section.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        console.log('Section not found');
                      }
                    }}
                    className="inline-flex items-center py-3 px-6 bg-lucent-purple hover:bg-purple-600 text-white font-medium rounded-lg transition-all duration-200 hover:cursor-pointer"
                  >
                    Explore Technology
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  
                  <a 
                    href="#technical" 
                    className="inline-flex items-center py-3 px-6 bg-transparent hover:bg-gray-800 text-white font-medium rounded-lg border border-gray-700 transition-all duration-200"
                  >
                    Technical Specs
                  </a>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-6">
                  {[
                    { value: "10 years+", label: "Backtesting" },
                    { value: "50ms", label: "Response Time" },
                    { value: "200+", label: "Data Sources" }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="h-[400px] relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lucent-purple/20 to-blue-600/20 rounded-2xl filter blur-3xl opacity-30"></div>
                <div className="h-full w-full relative z-10">
                  <CubeAnimation />
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Technology Navigation */}
          <div id="explore" className="mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 md:gap-6"
            >
              {capabilities.filter(cap => cap.id !== "data").map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => setCurrentSection(cap.id)}
                  className={`flex items-center px-5 py-3 rounded-lg transition-all duration-200 ${
                    currentSection === cap.id
                      ? "bg-lucent-purple text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">{cap.icon}</span>
                  <span className="font-medium">{cap.title}</span>
                </button>
              ))}
            </motion.div>
          </div>
          
          {/* Content Sections */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-24"
          >
            {capabilities.find(c => c.id === currentSection)?.content}
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-16 px-4 sm:px-6 lg:px-8 rounded-2xl bg-gradient-to-r from-lucent-purple/20 via-blue-900/20 to-purple-900/20 border border-lucent-purple/30"
          >
            <h2 className="text-3xl font-bold mb-4">Experience the Pinaxa Labs Advantage</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of traders who are leveraging our breakthrough technology to make smarter, data-driven decisions in the market.
            </p>
            <a 
              href="https://calendly.com/pinaxalabs/30min" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center py-4 px-8 bg-lucent-purple hover:bg-purple-600 text-white font-medium rounded-lg shadow-lg shadow-lucent-purple/30 transition-all duration-200"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TechnologyPage;

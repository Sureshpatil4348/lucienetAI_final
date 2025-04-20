import React from "react";
import { motion } from "framer-motion";
import AIAnalysisSection from "@/components/AIAnalysisSection";
import Navbar from "@/components/Navbar";

const AIAnalysis = () => {
  return (
    <div className="min-h-screen bg-lucent-navy">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">AI Market Analysis</h1>
            <p className="text-gray-400">
              Real-time market analysis powered by our advanced AI algorithms, analyzing multiple timeframes with Super Trend indicators.
            </p>
          </div>

          <AIAnalysisSection />
        </motion.div>
      </main>
    </div>
  );
};

export default AIAnalysis; 
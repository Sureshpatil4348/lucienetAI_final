import React from 'react';
import AIAnalysisSection from '../components/AIAnalysisSection';

const AIAnalysisPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Market Analysis</h1>
        <p className="text-gray-600">
          Real-time market analysis powered by advanced AI algorithms and the Super Trend indicator.
          Analyzing EURUSD, XAUUSD, BTCUSD, and ETHUSD across multiple timeframes.
        </p>
      </div>
      
      <AIAnalysisSection />
    </div>
  );
};

export default AIAnalysisPage; 
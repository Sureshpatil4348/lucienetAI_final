import React from 'react';
import AIAnalysisSection from '@/components/AIAnalysisSection';

export const metadata = {
  title: 'AI Analysis | Lucent AI Horizon',
  description: 'Real-time AI-driven market analysis using Super Trend indicators across multiple timeframes.',
};

export default function AIAnalysisPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Market Analysis</h1>
        <p className="text-gray-600">
          Real-time analysis of major currency pairs and crypto assets using Super Trend indicators
          across multiple timeframes to predict market movements.
        </p>
      </div>
      
      <AIAnalysisSection />
    </main>
  );
} 

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import TradingInterface from "@/components/TradingInterface";
import AboutUs from "@/components/AboutUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Lucent AI - Advanced AI-Driven Trading Solutions";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Driven <span className="gradient-text">Trading Interface</span>
              </h2>
              <p className="text-gray-300">
                Experience the power of our Master Trader AI with real-time market analysis and trade monitoring.
              </p>
            </div>
            <TradingInterface />
          </div>
        </div>
        
        <FeaturesOverview />
        <AboutUs />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

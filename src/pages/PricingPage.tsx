
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DollarSign } from "lucide-react";

const PricingPage = () => {
  useEffect(() => {
    document.title = "Pricing - Lucent AI";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <DollarSign className="h-16 w-16 text-lucent-purple mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Pricing Page</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              This page would contain detailed pricing information for Lucent AI's services.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;

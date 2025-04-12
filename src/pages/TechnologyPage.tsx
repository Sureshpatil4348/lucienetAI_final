
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cpu } from "lucide-react";

const TechnologyPage = () => {
  useEffect(() => {
    document.title = "Technology - Lucent AI";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Cpu className="h-16 w-16 text-lucent-purple mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Technology Page</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              This page would contain detailed information about the AI technology behind Lucent AI.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TechnologyPage;

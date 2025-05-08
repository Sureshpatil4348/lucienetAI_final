import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us - Pinaxa Labs";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <AboutUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

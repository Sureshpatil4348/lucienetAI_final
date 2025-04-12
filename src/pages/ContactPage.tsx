
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Us - Lucent AI";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;

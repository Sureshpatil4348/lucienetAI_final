import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Lucent AI Horizon";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none">
            <p>
              Pinaxa Labs considers your privacy one of our utmost concerns. This Privacy Notice outlines our current policies and practices regarding how information about individual customers is collected and used. Should any portion of our current policies and practices change you will be sent a revised Privacy Notice in advance, thus providing you with sufficient notice to respond before the effective date of the change.
            </p>
            <p>
              To provide you with individualized service, Pinaxa Labs collects information about you from the forms you submit to us via our website, or to other forex firms that we work with. We use this information to contact you (if necessary), follow up with the status of your application with the firms we work with, process your requests, and provide you with additional information about products and services.
            </p>
            <p>
              We do not disclose any non-public personal information about our customers to other independent firms, organizations, or individuals except in furtherance of our business relationship with others which include but are not limited to testimonials, recommendations, personal experiences, or if compelled to do so by due process of law.
            </p>
            <p>
              We restrict access to non-public personal information about you to those employees who need to know that information to provide products or services to you. We maintain physical, electronic, and procedural safeguards that comply with federal standards to guard your personal information.
            </p>
            <p>
              Should you have any questions or concerns about this Privacy Notice or the privacy of your personal information, please feel free to contact support@Pinaxa Labs.com for further information.
            </p>
            <p>
              For users who register on our website (if any), we also store the personal information they provide in their user profiles. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimer</h2>
            <p>
              Pinaxa Labs Private Limited is primarily a software firm and is not registered as a financial advisory organization. We do not engage in financial advisory, investing, or financial planning services. The information presented on our website and within this document, including details about our software products and services, is intended for informational and self-help purposes only. It should not be considered a substitute for professional financial advice.
            </p>
            <p>
              Users of our website and readers of this document should be aware that the information provided here is subject to our Terms of Use. We strongly recommend conducting independent research, thoroughly understanding the associated risks, and ensuring full compliance with the regulations and laws of your respective country.
            </p>
            <p>
              It's important to recognize that our software products and services carry inherent market risks, and past performance does not guarantee future results. Before making any investment decisions, we urge you to consult with qualified and registered financial experts who can provide personalized advice based on your circumstances.
            </p>
            <p>
              Pinaxa Labs Private Limited bears no legal liability for any financial losses incurred by individuals or entities. By using the information provided on our website or in this document, you acknowledge that you have read, understood, and accepted the terms of this disclaimer.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage; 
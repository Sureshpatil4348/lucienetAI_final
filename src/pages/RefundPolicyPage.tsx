import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicyPage = () => {
  useEffect(() => {
    document.title = "Refund Policy | Lucent AI Horizon";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">WE OFFER NO REFUNDS</h2>
            <p>
              In trading currencies in the FOREX market people can and often do lose money. Past performance is not an indication of, nor a guarantee of future performance of any system or method as markets can change.
            </p>
            <p>
              No guarantee is or can be given that any system or method will continue to perform similarly in the future. If you have any doubts about trading currencies using any system or method offered here you should first consult your own financial advisor.
            </p>
            <p>
              Hypothetical or simulated performance results have certain inherent limitations. Unlike an actual performance record, simulated results do not represent actual trading. Further, since the trades have not actually been executed, the results may have under compensated or over compensated for the impact, if any, of certain market factors, such as lack of liquidity.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Refund Exclusions</h2>
            <p>
              Please note that users who filed a chargeback/dispute request or a claim are not eligible for a refund. Refunds or account credits will not be issued in situations as follows:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>You are not able to activate the Bot Mudra Software in time before your membership/license expires.</li>
              <li>You experience dissatisfaction with our system after purchase.</li>
              <li>You have changed your mind about using our product and service.</li>
              <li>You purchased our product/services by mistake.</li>
              <li>You do not have sufficient expertise to use our system.</li>
              <li>You have purchased multiple licenses for Bot Mudra's 14-day trial and are now requesting a refund.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RefundPolicyPage; 
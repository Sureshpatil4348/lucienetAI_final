import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfServicePage = () => {
  useEffect(() => {
    document.title = "Terms of Service | Lucent AI Horizon";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">NOTICE AND TERMS OF USE</h2>
            <p>
              Trading currencies in the FOREX (foreign exchange) market is not for everyone as it involves substantial risk. In addition, emotional factors may influence a person's ability to trade any trading system, including all systems offered on this website.
            </p>
            <p>
              In purchasing robot offered on this website you agree that any and all use of any offered system or method is solely at your own risk and without any recourse whatsoever to the seller, seller's associates, subsidiaries, agents or partners. You understand that you are using any system offered here entirely at your own risk.
            </p>
            <p>
              Please take note that Bot Mudra's 14-day trial is a one-time offer to every new customer. Each customer is only eligible to purchase a trial license once. Subsequent purchases will not be issued a License ID, and they will not be eligible for a refund.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">SOFTWARE REQUIREMENTS</h2>
            <p>
              All of our software requires MetaTrader 4 to run. MetaTrader 4 is a free trading platform offered by hundreds of forex brokers. By purchasing our digital software, you agree that you already have or will install MetaTrader 4. MetaTrader 4 is primarily a Windows program but can be installed on other operating systems like Mac OS and Linux using virtualization. We do not support MetaTrader 5.
            </p>
            <p>
              Robots cannot be run from mobile phones or tablets. Our software requires a personal computer, laptop, or a VPS running the Windows operating system. By purchasing you are acknowledging you have one of these to use the software.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">END USER LICENSE AGREEMENT</h2>
            <p>
              This Botmudra License Agreement (hereafter the "Agreement") is BETWEEN: Botmudra Private Limited, a company incorporated under the laws of India with its registered office at DevinderVihar, Sector-56, Gurgaon,122011 and unique entity number U62013HR2023PTC114101 (the "Supplier") and the "Purchaser", an individual or a company which has purchased Botmudra's software-as-a-service (SAAS) forex trading Software.
            </p>
            <p>
              This End-User License Agreement ("EULA") is a legal agreement between you (either an individual or a single entity) and BOTMUDRA Trading Software product(s) identified above which may include associated software components, media, printed materials, and "online" or electronic documentation ("BOTMUDRA Trading Software "). By installing, copying, or otherwise using the BOTMUDRA Trading Software, you agree to be bound by the terms of this EULA.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">1. GRANT OF LICENSE</h3>
            <p>
              The Software is licensed, not sold. This Agreement gives you limited rights to use the Software. The Supplier retains all rights, title, and interest in and to the Software, including all intellectual property rights. All rights not specifically granted in this Agreement are reserved by the Supplier.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">2. LICENSE RESTRICTIONS</h3>
            <p>
              You may not:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Modify, reverse engineer, decompile, or disassemble the Software</li>
              <li>Create derivative works based on the Software</li>
              <li>Copy the Software except for backup purposes</li>
              <li>Rent, lease, lend, sell, redistribute, sublicense, or transfer the Software</li>
              <li>Remove or alter any proprietary notices or labels on the Software</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">3. TERM AND TERMINATION</h3>
            <p>
              This Agreement is effective until terminated. Your rights under this Agreement will terminate automatically without notice if you fail to comply with any of its terms. Upon termination, you must cease all use of the Software and destroy all copies.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">4. WARRANTY DISCLAIMER</h3>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. THE SUPPLIER DISCLAIMS ALL WARRANTIES AND CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">5. LIMITATION OF LIABILITY</h3>
            <p>
              IN NO EVENT SHALL THE SUPPLIER BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, LOSS OF BUSINESS INFORMATION, OR ANY OTHER PECUNIARY LOSS) ARISING OUT OF THE USE OF OR INABILITY TO USE THE SOFTWARE.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">6. GOVERNING LAW</h3>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">GOVERNMENT REQUIRED RISK DISCLAIMER</h2>
            <p>
              CFTC RULE 4.41 – HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT BEEN EXECUTED, THE RESULTS MAY HAVE UNDER-OR- OVER COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY. SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT.
            </p>
            <p>
              NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFIT OR LOSSES SIMILAR TO THOSE SHOWN. GOVERNMENT REGULATIONS REQUIRE DISCLOSURE OF THE FACT THAT WHILE THESE METHODS MAY HAVE WORKED IN THE PAST, PAST RESULTS ARE NOT NECESSARILY INDICATIVE OF FUTURE RESULTS.
            </p>
            <p>
              WHILE THERE IS A POTENTIAL FOR PROFITS THERE IS ALSO A RISK OF LOSS. A LOSS INCURRED IN CONNECTION WITH TRADING FUTURES, STOCKS, FOREX, OPTIONS OR ANY KIND OF OTHER TRADING PRODUCTS CAN BE SIGNIFICANT. YOU SHOULD THEREFORE CAREFULLY CONSIDER WHETHER SUCH TRADING IS SUITABLE FOR YOU IN LIGHT OF YOUR FINANCIAL CONDITION SINCE ALL SPECULATIVE TRADING IS INHERENTLY RISKY AND SHOULD ONLY BE UNDERTAKEN BY INDIVIDUALS WITH ADEQUATE RISK CAPITAL.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfServicePage; 
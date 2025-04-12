
import React from "react";
import { 
  Award, 
  Lightbulb, 
  Users, 
  ShieldCheck, 
  BarChart,
  Briefcase
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="py-20 bg-lucent-deep-blue relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lucent-purple/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The <span className="gradient-text">Team</span> Behind the Technology
          </h2>
          <p className="text-gray-300">
            A group of visionary quants, AI specialists, and finance experts dedicated to revolutionizing the trading industry through artificial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg mb-2">Our Vision</h4>
                  <p className="text-gray-400">
                    To democratize access to sophisticated trading algorithms and empower traders of all levels with cutting-edge AI technology that was previously only available to institutional investors.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <Award className="h-4 w-4 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg mb-2">Our Mission</h4>
                  <p className="text-gray-400">
                    To continuously innovate at the intersection of AI and financial markets, delivering unparalleled trading performance while maintaining the highest standards of security and transparency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-lucent-purple" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg mb-2">Our Values</h4>
                  <p className="text-gray-400">
                    We're guided by excellence, integrity, innovation, and a relentless focus on delivering measurable results for our clients. We believe in transparent operations and ethical AI development.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-lucent-purple/20 mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-lucent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">42+</h3>
              <p className="text-gray-400">
                AI and Quant experts developing and refining our algorithms
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-lucent-purple/20 mb-4 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-lucent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">3.2M+</h3>
              <p className="text-gray-400">
                Trades executed and analyzed by our AI systems
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-lucent-purple/20 mb-4 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-lucent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">$850M+</h3>
              <p className="text-gray-400">
                Assets under management through our platform
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-lucent-purple/20 mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-lucent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">7+</h3>
              <p className="text-gray-400">
                Years of pioneering AI-driven trading solutions
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Leadership <span className="gradient-text">Team</span>
          </h2>
          <p className="text-gray-300">
            Meet the brilliant minds behind Lucent AI's revolutionary trading technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="h-48 bg-gradient-to-r from-lucent-purple/30 to-lucent-blue/30"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Dr. Alexander Chen</h3>
              <p className="text-lucent-purple mb-4">Founder & CEO</p>
              <p className="text-gray-400 text-sm">
                Former head of algorithmic trading at a leading investment bank with a Ph.D. in Machine Learning from MIT. Pioneer in applying neural networks to financial markets.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="h-48 bg-gradient-to-r from-lucent-purple/30 to-lucent-blue/30"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Dr. Sophia Williams</h3>
              <p className="text-lucent-purple mb-4">Chief AI Officer</p>
              <p className="text-gray-400 text-sm">
                Leading AI researcher with expertise in deep reinforcement learning and predictive analytics. Previously led AI research teams at top tech companies.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="h-48 bg-gradient-to-r from-lucent-purple/30 to-lucent-blue/30"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Marcus Johnson</h3>
              <p className="text-lucent-purple mb-4">Chief Trading Strategist</p>
              <p className="text-gray-400 text-sm">
                Over 15 years of experience in quantitative trading and risk management across global financial markets. Expert in algorithmic strategy development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

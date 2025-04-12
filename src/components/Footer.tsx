
import React from "react";
import { Link } from "react-router-dom";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lucent-deep-blue border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              LUCENT<span className="text-white">AI</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Advanced AI-driven trading algorithms that consistently outperform industry benchmarks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-lucent-purple transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-lucent-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-lucent-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/technology" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Trading Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-lucent-purple transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2 text-lucent-purple" />
                <span>123 Trading St, Financial District</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 text-lucent-purple" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 text-lucent-purple" />
                <span>info@lucentai.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Lucent AI. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Trading involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

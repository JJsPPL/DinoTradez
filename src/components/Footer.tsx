
import React from 'react';
import { Twitter, Youtube, Mail, ExternalLink, TrendingUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-white">DinoTradez</span>
            </div>
            <p className="text-gray-300 max-w-xs mb-6">
              Professional stock analysis tools and market insights to help you make informed trading decisions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/JonPaul1975" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@DinoTradez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary text-[#FF0000] hover:bg-[#FF0000]/10 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tradingview.com/pricing/?share_your_love=DinoTradez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary text-[#2962FF] hover:bg-[#2962FF]/10 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@dinotradez.com" 
                className="p-2 rounded-full bg-secondary text-primary hover:bg-primary/10 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-4 text-white">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Watchlists</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Stock Screener</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Technical Analysis</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Fundamental Analysis</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Trading Alerts</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Market News</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Learning Center</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Trading Strategies</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Economic Calendar</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Earnings Calendar</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Careers</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DinoTradez. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">Disclaimer</a>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 text-center mt-8">
          <p>Stock data provided for educational purposes only. Not financial advice.</p>
          <p className="mt-1">Market data delayed by at least 15 minutes. DinoTradez is not a registered broker-dealer or investment advisor.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

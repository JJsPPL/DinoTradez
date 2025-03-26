
import React, { useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-dino-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-dino-400 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dino-300 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span>Advanced Stock Analysis</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Trade Smarter with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-dino-600 to-dino-400">DinoTradez</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in delay-100">
            Advanced technical and fundamental analysis to help you make informed trading decisions. Get real-time market data, comprehensive watchlists, and in-depth stock insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg">
              Watch Demo
            </button>
          </div>
        </div>
        
        <div ref={chartRef} className="relative bg-gray-900 rounded-2xl shadow-lg p-6 max-w-4xl mx-auto opacity-0 animate-on-scroll">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 inline-flex items-center px-4 py-2 rounded-full bg-gray-800 shadow-md text-sm font-medium text-white">
            <LineChart className="h-4 w-4 mr-2 text-primary" />
            <span>Real-time Chart Analysis</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg bg-gray-800 p-4 shadow-sm">
              <div className="text-sm text-gray-300 mb-1">S&P 500</div>
              <div className="text-xl font-semibold text-white">4,183.95</div>
              <div className="flex items-center text-sm stock-positive">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+1.47%</span>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-800 p-4 shadow-sm">
              <div className="text-sm text-gray-300 mb-1">NASDAQ</div>
              <div className="text-xl font-semibold text-white">13,591.75</div>
              <div className="flex items-center text-sm stock-positive">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+1.56%</span>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-800 p-4 shadow-sm">
              <div className="text-sm text-gray-300 mb-1">Dow Jones</div>
              <div className="text-xl font-semibold text-white">34,372.34</div>
              <div className="flex items-center text-sm stock-negative">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>-0.21%</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-800 p-4 shadow-sm h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-primary/50 mb-4" />
              <p className="text-white">Interactive chart visualization will appear here</p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-hover rounded-xl bg-gray-900 p-6 shadow-sm opacity-0 animate-on-scroll">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Technical Analysis</h3>
            <p className="text-gray-300">Advanced charting and technical indicators to identify trends and trading opportunities.</p>
          </div>
          
          <div className="card-hover rounded-xl bg-gray-900 p-6 shadow-sm opacity-0 animate-on-scroll delay-100">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fundamental Analysis</h3>
            <p className="text-gray-300">Comprehensive financial data and ratios to evaluate company performance and value.</p>
          </div>
          
          <div className="card-hover rounded-xl bg-gray-900 p-6 shadow-sm opacity-0 animate-on-scroll delay-200">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
            <p className="text-gray-300">Real-time market data and curated watchlists to keep track of the stocks that matter to you.</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;

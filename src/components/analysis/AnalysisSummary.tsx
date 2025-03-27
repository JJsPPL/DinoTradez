
import React from 'react';
import { ArrowRight } from 'lucide-react';

const AnalysisSummary = () => {
  return (
    <div className="p-4 border-t border-gray-800 bg-gray-900/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h4 className="font-medium text-sm mr-2 text-white">Analysis Summary</h4>
          <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium">
            Bullish
          </div>
        </div>
        <button className="text-sm text-primary flex items-center">
          <span>View Full Analysis</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg bg-black p-3 border border-gray-800">
          <div className="text-xs text-gray-400 mb-1">Moving Averages</div>
          <div className="text-sm font-medium stock-positive">Buy</div>
          <div className="text-xs text-gray-400 mt-1">7 Buy, 5 Neutral, 0 Sell</div>
        </div>
        
        <div className="rounded-lg bg-black p-3 border border-gray-800">
          <div className="text-xs text-gray-400 mb-1">Oscillators</div>
          <div className="text-sm font-medium text-gray-300">Neutral</div>
          <div className="text-xs text-gray-400 mt-1">2 Buy, 8 Neutral, 1 Sell</div>
        </div>
        
        <div className="rounded-lg bg-black p-3 border border-gray-800">
          <div className="text-xs text-gray-400 mb-1">Pivot Points</div>
          <div className="text-sm font-medium stock-positive">Bullish</div>
          <div className="text-xs text-gray-400 mt-1">Support: 171.50, Resistance: 175.80</div>
        </div>
        
        <div className="rounded-lg bg-black p-3 border border-gray-800">
          <div className="text-xs text-gray-400 mb-1">Summary</div>
          <div className="text-sm font-medium stock-positive">Buy</div>
          <div className="text-xs text-gray-400 mt-1">9 Buy, 13 Neutral, 1 Sell</div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSummary;

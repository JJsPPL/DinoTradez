
import React from 'react';

const TechnicalIndicators = () => {
  return (
    <div className="glass rounded-xl shadow-md overflow-hidden border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-black/80">
        <h3 className="font-medium text-white">Technical Indicators</h3>
      </div>
      <div className="p-6 bg-black/60">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">RSI (14)</span>
            <span className="text-sm text-white">58.34</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">MACD (12, 26, 9)</span>
            <span className="text-sm text-white">2.15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Stochastic %K (14, 3, 3)</span>
            <span className="text-sm text-white">65.23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">CCI (14)</span>
            <span className="text-sm text-white">127.54</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">ATR (14)</span>
            <span className="text-sm text-white">3.21</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Highs/Lows (14)</span>
            <span className="text-sm text-white">0.85</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Ultimate Oscillator</span>
            <span className="text-sm text-white">54.17</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">ROC</span>
            <span className="text-sm text-white">6.45</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;

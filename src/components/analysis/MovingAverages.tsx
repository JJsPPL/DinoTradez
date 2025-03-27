
import React from 'react';

const MovingAverages = () => {
  return (
    <div className="glass rounded-xl shadow-md overflow-hidden border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-black/80">
        <h3 className="font-medium text-white">Moving Averages</h3>
      </div>
      <div className="p-6 bg-black/60">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">MA (5)</span>
            <span className="text-sm stock-positive">172.85 (Buy)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">MA (10)</span>
            <span className="text-sm stock-positive">170.93 (Buy)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">MA (20)</span>
            <span className="text-sm stock-positive">168.75 (Buy)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">MA (50)</span>
            <span className="text-sm stock-positive">168.12 (Buy)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">MA (100)</span>
            <span className="text-sm stock-positive">170.45 (Buy)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">MA (200)</span>
            <span className="text-sm text-gray-400">175.36 (Neutral)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">EMA (5)</span>
            <span className="text-sm stock-positive">173.12 (Buy)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">EMA (10)</span>
            <span className="text-sm stock-positive">171.54 (Buy)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingAverages;

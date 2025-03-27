
import React from 'react';

const StockHeader = () => {
  return (
    <div className="flex items-center">
      <div className="font-medium mr-3 text-white">AAPL</div>
      <div className="text-gray-400">Apple Inc.</div>
      <div className="ml-4 text-sm font-medium stock-positive">$173.57 +1.37%</div>
    </div>
  );
};

export default StockHeader;

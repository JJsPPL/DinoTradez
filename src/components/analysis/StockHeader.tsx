
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

const StockHeader = () => {
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="font-medium mr-3 text-white flex items-center cursor-help">
            AAPL
            <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-black/95 border border-gray-800 text-white">
          <div className="space-y-1">
            <p className="font-medium">Apple Inc. (AAPL)</p>
            <p className="text-xs text-gray-300">NASDAQ-listed technology company</p>
            <div className="text-xs grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <span className="text-gray-400">Market Cap:</span>
              <span className="text-right">$2.87T</span>
              <span className="text-gray-400">52-Week Range:</span>
              <span className="text-right">$164.11 - $199.62</span>
              <span className="text-gray-400">P/E Ratio:</span>
              <span className="text-right">28.72</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
      <div className="text-gray-400">Apple Inc.</div>
      <div className="ml-4 text-sm font-medium stock-positive">$173.57 +1.37%</div>
    </div>
  );
};

export default StockHeader;

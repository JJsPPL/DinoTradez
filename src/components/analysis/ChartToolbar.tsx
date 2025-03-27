
import React from 'react';
import { Undo2, Redo2, Grid, Clock, Share2, Maximize2 } from 'lucide-react';

const ChartToolbar = () => {
  return (
    <div className="p-4 border-b border-gray-800 flex items-center justify-between text-sm bg-gray-900/70">
      <div className="flex items-center space-x-3">
        <button className="p-1.5 rounded hover:bg-gray-800 transition-colors">
          <Undo2 className="h-4 w-4 text-gray-400" />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-800 transition-colors">
          <Redo2 className="h-4 w-4 text-gray-400" />
        </button>
        <div className="border-l border-gray-800 h-5 mx-1"></div>
        <button className="p-1.5 rounded hover:bg-gray-800 transition-colors">
          <Grid className="h-4 w-4 text-gray-400" />
        </button>
        <span className="text-xs text-gray-400">Auto</span>
        <div className="border-l border-gray-800 h-5 mx-1"></div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-xs text-gray-300">Last updated: 04:03:21 PM</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-1.5 rounded hover:bg-gray-800 transition-colors">
          <Share2 className="h-4 w-4 text-gray-400" />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-800 transition-colors">
          <Maximize2 className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChartToolbar;


import React from 'react';
import { CandlestickChart, LineChart, BarChart3, PieChart, ChevronDown, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export const chartTypes = [
  { icon: CandlestickChart, name: 'Candlestick', id: 'candlestick' },
  { icon: LineChart, name: 'Line', id: 'line' },
  { icon: BarChart3, name: 'Bar', id: 'bar' },
  { icon: PieChart, name: 'Area', id: 'area' },
] as const;

export const timeframes = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' },
  { label: 'All', value: 'all' },
] as const;

export const indicators = [
  'Volume',
  'MA (50)',
  'MA (200)',
  'RSI',
  'MACD',
  'Bollinger',
  'Ichimoku',
  'Fibonacci',
  'Dark Pool',
  'Block Trades',
];

interface ChartControlsProps {
  activeChart: string;
  setActiveChart: (chartType: string) => void;
  activeTimeframe: string;
  setActiveTimeframe: (timeframe: string) => void;
  isIndicatorMenuOpen: boolean;
  setIsIndicatorMenuOpen: (isOpen: boolean) => void;
  activeIndicators: string[];
  toggleIndicator: (indicator: string) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  activeChart,
  setActiveChart,
  activeTimeframe,
  setActiveTimeframe,
  isIndicatorMenuOpen,
  setIsIndicatorMenuOpen,
  activeIndicators,
  toggleIndicator,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex bg-gray-900 rounded-lg p-1">
        {chartTypes.map((chartType) => (
          <button
            key={chartType.id}
            onClick={() => setActiveChart(chartType.id)}
            className={cn(
              "p-2 rounded-md flex items-center transition-colors",
              activeChart === chartType.id 
                ? "bg-primary text-white shadow-sm" 
                : "text-gray-400 hover:text-white"
            )}
          >
            <chartType.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      
      <div className="flex bg-gray-900 rounded-lg overflow-hidden">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.value}
            onClick={() => setActiveTimeframe(timeframe.value)}
            className={cn(
              "px-3 py-1.5 text-xs transition-colors",
              activeTimeframe === timeframe.value 
                ? "bg-primary text-white" 
                : "text-gray-400 hover:text-white"
            )}
          >
            {timeframe.label}
          </button>
        ))}
      </div>
      
      <div className="relative">
        <button 
          onClick={() => setIsIndicatorMenuOpen(!isIndicatorMenuOpen)}
          className="flex items-center px-3 py-1.5 rounded-lg bg-gray-900 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <Layers className="h-4 w-4 mr-1" />
          <span>Indicators</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </button>
        
        {isIndicatorMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-black rounded-lg shadow-lg z-10 p-2 animate-fade-in border border-gray-800">
            <div className="text-xs font-medium text-gray-400 mb-2 px-2">Select Indicators</div>
            {indicators.map((indicator) => (
              <div 
                key={indicator}
                className="flex items-center px-2 py-1.5 hover:bg-gray-900 rounded-md cursor-pointer"
                onClick={() => toggleIndicator(indicator)}
              >
                <input 
                  type="checkbox" 
                  checked={activeIndicators.includes(indicator)}
                  className="mr-2"
                  onChange={() => {}} // controlled component
                />
                <span className="text-sm text-gray-300">{indicator}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartControls;

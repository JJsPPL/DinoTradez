
import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, CandlestickChart, Maximize2, ArrowRight, Layers, Clock, Undo2, Redo2, Grid, Share2, ChevronDown, Info, Database, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  AreaChart, 
  Area, 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample chart data
const sampleChartData = [
  { date: '2023-01-01', value: 171.22, volume: 45000000 },
  { date: '2023-01-02', value: 172.45, volume: 48000000 },
  { date: '2023-01-03', value: 173.86, volume: 51000000 },
  { date: '2023-01-04', value: 174.30, volume: 55000000 },
  { date: '2023-01-05', value: 172.91, volume: 62000000 },
  { date: '2023-01-06', value: 173.45, volume: 58000000 },
  { date: '2023-01-07', value: 173.94, volume: 54000000 },
  { date: '2023-01-08', value: 173.57, volume: 51000000 },
];

// Sample darkpool data
const darkpoolData = [
  { time: '09:35', volume: 240000, price: 173.42, type: 'sell' },
  { time: '10:15', volume: 350000, price: 173.67, type: 'buy' },
  { time: '11:05', volume: 180000, price: 173.55, type: 'sell' },
  { time: '12:30', volume: 420000, price: 173.77, type: 'buy' },
  { time: '13:45', volume: 280000, price: 173.68, type: 'buy' },
  { time: '14:20', volume: 310000, price: 173.49, type: 'sell' },
  { time: '15:10', volume: 550000, price: 173.52, type: 'sell' },
  { time: '15:55', volume: 620000, price: 173.60, type: 'buy' },
];

// Sample block trades
const blockTradeData = [
  { time: '09:42', shares: 150000, price: 173.45, value: '$26,017,500', origin: 'NYSE' },
  { time: '11:17', shares: 200000, price: 173.60, value: '$34,720,000', origin: 'NASDAQ' },
  { time: '12:55', shares: 175000, price: 173.72, value: '$30,401,000', origin: 'NYSE' },
  { time: '14:03', shares: 225000, price: 173.51, value: '$39,039,750', origin: 'Dark Pool' },
  { time: '15:28', shares: 300000, price: 173.58, value: '$52,074,000', origin: 'Dark Pool' },
];

const chartTypes = [
  { icon: CandlestickChart, name: 'Candlestick', id: 'candlestick' },
  { icon: LineChart, name: 'Line', id: 'line' },
  { icon: BarChart3, name: 'Bar', id: 'bar' },
  { icon: PieChart, name: 'Area', id: 'area' },
] as const;

const timeframes = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' },
  { label: 'All', value: 'all' },
] as const;

const indicators = [
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

const Analysis = () => {
  const [activeChart, setActiveChart] = useState<string>(chartTypes[0].id);
  const [activeTimeframe, setActiveTimeframe] = useState<string>(timeframes[2].value);
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['Volume', 'MA (50)', 'Dark Pool']);
  const [isIndicatorMenuOpen, setIsIndicatorMenuOpen] = useState(false);
  const [showDarkpoolData, setShowDarkpoolData] = useState(true);
  const [showBlockTrades, setShowBlockTrades] = useState(true);
  
  const toggleIndicator = (indicator: string) => {
    if (activeIndicators.includes(indicator)) {
      setActiveIndicators(activeIndicators.filter(i => i !== indicator));
      
      // Toggle related data displays
      if (indicator === 'Dark Pool') setShowDarkpoolData(false);
      if (indicator === 'Block Trades') setShowBlockTrades(false);
    } else {
      setActiveIndicators([...activeIndicators, indicator]);
      
      // Toggle related data displays
      if (indicator === 'Dark Pool') setShowDarkpoolData(true);
      if (indicator === 'Block Trades') setShowBlockTrades(true);
    }
  };

  // Function to render the appropriate chart based on active chart type
  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Bar dataKey="volume" fill="#8884d8" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'candlestick':
      default:
        // For candlestick, we'd use a candlestick chart library
        // but for this demo, let's use a placeholder with the line chart
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <section id="analysis" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3 text-white">Technical Analysis</h2>
          <p className="text-gray-300 max-w-2xl">Advanced charting tools and technical indicators to analyze stock performance and identify trends.</p>
        </div>
        
        <div className="glass rounded-xl shadow-md overflow-hidden border border-gray-800">
          <div className="p-4 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4 bg-black/80">
            <div className="flex items-center">
              <div className="font-medium mr-3 text-white">AAPL</div>
              <div className="text-gray-400">Apple Inc.</div>
              <div className="ml-4 text-sm font-medium stock-positive">$173.57 +1.37%</div>
            </div>
            
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
          </div>
          
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
          
          <div className="relative bg-black/70">
            <div className="flex justify-between p-4 absolute top-0 left-0 right-0 z-10 text-sm">
              <div>
                <div className="text-xs text-gray-400">Open</div>
                <div className="text-white">171.22</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">High</div>
                <div className="text-white">174.30</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Low</div>
                <div className="text-white">171.96</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Close</div>
                <div className="text-white">173.57</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Volume</div>
                <div className="text-white">74.58M</div>
              </div>
            </div>
            
            <div className="h-96 flex items-center justify-center p-6 pt-16">
              {renderChart()}
            </div>
          </div>
          
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
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Darkpool Data Panel */}
          <div className="glass rounded-xl shadow-md overflow-hidden border border-gray-800">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-black/80">
              <h3 className="font-medium flex items-center text-white">
                <Database className="h-4 w-4 mr-2 text-purple-500" />
                Darkpool & Block Trade Data
                <div className="ml-2 rounded-full bg-purple-900/50 px-2 py-0.5 text-xs text-purple-300">Premium</div>
              </h3>
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
            </div>

            {showDarkpoolData && (
              <div className="p-6 border-b border-gray-800 bg-black/60">
                <h4 className="text-sm font-medium mb-3 flex items-center text-white">
                  <Activity className="h-4 w-4 mr-1 text-purple-500" />
                  Darkpool Activity
                </h4>
                <div className="overflow-y-auto max-h-36 mb-3">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-gray-400">
                      <tr>
                        <th className="text-left pb-2">Time</th>
                        <th className="text-right pb-2">Volume</th>
                        <th className="text-right pb-2">Price</th>
                        <th className="text-right pb-2">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {darkpoolData.map((item, index) => (
                        <tr key={index} className="darkpool-row">
                          <td className="py-1.5 text-gray-300">{item.time}</td>
                          <td className="text-right py-1.5 text-gray-300">{item.volume.toLocaleString()}</td>
                          <td className="text-right py-1.5 text-gray-300">${item.price}</td>
                          <td className={`text-right py-1.5 ${item.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                            {item.type.toUpperCase()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-gray-400">
                  Darkpool ratio: <span className="font-medium text-gray-300">38.7%</span> of total volume
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '38.7%' }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-300">38.7%</span>
                </div>
              </div>
            )}

            {showBlockTrades && (
              <div className="p-6 bg-black/60">
                <h4 className="text-sm font-medium mb-3 flex items-center text-white">
                  <Database className="h-4 w-4 mr-1 text-blue-500" />
                  Significant Block Trades
                </h4>
                <div className="overflow-y-auto max-h-36">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-gray-400">
                      <tr>
                        <th className="text-left pb-2">Time</th>
                        <th className="text-right pb-2">Shares</th>
                        <th className="text-right pb-2">Price</th>
                        <th className="text-right pb-2">Value</th>
                        <th className="text-right pb-2">Origin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {blockTradeData.map((item, index) => (
                        <tr key={index} className="block-trade-row">
                          <td className="py-1.5 text-gray-300">{item.time}</td>
                          <td className="text-right py-1.5 text-gray-300">{item.shares.toLocaleString()}</td>
                          <td className="text-right py-1.5 text-gray-300">${item.price}</td>
                          <td className="text-right py-1.5 text-gray-300">{item.value}</td>
                          <td className={`text-right py-1.5 ${item.origin === 'Dark Pool' ? 'text-purple-400 font-medium' : 'text-gray-300'}`}>
                            {item.origin}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-xs text-gray-400">
                  Total block trade volume: <span className="font-medium text-gray-300">1,050,000 shares</span> ($182,252,250)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analysis;

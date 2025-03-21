
import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, CandlestickChart, Maximize2, ArrowRight, Layers, Clock, Undo2, Redo2, Grid, Share2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
];

const Analysis = () => {
  const [activeChart, setActiveChart] = useState<string>(chartTypes[0].id);
  const [activeTimeframe, setActiveTimeframe] = useState<string>(timeframes[2].value);
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['Volume', 'MA (50)']);
  const [isIndicatorMenuOpen, setIsIndicatorMenuOpen] = useState(false);
  
  const toggleIndicator = (indicator: string) => {
    if (activeIndicators.includes(indicator)) {
      setActiveIndicators(activeIndicators.filter(i => i !== indicator));
    } else {
      setActiveIndicators([...activeIndicators, indicator]);
    }
  };

  return (
    <section id="analysis" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Technical Analysis</h2>
          <p className="text-muted-foreground max-w-2xl">Advanced charting tools and technical indicators to analyze stock performance and identify trends.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="font-medium mr-3">AAPL</div>
              <div className="text-muted-foreground">Apple Inc.</div>
              <div className="ml-4 text-sm font-medium stock-positive">$173.57 +1.37%</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-secondary rounded-lg p-1">
                {chartTypes.map((chartType) => (
                  <button
                    key={chartType.id}
                    onClick={() => setActiveChart(chartType.id)}
                    className={cn(
                      "p-2 rounded-md flex items-center transition-colors",
                      activeChart === chartType.id 
                        ? "bg-white text-primary shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <chartType.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
              
              <div className="flex bg-secondary rounded-lg overflow-hidden">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe.value}
                    onClick={() => setActiveTimeframe(timeframe.value)}
                    className={cn(
                      "px-3 py-1.5 text-xs transition-colors",
                      activeTimeframe === timeframe.value 
                        ? "bg-primary text-white" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {timeframe.label}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setIsIndicatorMenuOpen(!isIndicatorMenuOpen)}
                  className="flex items-center px-3 py-1.5 rounded-lg bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Layers className="h-4 w-4 mr-1" />
                  <span>Indicators</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </button>
                
                {isIndicatorMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 p-2 animate-fade-in">
                    <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Select Indicators</div>
                    {indicators.map((indicator) => (
                      <div 
                        key={indicator}
                        className="flex items-center px-2 py-1.5 hover:bg-secondary rounded-md cursor-pointer"
                        onClick={() => toggleIndicator(indicator)}
                      >
                        <input 
                          type="checkbox" 
                          checked={activeIndicators.includes(indicator)}
                          className="mr-2"
                          onChange={() => {}} // controlled component
                        />
                        <span className="text-sm">{indicator}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b border-border flex items-center justify-between text-sm bg-secondary/30">
            <div className="flex items-center space-x-3">
              <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                <Undo2 className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                <Redo2 className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="border-l border-border h-5 mx-1"></div>
              <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                <Grid className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-xs text-muted-foreground">Auto</span>
              <div className="border-l border-border h-5 mx-1"></div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-xs">Last updated: 04:03:21 PM</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex justify-between p-4 absolute top-0 left-0 right-0 z-10 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Open</div>
                <div>171.22</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">High</div>
                <div>174.30</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Low</div>
                <div>171.96</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Close</div>
                <div>173.57</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Volume</div>
                <div>74.58M</div>
              </div>
            </div>
            
            <div className="h-96 flex items-center justify-center p-6 pt-16">
              <div className="text-center">
                <CandlestickChart className="h-16 w-16 mx-auto text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-4">Interactive chart will be displayed here</p>
                <p className="text-xs text-muted-foreground">Chart showing {activeChart} data for AAPL over {activeTimeframe} with {activeIndicators.join(', ')}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-secondary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h4 className="font-medium text-sm mr-2">Analysis Summary</h4>
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                  Bullish
                </div>
              </div>
              <button className="text-sm text-primary flex items-center">
                <span>View Full Analysis</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-lg bg-white p-3">
                <div className="text-xs text-muted-foreground mb-1">Moving Averages</div>
                <div className="text-sm font-medium stock-positive">Buy</div>
                <div className="text-xs text-muted-foreground mt-1">7 Buy, 5 Neutral, 0 Sell</div>
              </div>
              
              <div className="rounded-lg bg-white p-3">
                <div className="text-xs text-muted-foreground mb-1">Oscillators</div>
                <div className="text-sm font-medium text-foreground">Neutral</div>
                <div className="text-xs text-muted-foreground mt-1">2 Buy, 8 Neutral, 1 Sell</div>
              </div>
              
              <div className="rounded-lg bg-white p-3">
                <div className="text-xs text-muted-foreground mb-1">Pivot Points</div>
                <div className="text-sm font-medium stock-positive">Bullish</div>
                <div className="text-xs text-muted-foreground mt-1">Support: 171.50, Resistance: 175.80</div>
              </div>
              
              <div className="rounded-lg bg-white p-3">
                <div className="text-xs text-muted-foreground mb-1">Summary</div>
                <div className="text-sm font-medium stock-positive">Buy</div>
                <div className="text-xs text-muted-foreground mt-1">9 Buy, 13 Neutral, 1 Sell</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-medium">Technical Indicators</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">RSI (14)</span>
                  <span className="text-sm">58.34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">MACD (12, 26, 9)</span>
                  <span className="text-sm">2.15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Stochastic %K (14, 3, 3)</span>
                  <span className="text-sm">65.23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">CCI (14)</span>
                  <span className="text-sm">127.54</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">ATR (14)</span>
                  <span className="text-sm">3.21</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Highs/Lows (14)</span>
                  <span className="text-sm">0.85</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ultimate Oscillator</span>
                  <span className="text-sm">54.17</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">ROC</span>
                  <span className="text-sm">6.45</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-medium">Moving Averages</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">MA (5)</span>
                  <span className="text-sm stock-positive">172.85 (Buy)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">MA (10)</span>
                  <span className="text-sm stock-positive">170.93 (Buy)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">MA (20)</span>
                  <span className="text-sm stock-positive">168.75 (Buy)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">MA (50)</span>
                  <span className="text-sm stock-positive">168.12 (Buy)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">MA (100)</span>
                  <span className="text-sm stock-positive">170.45 (Buy)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">MA (200)</span>
                  <span className="text-sm text-muted-foreground">175.36 (Neutral)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">EMA (5)</span>
                  <span className="text-sm stock-positive">173.12 (Buy)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">EMA (10)</span>
                  <span className="text-sm stock-positive">171.54 (Buy)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analysis;

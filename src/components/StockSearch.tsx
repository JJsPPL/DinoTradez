import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, AlertCircle, Clock, Calendar, DollarSign, LineChart, BarChart, PieChart, CandlestickChart, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  high52w: number;
  low52w: number;
  dayHigh: number;
  dayLow: number;
  closePrice: number;
  marketCap: string;
  sharesOutstanding: string;
  authorizedShares: string;
  marketCapToEquityRatio: number;
  dollarVolume: string;
  volume: number;
}

const StockSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [searchError, setSearchError] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchError('Please enter a stock symbol');
      return;
    }
    
    setIsSearching(true);
    setSearchError('');
    
    // Simulate API delay
    setTimeout(() => {
      // For demo, if symbol is unknown, show error
      const knownSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA'];
      const searchUpper = searchQuery.toUpperCase();
      
      if (!knownSymbols.includes(searchUpper)) {
        setStockData(null);
        setSearchError('Stock symbol not found. Try AAPL, MSFT, GOOGL, AMZN, TSLA, META, or NVDA');
        setIsSearching(false);
        return;
      }
      
      // Mock data based on symbol
      const mockData: Record<string, StockData> = {
        'AAPL': {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 173.57,
          change: 2.35,
          percentChange: 1.37,
          high52w: 198.23,
          low52w: 143.90,
          dayHigh: 174.30,
          dayLow: 171.96,
          closePrice: 173.57,
          marketCap: '2.71T',
          sharesOutstanding: '15.63B',
          authorizedShares: '17.50B',
          marketCapToEquityRatio: 24.8,
          dollarVolume: '12.96B',
          volume: 74582651,
        },
        'MSFT': {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          price: 329.93,
          change: 4.51,
          percentChange: 1.39,
          high52w: 430.82,
          low52w: 309.58,
          dayHigh: 331.95,
          dayLow: 326.76,
          closePrice: 329.93,
          marketCap: '2.45T',
          sharesOutstanding: '7.43B',
          authorizedShares: '9.00B',
          marketCapToEquityRatio: 35.2,
          dollarVolume: '8.48B',
          volume: 25698741,
        },
        'GOOGL': {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          price: 139.93,
          change: -1.27,
          percentChange: -0.90,
          high52w: 153.78,
          low52w: 103.71,
          dayHigh: 141.22,
          dayLow: 138.64,
          closePrice: 139.93,
          marketCap: '1.76T',
          sharesOutstanding: '12.58B',
          authorizedShares: '15.00B',
          marketCapToEquityRatio: 27.3,
          dollarVolume: '2.65B',
          volume: 18965423,
        },
        'AMZN': {
          symbol: 'AMZN',
          name: 'Amazon.com Inc.',
          price: 178.75,
          change: 3.24,
          percentChange: 1.85,
          high52w: 189.77,
          low52w: 118.35,
          dayHigh: 179.32,
          dayLow: 176.02,
          closePrice: 178.75,
          marketCap: '1.85T',
          sharesOutstanding: '10.35B',
          authorizedShares: '12.00B',
          marketCapToEquityRatio: 59.1,
          dollarVolume: '5.82B',
          volume: 32541689,
        },
        'TSLA': {
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          price: 194.05,
          change: -5.87,
          percentChange: -2.94,
          high52w: 245.31,
          low52w: 138.80,
          dayHigh: 199.82,
          dayLow: 193.11,
          closePrice: 194.05,
          marketCap: '614.7B',
          sharesOutstanding: '3.17B',
          authorizedShares: '4.00B',
          marketCapToEquityRatio: 82.5,
          dollarVolume: '16.54B',
          volume: 85214763,
        },
        'META': {
          symbol: 'META',
          name: 'Meta Platforms, Inc.',
          price: 484.17,
          change: 7.45,
          percentChange: 1.56,
          high52w: 531.49,
          low52w: 313.92,
          dayHigh: 487.62,
          dayLow: 479.03,
          closePrice: 484.17,
          marketCap: '1.24T',
          sharesOutstanding: '2.56B',
          authorizedShares: '3.00B',
          marketCapToEquityRatio: 32.7,
          dollarVolume: '7.64B',
          volume: 15784236,
        },
        'NVDA': {
          symbol: 'NVDA',
          name: 'NVIDIA Corporation',
          price: 878.36,
          change: 15.78,
          percentChange: 1.83,
          high52w: 974.00,
          low52w: 373.35,
          dayHigh: 885.64,
          dayLow: 867.33,
          closePrice: 878.36,
          marketCap: '2.16T',
          sharesOutstanding: '2.46B',
          authorizedShares: '2.80B',
          marketCapToEquityRatio: 98.2,
          dollarVolume: '36.22B',
          volume: 41236985,
        },
      };
      
      setStockData(mockData[searchUpper]);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <section id="search" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Stock Search</h2>
          <p className="text-muted-foreground max-w-2xl">Enter a stock symbol to get comprehensive data and insights.</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter stock symbol (e.g., AAPL, MSFT, GOOGL)"
                className="block w-full pl-10 pr-4 py-3 border border-input bg-card text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <button 
              type="submit"
              disabled={isSearching}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </form>
          
          {searchError && (
            <div className="p-4 mb-6 rounded-lg bg-destructive/10 text-destructive flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{searchError}</p>
            </div>
          )}
          
          {stockData && (
            <div className="animate-scale-in">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold">{stockData.symbol}</h3>
                      <span className="text-muted-foreground">{stockData.name}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xl font-semibold mr-4">${stockData.price.toFixed(2)}</span>
                      <span className={cn(
                        "flex items-center text-sm font-medium",
                        stockData.change >= 0 ? "stock-positive" : "stock-negative"
                      )}>
                        {stockData.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {stockData.change >= 0 ? "+" : ""}{stockData.change.toFixed(2)} ({stockData.change >= 0 ? "+" : ""}{stockData.percentChange.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                      Add to Watchlist
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>52-Week Range</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Low</div>
                        <div className="font-semibold">${stockData.low52w.toFixed(2)}</div>
                      </div>
                      <div className="h-1 flex-grow mx-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ 
                            width: `${((stockData.price - stockData.low52w) / (stockData.high52w - stockData.low52w)) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">High</div>
                        <div className="font-semibold">${stockData.high52w.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Day Range</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Low</div>
                        <div className="font-semibold">${stockData.dayLow.toFixed(2)}</div>
                      </div>
                      <div className="h-1 flex-grow mx-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ 
                            width: `${((stockData.price - stockData.dayLow) / (stockData.dayHigh - stockData.dayLow)) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">High</div>
                        <div className="font-semibold">${stockData.dayHigh.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Market Cap</span>
                    </div>
                    <div className="font-semibold mt-1">{stockData.marketCap}</div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span className="text-xs">Market Cap/Equity Ratio: {stockData.marketCapToEquityRatio.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <BarChart className="h-4 w-4 mr-1" />
                      <span>Volume</span>
                    </div>
                    <div className="font-semibold mt-1">{stockData.volume.toLocaleString()}</div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span className="text-xs">Dollar Volume: {stockData.dollarVolume}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Key Statistics</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Previous Close</span>
                        <span className="font-medium">${stockData.closePrice.toFixed(2)}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Shares Outstanding</span>
                        <span className="font-medium">{stockData.sharesOutstanding}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Authorized Shares</span>
                        <span className="font-medium">{stockData.authorizedShares}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Market Cap/Common Equity Ratio</span>
                        <span className="font-medium">{stockData.marketCapToEquityRatio.toFixed(1)}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Dollar Volume</span>
                        <span className="font-medium">{stockData.dollarVolume}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-lg p-4 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <CandlestickChart className="h-10 w-10 mx-auto text-primary/50 mb-3" />
                      <p className="text-muted-foreground">Interactive price chart will appear here</p>
                      <div className="flex justify-center gap-2 mt-3">
                        <button className="px-3 py-1 text-xs rounded bg-primary/10 text-primary">1D</button>
                        <button className="px-3 py-1 text-xs rounded bg-secondary">1W</button>
                        <button className="px-3 py-1 text-xs rounded bg-secondary">1M</button>
                        <button className="px-3 py-1 text-xs rounded bg-secondary">3M</button>
                        <button className="px-3 py-1 text-xs rounded bg-secondary">1Y</button>
                        <button className="px-3 py-1 text-xs rounded bg-secondary">5Y</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <BarChart className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-medium">Technical Analysis</h4>
                  </div>
                  <div className="h-40 flex items-center justify-center bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Technical indicators chart</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <PieChart className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-medium">Fundamental Analysis</h4>
                  </div>
                  <div className="h-40 flex items-center justify-center bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Financial ratios visualization</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <LineChart className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-medium">Performance</h4>
                  </div>
                  <div className="h-40 flex items-center justify-center bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Performance metrics chart</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StockSearch;

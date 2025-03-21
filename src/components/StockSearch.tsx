
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, AlertCircle, Clock, Calendar, DollarSign, LineChart, BarChart, PieChart, CandlestickChart, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

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
  
  // Function to format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };

  const fetchStockData = async (symbol: string) => {
    try {
      // Yahoo Finance API endpoint using RapidAPI
      const response = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}&region=US`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1dd4d1c8c8mshb0df8f5edf37e8ap158af3jsn4a8d0d23ea54', // This is a sample key. In production, use a proper key management solution
          'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      
      const data = await response.json();
      
      // Extract and transform the data
      const summaryDetail = data.summaryDetail || {};
      const price = data.price || {};
      const defaultKeyStatistics = data.defaultKeyStatistics || {};
      
      const stockData: StockData = {
        symbol: symbol.toUpperCase(),
        name: price.longName || price.shortName || symbol.toUpperCase(),
        price: price.regularMarketPrice?.raw || 0,
        change: price.regularMarketChange?.raw || 0,
        percentChange: price.regularMarketChangePercent?.raw || 0,
        high52w: summaryDetail.fiftyTwoWeekHigh?.raw || 0,
        low52w: summaryDetail.fiftyTwoWeekLow?.raw || 0,
        dayHigh: summaryDetail.dayHigh?.raw || 0,
        dayLow: summaryDetail.dayLow?.raw || 0,
        closePrice: summaryDetail.previousClose?.raw || 0,
        marketCap: formatNumber(summaryDetail.marketCap?.raw || 0),
        sharesOutstanding: formatNumber(defaultKeyStatistics.sharesOutstanding?.raw || 0),
        authorizedShares: formatNumber((defaultKeyStatistics.sharesOutstanding?.raw || 0) * 1.15), // Approximation
        marketCapToEquityRatio: parseFloat((summaryDetail.marketCap?.raw / (defaultKeyStatistics.bookValue?.raw * defaultKeyStatistics.sharesOutstanding?.raw)).toFixed(1)) || 0,
        dollarVolume: formatNumber((summaryDetail.volume?.raw || 0) * (price.regularMarketPrice?.raw || 0)),
        volume: summaryDetail.volume?.raw || 0,
      };
      
      return stockData;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  };

  // Fallback to mock data if API call fails
  const getMockData = (symbol: string): StockData => {
    // Calculate some random values based on the symbol string to simulate unique data
    const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rand = (min: number, max: number) => min + ((seed % 100) / 100) * (max - min);
    
    const price = rand(50, 500);
    const change = rand(-20, 20);
    const percentChange = (change / price) * 100;
    const volume = Math.floor(rand(1000000, 50000000));
    const marketCap = price * rand(1000000, 5000000000);
    
    return {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} Inc.`,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      percentChange: parseFloat(percentChange.toFixed(2)),
      high52w: parseFloat((price * 1.3).toFixed(2)),
      low52w: parseFloat((price * 0.7).toFixed(2)),
      dayHigh: parseFloat((price * 1.05).toFixed(2)),
      dayLow: parseFloat((price * 0.95).toFixed(2)),
      closePrice: parseFloat((price - change).toFixed(2)),
      marketCap: formatNumber(marketCap),
      sharesOutstanding: formatNumber(Math.floor(marketCap / price)),
      authorizedShares: formatNumber(Math.floor((marketCap / price) * 1.2)),
      marketCapToEquityRatio: parseFloat(rand(5, 50).toFixed(1)),
      dollarVolume: formatNumber(volume * price),
      volume: volume,
    };
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchError('Please enter a stock symbol');
      return;
    }
    
    setIsSearching(true);
    setSearchError('');
    
    try {
      // Try to fetch real data
      const data = await fetchStockData(searchQuery.trim());
      setStockData(data);
      toast.success(`Stock data for ${searchQuery.toUpperCase()} loaded successfully`);
    } catch (error) {
      console.warn('API fetch failed, using mock data instead:', error);
      
      // Fall back to mock data
      const mockData = getMockData(searchQuery.trim());
      setStockData(mockData);
      
      // Show a toast that we're using mock data
      toast.info(`Using simulated data for ${searchQuery.toUpperCase()}`);
    } finally {
      setIsSearching(false);
    }
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
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter any stock symbol (e.g., AAPL, MSFT, GOOGL)"
                className="block w-full pl-10 pr-4 py-6 border border-input bg-card text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
              <div className="bg-white dark:bg-black/70 rounded-xl shadow-md overflow-hidden mb-8">
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
                        stockData.change >= 0 ? "text-green-500" : "text-red-500"
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
                <div className="bg-white dark:bg-black/70 rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <BarChart className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-medium">Technical Analysis</h4>
                  </div>
                  <div className="h-40 flex items-center justify-center bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Technical indicators chart</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-black/70 rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <PieChart className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-medium">Fundamental Analysis</h4>
                  </div>
                  <div className="h-40 flex items-center justify-center bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Financial ratios visualization</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-black/70 rounded-xl shadow-md p-6">
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


import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star, Plus, Filter, RefreshCw, ArrowUpDown, X, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stock {
  symbol: string;
  companyName: string;
  lastPrice: number;
  change: number;
  percentChange: number;
  volume: number;
  marketCap: string;
  sector: string;
}

const mockWatchlist: Stock[] = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', lastPrice: 173.57, change: 2.35, percentChange: 1.37, volume: 74582651, marketCap: '2.7T', sector: 'Technology' },
  { symbol: 'MSFT', companyName: 'Microsoft Corp.', lastPrice: 329.93, change: 4.51, percentChange: 1.39, volume: 25698741, marketCap: '2.4T', sector: 'Technology' },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', lastPrice: 139.93, change: -1.27, percentChange: -0.90, volume: 18965423, marketCap: '1.8T', sector: 'Technology' },
  { symbol: 'AMZN', companyName: 'Amazon.com Inc.', lastPrice: 178.75, change: 3.24, percentChange: 1.85, volume: 32541689, marketCap: '1.9T', sector: 'Consumer Cyclical' },
  { symbol: 'TSLA', companyName: 'Tesla, Inc.', lastPrice: 194.05, change: -5.87, percentChange: -2.94, volume: 85214763, marketCap: '614.7B', sector: 'Consumer Cyclical' },
  { symbol: 'META', companyName: 'Meta Platforms, Inc.', lastPrice: 484.17, change: 7.45, percentChange: 1.56, volume: 15784236, marketCap: '1.2T', sector: 'Technology' },
  { symbol: 'NVDA', companyName: 'NVIDIA Corporation', lastPrice: 878.36, change: 15.78, percentChange: 1.83, volume: 41236985, marketCap: '2.1T', sector: 'Technology' },
  { symbol: 'V', companyName: 'Visa Inc.', lastPrice: 275.31, change: 1.24, percentChange: 0.45, volume: 5896321, marketCap: '569.8B', sector: 'Financial Services' },
];

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>(mockWatchlist);
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const refreshData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update some values randomly to simulate live data
      const updatedWatchlist = watchlist.map(stock => {
        const changeMultiplier = Math.random() > 0.5 ? 1 : -1;
        const newChange = parseFloat((stock.change + (Math.random() * 0.5 * changeMultiplier)).toFixed(2));
        const newPercentChange = parseFloat(((newChange / (stock.lastPrice - stock.change)) * 100).toFixed(2));
        const newPrice = parseFloat((stock.lastPrice + newChange).toFixed(2));
        
        return {
          ...stock,
          lastPrice: newPrice,
          change: newChange,
          percentChange: newPercentChange,
          volume: Math.floor(stock.volume * (0.95 + Math.random() * 0.1)),
        };
      });
      
      setWatchlist(updatedWatchlist);
      setIsLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    refreshData();
    
    // Set up interval for periodic refreshes
    const intervalId = setInterval(refreshData, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedWatchlist = [...watchlist].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue: any = a[sortField as keyof Stock];
    let bValue: any = b[sortField as keyof Stock];
    
    // Handle string values that represent numbers with suffixes like "2.7T"
    if (typeof aValue === 'string' && aValue.match(/^[\d.]+[KMBT]$/)) {
      const multiplier = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 };
      aValue = parseFloat(aValue) * multiplier[aValue.slice(-1) as keyof typeof multiplier];
      bValue = parseFloat(bValue) * multiplier[bValue.slice(-1) as keyof typeof multiplier];
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <section id="watchlist" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Market Watchlist</h2>
          <p className="text-muted-foreground max-w-2xl">Track your favorite stocks with our comprehensive watchlist. Real-time data and key metrics at a glance.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>DinoTradez Watchlist</span>
              <div className="inline-flex items-center px-2 py-1 ml-2 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <RefreshCw className={cn("h-3 w-3 mr-1", isLoading && "animate-spin")} />
                <span>Live Data</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-secondary text-muted-foreground flex items-center gap-1 transition-colors">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </button>
              <button 
                onClick={refreshData}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-lg hover:bg-secondary text-muted-foreground flex items-center gap-1 transition-colors",
                  isLoading && "bg-secondary"
                )}
              >
                <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
                <span>Refresh</span>
              </button>
              <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-secondary text-muted-foreground flex items-center gap-1 transition-colors">
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full watchlist-table">
              <thead>
                <tr className="bg-muted/50">
                  <th className="w-10">
                    <span className="sr-only">Favorite</span>
                  </th>
                  <th 
                    className="cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('symbol')}
                  >
                    <div className="flex items-center">
                      <span>Symbol</span>
                      {sortField === 'symbol' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </th>
                  <th>Company</th>
                  <th 
                    className="cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('lastPrice')}
                  >
                    <div className="flex items-center">
                      <span>Last Price</span>
                      {sortField === 'lastPrice' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('change')}
                  >
                    <div className="flex items-center">
                      <span>Change</span>
                      {sortField === 'change' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('percentChange')}
                  >
                    <div className="flex items-center">
                      <span>% Change</span>
                      {sortField === 'percentChange' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('volume')}
                  >
                    <div className="flex items-center">
                      <span>Volume</span>
                      {sortField === 'volume' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="cursor-pointer hover:bg-muted/80"
                    onClick={() => handleSort('marketCap')}
                  >
                    <div className="flex items-center">
                      <span>Market Cap</span>
                      {sortField === 'marketCap' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </th>
                  <th>Sector</th>
                </tr>
              </thead>
              <tbody>
                {sortedWatchlist.map((stock, index) => (
                  <tr key={stock.symbol} className="watchlist-row">
                    <td className="text-center">
                      <button className="p-1 hover:text-primary transition-colors">
                        <Star className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="font-medium">{stock.symbol}</td>
                    <td>{stock.companyName}</td>
                    <td>${stock.lastPrice.toFixed(2)}</td>
                    <td className={stock.change >= 0 ? "stock-positive" : "stock-negative"}>
                      <div className="flex items-center">
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}
                      </div>
                    </td>
                    <td className={stock.percentChange >= 0 ? "stock-positive" : "stock-negative"}>
                      {stock.percentChange >= 0 ? "+" : ""}{stock.percentChange.toFixed(2)}%
                    </td>
                    <td>{stock.volume.toLocaleString()}</td>
                    <td>{stock.marketCap}</td>
                    <td>
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                        {stock.sector}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Watchlist;

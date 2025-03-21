
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star, Plus, Filter, RefreshCw, ArrowUpDown, X, Eye, Mail, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface Stock {
  symbol: string;
  companyName: string;
  lastPrice: number;
  change: number;
  percentChange: number;
  volume: number;
  marketCap: string;
  marketCapRatio: number;
  newsflags: number;
  sVol: number;
  relativeVolumeStDev: number;
  sector: string;
  shares: number;
  catScale: number;
  putScale: number;
}

const mockWatchlist: Stock[] = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', lastPrice: 173.57, change: 2.35, percentChange: 1.37, volume: 74582651, marketCap: '2.7T', sector: 'Technology', marketCapRatio: 37.8, newsflags: 42.0, sVol: 38.5, relativeVolumeStDev: 7.67, shares: 15721386, catScale: 0.902, putScale: 1.32 },
  { symbol: 'MSFT', companyName: 'Microsoft Corp.', lastPrice: 329.93, change: 4.51, percentChange: 1.39, volume: 25698741, marketCap: '2.4T', sector: 'Technology', marketCapRatio: 40.27, newsflags: 29.0, sVol: 35.5, relativeVolumeStDev: 0.0, shares: 8253741, catScale: 0.0, putScale: 0.0 },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', lastPrice: 139.93, change: -1.27, percentChange: -0.90, volume: 18965423, marketCap: '1.8T', sector: 'Technology', marketCapRatio: 41.05, newsflags: 91.0, sVol: 58.8, relativeVolumeStDev: 0.45, shares: 13645620, catScale: 0.314, putScale: 0.093 },
  { symbol: 'AMZN', companyName: 'Amazon.com Inc.', lastPrice: 178.75, change: 3.24, percentChange: 1.85, volume: 32541689, marketCap: '1.9T', sector: 'Consumer Cyclical', marketCapRatio: 66.73, newsflags: 181.0, sVol: 56.0, relativeVolumeStDev: 0.42, shares: 8328336, catScale: 0.117, putScale: 0.032 },
  { symbol: 'TSLA', companyName: 'Tesla, Inc.', lastPrice: 194.05, change: -5.87, percentChange: -2.94, volume: 85214763, marketCap: '614.7B', sector: 'Consumer Cyclical', marketCapRatio: 10.56, newsflags: 1.0, sVol: 2.6, relativeVolumeStDev: 0.0, shares: 25995632, catScale: 0.285, putScale: 0.902 },
  { symbol: 'META', companyName: 'Meta Platforms, Inc.', lastPrice: 484.17, change: 7.45, percentChange: 1.56, volume: 15784236, marketCap: '1.2T', sector: 'Technology', marketCapRatio: 99.54, newsflags: 29.0, sVol: 15.6, relativeVolumeStDev: 0.0, shares: 9061417, catScale: 0.141, putScale: 7.433 },
  { symbol: 'NVDA', companyName: 'NVIDIA Corporation', lastPrice: 878.36, change: 15.78, percentChange: 1.83, volume: 41236985, marketCap: '2.1T', sector: 'Technology', marketCapRatio: 1.7472, newsflags: 35.0, sVol: 46.3, relativeVolumeStDev: 0.0, shares: 1587800, catScale: 0.033, putScale: 0.101 },
];

const Watchlist = () => {
  const { toast } = useToast();
  const [watchlist, setWatchlist] = useState<Stock[]>(mockWatchlist);
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  
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
          relativeVolumeStDev: parseFloat((stock.relativeVolumeStDev + (Math.random() * 0.2 - 0.1)).toFixed(2)),
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
  
  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setEmailSubscribed(true);
      setShowEmailForm(false);
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "You're now subscribed to watchlist updates",
        variant: "default"
      });
    }, 1000);
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
        
        <div className="bg-black rounded-xl shadow-md overflow-hidden text-white">
          <div className="px-6 py-4 border-b border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Eye className="h-4 w-4" />
              <span>DinoTradez Watchlist</span>
              <div className="inline-flex items-center px-2 py-1 ml-2 rounded-full bg-primary/20 text-primary text-xs font-medium">
                <RefreshCw className={cn("h-3 w-3 mr-1", isLoading && "animate-spin")} />
                <span>Live Data</span>
              </div>
              
              {emailSubscribed ? (
                <div className="inline-flex items-center px-2 py-1 ml-2 rounded-full bg-success/20 text-success text-xs font-medium">
                  <Mail className="h-3 w-3 mr-1" />
                  <span>Email Updates Active</span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowEmailForm(!showEmailForm)}
                  className="inline-flex items-center px-2 py-1 ml-2 rounded-full bg-gray-700 hover:bg-gray-600 text-xs font-medium transition-colors"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  <span>Enable Email Updates</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800 text-gray-300 flex items-center gap-1 transition-colors">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </button>
              <button 
                onClick={refreshData}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800 text-gray-300 flex items-center gap-1 transition-colors",
                  isLoading && "bg-gray-800"
                )}
              >
                <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
                <span>Refresh</span>
              </button>
              <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800 text-gray-300 flex items-center gap-1 transition-colors">
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
          
          {showEmailForm && (
            <div className="px-6 py-3 bg-gray-900">
              <form onSubmit={handleEmailSubscribe} className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email for watchlist updates"
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-dino-600 text-white rounded hover:bg-dino-500 transition-colors"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-1">
                <AlertCircle className="h-3 w-3 inline mr-1" />
                You'll receive intraday updates about your watchlist via email
              </p>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <Table className="w-full watchlist-table text-gray-200">
              <TableHeader className="bg-gray-900">
                <TableRow className="border-b border-gray-800 hover:bg-transparent">
                  <TableHead className="w-10 text-gray-400">
                    <span className="sr-only">Favorite</span>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
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
                  </TableHead>
                  <TableHead className="text-gray-400">Last</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
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
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
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
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
                    onClick={() => handleSort('marketCapRatio')}
                  >
                    <div className="flex items-center">
                      <span>Market Cap / Equity Ratio</span>
                      {sortField === 'marketCapRatio' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
                    onClick={() => handleSort('newsflags')}
                  >
                    <div className="flex items-center">
                      <span>Newsflags</span>
                      {sortField === 'newsflags' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
                    onClick={() => handleSort('sVol')}
                  >
                    <div className="flex items-center">
                      <span>sVol</span>
                      {sortField === 'sVol' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
                    onClick={() => handleSort('relativeVolumeStDev')}
                  >
                    <div className="flex items-center">
                      <span>RelativeVolume%StDev</span>
                      {sortField === 'relativeVolumeStDev' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
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
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
                    onClick={() => handleSort('shares')}
                  >
                    <div className="flex items-center">
                      <span>Shares</span>
                      {sortField === 'shares' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
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
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
                    onClick={() => handleSort('catScale')}
                  >
                    <div className="flex items-center">
                      <span>Cat Scale</span>
                      {sortField === 'catScale' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-800 text-gray-400"
                    onClick={() => handleSort('putScale')}
                  >
                    <div className="flex items-center">
                      <span>Put Scale</span>
                      {sortField === 'putScale' && (
                        <ArrowUpDown className={cn(
                          "ml-1 h-4 w-4", 
                          sortDirection === 'desc' ? "rotate-180" : ""
                        )} />
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedWatchlist.map((stock, index) => (
                  <TableRow key={stock.symbol} className="border-b border-gray-800 hover:bg-gray-900">
                    <TableCell className="text-center">
                      <button className="p-1 text-gray-500 hover:text-yellow-500 transition-colors">
                        <Star className="h-4 w-4" />
                      </button>
                    </TableCell>
                    <TableCell className="font-medium text-dino-400">{stock.symbol}</TableCell>
                    <TableCell>${stock.lastPrice.toFixed(2)}</TableCell>
                    <TableCell className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                      <div className="flex items-center">
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className={stock.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                      {stock.percentChange >= 0 ? "+" : ""}{stock.percentChange.toFixed(2)}%
                    </TableCell>
                    <TableCell>{stock.marketCapRatio.toFixed(2)}</TableCell>
                    <TableCell>{stock.newsflags.toFixed(1)}</TableCell>
                    <TableCell>{stock.sVol.toFixed(1)}</TableCell>
                    <TableCell>{stock.relativeVolumeStDev.toFixed(2)}</TableCell>
                    <TableCell>{stock.marketCap}</TableCell>
                    <TableCell>{stock.shares.toLocaleString()}</TableCell>
                    <TableCell>{stock.volume.toLocaleString()}</TableCell>
                    <TableCell>{stock.catScale.toFixed(3)}</TableCell>
                    <TableCell>{stock.putScale.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Watchlist;

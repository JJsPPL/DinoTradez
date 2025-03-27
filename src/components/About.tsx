
import React from 'react';
import { ArrowRight, Twitter, Youtube, ExternalLink, Mail, Clock, CalendarClock, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3">About DinoTradez</h2>
          <p className="text-muted-foreground max-w-2xl">We provide unique stock analysis tools and market insights to help you make informed trading decisions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="bg-black/50 border border-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-4">
                At DinoTradez, we're committed to empowering traders with unique analysis that were once only available to institutional investors. Our platform combines real-time data, advanced technical analysis, and fundamental insights to help you make more informed trading decisions.
              </p>
              <p className="text-muted-foreground">
                Whether you're a day trader, swing trader, or long-term investor, our comprehensive suite of tools is designed to give you an edge in today's dynamic markets by putting the probabilities on your side.
              </p>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://twitter.com/JonPaul1975" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Twitter className="h-5 w-5 text-[#1DA1F2] mr-3" />
                  <div>
                    <div className="font-medium">Twitter</div>
                    <div className="text-sm text-muted-foreground">@DinoTradez</div>
                  </div>
                </a>
                
                <a 
                  href="https://www.youtube.com/@DinoTradez" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Youtube className="h-5 w-5 text-[#FF0000] mr-3" />
                  <div>
                    <div className="font-medium">YouTube</div>
                    <div className="text-sm text-muted-foreground">@DinoTradez</div>
                  </div>
                </a>
                
                <a 
                  href="https://www.tradingview.com/pricing/?share_your_love=DinoTradez" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-[#2962FF] mr-3" />
                  <div>
                    <div className="font-medium">TradingView</div>
                    <div className="text-sm text-muted-foreground">DinoTradez</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:contact@dinotradez.com" 
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">Contact Us</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-black/50 border border-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Market Insights</h3>
              <div className="space-y-5">
                <div className="border-b border-border pb-4">
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <CalendarClock className="h-3.5 w-3.5 mr-1" />
                    <span>June 15, 2023</span>
                  </div>
                  <h4 className="font-medium mb-1">S&P 500 Technical Analysis</h4>
                  <p className="text-sm text-muted-foreground">Our latest technical analysis shows the S&P 500 approaching a key resistance level at 4,200. Watch for a potential breakout or rejection at this level.</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-sm text-primary mt-2 hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </div>
                
                <div className="border-b border-border pb-4">
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <CalendarClock className="h-3.5 w-3.5 mr-1" />
                    <span>June 10, 2023</span>
                  </div>
                  <h4 className="font-medium mb-1">AAPL Stock Analysis</h4>
                  <p className="text-sm text-muted-foreground">Apple (AAPL) has formed a strong base above the 50-day moving average. Our analysis suggests a potential upside target of $185 in the coming weeks.</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-sm text-primary mt-2 hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </div>
                
                <div>
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <CalendarClock className="h-3.5 w-3.5 mr-1" />
                    <span>June 5, 2023</span>
                  </div>
                  <h4 className="font-medium mb-1">Market Outlook: June 2023</h4>
                  <p className="text-sm text-muted-foreground">Our monthly market outlook examines key economic indicators and technical patterns that are likely to influence market direction in June.</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-sm text-primary mt-2 hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Trading Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">NYSE Trading Hours</span>
                  </div>
                  <span className="text-sm font-medium">9:30 AM - 4:00 PM ET</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">NASDAQ Trading Hours</span>
                  </div>
                  <span className="text-sm font-medium">9:30 AM - 4:00 PM ET</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Pre-Market Trading</span>
                  </div>
                  <span className="text-sm font-medium">4:00 AM - 9:30 AM ET</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">After-Hours Trading</span>
                  </div>
                  <span className="text-sm font-medium">4:00 PM - 8:00 PM ET</span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <div className="flex items-center">
                    <History className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Market Holidays</span>
                  </div>
                  <a 
                    href="#" 
                    className="text-sm text-primary hover:underline"
                  >
                    View Calendar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

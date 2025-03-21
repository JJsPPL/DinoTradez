
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, TrendingUp, BarChart3, BookOpen, PieChart, Bell, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine which section is currently in view
      const sections = ['home', 'watchlist', 'search', 'analysis', 'about'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-xl font-bold text-foreground">DinoTradez</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className={cn("nav-link text-sm font-medium transition-colors", 
                activeSection === 'home' ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('watchlist')} 
              className={cn("nav-link text-sm font-medium transition-colors", 
                activeSection === 'watchlist' ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Watchlist
            </button>
            <button 
              onClick={() => scrollToSection('search')} 
              className={cn("nav-link text-sm font-medium transition-colors", 
                activeSection === 'search' ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Stock Search
            </button>
            <button 
              onClick={() => scrollToSection('analysis')} 
              className={cn("nav-link text-sm font-medium transition-colors", 
                activeSection === 'analysis' ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Analysis
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={cn("nav-link text-sm font-medium transition-colors", 
                activeSection === 'about' ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              About
            </button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Login
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className={cn("block w-full text-left px-4 py-2 rounded-lg transition-colors", 
                activeSection === 'home' ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              )}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('watchlist')}
              className={cn("block w-full text-left px-4 py-2 rounded-lg transition-colors", 
                activeSection === 'watchlist' ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              )}
            >
              Watchlist
            </button>
            <button 
              onClick={() => scrollToSection('search')}
              className={cn("block w-full text-left px-4 py-2 rounded-lg transition-colors", 
                activeSection === 'search' ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              )}
            >
              Stock Search
            </button>
            <button 
              onClick={() => scrollToSection('analysis')}
              className={cn("block w-full text-left px-4 py-2 rounded-lg transition-colors", 
                activeSection === 'analysis' ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              )}
            >
              Analysis
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={cn("block w-full text-left px-4 py-2 rounded-lg transition-colors", 
                activeSection === 'about' ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              )}
            >
              About
            </button>
            
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  <Search className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

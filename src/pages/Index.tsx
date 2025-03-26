
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Watchlist from '@/components/Watchlist';
import StockSearch from '@/components/StockSearch';
import Analysis from '@/components/Analysis';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    console.log("Index component mounted");
    
    // Show a welcome toast
    toast.success("Welcome to DinoTradez!", {
      description: "Your modern stock trading dashboard",
    });
  }, []);

  console.log("Rendering Index component");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Watchlist />
        <StockSearch />
        <Analysis />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

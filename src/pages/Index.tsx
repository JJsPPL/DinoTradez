
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Watchlist from '@/components/Watchlist';
import StockSearch from '@/components/StockSearch';
import Analysis from '@/components/Analysis';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    const addAnimationObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    };

    // Run after a short delay to ensure all components are rendered
    setTimeout(addAnimationObserver, 100);
  }, []);

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

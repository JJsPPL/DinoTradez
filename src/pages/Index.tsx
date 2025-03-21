
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
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );
      
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    };

    // Run after a short delay to ensure all components are rendered
    setTimeout(addAnimationObserver, 100);
    
    // Add animation class to body elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      section.classList.add('animate-on-scroll');
      section.style.opacity = '0';
      // Add staggered animation delay
      section.style.animationDelay = `${index * 0.1}s`;
    });
    
    return () => {
      // Clean up animation classes when component unmounts
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.remove('animate-on-scroll');
        section.style.opacity = '1';
        section.style.animationDelay = '';
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
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

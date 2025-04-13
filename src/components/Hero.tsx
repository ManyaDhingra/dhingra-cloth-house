
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left max-w-lg mx-auto md:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-burgundy-600 mb-4">
              Elegant Fabrics & Clothing
            </h1>
            <p className="text-neutral-600 text-lg mb-8">
              Discover our exquisite collection of premium fabrics and traditional Indian attire. From gorgeous sarees to elegant lehengas, we offer the finest quality at Dhingra Cloth House.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                asChild
                className="bg-burgundy-600 hover:bg-burgundy-700 text-white px-8 py-6"
              >
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-burgundy-600 text-burgundy-600 hover:bg-burgundy-50 px-8 py-6"
              >
                <Link to="/categories">
                  Explore Categories
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gold-500/30 rounded-full blur-2xl animate-pulse"></div>
              <img 
                src="/placeholder.svg" 
                alt="Elegant Indian Attire" 
                className="relative rounded-lg shadow-xl w-full max-h-[500px] object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-burgundy-600/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;

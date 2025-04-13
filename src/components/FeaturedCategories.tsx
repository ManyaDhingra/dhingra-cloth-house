
import React from 'react';
import { categories } from '@/data/products';
import CategoryCard from './CategoryCard';

const FeaturedCategories: React.FC = () => {
  // Take the first 4 categories to display
  const featuredCategories = categories.slice(0, 4);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-burgundy-600 mb-3">
            Shop by Category
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our wide range of clothing categories featuring the finest fabrics and latest designs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

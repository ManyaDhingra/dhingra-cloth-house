
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductList from '@/components/ProductList';
import FeatureSection from '@/components/FeatureSection';
import { getFeaturedProducts } from '@/data/products';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-burgundy-600 mb-3">
              Featured Products
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Discover our exclusive collection of premium quality clothing and fabrics.
            </p>
          </div>
          
          <ProductList products={featuredProducts} />
        </div>
      </section>
      
      <FeatureSection />
      
      <section className="py-16 bg-burgundy-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-burgundy-600 mb-4">
            Crafting Elegance Since 1985
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto mb-8">
            With over three decades of experience, Dhingra Cloth House has been providing the finest quality fabrics and traditional Indian attire. Our commitment to quality and customer satisfaction has made us a trusted name in the textile industry.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-burgundy-600">35+</div>
              <div className="text-neutral-600">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-burgundy-600">10k+</div>
              <div className="text-neutral-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-burgundy-600">500+</div>
              <div className="text-neutral-600">Unique Designs</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

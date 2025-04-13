
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  title,
  emptyMessage = "No products found"
}) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-serif font-semibold text-neutral-800 mb-6">
          {title}
        </h2>
      )}
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-neutral-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById, getProductsByCategory } from '@/data/products';
import ProductList from '@/components/ProductList';
import { ChevronRight } from 'lucide-react';
import NotFound from './NotFound';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const categoryId = parseInt(id || '0');
  const category = getCategoryById(categoryId);
  
  if (!category) {
    return <NotFound />;
  }
  
  const products = getProductsByCategory(categoryId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-neutral-500 mb-6">
        <Link to="/" className="hover:text-burgundy-600">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/categories" className="hover:text-burgundy-600">Categories</Link>
        <ChevronRight size={16} className="mx-2" />
        <span>{category.name}</span>
      </div>
      
      <div className="bg-neutral-100 rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-burgundy-600 mb-4">
              {category.name}
            </h1>
            <p className="text-neutral-600">
              {category.description}
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-[200px] object-cover rounded-lg" 
            />
          </div>
        </div>
      </div>
      
      <ProductList 
        products={products} 
        title={`All ${category.name}`}
        emptyMessage={`No products found in ${category.name} category.`}
      />
    </div>
  );
};

export default CategoryPage;

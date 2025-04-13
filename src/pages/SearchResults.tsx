
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '@/data/products';
import ProductList from '@/components/ProductList';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [resultsTitle, setResultsTitle] = useState('Search Results');
  
  const query = searchParams.get('q') || '';
  const searchResults = searchProducts(query);
  
  useEffect(() => {
    if (query) {
      setResultsTitle(`Search Results for "${query}"`);
    } else {
      setResultsTitle('Search Results');
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-8 text-center">
        {resultsTitle}
      </h1>
      
      {searchResults.length > 0 ? (
        <ProductList 
          products={searchResults} 
          emptyMessage="No products match your search criteria." 
        />
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-full mb-6">
            <Search size={36} className="text-neutral-400" />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-neutral-800 mb-4">
            No results found
          </h2>
          <p className="text-neutral-600 mb-8">
            We couldn't find any products matching "{query}".
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-burgundy-600 hover:bg-burgundy-700">
              <Link to="/products">
                Browse All Products
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/categories">
                View Categories
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

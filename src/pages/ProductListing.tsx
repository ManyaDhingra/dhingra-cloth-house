
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '@/data/products';
import ProductList from '@/components/ProductList';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product } from '@/types';
import { Separator } from '@/components/ui/separator';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filters
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  
  // Parse any URL parameters for initial filter state
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([parseInt(categoryParam)]);
    }
    
    const query = searchParams.get('q');
    if (query) {
      // Filter products by search query
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      applyFilters();
    }
  }, [searchParams]);
  
  const applyFilters = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.categoryId));
    }
    
    // Filter by price range
    filtered = filtered.filter(product => {
      const discountedPrice = product.discount 
        ? product.price * (1 - product.discount / 100) 
        : product.price;
      return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        filtered.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        // In a real application, you would sort by date
        // Here we'll just use the ID as a proxy for newness
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  };
  
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange, sortBy]);
  
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 50000]);
    setSortBy('featured');
  };
  
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-8 text-center">
        Our Collection
      </h1>
      
      {/* Results count and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Button 
            variant="outline" 
            className="mr-2 md:hidden"
            onClick={toggleFilterPanel}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Filters
          </Button>
          <span className="text-neutral-600">
            Showing {filteredProducts.length} of {products.length} products
          </span>
        </div>
        
        <div className="w-full md:w-auto">
          <Select defaultValue={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-6">
            <div className="bg-white border border-neutral-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif font-semibold text-neutral-800">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-neutral-500 hover:text-burgundy-600"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="mb-6">
                <h3 className="font-medium text-neutral-800 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox 
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                        className="text-burgundy-600 border-neutral-300"
                      />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-neutral-600 text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="mb-4" />
              
              <div>
                <h3 className="font-medium text-neutral-800 mb-3">Price Range</h3>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="0" 
                    max="50000" 
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-burgundy-600"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-neutral-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters - Mobile */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden animate-fade-in">
            <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-lg">
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="font-serif font-semibold text-neutral-800">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleFilterPanel}
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-800 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox 
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                          className="text-burgundy-600 border-neutral-300"
                        />
                        <label 
                          htmlFor={`mobile-category-${category.id}`}
                          className="ml-2 text-neutral-600 text-sm cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                <div>
                  <h3 className="font-medium text-neutral-800 mb-3">Price Range</h3>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="0" 
                      max="50000" 
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-burgundy-600"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-neutral-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    resetFilters();
                    toggleFilterPanel();
                  }}
                >
                  Reset
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1 bg-burgundy-600 hover:bg-burgundy-700"
                  onClick={toggleFilterPanel}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Product List */}
        <div className="flex-grow">
          <ProductList 
            products={filteredProducts} 
            emptyMessage="No products match your filters. Try adjusting your criteria." 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListing;

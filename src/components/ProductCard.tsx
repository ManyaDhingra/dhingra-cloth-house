
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Calculate the discounted price if there's a discount
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;

  return (
    <div className="product-card group rounded-md overflow-hidden border border-neutral-200 bg-white h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative overflow-hidden h-[300px]">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-burgundy-600 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-serif text-lg font-medium text-neutral-800 mb-1 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-neutral-500 text-sm mb-2 line-clamp-2 flex-grow">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              {discountedPrice ? (
                <div className="flex flex-col">
                  <span className="font-semibold text-burgundy-600">
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-neutral-500 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="font-semibold text-burgundy-600">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity btn-add-to-cart rounded-full"
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} className="mr-1" />
              <span className="sr-only md:not-sr-only">Add</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

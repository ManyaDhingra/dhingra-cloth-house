
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedColor, selectedSize } = item;

  const actualPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  const totalPrice = actualPrice * quantity;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-neutral-200 rounded-lg bg-white mb-4">
      <div className="w-full sm:w-24 h-24 mr-4 mb-4 sm:mb-0 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-serif text-lg font-medium text-neutral-800">
          {product.name}
        </h3>
        
        {(selectedColor || selectedSize) && (
          <div className="text-sm text-neutral-500 mt-1">
            {selectedColor && <span>Color: {selectedColor}</span>}
            {selectedColor && selectedSize && <span> | </span>}
            {selectedSize && <span>Size: {selectedSize}</span>}
          </div>
        )}
        
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            <span className="mx-3 min-w-[1.5rem] text-center">
              {quantity}
            </span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleIncreaseQuantity}
            >
              <Plus size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
            <div className="font-semibold text-burgundy-600">
              ₹{totalPrice.toLocaleString()}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-4 text-neutral-400 hover:text-red-500"
              onClick={handleRemove}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

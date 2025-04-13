
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dhingra-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dhingra-cart', JSON.stringify(cartItems));
    
    // Calculate totals
    setTotalItems(cartItems.reduce((total, item) => total + item.quantity, 0));
    setTotalPrice(cartItems.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return total + price * item.quantity;
    }, 0));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated in your cart.`,
        });
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart.`,
        });
        return [...prevItems, { product, quantity, selectedColor, selectedSize }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast({
      title: "Item removed",
      description: "Item removed from your cart.",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

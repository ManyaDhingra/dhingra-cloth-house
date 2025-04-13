
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItemCard from '@/components/CartItemCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  
  // Calculate shipping cost (free over ₹5000)
  const shippingCost = totalPrice > 5000 ? 0 : 250;
  
  // Calculate total with shipping
  const totalWithShipping = totalPrice + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-8 text-center">
        Your Shopping Cart
      </h1>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <CartItemCard key={`${item.product.id}-${index}`} item={item} />
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap items-center justify-between">
              <Button 
                variant="outline" 
                className="mt-4 sm:mt-0"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              
              <Button asChild className="mt-4 sm:mt-0 bg-burgundy-50 text-burgundy-600 hover:bg-burgundy-100 border border-burgundy-200">
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white border border-neutral-200 rounded-lg p-6 sticky top-6">
              <h2 className="font-serif text-xl font-semibold text-neutral-800 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-neutral-800">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium text-neutral-800">
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-medium text-neutral-800">Included</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between mb-6">
                <span className="font-medium text-neutral-800">Total</span>
                <span className="font-bold text-burgundy-600 text-xl">₹{totalWithShipping.toLocaleString()}</span>
              </div>
              
              <Button className="w-full bg-burgundy-600 hover:bg-burgundy-700 mb-4">
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <div className="text-xs text-neutral-500 text-center">
                <p>Secure checkout powered by Razorpay</p>
                <p className="mt-1">Free shipping on orders over ₹5,000</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-full mb-6">
            <ShoppingBag size={36} className="text-neutral-400" />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-neutral-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-neutral-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild className="bg-burgundy-600 hover:bg-burgundy-700">
            <Link to="/products">
              Start Shopping
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getCategoryById } from '@/data/products';
import { ShoppingBag, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import ProductList from '@/components/ProductList';
import ReviewForm from '@/components/ReviewForm';
import NotFound from './NotFound';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  
  if (!product) {
    return <NotFound />;
  }
  
  const category = getCategoryById(product.categoryId);
  
  // Calculate the discounted price if there's a discount
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
    
  const actualPrice = discountedPrice || product.price;
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link copied to clipboard.",
    });
  };
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={goBack}
        className="flex items-center text-neutral-600 hover:text-burgundy-600 mb-6 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden border border-neutral-200 relative">
          {product.discount && (
            <div className="absolute top-4 right-4 bg-burgundy-600 text-white text-sm font-bold px-3 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[500px] object-contain" 
          />
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex items-center text-sm text-neutral-500 mb-2">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>{category?.name}</span>
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={18} 
                    className={star <= 4 ? "fill-gold-500 text-gold-500" : "text-neutral-300"} 
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-500">36 reviews</span>
            </div>
            
            <div className="mb-4">
              {discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-burgundy-600 mr-3">
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-neutral-500 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-burgundy-600">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>
            
            <p className="text-neutral-600 mb-6">
              {product.description}
            </p>
          </div>
          
          <Separator className="my-6" />
          
          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-neutral-800 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 border rounded-md transition-all ${
                      selectedColor === color 
                        ? 'border-burgundy-600 text-burgundy-600' 
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-neutral-800 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md transition-all ${
                      selectedSize === size 
                        ? 'border-burgundy-600 text-burgundy-600' 
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center border border-neutral-200 rounded-md">
              <button 
                className="px-3 py-2 text-neutral-600 hover:text-burgundy-600"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-neutral-200 min-w-[40px] text-center">
                {quantity}
              </span>
              <button 
                className="px-3 py-2 text-neutral-600 hover:text-burgundy-600"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
            
            <Button 
              className="bg-burgundy-600 hover:bg-burgundy-700 text-white flex-1 sm:flex-none"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </Button>
            
            <Button variant="outline" className="border-neutral-200" onClick={handleAddToWishlist}>
              <Heart size={18} />
            </Button>
            
            <Button variant="outline" className="border-neutral-200" onClick={handleShare}>
              <Share2 size={18} />
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          {/* Additional Info */}
          <div>
            <div className="flex items-center mb-2">
              <span className="w-24 text-neutral-500">SKU:</span>
              <span className="text-neutral-800">DCH-{product.id.toString().padStart(4, '0')}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 text-neutral-500">Category:</span>
              <span className="text-neutral-800">{category?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-neutral-500">Tags:</span>
              <div className="flex flex-wrap gap-1">
                <span className="text-neutral-800">Clothing,</span>
                <span className="text-neutral-800">Indian,</span>
                <span className="text-neutral-800">Traditional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for Description, Additional Info, and Reviews */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger 
              value="description" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-burgundy-600 data-[state=active]:text-burgundy-600 data-[state=active]:shadow-none pb-2 pt-0 px-4"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="additional" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-burgundy-600 data-[state=active]:text-burgundy-600 data-[state=active]:shadow-none pb-2 pt-0 px-4"
            >
              Additional Information
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-burgundy-600 data-[state=active]:text-burgundy-600 data-[state=active]:shadow-none pb-2 pt-0 px-4"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p className="mb-4">
                {product.description}
              </p>
              <p className="mb-4">
                Our {product.name.toLowerCase()} is crafted with meticulous attention to detail, using only the finest materials. Each piece is a testament to the rich heritage and craftsmanship of Indian textiles.
              </p>
              <p>
                Perfect for special occasions, this piece combines traditional design elements with contemporary sensibilities, creating a timeless addition to your wardrobe.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="additional" className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-neutral-800 w-1/3">Material</td>
                    <td className="py-3 text-neutral-600">Premium quality fabric</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-neutral-800">Origin</td>
                    <td className="py-3 text-neutral-600">Made in India</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-neutral-800">Care Instructions</td>
                    <td className="py-3 text-neutral-600">Dry clean only</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-neutral-800">Package Contents</td>
                    <td className="py-3 text-neutral-600">1 {product.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif font-semibold text-neutral-800 mb-4">
                  Customer Reviews
                </h3>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={18} 
                          className={star <= 4 ? "fill-gold-500 text-gold-500" : "text-neutral-300"} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">Based on 36 reviews</span>
                  </div>
                  
                  <div className="space-y-6 mt-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              size={16} 
                              className={star <= 5 ? "fill-gold-500 text-gold-500" : "text-neutral-300"} 
                            />
                          ))}
                        </div>
                        <h4 className="font-medium text-neutral-800">Priya Sharma</h4>
                      </div>
                      <p className="text-sm text-neutral-500 mb-2">June 15, 2023</p>
                      <p className="text-neutral-600">
                        Absolutely beautiful! The quality is exceptional and the design is stunning. I received so many compliments wearing this.
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              size={16} 
                              className={star <= 4 ? "fill-gold-500 text-gold-500" : "text-neutral-300"} 
                            />
                          ))}
                        </div>
                        <h4 className="font-medium text-neutral-800">Rahul Verma</h4>
                      </div>
                      <p className="text-sm text-neutral-500 mb-2">May 22, 2023</p>
                      <p className="text-neutral-600">
                        Great product! The material is comfortable and the fit is perfect. Would definitely buy from Dhingra Cloth House again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-semibold text-neutral-800 mb-4">
                  Write a Review
                </h3>
                <ReviewForm />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;

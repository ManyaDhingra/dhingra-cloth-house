
import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Sarees',
    description: 'Traditional Indian sarees in various fabrics and designs',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Suits',
    description: 'Elegant suits for all occasions',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Lehengas',
    description: 'Beautiful lehengas for celebrations and weddings',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Kurtas',
    description: 'Comfortable and stylish kurtas for daily wear',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Fabrics',
    description: 'Premium fabrics for custom tailoring',
    image: '/placeholder.svg'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Banarasi Silk Saree',
    price: 15000,
    description: 'Handwoven Banarasi silk saree with intricate gold zari work. Perfect for weddings and special occasions.',
    image: '/placeholder.svg',
    categoryId: 1,
    featured: true,
    colors: ['Red', 'Maroon', 'Gold'],
    sizes: ['Free Size']
  },
  {
    id: 2,
    name: 'Cotton Salwar Suit',
    price: 3500,
    description: 'Comfortable cotton salwar suit with beautiful embroidery. Ideal for everyday wear and casual occasions.',
    image: '/placeholder.svg',
    categoryId: 2,
    featured: false,
    discount: 10,
    colors: ['Blue', 'Green', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'Designer Lehenga Choli',
    price: 25000,
    description: 'Stunning designer lehenga choli with contemporary embellishments. Perfect for wedding ceremonies and receptions.',
    image: '/placeholder.svg',
    categoryId: 3,
    featured: true,
    colors: ['Pink', 'Red', 'Purple'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'Men\'s Kurta Pajama',
    price: 4500,
    description: 'Elegant men\'s kurta pajama set made from premium cotton. Comfortable and stylish for festivals and celebrations.',
    image: '/placeholder.svg',
    categoryId: 4,
    featured: false,
    colors: ['White', 'Beige', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 5,
    name: 'Raw Silk Fabric',
    price: 1200,
    description: 'Premium raw silk fabric by the meter. Ideal for custom outfits and home decor projects.',
    image: '/placeholder.svg',
    categoryId: 5,
    featured: false,
    discount: 5,
    colors: ['Gold', 'Silver', 'Cream'],
    sizes: ['1 meter', '2 meters', '5 meters']
  },
  {
    id: 6,
    name: 'Chanderi Saree',
    price: 8500,
    description: 'Lightweight Chanderi saree with delicate zari border. Elegant choice for functions and celebrations.',
    image: '/placeholder.svg',
    categoryId: 1,
    featured: true,
    colors: ['Teal', 'Mustard', 'Peach'],
    sizes: ['Free Size']
  },
  {
    id: 7,
    name: 'Embroidered Anarkali Suit',
    price: 12000,
    description: 'Floor-length Anarkali suit with intricate embroidery. A stunning outfit for special occasions.',
    image: '/placeholder.svg',
    categoryId: 2,
    featured: true,
    colors: ['Royal Blue', 'Emerald Green', 'Burgundy'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 8,
    name: 'Bridal Lehenga',
    price: 45000,
    description: 'Exquisite bridal lehenga with heavy embellishments and detailed handwork. The ultimate wedding attire.',
    image: '/placeholder.svg',
    categoryId: 3,
    featured: true,
    colors: ['Red', 'Maroon', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL']
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};


export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  featured: boolean;
  discount?: number;
  colors: string[];
  sizes: string[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
}

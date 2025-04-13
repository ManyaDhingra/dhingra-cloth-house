
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search,
  User
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-burgundy-600">
              Dhingra<span className="text-gold-500">Cloth</span>House
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-neutral-800 hover:text-burgundy-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-neutral-800 hover:text-burgundy-600 transition-colors">
              Shop
            </Link>
            <Link to="/categories" className="text-neutral-800 hover:text-burgundy-600 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-neutral-800 hover:text-burgundy-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-neutral-800 hover:text-burgundy-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSearch}
              className="p-2 text-neutral-800 hover:text-burgundy-600 transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
            <Link 
              to="/account" 
              className="p-2 text-neutral-800 hover:text-burgundy-600 transition-colors"
              aria-label="Account"
            >
              <User size={24} />
            </Link>
            <Link 
              to="/cart" 
              className="p-2 text-neutral-800 hover:text-burgundy-600 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-burgundy-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-neutral-800 hover:text-burgundy-600 transition-colors focus:outline-none"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-neutral-800 hover:text-burgundy-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-neutral-800 hover:text-burgundy-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/categories" 
                className="text-neutral-800 hover:text-burgundy-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-neutral-800 hover:text-burgundy-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-neutral-800 hover:text-burgundy-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search for products..."
                className="flex-grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button type="submit" variant="default" className="ml-2">
                Search
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={toggleSearch} 
                className="ml-2"
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

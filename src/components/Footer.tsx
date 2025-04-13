
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold text-burgundy-600 mb-4">
              Dhingra Cloth House
            </h3>
            <p className="text-neutral-600 mb-4">
              Providing premium quality fabrics and clothing since 1985. We offer the finest selection of traditional and contemporary Indian attire.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-burgundy-600 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-burgundy-600 mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shipping" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-burgundy-600 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 text-burgundy-600 flex-shrink-0 mt-1" size={18} />
                <span className="text-neutral-600">
                  123 Fashion Street, Textile Market, Delhi, India - 110001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-burgundy-600 flex-shrink-0" size={18} />
                <a 
                  href="tel:+911234567890" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-burgundy-600 flex-shrink-0" size={18} />
                <a 
                  href="mailto:info@dhingracloth.com" 
                  className="text-neutral-600 hover:text-burgundy-600 transition-colors"
                >
                  info@dhingracloth.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 pt-6 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-600 text-sm mb-4 md:mb-0">
              © {currentYear} Dhingra Cloth House. All rights reserved.
            </p>
            <div>
              <p className="text-neutral-600 text-sm mb-2">Accepted Payment Methods</p>
              <div className="flex space-x-3">
                <span className="text-neutral-400">Visa</span>
                <span className="text-neutral-400">Mastercard</span>
                <span className="text-neutral-400">PayPal</span>
                <span className="text-neutral-400">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

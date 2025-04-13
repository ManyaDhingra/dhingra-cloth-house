
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="block group overflow-hidden relative rounded-md"
    >
      <div className="h-[200px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white font-serif text-xl font-semibold mb-1">
          {category.name}
        </h3>
        <p className="text-white/80 text-sm line-clamp-2">
          {category.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;

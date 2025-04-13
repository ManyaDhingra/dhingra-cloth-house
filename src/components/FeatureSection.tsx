
import React from 'react';
import { Truck, RotateCw, CheckCircle, Clock } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders above ₹5000'
  },
  {
    icon: RotateCw,
    title: 'Easy Returns',
    description: '30-day return policy'
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: '100% authentic products'
  },
  {
    icon: Clock,
    title: 'Customer Support',
    description: 'Available 10 AM - 7 PM'
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <feature.icon className="w-12 h-12 text-burgundy-600 mb-4" />
              <h3 className="font-serif font-semibold text-lg text-neutral-800 mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

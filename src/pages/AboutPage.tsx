
import React from 'react';
import { Separator } from '@/components/ui/separator';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-8 text-center">
          About Dhingra Cloth House
        </h1>
        
        <div className="mb-12">
          <img 
            src="/placeholder.svg" 
            alt="Dhingra Cloth House" 
            className="w-full h-[300px] object-cover rounded-lg mb-6" 
          />
        </div>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-serif font-semibold text-burgundy-600">Our Story</h2>
          <p>
            Established in 1985, Dhingra Cloth House has been a cornerstone in the 
            fabric and traditional clothing industry for over three decades. What began as a 
            small shop in the heart of Delhi's textile market has grown into a renowned brand 
            synonymous with quality and tradition.
          </p>
          
          <p>
            Founded by Mr. Rajesh Dhingra, our business was built on the principles of 
            quality, authenticity, and customer satisfaction. These values continue to 
            guide us today as we expand our offerings while staying true to our roots.
          </p>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-serif font-semibold text-burgundy-600">Our Mission</h2>
          <p>
            At Dhingra Cloth House, our mission is to preserve and promote the rich 
            textile heritage of India while embracing modern designs and techniques. We strive 
            to provide our customers with the finest quality fabrics and clothing that 
            celebrate the craftmanship and artistry of Indian textiles.
          </p>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-serif font-semibold text-burgundy-600">What Sets Us Apart</h2>
          <ul>
            <li>
              <strong>Quality Assurance</strong>: Every product we offer undergoes rigorous 
              quality checks to ensure it meets our exacting standards.
            </li>
            <li>
              <strong>Authentic Craftsmanship</strong>: We work directly with skilled artisans 
              to bring you authentic, handcrafted pieces that preserve traditional techniques.
            </li>
            <li>
              <strong>Personalized Service</strong>: Our team of experts is always ready to 
              provide personalized recommendations and assistance.
            </li>
            <li>
              <strong>Sustainable Practices</strong>: We are committed to ethical sourcing and 
              sustainable production methods that respect both people and the environment.
            </li>
          </ul>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-serif font-semibold text-burgundy-600">Our Collection</h2>
          <p>
            Our diverse collection includes:
          </p>
          <ul>
            <li>
              <strong>Sarees</strong>: From traditional Banarasi silk to contemporary designs, 
              our saree collection offers something for every occasion.
            </li>
            <li>
              <strong>Suits</strong>: Elegant salwar suits, Anarkalis, and more in a variety of 
              fabrics and designs.
            </li>
            <li>
              <strong>Lehengas</strong>: Exquisite bridal and occasional lehengas featuring 
              intricate embroidery and embellishments.
            </li>
            <li>
              <strong>Fabrics</strong>: Premium quality fabrics by the meter for custom tailoring 
              and creative projects.
            </li>
          </ul>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-serif font-semibold text-burgundy-600">Visit Us</h2>
          <p>
            We invite you to visit our flagship store in Delhi to experience our collection in person. 
            Our knowledgeable staff will be delighted to assist you in finding the perfect piece for 
            your needs.
          </p>
          <p>
            For those unable to visit us, our online store brings the Dhingra Cloth House experience 
            directly to your doorstep, with secure shipping nationwide.
          </p>
          
          <div className="bg-neutral-100 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-serif font-semibold text-burgundy-600 mb-4">Store Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-neutral-800">Weekdays (Mon-Fri)</p>
                <p className="text-neutral-600">10:00 AM - 7:00 PM</p>
              </div>
              <div>
                <p className="font-medium text-neutral-800">Weekends (Sat-Sun)</p>
                <p className="text-neutral-600">11:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

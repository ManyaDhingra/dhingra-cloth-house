
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-neutral-800 mb-8 text-center">
        Contact Us
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-burgundy-600 mb-6">
            Get in Touch
          </h2>
          
          <p className="text-neutral-600 mb-8">
            We'd love to hear from you! Whether you have a question about our products, need styling advice, or want to provide feedback, our team is here to help.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-burgundy-50 rounded-full flex items-center justify-center mr-4">
                <MapPin className="text-burgundy-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Visit Us</h3>
                <p className="text-neutral-600">
                  123 Fashion Street, Textile Market,<br />
                  Delhi, India - 110001
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-burgundy-50 rounded-full flex items-center justify-center mr-4">
                <Mail className="text-burgundy-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Email Us</h3>
                <p className="text-neutral-600">
                  <a href="mailto:info@dhingracloth.com" className="hover:text-burgundy-600 transition-colors">
                    info@dhingracloth.com
                  </a>
                </p>
                <p className="text-neutral-600">
                  <a href="mailto:support@dhingracloth.com" className="hover:text-burgundy-600 transition-colors">
                    support@dhingracloth.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-burgundy-50 rounded-full flex items-center justify-center mr-4">
                <Phone className="text-burgundy-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">Call Us</h3>
                <p className="text-neutral-600">
                  <a href="tel:+911234567890" className="hover:text-burgundy-600 transition-colors">
                    +91 123 456 7890
                  </a>
                </p>
                <p className="text-neutral-600">
                  <a href="tel:+911234567891" className="hover:text-burgundy-600 transition-colors">
                    +91 123 456 7891
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-neutral-800 mb-3">Business Hours</h3>
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-neutral-600">Monday - Friday</div>
                <div className="text-neutral-800">10:00 AM - 7:00 PM</div>
                
                <div className="text-neutral-600">Saturday</div>
                <div className="text-neutral-800">11:00 AM - 8:00 PM</div>
                
                <div className="text-neutral-600">Sunday</div>
                <div className="text-neutral-800">11:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-serif font-semibold text-burgundy-600 mb-6">
              Send Us a Message
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message..." 
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-burgundy-600 hover:bg-burgundy-700 text-white w-full"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      <div className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-serif font-semibold text-burgundy-600 mb-6 text-center">
          Visit Our Store
        </h2>
        <div className="bg-neutral-200 rounded-lg h-[400px] flex items-center justify-center">
          <p className="text-neutral-600">Map will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

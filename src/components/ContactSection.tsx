import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send,
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock
} from "lucide-react";

const ContactSection = () => {
  return (
    <div className="py-14 bg-lucent-navy relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-300">
            Our team of experts is ready to answer your questions and help you discover how Pinaxa Labs can transform your trading.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg h-full">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            <form action="https://formsubmit.co/acb6eeb54698427dc97fbc32b61f91d7" method="POST">
              {/* Honeypot to prevent spam */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              {/* Disable Captcha */}
              <input type="hidden" name="_captcha" value="false" />
              
              {/* Specify redirect after submission */}
              <input type="hidden" name="_next" value="https://pinaxalabs.com/thank-you" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    className="bg-white/5 border border-white/10 focus:border-lucent-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    className="bg-white/5 border border-white/10 focus:border-lucent-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-white mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    className="bg-white/5 border border-white/10 focus:border-lucent-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    className="bg-white/5 border border-white/10 focus:border-lucent-purple"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Please provide details about your inquiry..."
                  className="bg-white/5 border border-white/10 focus:border-lucent-purple resize-none"
                  required
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full sm:w-auto">
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="h-full">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                      <PhoneCall className="h-5 w-5 text-lucent-purple" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Phone</h4>
                    <p className="text-gray-400">+91 6361156726</p>
                    <p className="text-gray-400">+91 8722741058</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-lucent-purple" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Email</h4>
                    <p className="text-gray-400">info@Pinaxalabs.com</p>
                    <p className="text-gray-400">support@pinaxalabs.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-lucent-purple" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Office Location</h4>
                    <p className="text-gray-400">
                    253, SMT Rukkavva Junnur, Mudhol - 587313 Karnataka, India
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-lucent-purple/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-lucent-purple" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Business Hours</h4>
                    <p className="text-gray-400">
                      Monday - Friday: 9:00 AM - 7:00 PM EST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

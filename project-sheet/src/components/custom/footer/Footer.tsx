'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  

  return (
    <footer className="  pt-16 pb-6 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-2xl font-bold text-[#0a0531] mb-6">EduPortal</h2>
          <p className="mb-6 text-gray-600 leading-relaxed">
            We provide quality education across all academic levels with dedicated instructors and comprehensive learning resources to help students excel in their academic journey.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#0a0531] hover:bg-custom-primary hover:text-white transition-colors duration-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#0a0531] hover:bg-custom-primary hover:text-white transition-colors duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#0a0531] hover:bg-custom-primary hover:text-white transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#0a0531] hover:bg-custom-primary hover:text-white transition-colors duration-300">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-custom-text mb-6 relative after:content-[''] after:absolute after:w-10 after:h-1 after:bg-custom-primary after:left-0 after:bottom-[-8px]">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">About Us</Link></li>
            <li><Link href="/courses" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Courses</Link></li>
            <li><Link href="/instructors" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Instructors</Link></li>
            <li><Link href="/events" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Events</Link></li>
            <li><Link href="/blog" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Blog</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 - Programs */}
        <div>
          <h3 className="text-lg font-bold text-custom-text mb-6 relative after:content-[''] after:absolute after:w-10 after:h-1 after:bg-custom-primary  after:left-0 after:bottom-[-8px]">
            Programs
          </h3>
          <ul className="space-y-3">
            <li><Link href="/school/class-10" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Class 10</Link></li>
            <li><Link href="/college/class-12" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Class 12</Link></li>
            <li><Link href="/university/year-1" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">University 1st Year</Link></li>
            <li><Link href="/university/year-3" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">University 3rd Year</Link></li>
            <li><Link href="/certification" className="text-gray-600 hover:text-custom-primary/90 transition-colors duration-300">Certification Programs</Link></li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h3 className="text-lg font-bold text-custom-text mb-6 relative after:content-[''] after:absolute after:w-10 after:h-1 after:bg-custom-primary  after:left-0 after:bottom-[-8px]">
            Contact Us
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="text-custom-primary/90 mt-1 mr-3 flex-shrink-0" size={18} />
              <p className="text-gray-600">123 Education Street, Learning City, Knowledge State 54321</p>
            </div>
            <div className="flex items-center">
              <Phone className="text-custom-primary/90 mr-3 flex-shrink-0" size={18} />
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center">
              <Mail className="text-custom-primary/90 mr-3 flex-shrink-0" size={18} />
              <p className="text-gray-600">info@eduportal.com</p>
            </div>
            <div className="flex items-start">
              <Clock className="text-custom-primary/90 mt-1 mr-3 flex-shrink-0" size={18} />
              <p className="text-gray-600">Monday - Friday: 8AM - 6PM<br />Saturday: 9AM - 1PM</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-[#0a0531] mb-3">Subscribe to Newsletter</h4>
            <form  className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-grow px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-custom-accent/50"
                required
              />
              <button 
                type="submit" 
                className="bg-custom-primary text-white px-4 py-2 rounded-r-md hover:bg-custom-primary transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mt-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EduPortal. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li><Link href="/privacy" className="text-gray-500 hover:text-custom-primary transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-500 hover:text-custom-primary transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/sitemap" className="text-gray-500 hover:text-custom-primary transition-colors duration-300">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
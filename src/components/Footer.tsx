import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaDribbble } from 'react-icons/fa';
import logo from '../assets/editLab.png'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      console.log('Subscribing email:', email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="w-[95%] lg:w-[90%] mx-auto py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-medium">EditLabs</span>
            </div>
            
            {/* Social Media */}
            <div>
              <p className="text-gray-400 text-sm mb-4">Follow us on:</p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaInstagram size={18} className="text-gray-400" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaFacebookF size={18} className="text-gray-400" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaDribbble size={18} className="text-gray-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-white font-medium mb-6">Sections</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Why EditLabs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-medium mb-6">Information</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">404</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Use Template</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-4">Join our newsletter</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Sign up to our mailing list below and be the first to know about new updates. Don't worry, we hate spam too.
            </p>
            
            {/* Email Subscription */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-violet-400 to-purple-400 hover:from-orange-500 hover:to-red-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
              >
                Get Notified
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2025 EditLabs All rights reserved</p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
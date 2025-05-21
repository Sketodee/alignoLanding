import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative z-20 w-full bg-black/20 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto w-full p-4">
        {/* Desktop and Mobile Navigation */}
        <div className="flex justify-between items-center">
          {/* Left Menu Items - Hidden on small screens */}
          <div className="hidden lg:flex space-x-8">
            <a href="#features" className="text-white hover:text-purple-300 transition-colors">Features</a>
            <a href="#testimonials" className="text-white hover:text-purple-300 transition-colors">Testimonials</a>
          </div>

          {/* Logo - Always visible and centered on mobile */}
          <div className="flex lg:order-2">
            <div className="h-8 w-8 bg-white flex items-center justify-center">
              <div className="h-6 w-6 bg-black"></div>
            </div>
          </div>

          {/* Right Menu Items - Hidden on small screens */}
          <div className="hidden lg:flex space-x-8 lg:order-3">
            <a href="#why" className="text-white hover:text-purple-300 transition-colors">Why Aligno?</a>
            <a href="#pricing" className="text-white hover:text-purple-300 transition-colors">Pricing</a>
          </div>

          {/* Mobile Menu Button - Only visible on small screens */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden order-3 focus:outline-none text-white"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Collapsible */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 pb-2`}>
          <div className="flex flex-col space-y-4">
            <a href="#features" className="text-white hover:text-purple-300 transition-colors">Features</a>
            <a href="#testimonials" className="text-white hover:text-purple-300 transition-colors">Testimonials</a>
            <a href="#why" className="text-white hover:text-purple-300 transition-colors">Why Aligno?</a>
            <a href="#pricing" className="text-white hover:text-purple-300 transition-colors">Pricing</a>
          </div>
        </div>
      </div>
       <div className="w-[50%] md:w-[40%] lg:w-[30%] mx-auto h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent rounded-full"></div>
    </div>
  );
};

export default Navbar;
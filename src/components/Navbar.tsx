import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    toggleMenu()
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(false);
    navigate('/profile');
    console.log('Navigating to profile');
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    // Close mobile menu when clicking a link
    setIsMenuOpen(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 200);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Handle scrolling when component mounts or URL changes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the '#'
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get first letter of email for profile icon
  const getProfileInitial = () => {
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-purple-900 via-black-800 to-black backdrop-blur-lg">
      <div className="max-w-6xl mx-auto w-full p-4">
        {/* Desktop and Mobile Navigation */}
        <div className="flex justify-between items-center">
          {/* Left Menu Items - Hidden on small screens */}
          <div className="hidden lg:flex space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer"
            >
              Testimonials  
            </button>
             <Link to={"/plugins"}
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer"
            >
              View Plugins 
            </Link>
          </div>

          {/* Logo - Always visible and centered on mobile */}
          <div className="flex lg:order-2">
            <Link to="/" className="h-8 w-8 bg-white flex items-center justify-center">
              <div className="h-6 w-6 bg-black"></div>
            </Link>
          </div>

          {/* Right Menu Items + Auth/Profile - Hidden on small screens */}
          <div className="hidden lg:flex items-center space-x-8 lg:order-3">
            <button 
              onClick={() => scrollToSection('why')}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer"
            >
              Why EditLab?
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer"
            >
              Pricing
            </button>
            
            {/* Auth Buttons or Profile */}
            <div className="flex items-center space-x-4 ml-6">
              {!user ? (
                <>
                  <Link to="/login">
                    <button className="text-white hover:text-purple-300 transition-colors px-3 py-1.5 rounded-md hover:bg-white/10">
                      Login 
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md transition-colors font-medium">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors font-medium"
                  >
                    {getProfileInitial()}
                  </button>
                  
                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-200 border-b">
                        <div className="text-gray-200">{user.email}</div>
                      </div>
                      <button
                        onClick={handleProfileClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
            <button 
              onClick={() => scrollToSection('features')}
              className="text-white hover:text-purple-300 transition-colors text-left"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-purple-300 transition-colors text-left"
            >
              Testimonials
            </button>
                <Link to={"/plugins"}
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer"
            >
              View Plugins 
            </Link>
            <button 
              onClick={() => scrollToSection('why')}
              className="text-white hover:text-purple-300 transition-colors text-left"
            >
              Why EditLab?
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-white hover:text-purple-300 transition-colors text-left"
            >
              Pricing
            </button>
            
            {/* Mobile Auth Buttons or Profile */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
              {!user ? (
                <>
                  <Link to="/login">
                    <button onClick={toggleMenu} className="text-white hover:text-purple-300 transition-colors px-3 py-2 rounded-md hover:bg-white/10 text-left w-full">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button onClick={toggleMenu} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors font-medium w-full">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-medium">
                      {getProfileInitial()}
                    </div>
                    <div className="text-white">
                      <div className="font-medium">{user.email || 'User'}</div>
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </div>
                  </div>
                  <Link to="/profile">
                    <button onClick={toggleMenu} className="text-white hover:text-purple-300 transition-colors px-3 py-2 rounded-md hover:bg-white/10 text-left w-full">
                      View Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-purple-300 transition-colors px-3 py-2 rounded-md hover:bg-white/10 text-left w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] md:w-[40%] lg:w-[30%] mx-auto h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent rounded-full"></div>
    </div>
  );
};

export default Navbar;
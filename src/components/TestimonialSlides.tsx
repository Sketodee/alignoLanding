import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { useEffect, useState, useRef } from "react";

const TestimonialSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setItemsPerView] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      quote: "EditLabs transformed our project management efficiency",
      name: "Sarah Johnson",
      company: "Pixel works"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=600&fit=crop",
      quote: "The best tool we've integrated into our workflow",
      name: "Michael Chen",
      company: "Tech Solutions Inc"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      quote: "Incredible results in just weeks of implementation",
      name: "Emily Rodriguez",
      company: "Creative Studio"
    }
  ];

  // Duplicate testimonials for infinite scroll effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset animation when out of view so it can retrigger
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of component is visible
        rootMargin: '50px 0px -50px 0px' // Add some margin for better UX
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      // Reset to beginning when reaching the end of first set
      if (newIndex >= testimonials.length) {
        return 0;
      }
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      // Jump to last item when going before first
      if (newIndex < 0) {
        return testimonials.length - 1;
      }
      return newIndex;
    });
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 3; // Show up to 3 testimonials
    return extendedTestimonials.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-black">
      <div 
        ref={containerRef}
        className="relative w-[95%] lg:w-[90%] mx-auto py-10 md:py-6"
      >
        {/* Navigation Buttons - Hidden on lg screens */}
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 ease-out lg:hidden ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
        >
          <CgArrowLongLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 ease-out lg:hidden ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
        >
          <CgArrowLongRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {extendedTestimonials.map((testimonial, index) => {
              // Calculate which testimonials are currently visible
              const isCurrentlyVisible = index >= currentIndex && index < currentIndex + 3;
              const visibleIndex = index - currentIndex;
              
              return (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="w-full md:w-1/2 lg:w-1/3 px-4 flex-shrink-0"
                >
                  <div 
                    className={`h-[550px] md:h-[700px] relative overflow-hidden rounded-3xl transition-all duration-500 ease-out ${
                      isVisible && isCurrentlyVisible
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-12 scale-95'
                    }`}
                    style={{ 
                      transitionDelay: isVisible && isCurrentlyVisible ? `${visibleIndex * 150}ms` : '0ms' 
                    }}
                  >
                    {/* Image */}
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent h-3/4 bottom-0 top-auto"></div>

                    {/* Content */}
                    <div className="absolute flex flex-col justify-between bottom-0 left-0 right-0 h-[45%] md:h-[35%] bg-transparent p-4 text-gray-300">
                      <h3 
                        className={`text-3xl line-clamp-3 font-regular mb-2 transition-all duration-400 ease-out ${
                          isVisible && isCurrentlyVisible
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'
                        }`}
                        style={{ 
                          transitionDelay: isVisible && isCurrentlyVisible ? `${visibleIndex * 150 + 200}ms` : '0ms' 
                        }}
                      >
                        {testimonial.quote}
                      </h3>
                      <div 
                        className={`transition-all duration-300 ease-out ${
                          isVisible && isCurrentlyVisible
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'
                        }`}
                        style={{ 
                          transitionDelay: isVisible && isCurrentlyVisible ? `${visibleIndex * 150 + 350}ms` : '0ms' 
                        }}
                      >
                        <p className="">{testimonial.name}</p>
                        <p className="text-sm">{testimonial.company}</p>
                      </div>
                      <div 
                        className={`flex items-center space-x-4 mt-4 transition-all duration-300 ease-out ${
                          isVisible && isCurrentlyVisible
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'
                        }`}
                        style={{ 
                          transitionDelay: isVisible && isCurrentlyVisible ? `${visibleIndex * 150 + 500}ms` : '0ms' 
                        }}
                      >
                        <FaInstagram className="text-white hover:text-pink-400 transition-colors duration-200 cursor-pointer" />
                        <FaXTwitter className="text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer" />
                        <BsFacebook className="text-white hover:text-blue-600 transition-colors duration-200 cursor-pointer" />   
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator - Shown on sm and md screens */}
        <div className="flex justify-center space-x-2 mt-6 lg:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
              } ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-4 scale-75'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${600 + (index * 100)}ms` : '0ms' 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlides
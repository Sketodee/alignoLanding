import { useEffect, useRef, useState } from "react";
import CTA1 from "./CTA1"
import UserProgressIndicator from "./ProgressIndicator"

const Feature = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

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

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[900px] md:h-[744px] lg:h-[780px] xl:h-[800px] bg-black overflow-hidden"
    >
      {/* Top left purple gradient with animation */}
      <div 
        className={`
          absolute aspect-square rounded-full bg-gradient-to-bl from-purple-400 to-transparent opacity-40 [filter:blur(64px)] transform-gpu transition-all duration-1000 ease-out
          xl:-top-50 xl:-right-20 xl:w-3/5 xl:h-3/4
          lg:-top-20 lg:-right-20 lg:w-1/2 lg:h-1/2
          md:-top-30 md:-right-40 md:w-2/3
          -top-10 -right-20 w-2/3 h-1/2
          z-0
          ${isVisible 
            ? 'opacity-40 scale-100' 
            : 'opacity-0 scale-75'
          }
        `}
        style={{ 
          transitionDelay: isVisible ? '200ms' : '0ms' 
        }}
      />

      <div className="pt-20 w-[95%] lg:w-[80%] mx-auto md:flex justify-between items-center">
        {/* Text Content Section */}
        <div className="text-white w-full text-center md:text-left md:w-[60%] lg:w-[60%]">
          {/* Main Heading with staggered animation */}
          <div className="overflow-hidden">
            <p 
              className={`text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[90%] transition-all duration-600 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? '300ms' : '0ms' 
              }}
            >
              <span 
                className={`italic transition-all duration-500 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
                style={{ 
                  transitionDelay: isVisible ? '500ms' : '0ms' 
                }}
              >
                Smarter,
              </span> tools for every part of your edit
            </p>
          </div>

          {/* Subtitle with fade and slide animation */}
          <p 
            className={`md:w-[80%] lg:w-[70%] xl:w-[80%] text-center md:text-left py-5 font-extralight text-base lg:text-xl text-[#858381] transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: isVisible ? '700ms' : '0ms' 
            }}
          >
            What if your timeline responded like an extension of your ideas? Edit Labs is more than a plugin suite, it’s an ever-expanding set of tools designed for you to control your creativity with rhythm.
          </p>
        </div>

        {/* Progress Indicator Section */}
        <div 
          className={`text-white w-[95%] md:w-[40%] lg:w-[40%] transition-all duration-600 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-8 scale-95'
          }`}
          style={{ 
            transitionDelay: isVisible ? '900ms' : '0ms' 
          }}
        >
          <UserProgressIndicator />
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className={`transition-all duration-500 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}
        style={{ 
          transitionDelay: isVisible ? '1100ms' : '0ms' 
        }}
      >
        <CTA1 />
      </div>
    </div>
  );
};

export default Feature
import React, { useState, useEffect, useRef } from 'react';

const WhyWeBuilt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
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
    <div className="w-full bg-black text-white py-16 px-4">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-normal mb-6 transition-all duration-700 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible ? '200ms' : '0ms'
            }}
          >
            Why We Built{' '}
            <span
              className={`italic transition-all duration-500 ease-out ${
                isVisible
                  ? 'opacity-100 scale-100 text-purple-400'
                  : 'opacity-0 scale-75'
              }`}
              style={{
                transitionDelay: isVisible ? '400ms' : '0ms'
              }}
            >
              EditLabs
            </span>
          </h2>
          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-500 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? '600ms' : '0ms'
            }}
          >
            Editing shouldn't feel like a chore.
          </p>
        </div>

        {/* Content Card */}
        <div
          className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-600 ease-out hover:border-purple-400/50 hover:bg-gray-900/70 ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{
            transitionDelay: isVisible ? '800ms' : '0ms'
          }}
        >
          {/* Image Section */}
          <div
            className={`relative w-full h-64 md:h-80 overflow-hidden transition-all duration-500 ease-out ${
              isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
            style={{
              transitionDelay: isVisible ? '900ms' : '0ms'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop"
              alt="Video editor working on creative project"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          </div>

          <div className="px-8 py-8">
            {/* Main Content */}
            <div className="space-y-6">
              <p
                className={`text-gray-300 leading-relaxed text-lg transition-all duration-500 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isVisible ? '1000ms' : '0ms'
                }}
              >
                We built EditLabs because we were tired of wasting hours keyframing, organizing files, and hunting for the right effects. As editors ourselves, we knew there had to be a smarter way. Tools that worked with our creativity, not against it.
              </p>

              <p
                className={`text-gray-300 leading-relaxed text-lg transition-all duration-500 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isVisible ? '1200ms' : '0ms'
                }}
              >
                So we created EditLabs: a suite of plugins built by real editors who live inside Premiere Pro and After Effects every day. Each tool solves a problem we've hit on real projects — from rushed client deadlines to last-minute visual tweaks — and turns it into a one-click solution.
              </p>

              <p
                className={`text-gray-300 leading-relaxed text-lg transition-all duration-500 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isVisible ? '1400ms' : '0ms'
                }}
              >
                <span className="text-purple-400 font-medium">EditLabs exists to give creators their time back.</span>
              </p>

              <p
                className={`text-gray-300 leading-relaxed text-lg transition-all duration-500 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isVisible ? '1600ms' : '0ms'
                }}
              >
                Less setup. Less stress. More room to focus on what actually matters: making great work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyWeBuilt;

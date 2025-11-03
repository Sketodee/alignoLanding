import React from 'react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  company: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialContent: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "EditLabs has simplified project management for us—everything we need in one place!",
      name: "Emma James",
      company: "DigitalEdge",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 2,
      text: "The real-time collaboration feature has transformed the way we work globally.",
      name: "Michael Davis",
      company: "CreativeCrew",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 3,
      text: "Our team productivity has skyrocketed since switching to EditLabs!",
      name: "Rachel Kim",
      company: "DevSync",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 4,
      text: "The advanced analytics have given us better insight into project performance than ever",
      name: "David Foster",
      company: "NextGen Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 5,
      text: "We love how easy it is to customize EditLabs for our specific needs.",
      name: "Isabella White",
      company: "StartUpWorks",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 6,
      text: "EditLabs' user-friendly interface helped our team get started quickly, no learning curve!",
      name: "Olivia Turner",
      company: "DesignHub",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 7,
      text: "EditLabs has simplified project management for us—everything we need in one place!",
      name: "Jonathan Reed",
      company: "TechFlow",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 8,
      text: "EditLabs' customizable features made it the perfect fit for our growing business.",
      name: "Samantha Lee",
      company: "GrowthLab",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 9,
      text: "EditLabs' sprint management tools made tracking our progress effortless!",
      name: "Liam Cooper",
      company: "CodeCraft",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=face&auto=format"
    }
  ];

  // Split testimonials into columns and duplicate for seamless loop
  const leftColumn = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)];
  const middleColumn = [...testimonials.slice(3, 6), ...testimonials.slice(3, 6)];
  const rightColumn = [...testimonials.slice(6, 9), ...testimonials.slice(6, 9)];
  
  // For 2-column layout
  const leftColumnMd = [...testimonials.slice(0, 5), ...testimonials.slice(0, 5)];
  const rightColumnMd = [...testimonials.slice(4, 9), ...testimonials.slice(4, 9)];

  const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 mb-4 flex-shrink-0">
      <p className="text-gray-300 text-lg leading-relaxed mb-6">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
          <p className="text-gray-400 text-xs">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 3-column layout for large screens */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4" style={{ height: '800px' }}>
          {/* Left column - scroll up */}
          <div className="overflow-hidden relative h-full">
            <div className="animate-scroll-up-seamless">
              {leftColumn.map((testimonial, index) => (
                <TestimonialCard key={`left-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Middle column - scroll down */}
          <div className="overflow-hidden relative h-full">
            <div className="animate-scroll-down-seamless">
              {middleColumn.map((testimonial, index) => (
                <TestimonialCard key={`middle-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Right column - scroll up */}
          <div className="overflow-hidden relative h-full">
            <div className="animate-scroll-up-seamless">
              {rightColumn.map((testimonial, index) => (
                <TestimonialCard key={`right-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* 2-column layout for medium screens */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4" style={{ height: '800px' }}>
          {/* Left column - scroll up */}
          <div className="overflow-hidden relative h-full">
            <div className="animate-scroll-up-seamless">
              {leftColumnMd.map((testimonial, index) => (
                <TestimonialCard key={`md-left-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Right column - scroll down */}
          <div className="overflow-hidden relative h-full">
            <div className="animate-scroll-down-seamless">
              {rightColumnMd.map((testimonial, index) => (
                <TestimonialCard key={`md-right-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Single column for mobile - no animation */}
        <div className="grid grid-cols-1 md:hidden gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollUpSeamless {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDownSeamless {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-up-seamless {
          animation: scrollUpSeamless 25s linear infinite;
        }

        .animate-scroll-down-seamless {
          animation: scrollDownSeamless 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialContent;

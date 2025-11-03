import React, { useEffect, useState, useRef } from 'react';

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonVariant: 'default' | 'primary' | 'premium';
  subText: string;
  isPopular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  isVisible: boolean;
}

const Pricing: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const navigate = (path: string) => {
    console.log(`Navigating to ${path}`);
    // Replace with your actual navigation logic
  };

  const plans: PricingPlan[] = [
    {
      id: 'single',
      title: 'Single Plugin Plan',
      price: '$25',
      period: '/month',
      description: ' For editors who want to test the waters.Get access to one plugin of your choice, perfect if you just need FastFX, Terminal, or another specific tool in your workflow.',
      features: [
        'Access to one plugin of your choice',
        'Basic customer support',
        'Regular plugin updates & improvements',
        'Access to the EditLabs community',
        'Cancel anytime'
      ],
      buttonVariant: 'default',
      subText: 'Ideal for creators with focused needs or a favorite go-to tool.'
    },
    {
      id: 'full',
      title: 'Full Access Plan',
      price: '$50',
      period: '/month',
      description: ' Unlock the full EditLabs suite of all 7 plugins that automate, organize, and elevate your entire workflow in Premiere Pro & After Effects.Everything you need to edit faster, create better, and stay inspired.',
      features: [
        'Unlimited access to all 7 Plugins',
        'Priority support & faster updates',
        'Early access to new releases',
        'Advanced creative tools & workflow templates',
        'Exclusive beta plugins & private features',
        'Cancel anytime'
      ],
      buttonVariant: 'primary',
      subText: 'The complete EditLabs experience  built for editors who want it all.',
      isPopular: true
    },
    {
      id: 'annual',
      title: 'Annual Full Access Plan',
      price: '$350',
      period: '/year',
      description: ' Save 40% and get exclusive bonuses, extra sound packs, and premium tutorials. You’ll always have the latest tools automatically updated, all year long.',
      features: [
        'Everything in Full Access Plan',
        'Save 40% compared to monthly',
        'Exclusive bonus plugin packs',
        'Premium tutorial & workflow library',
        'One-on-one onboarding session',
        'Early beta access & developer insights'
      ],
      buttonVariant: 'premium',
      subText: 'For serious creators who want to invest once, and create nonstop all year.'
    }
  ];

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

  const PricingCard: React.FC<PricingCardProps> = ({ plan, index, isVisible }) => {
    // Special timing for popular plan (center card)
    const baseDelay = plan.isPopular ? 600 : (index === 0 ? 800 : 1000);
    
    return (
      <div 
        className={`relative bg-gray-900/60 backdrop-blur-sm border rounded-3xl p-8 h-full flex flex-col transition-all duration-600 ease-out hover:scale-105 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-400/10 ${
          plan.isPopular 
            ? 'border-purple-400 shadow-lg shadow-purple-400/20 hover:shadow-purple-400/30' 
            : 'border-gray-700 hover:border-purple-400/30'
        } ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-12 scale-95'
        }`}
        style={{ 
          transitionDelay: isVisible ? `${baseDelay}ms` : '0ms' 
        }}
      >
        {/* Animated background gradient for popular plan */}
        {plan.isPopular && (
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 rounded-3xl transition-all duration-800 ease-out ${
              isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-90'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 100}ms` : '0ms' 
            }}
          />
        )}
        {/* Popular badge with special animation and glow effect */}
        {plan.isPopular && (
          <div 
            className={`absolute -top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-4 scale-75'
            }`}
            style={{ 
              transitionDelay: isVisible ? '400ms' : '0ms' 
            }}
          >
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-purple-400/50 animate-pulse">
              Most Popular
            </span>
            {/* Glow ring animation */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-20 scale-150' 
                  : 'opacity-0 scale-100'
              }`}
              style={{ 
                transitionDelay: isVisible ? '600ms' : '0ms',
                filter: 'blur(8px)'
              }}
            />
          </div>
        )}
        
        {/* Header section with relative positioning */}
        <div className="mb-8 relative z-10">
          <h3 
            className={`text-white text-xl font-medium mb-4 transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 translate-x-0' 
                : 'opacity-0 translate-y-4 -translate-x-8'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 200}ms` : '0ms' 
            }}
          >
            {plan.title}
          </h3>
          
          {/* Price with special emphasis animation and floating effect */}
          <div 
            className={`flex items-baseline gap-1 mb-4 transition-all duration-600 ease-out ${
              isVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-75 translate-y-8'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 400}ms` : '0ms' 
            }}
          >
            <span className={`text-5xl font-bold transition-all duration-500 ease-out hover:scale-110 ${
              plan.isPopular ? 'text-purple-300 hover:text-purple-200' : 'text-purple-400 hover:text-purple-300'
            }`}>
              {plan.price}
            </span>
            <span className={`text-lg transition-all duration-400 ease-out ${
              plan.isPopular ? 'text-purple-300' : 'text-purple-400'
            } ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 600}ms` : '0ms' 
            }}>
              {plan.period}
            </span>
          </div>
          
          {/* Animated price underline for popular plan */}
          {plan.isPopular && (
            <div 
              className={`h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full transition-all duration-800 ease-out ${
                isVisible 
                  ? 'w-16 opacity-100' 
                  : 'w-0 opacity-0'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${baseDelay + 800}ms` : '0ms' 
              }}
            />
          )}
          
          <p 
            className={`text-gray-400 text-sm transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 translate-x-0' 
                : 'opacity-0 translate-y-4 translate-x-8'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 700}ms` : '0ms' 
            }}
          >
            {plan.description}
          </p>
        </div>

        {/* Button section with enhanced animations and effects */}
        <div className="mb-8 relative z-10">
          {/* Button glow background for popular plan */}
          {plan.isPopular && (
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-2xl transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-100 blur-md' 
                  : 'opacity-0 scale-75'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${baseDelay + 900}ms` : '0ms' 
              }}
            />
          )}
          
          <button 
            onClick={() => navigate('/subscription')}
            className={`relative w-full py-4 px-6 rounded-2xl font-medium text-white transition-all duration-600 ease-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 ${
              plan.buttonVariant === 'primary' 
                ? 'bg-gradient-to-r from-violet-400 to-purple-400 hover:from-purple-500 hover:to-purple-500 shadow-lg hover:shadow-purple-400/40' 
                : plan.buttonVariant === 'premium'
                ? 'bg-gradient-to-r from-violet-700 to-purple-900 hover:from-purple-500 hover:to-purple-700 shadow-lg hover:shadow-purple-700/40'
                : 'bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-400/50 hover:shadow-purple-400/20'
            } ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 1000}ms` : '0ms' 
            }}
          >
            <span className={`transition-all duration-300 ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-4'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 1200}ms` : '0ms' 
            }}>
              Subscribe Now
            </span>
            
            {/* Button shimmer effect for popular plan */}
            {plan.isPopular && (
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'translate-x-full opacity-100' 
                    : '-translate-x-full opacity-0'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${baseDelay + 1400}ms` : '0ms' 
                }}
              />
            )}
          </button>
          
          <p 
            className={`text-gray-500 text-sm text-center mt-3 transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-4 scale-95'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${baseDelay + 1300}ms` : '0ms' 
            }}
          >
            {plan.subText}
          </p>
        </div>

        {/* Features list with advanced staggered animations */}
        <div className="flex-1 relative z-10">
          <ul className="space-y-4">
            {plan.features.map((feature, featureIndex) => (
              <li 
                key={featureIndex} 
                className={`flex items-start gap-3 transition-all duration-500 ease-out hover:translate-x-2 hover:text-white ${
                  isVisible 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : 'opacity-0 -translate-x-8 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${baseDelay + 1400 + (featureIndex * 150)}ms` : '0ms' 
                }}
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-all duration-400 ease-out ${
                    plan.isPopular ? 'bg-purple-400' : 'bg-gray-400'
                  } ${
                    isVisible 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-50'
                  }`}
                  style={{ 
                    transitionDelay: isVisible ? `${baseDelay + 1500 + (featureIndex * 150)}ms` : '0ms' 
                  }}
                />
                <span 
                  className={`text-gray-300 text-sm leading-relaxed transition-all duration-400 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2'
                  }`}
                  style={{ 
                    transitionDelay: isVisible ? `${baseDelay + 1600 + (featureIndex * 150)}ms` : '0ms' 
                  }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          
          {/* Animated feature highlight border for popular plan */}
          {plan.isPopular && (
            <div 
              className={`absolute -inset-2 border border-purple-400/20 rounded-lg transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${baseDelay + 2000}ms` : '0ms' 
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className='relative bg-black text-white min-h-screen'>
      <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
        {/* Header section */}
        <div className="text-white text-center">
          <div className="overflow-hidden">
            <p 
              className={`text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[70%] mx-auto transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? '200ms' : '0ms' 
              }}
            >
              Choose the{' '}
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
                Right Plan
              </span>{' '}
              for Your Team
            </p>
          </div>
          
          <p 
            className={`py-3 font-extralight text-base text-[#858381] transition-all duration-500 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: isVisible ? '600ms' : '0ms' 
            }}
          >
            Expand your schema as per your requirements
          </p>
        </div>

        {/* Pricing Cards with orchestrated reveal */}
        <div className="w-[95%] lg:w-[90%] xl:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {plans.map((plan, index) => (
              <PricingCard 
                key={plan.id} 
                plan={plan} 
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Call-to-action footer */}
        <div 
          className={`text-center mt-16 transition-all duration-600 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
          style={{ 
            transitionDelay: isVisible ? '1800ms' : '0ms' 
          }}
        >
          <p className="text-gray-400 mb-4">
            Need a custom plan? <span className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">Contact our sales team</span>
          </p>
          <p className="text-sm text-gray-500">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
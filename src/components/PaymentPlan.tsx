import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const plans: PricingPlan[] = [
    {
      id: 'single',
      title: 'Single Plugin Plan',
      price: '$25',
      period: '/month',
      description: 'Access to just one (let them pick)',
      features: [
        'Access to one plugin of your choice',
        'Basic customer support',
        'Regular updates for selected plugin',
        'Community forum access',
        'Cancel anytime'
      ],
      buttonVariant: 'default',
      subText: 'Perfect for focused needs'
    },
    {
      id: 'full',
      title: 'Full Access Plan',
      price: '$50',
      period: '/month',
      description: 'Everything (8-10 Plug-Ins)',
      features: [
        'Access to all 8-10 plugins',
        'Priority customer support',
        'Early access to new plugins',
        'Advanced analytics dashboard',
        'Custom workflow templates',
        'API access for integrations'
      ],
      buttonVariant: 'primary',
      subText: 'Most popular choice',
      isPopular: true
    },
    {
      id: 'annual',
      title: 'Annual Full Access Plan',
      price: '$350',
      period: '/year',
      description: 'Save 42%, includes bonus packs or tutorials',
      features: [
        'Everything in Full Access Plan',
        'Save 42% compared to monthly',
        'Exclusive bonus plugin packs',
        'Premium tutorial library',
        'One-on-one onboarding session',
        'Custom plugin development consultation'
      ],
      buttonVariant: 'premium',
      subText: 'Best value - Save $250/year'
    }
  ];

  const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
    <div className={`relative bg-gray-900/60 backdrop-blur-sm border rounded-3xl p-8 h-full flex flex-col ${
      plan.isPopular ? 'border-purple-400 shadow-lg shadow-purple-400/20' : 'border-gray-700'
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-white text-xl font-medium mb-4">{plan.title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-purple-400 text-5xl font-bold">{plan.price}</span>
          <span className="text-purple-400 text-lg">{plan.period}</span>
        </div>
        <p className="text-gray-400 text-sm">{plan.description}</p>
      </div>

      <div className="mb-8">
        <button 
          onClick={() => {
         navigate('/subscription')
          }}
          className={`w-full py-4 px-6 rounded-2xl font-medium text-white transition-all duration-200 ${
            plan.buttonVariant === 'primary' 
              ? 'bg-gradient-to-r from-violet-400 to-purple-400 hover:from-purple-500 hover:to-purple-500 shadow-lg' 
              : plan.buttonVariant === 'premium'
              ? 'bg-gradient-to-r from-violet-700 to-purple-900 hover:from-purple-500 hover:to-purple-700 shadow-lg'
              : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          Subscribe Now
        </button>
        <p className="text-gray-500 text-sm text-center mt-3">{plan.subText}</p>
      </div>

      <div className="flex-1">
        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className='relative bg-black text-white min-h-screen'>
      <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
        <div className="text-white text-center">
          <p className="text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[70%] mx-auto">
            Choose the <span className="italic">Right Plan</span> for Your Team
          </p>
          <p className="py-3 font-extralight text-base text-[#858381]">
            Expand your schema as per your requirements
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="w-[95%] lg:w-[90%] xl:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
import React, { useState } from 'react';

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'default' | 'primary';
  subText: string;
}

const PaymentPlan: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans: PricingPlan[] = [
    {
      id: 'free',
      title: 'Free Plan',
      price: '$0',
      period: '/month',
      description: 'Perfect for individuals just starting out.',
      features: [
        'Access to essential project management tools',
        'Up to 5 active projects',
        'Basic task tracking features',
        'Real-time collaboration',
        'Community support'
      ],
      buttonText: 'Get Template',
      buttonVariant: 'default',
      subText: 'Free forever'
    },
    {
      id: 'pro',
      title: 'Pro Plan',
      price: '$12',
      period: '/month',
      description: 'Perfect for individuals and small teams.',
      features: [
        'Everything in the Free Plan, plus:',
        'Unlimited projects and tasks',
        'Advanced analytics and reporting',
        'Sprint management tools',
        'Priority customer support',
        'Customizable workflows and templates'
      ],
      buttonText: 'Get Template',
      buttonVariant: 'primary',
      subText: 'Free forever'
    }
  ];

  const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 h-full flex flex-col">
      {/* Header with Bill yearly toggle for Pro Plan */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-medium">{plan.title}</h3>
          {plan.id === 'pro' && (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Bill yearly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  isYearly ? 'bg-orange-400' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    isYearly ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-orange-400 text-5xl font-bold">{plan.price}</span>
          <span className="text-orange-400 text-lg">{plan.period}</span>
        </div>
        <p className="text-gray-400 text-sm">{plan.description}</p>
      </div>

      {/* Button */}
      <div className="mb-8">
        <button 
          className={`w-full py-4 px-6 rounded-2xl font-medium text-white transition-all duration-200 ${
            plan.buttonVariant === 'primary' 
              ? 'bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 shadow-lg' 
              : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          {plan.buttonText}
        </button>
        <p className="text-gray-500 text-sm text-center mt-3">{plan.subText}</p>
      </div>

      {/* Features */}
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
    <div className='relative bg-black text-white'>
      <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
        <div className="text-white text-center">
          <p className="text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[50%] mx-auto">Choose the <span className="italic">Right Plan</span> for Your Team</p>
          <p className="py-3 font-extralight text-base line-clamp-4 text-[#858381]">Expand your schema as per your requirements</p>
        </div>

        {/* Pricing Cards */}
        <div className="w-[90%] lg:w-[50%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
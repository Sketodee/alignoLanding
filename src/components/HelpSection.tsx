import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const HelpSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What is Aligno, and how does it help with project management?",
      answer: "Aligno is a comprehensive project management platform designed to streamline workflows and enhance team collaboration. It provides tools for task management, team coordination, and project tracking to help you deliver projects efficiently and on time."
    },
    {
      id: 2,
      question: "Can Aligno be customized for different teams and projects?",
      answer: "Yes, Aligno offers extensive customization options to fit your team's unique needs. You can create custom workflows, set up project templates, configure user permissions, and adapt the interface to match your team's working style and project requirements."
    },
    {
      id: 3,
      question: "Does Aligno support real-time collaboration across multiple locations?",
      answer: "Absolutely! Aligno is built for global teams with real-time collaboration features including live updates, instant messaging, shared workspaces, and synchronized project views. Team members can work together seamlessly regardless of their geographic location."
    },
    {
      id: 4,
      question: "What features does Aligno offer for managing sprints?",
      answer: "Aligno provides comprehensive sprint management tools including sprint planning, backlog management, burndown charts, velocity tracking, and daily standup support. You can easily create sprints, assign tasks, monitor progress, and conduct sprint retrospectives."
    },
    {
      id: 5,
      question: "How does Aligno help with tracking project performance?",
      answer: "Aligno offers advanced analytics and reporting features to track project performance. You can monitor key metrics, generate progress reports, analyze team productivity, track budget and timeline adherence, and gain insights through customizable dashboards and charts."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="w-full bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6">
            How <span className="italic">Aligno</span> helps you?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Aligno offers ready-made solutions to get you going fast. Easily customize as your team's needs expand.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors duration-200"
              >
                <span className="text-white text-lg font-medium pr-4">
                  {item.question}
                </span>
                <FaPlus
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    openItem === item.id ? 'rotate-45' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative w-full py-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-violet-400/20 via-purple-400/10 to-transparent blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Top subtitle */}
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Aligno provides pre-configured options for quick start-ups. As your team grows, adaptation becomes effortless.
          </p>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8">
            Ready to manage your team like a <span className="italic">pro</span>?
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Aligno offers ready-made solutions to get you going fast. Easily customize as your team's needs expand.
          </p>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-violet-400 to-purple-400 hover:from-orange-500 hover:to-red-500 text-white font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
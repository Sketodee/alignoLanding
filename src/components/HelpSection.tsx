import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FaWindows } from "react-icons/fa6";
import { SiMacos } from "react-icons/si";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQItemProps {
  item: FAQItem;
  index: number;
  isVisible: boolean;
  openItem: number | null;
  toggleItem: (id: number) => void;
}

const HelpSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleDownload = (platform: 'windows' | 'mac') => {
    const downloadUrls = {
      windows: 'https://github.com/Sketodee/alignoLanding/releases/download/app/editlab_setup.exe',
      mac: 'https://github.com/Sketodee/alignoLanding/releases/download/macApp/editlab_setup-1.0.0.dmg'
    };

    const fileNames = {
      windows: `EditLabs.exe`,
      mac: `EditLabs.dmg`
    };

    console.log(`Downloading ${platform} application...`);
    
    const link = document.createElement('a');
    link.href = downloadUrls[platform];
    link.download = fileNames[platform];
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What is EditLabs, and how does it help with editing?",
      answer: " EditLabs is a growing suite of 8+ professional plugins for Premiere Pro and After Effects, built to automate the parts of editing that slow you down. From AI-powered commands (Terminal) to instant transitions (FastFX) and built-in sound design (SoundLabs), EditLabs lets you focus on what matters most: creativity instead of technical steps."
    },
    {
      id: 2,
      question: "Can EditLabs be customized for different styles or workflows?",
      answer: " Absolutely. Each plugin is designed to adapt to your workflow, not force you into ours. Whether you’re cutting music videos, vlogs, ads, or cinematic edits, you can fine-tune every effect, save your favorite settings, and even export presets to share with collaborators. EditLabs grows and changes with how you edit."
    },
    {
      id: 3,
      question: "Does EditLabs support real-time collaboration or shared projects?",
      answer: "While EditLabs doesn’t replace shared editing platforms, it’s fully compatible with team workflows in Premiere and After Effects. All plugin settings, assets, and presets are portable so your team can stay perfectly synced whether you’re working locally or remotely. Use shared folders, Dropbox, or Google Drive to keep project files linked, and EditLabs will automatically recognize your setups."
    },
    {
      id: 4,
      question: "What features does EditLabs offer for boosting productivity?",
      answer: "Every tool inside EditLabs is designed to remove friction.You can: Apply effects with a single click or command. Access assets instantly with the Asset Manager. Automate slow motion, motion blur, and glow. Add transitions and sound design in seconds. Watch YouTube tutorials or references right inside your editing tab. It’s like upgrading your entire workflow with a creative assistant that never slows down."
    },
    {
      id: 5,
      question: "How does EditLabs evolve over time?",
      answer: " Your subscription includes new plugins, updates, and feature drops every month all based on real editor feedback. That means your toolkit never gets stale. As editing trends evolve, EditLabs keeps your workflow current with tools built for where the industry is headed, not where it’s been."
    }
  ];

  // Intersection Observer for FAQ section
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

  // Intersection Observer for CTA section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true);
          } else {
            setCtaVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const FAQItemComponent: React.FC<FAQItemProps> = ({ item, index, isVisible, openItem, toggleItem }) => (
    <div
      className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-600 ease-out hover:border-purple-400/50 hover:bg-gray-900/70 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ 
        transitionDelay: isVisible ? `${400 + (index * 150)}ms` : '0ms' 
      }}
    >
      {/* Question */}
      <button
        onClick={() => toggleItem(item.id)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors duration-200"
      >
        <span 
          className={`text-white text-lg font-medium pr-4 transition-all duration-400 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-4'
          }`}
          style={{ 
            transitionDelay: isVisible ? `${600 + (index * 150)}ms` : '0ms' 
          }}
        >
          {item.question}
        </span>
        <FaPlus
          className={`w-6 h-6 text-gray-400 transition-all duration-300 flex-shrink-0 ${
            openItem === item.id ? 'rotate-45 text-purple-400' : ''
          } ${
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-75'
          }`}
          style={{ 
            transitionDelay: isVisible ? `${800 + (index * 150)}ms` : '0ms' 
          }}
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
  );

  return (
    <div className="w-full bg-black text-white py-16 px-4">
      {/* FAQ Section */}
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
            How{' '}
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
            </span>{' '}
            helps you?
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
            EditLabs gives editors modern, time-saving tools that turn repetitive work into one-click actions.
 Here’s how it fits into your workflow, whether you’re editing solo or running a post-production pipeline.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItemComponent
              key={item.id}
              item={item}
              index={index}
              isVisible={isVisible}
              openItem={openItem}
              toggleItem={toggleItem}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="relative w-full py-20 px-4 overflow-hidden">
        {/* Background gradient with animation */}
        <div 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-violet-400/20 via-purple-400/10 to-transparent blur-3xl transition-all duration-1000 ease-out ${
            ctaVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-75'
          }`}
          style={{ 
            transitionDelay: ctaVisible ? '200ms' : '0ms' 
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Top subtitle */}
          <p 
            className={`text-gray-400 text-lg mb-12 max-w-2xl mx-auto transition-all duration-500 ease-out ${
              ctaVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: ctaVisible ? '400ms' : '0ms' 
            }}
          >
            EditLabs provides pre-configured options for quick start-ups. As your team grows, adaptation becomes effortless.
          </p>

          {/* Main heading */}
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-normal mb-8 transition-all duration-700 ease-out ${
              ctaVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{ 
              transitionDelay: ctaVisible ? '600ms' : '0ms' 
            }}
          >
            Ready to edit like a{' '}
            <span 
              className={`italic transition-all duration-500 ease-out ${
                ctaVisible 
                  ? 'opacity-100 scale-100 text-purple-400' 
                  : 'opacity-0 scale-75'
              }`}
              style={{ 
                transitionDelay: ctaVisible ? '800ms' : '0ms' 
              }}
            >
              pro
            </span>
            ?
          </h2>

          {/* Description */}
          <p 
            className={`text-gray-400 text-lg mb-12 max-w-2xl mx-auto transition-all duration-500 ease-out ${
              ctaVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: ctaVisible ? '1000ms' : '0ms' 
            }}
          >
             EditLabs gives you the tools top creators use to move faster, work smarter, and make every cut hit harder.
          </p>

            <p 
            className={`text-gray-400 text-lg mb-12 max-w-2xl mx-auto transition-all duration-500 ease-out ${
              ctaVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: ctaVisible ? '1000ms' : '0ms' 
            }}
          >
             Start your free trial today and see why 19,000+ editors have already upgraded their workflow with Tiny Tapes.
          </p>

          {/* CTA Button */}
          <button 
            className={`bg-gradient-to-r from-violet-400 to-purple-400 hover:from-orange-500 hover:to-red-500 text-white font-medium px-12 py-4 rounded-full text-lg transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
              ctaVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ 
              transitionDelay: ctaVisible ? '1200ms' : '0ms' 
            }}
          >
            Get Started
          </button>

          {/* Download Section */}
          <div 
            className={`backdrop-blur-sm border border-gray-700 rounded-3xl p-8 mt-8 transition-all duration-700 ease-out hover:border-purple-400/50 ${
              ctaVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{ 
              transitionDelay: ctaVisible ? '1400ms' : '0ms' 
            }}
          >
            <h3 
              className={`text-xl font-semibold text-white mb-6 transition-all duration-500 ease-out ${
                ctaVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: ctaVisible ? '1600ms' : '0ms' 
              }}
            >
              Download Applications
            </h3>
            <p 
              className={`text-gray-400 text-sm mb-6 transition-all duration-500 ease-out ${
                ctaVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: ctaVisible ? '1800ms' : '0ms' 
              }}
            >
              Download the desktop application for your operating system
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Windows Download */}
              <div 
                className={`bg-gray-800/50 rounded-xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                  ctaVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
                style={{ 
                  transitionDelay: ctaVisible ? '2000ms' : '0ms' 
                }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className={`text-3xl mr-4 transition-all duration-400 ease-out ${
                      ctaVisible 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-75'
                    }`}
                    style={{ 
                      transitionDelay: ctaVisible ? '2200ms' : '0ms' 
                    }}
                  >
                    <FaWindows />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Windows</h4>
                    <p className="text-gray-400 text-sm">Windows 10 or later</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload('windows')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg"
                >
                  <span>⬇️</span>
                  Download for Windows
                </button>
              </div>

              {/* Mac Download */}
              <div 
                className={`bg-gray-800/50 rounded-xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                  ctaVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
                style={{ 
                  transitionDelay: ctaVisible ? '2200ms' : '0ms' 
                }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className={`text-5xl mr-4 transition-all duration-400 ease-out ${
                      ctaVisible 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-75'
                    }`}
                    style={{ 
                      transitionDelay: ctaVisible ? '2400ms' : '0ms' 
                    }}
                  >
                    <SiMacos />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">macOS</h4>
                    <p className="text-gray-400 text-sm">macOS 10.15 or later</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload('mac')}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg"
                >
                  <span>⬇️</span>
                  Download for Mac
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
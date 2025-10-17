import { useEffect, useRef, useState } from "react";

const CTA1 = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div className="py-24 md:py-32 w-[95%] lg:w-[80%] mx-auto">
        <p 
        ref={textRef}
        className={`text-3xl md:text-5xl text-center relative ${isVisible ? 'animate-reveal' : 'text-gray-500'}`}
      >
        Take the first step towards <span className="emoji">😇</span>{' '}
        <span className="text-purple-400">stress-free</span> project management with{' '}
        <span className="text-purple-400">EditLabs</span> <span className="emoji">👋</span> Simplify tasks, boost productivity
      </p>

      <style>{`
        @keyframes textReveal {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }

        .animate-reveal {
          background: linear-gradient(
            to right,
            #6b7280 0%,
            #6b7280 50%,
            #ffffff 50%,
            #ffffff 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textReveal 2s ease-in-out forwards;
        }

        .animate-reveal span {
          background: linear-gradient(
            to right,
            #6b7280 0%,
            #6b7280 50%,
            #c084fc 50%,
            #c084fc 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textReveal 2s ease-in-out forwards;
        }

        .animate-reveal .emoji {
          background: none;
          -webkit-text-fill-color: initial;
          animation: none;
        }
      `}</style>
      <div className="p-0.5 rounded-full border-1 border-purple-600 w-[150px] mx-auto mt-10">
        {/* Inner glowing border with shadow */}
        <div className="p-0.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-900 
  shadow-[0_0_15px_4px_rgba(168,85,247,0.8),inset_0_0_10px_rgba(168,85,247,0.6)]">
          {/* Button content */}
          <button className="w-full py-2 px-2 bg-black rounded-full text-gray-300 hover:text-white transition duration-300 font-medium shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            Get Started
          </button>
        </div>
      </div>

 
    </div>
  )
}

export default CTA1
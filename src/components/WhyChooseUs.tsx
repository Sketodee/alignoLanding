import { useEffect, useState, useRef } from "react";

const WhyChooseUs = () => {
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
        <div ref={containerRef} className="bg-black text-white">
            {/* Header Section */}
            <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                <div className="text-white text-center">
                    {/* Main Title with staggered animation */}
                    <div className="overflow-hidden">
                        <p 
                            className={`text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[90%] transition-all duration-600 ease-out ${
                                isVisible 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-12'
                            }`}
                            style={{ 
                                transitionDelay: isVisible ? '200ms' : '0ms' 
                            }}
                        >
                            Why choose{' '}
                            <span 
                                className={`italic transition-all duration-500 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 scale-100' 
                                        : 'opacity-0 scale-75'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? '400ms' : '0ms' 
                                }}
                            >
                                EditLabs
                            </span>
                            ?
                        </p>
                    </div>

                    {/* Subtitle with fade animation */}
                    <p 
                        className={`w-[80%] lg:w-[80%] xl:w-[70%] mx-auto text-center py-3 font-extralight text-base lg:text-xl text-[#858381] transition-all duration-500 ease-out ${
                            isVisible 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-8'
                        }`}
                        style={{ 
                            transitionDelay: isVisible ? '600ms' : '0ms' 
                        }}
                    >
                        An immediate contrast of EditLabs's functionalities against other project coordination utilities. Discover why we excel.
                    </p>
                </div>
            </div>

            {/* Comparison Cards Section */}
            <div className="w-[95%] lg:w-[90%] xl:w-[70%] mx-auto md:flex justify-between md:space-x-8 lg:space-x-8">
                {/* EditLabs Card */}
                <div 
                    className={`basis-1/2 mb-5 md:mb-0 transition-all duration-600 ease-out ${
                        isVisible 
                            ? 'opacity-100 translate-x-0 scale-100' 
                            : 'opacity-0 -translate-x-12 scale-95'
                    }`}
                    style={{ 
                        transitionDelay: isVisible ? '800ms' : '0ms' 
                    }}
                >
                    <p 
                        className={`text-3xl text-center pb-6 transition-all duration-400 ease-out ${
                            isVisible 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 -translate-y-4'
                        }`}
                        style={{ 
                            transitionDelay: isVisible ? '1000ms' : '0ms' 
                        }}
                    >
                        EditLabs
                    </p>
                    <div className="relative border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)] px-14 py-3 rounded-2xl bg-white/8 backdrop-blur-sm">
                        {/* Gradient blur background with animation */}
                        <div 
                            className={`
                                absolute bottom-0 left-0 
                                w-3/4 h-3/4 
                                bg-gradient-to-tr from-purple-500 to-transparent 
                                opacity-40 [filter:blur(14px)] transform-gpu 
                                z-0 transition-all duration-800 ease-out
                                ${isVisible 
                                    ? 'opacity-40 scale-100' 
                                    : 'opacity-0 scale-50'
                                }
                            `}
                            style={{ 
                                transitionDelay: isVisible ? '1200ms' : '0ms' 
                            }}
                        />

                        {/* Content items with staggered animation */}
                        {[
                            "Advanced task automation",
                            "Real-time collaboration",
                            "Intelligent analytics",
                            "Seamless integrations",
                            "24/7 expert support"
                        ].map((text, index) => (
                            <p 
                                key={index}
                                className={`py-3 ${index < 4 ? 'border-b-[0.5px] border-purple-900' : ''} relative z-10 transition-all duration-400 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'opacity-0 translate-x-8'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? `${1400 + (index * 100)}ms` : '0ms' 
                                }}
                            >
                                {text}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Other Tools Card */}
                <div 
                    className={`basis-1/2 transition-all duration-600 ease-out ${
                        isVisible 
                            ? 'opacity-100 translate-x-0 scale-100' 
                            : 'opacity-0 translate-x-12 scale-95'
                    }`}
                    style={{ 
                        transitionDelay: isVisible ? '1000ms' : '0ms' 
                    }}
                >
                    <p 
                        className={`text-3xl text-center pb-6 transition-all duration-400 ease-out ${
                            isVisible 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 -translate-y-4'
                        }`}
                        style={{ 
                            transitionDelay: isVisible ? '1200ms' : '0ms' 
                        }}
                    >
                        Other tools
                    </p>
                    <div className="relative border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)] px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                        {/* Gradient blur background with animation */}
                        <div 
                            className={`
                                absolute bottom-0 left-0 
                                w-3/4 h-1/4 
                                bg-gradient-to-tr from-purple-500 to-transparent 
                                opacity-40 [filter:blur(14px)] transform-gpu 
                                z-0 transition-all duration-800 ease-out
                                ${isVisible 
                                    ? 'opacity-40 scale-100' 
                                    : 'opacity-0 scale-50'
                                }
                            `}
                            style={{ 
                                transitionDelay: isVisible ? '1400ms' : '0ms' 
                            }}
                        />

                        {/* Content items with staggered animation */}
                        {[
                            "Basic task management",
                            "Limited collaboration",
                            "Standard reporting",
                            "Few integrations",
                            "Business hours support"
                        ].map((text, index) => (
                            <p 
                                key={index}
                                className={`py-3 ${index < 4 ? 'border-b-[0.5px] border-purple-900' : ''} relative z-10 transition-all duration-400 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'opacity-0 -translate-x-8'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? `${1600 + (index * 100)}ms` : '0ms' 
                                }}
                            >
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
import { useEffect, useState, useRef } from "react";

const EditLabHelp = () => {
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
                            helps you
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
                        Discover the powerful features that make EditLabs the ultimate project management solution for modern teams.
                    </p>
                </div>
            </div>

            {/* Top Two Cards Section */}
            <div className="w-[95%] lg:w-[90%] xl:w-[70%] mx-auto md:flex justify-between md:space-x-8 lg:space-x-8">
                {/* Task Management Card */}
                <div 
                    className={`basis-1/2 mb-5 md:mb-0 transition-all duration-600 ease-out ${
                        isVisible 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-12 scale-95'
                    }`}
                    style={{ 
                        transitionDelay: isVisible ? '800ms' : '0ms' 
                    }}
                >
                    <div className="relative border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)] px-6 py-3 rounded-2xl bg-white/8 backdrop-blur-sm">
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
                                transitionDelay: isVisible ? '1000ms' : '0ms' 
                            }}
                        />

                        {/* Content */}
                        <div className="text-white text-center py-10 relative z-10">
                            <p 
                                className={`text-xl lg:text-2xl xl:text-3xl transition-all duration-500 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? '1200ms' : '0ms' 
                                }}
                            >
                                <span 
                                    className={`italic transition-all duration-400 ease-out ${
                                        isVisible 
                                            ? 'opacity-100 scale-100 text-purple-300' 
                                            : 'opacity-0 scale-75'
                                    }`}
                                    style={{ 
                                        transitionDelay: isVisible ? '1400ms' : '0ms' 
                                    }}
                                >
                                    Effortless
                                </span>{' '}
                                Task Management
                            </p>
                            <p 
                                className={`py-3 font-extralight text-base text-[#858381] transition-all duration-500 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-6'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? '1600ms' : '0ms' 
                                }}
                            >
                                Keep all your tasks organized and visible in one place. EditLabs helps you assign, track, and prioritize tasks easily, ensuring nothing falls through the crack
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Collaboration Card */}
                <div 
                    className={`basis-1/2 transition-all duration-600 ease-out ${
                        isVisible 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-12 scale-95'
                    }`}
                    style={{ 
                        transitionDelay: isVisible ? '1000ms' : '0ms' 
                    }}
                >
                    <div className="relative border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)] px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                        {/* Gradient blur background with animation */}
                        <div 
                            className={`
                                absolute bottom-0 left-0 
                                w-3/4 h-3/4 
                                bg-gradient-to-tr from-purple-500 to-transparent 
                                opacity-30 [filter:blur(14px)] transform-gpu 
                                z-0 transition-all duration-800 ease-out
                                ${isVisible 
                                    ? 'opacity-30 scale-100' 
                                    : 'opacity-0 scale-50'
                                }
                            `}
                            style={{ 
                                transitionDelay: isVisible ? '1200ms' : '0ms' 
                            }}
                        />

                        {/* Content */}
                        <div className="text-white text-center py-10 relative z-10">
                            <p 
                                className={`text-xl lg:text-2xl xl:text-3xl transition-all duration-500 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? '1400ms' : '0ms' 
                                }}
                            >
                                <span 
                                    className={`italic transition-all duration-400 ease-out ${
                                        isVisible 
                                            ? 'opacity-100 scale-100 text-purple-300' 
                                            : 'opacity-0 scale-75'
                                    }`}
                                    style={{ 
                                        transitionDelay: isVisible ? '1600ms' : '0ms' 
                                    }}
                                >
                                    Seamless
                                </span>{' '}
                                Team Collaboration
                            </p>
                            <p 
                                className={`py-3 font-extralight text-base line-clamp-4 text-[#858381] transition-all duration-500 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-6'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? '1800ms' : '0ms' 
                                }}
                            >
                                Work together with your team in real time, no matter where they are. EditLabs's collaborative tools make it easy to communicate, share files, and keep everyone in sync
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Full-Width Card */}
            <div 
                className={`w-[95%] lg:w-[90%] xl:w-[70%] mx-auto py-5 transition-all duration-700 ease-out ${
                    isVisible 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-16 scale-95'
                }`}
                style={{ 
                    transitionDelay: isVisible ? '1200ms' : '0ms' 
                }}
            >
                <div className="relative border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)] px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                    {/* Gradient blur background with animation */}
                    <div 
                        className={`
                            absolute bottom-0 left-0 
                            w-full h-1/2 
                            bg-gradient-to-tr from-purple-500 via-purple-400 to-transparent 
                            opacity-20 [filter:blur(20px)] transform-gpu 
                            z-0 transition-all duration-1000 ease-out
                            ${isVisible 
                                ? 'opacity-20 scale-100' 
                                : 'opacity-0 scale-75'
                            }
                        `}
                        style={{ 
                            transitionDelay: isVisible ? '1400ms' : '0ms' 
                        }}
                    />

                    {/* Content */}
                    <div className="text-white text-center py-10 relative z-10">
                        <p 
                            className={`text-xl lg:text-2xl xl:text-3xl transition-all duration-500 ease-out ${
                                isVisible 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-4'
                            }`}
                            style={{ 
                                transitionDelay: isVisible ? '1600ms' : '0ms' 
                            }}
                        >
                            <span 
                                className={`italic transition-all duration-400 ease-out ${
                                    isVisible 
                                        ? 'opacity-100 scale-100 text-purple-300' 
                                        : 'opacity-0 scale-75'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible ? '1800ms' : '0ms' 
                                }}
                            >
                                Comprehensive
                            </span>{' '}
                            Project Insights
                        </p>
                        <p 
                            className={`py-3 font-extralight text-base text-[#858381] transition-all duration-500 ease-out ${
                                isVisible 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-6'
                            }`}
                            style={{ 
                                transitionDelay: isVisible ? '2000ms' : '0ms' 
                            }}
                        >
                            Stay on top of your projects with advanced analytics and reporting. EditLabs gives you the insights you need to make data-driven decisions and improve overall efficiency.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLabHelp;
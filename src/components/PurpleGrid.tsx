import { useState, useEffect, useRef } from 'react';
import editlabScreenshot from '../assets/editlabScreenshot.png';

const PurpleGridContainer = () => {
    const [isAtTop, setIsAtTop] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Trigger initial animation
        setTimeout(() => setIsLoaded(true), 100);

        const handleScroll = () => {
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                // Check if the top of the image is at or near the top of the viewport
                if (rect.top <= 0 && rect.bottom > 0) {
                    setIsAtTop(true);
                } else {
                    setIsAtTop(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="bg-transparent overflow-visible relative">
            {/* Grid lines container */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Top horizontal lines */}
                <div className="absolute top-[15%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-20 w-[90%] mx-auto"></div>
                <div className="absolute top-[20%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent w-[90%] opacity-20 mx-auto"></div>

                {/* Bottom horizontal lines */}
                {/* <div className="absolute bottom-[35%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent w-[90%] opacity-20 mx-auto"></div> */}
                <div className="absolute bottom-[55%] md:bottom-[60%] lg:bottom-[50%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent w-[90%] opacity-20 mx-auto"></div>

                {/* Left vertical lines */}
                <div className="absolute left-[10%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>
                <div className="absolute left-[20%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>

                {/* Right vertical lines */}
                <div className="absolute right-[10%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>
                <div className="absolute right-[20%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>

                {/* Intersection stars - Top left */}
                {/* <div className="absolute left-[10%] top-[15%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] -translate-y-[50%] rotate-45"></div> */}
                {/* <div className="absolute left-[20%] top-[15%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] -translate-y-[50%] rotate-45"></div> */}
                {/* <div className="absolute left-[10%] top-[20%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] -translate-y-[50%] rotate-45"></div> */}
                <div className="absolute left-[20%] top-[20%] h-1 w-1 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)] -translate-x-[50%] -translate-y-[50%] rotate-45"></div>


                {/* Intersection stars - Top right */}
                {/* <div className="absolute right-[10%] top-[15%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[20%] top-[15%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[10%] top-[20%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] -translate-y-[50%] rotate-45"></div> */}
                <div className="absolute right-[20%] top-[20%] h-1 w-1 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8) translate-x-[50%] -translate-y-[50%] rotate-45"></div>


                {/* Intersection stars - Bottom left */}
                {/* <div className="absolute left-[10%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] translate-y-[50%] rotate-45"></div> */}
                {/* <div className="absolute left-[20%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] translate-y-[50%] rotate-45"></div> */}
                {/* <div className="absolute left-[10%] bottom-[40%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] translate-y-[50%] rotate-45"></div> */}
                <div className="absolute left-[20%] bottom-[55%] md:bottom-[60%] lg:bottom-[50%] h-1 w-1 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8) -translate-x-[50%] translate-y-[50%] rotate-45"></div>

                {/* Intersection stars - Bottom right */}
                {/* <div className="absolute right-[10%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] translate-y-[50%] rotate-45"></div> */}
                {/* <div className="absolute right-[20%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] translate-y-[50%] rotate-45"></div> */}
                {/* <div className="absolute right-[10%] bottom-[40%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] translate-y-[50%] rotate-45"></div> */}
                <div className="absolute right-[20%] bottom-[55%] md:bottom-[60%] lg:bottom-[50%] h-1 w-1 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8) translate-x-[50%] translate-y-[50%] rotate-45"></div>
            </div>

            {/* Content area */}
            <div className="relative flex flex-col items-center pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 md:pb-8 px-4 z-10">
                {/* Error message above the content area */}
                {/* <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="bg-transparent text-center">
                        <div className="text-amber-500 text-sm font-medium border-b border-amber-500/30 px-8 py-1">Error</div>
                        <div className="text-gray-400 text-xs py-2">Failed to execute 'querySelector...'</div>
                    </div>
                </div> */}

                {/* New AI Feature tag */}
                {/* <div className="mb-6 bg-gray-900/60 backdrop-blur-sm rounded px-4 py-1 inline-flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <span className="text-white text-sm font-medium">New AI Feature</span>
                </div> */}

                {/* Main title */}
                <h1
                    className="pt-20 sm:pt-28 md:pt-18 lg:pt-20 text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl w-full md:w-[80%] lg:w-[60%] text-center font-bold mb-3 md:mb-4 text-white leading-tight transition-all duration-1000 ease-out"
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateY(0)' : 'translateY(30px)'
                    }}
                >
                    Edit faster. Create more. Click less
                </h1>

                <p
                    className="pt-3 md:pt-4 text-purple-400 [text-shadow:0_0_8px_rgba(192,132,252,0.8)] transform-gpu max-w-xs sm:max-w-md text-center px-4 sm:px-8 font-light text-xs sm:text-sm md:text-base transition-all duration-1000 ease-out"
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                        transitionDelay: '200ms'
                    }}
                >
                    A growing toolbox of powerful Premiere Pro and After Effects plugins designed to cut your workflow in half and supercharge your creativity
                </p>
            </div>

            {/* Animated Screenshot Image */}
            <div
                ref={imageRef}
                className="relative pb-8 md:pb-12 lg:pb-16 px-4 md:px-6 lg:px-8 z-10"
            >
                <div
                    className="w-full sm:w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto transition-all duration-1000 ease-out"
                    style={{
                        transformOrigin: 'center center',
                        transform: isAtTop
                            ? 'perspective(1500px) rotateX(0deg) scale(1)'
                            : 'perspective(1500px) rotateX(45deg) scale(0.85)',
                        opacity: isLoaded ? (isAtTop ? 1 : 0.7) : 0,
                        transitionDelay: '400ms'
                    }}
                >
                    <img
                        src={editlabScreenshot}
                        alt="EditLab Screenshot"
                        className="object-contain w-full rounded-md md:rounded-lg shadow-xl md:shadow-2xl shadow-purple-900/50"
                    />
                </div>
            </div>
        </div>
    );
};

export default PurpleGridContainer;

const UserProgressIndicator = () => {
    // Different plugin images for design suite
    const pluginImages = [
        {
            src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center", // Design tools/UI kit
            alt: "UI Design Plugin"
        },
        {
            src: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop&crop=center", // Color palette/paint brushes
            alt: "Color Palette Plugin"
        },
        {
            src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop&crop=center", // Photo editing/camera
            alt: "Photo Editor Plugin"
        },
        {
            src: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=100&h=100&fit=crop&crop=center", // Typography/fonts
            alt: "Typography Plugin"
        }
    ];

    return (
        <div className="space-y-2">
            {[0, 1, 2, 3].map((index) => {
                const containerClass =
                    index === 1
                        ? "relative h-12 w-[70%] ml-auto"
                        : index === 2
                        ? "relative h-12 w-[80%] ml-auto"
                        : "relative h-12 w-full";

                return (
                    <div key={index} className={containerClass}>
                        {/* Purple glowing border with fading end */}
                        <div
                            className="absolute inset-0 border-l border-t border-b border-[0.5px] border-purple-500 rounded-full 
                            [mask-image:linear-gradient(to_right,white,transparent)] 
                            shadow-[0_0_4px_1px_rgba(168,85,247,0.5)] pointer-events-none"
                        ></div>

                        {/* Content area */}
                        <div className="relative flex items-center h-full ps-2 pe-4 space-x-2 [mask-image:linear-gradient(to_right,white,transparent)]">
                            {/* Circular Image */}
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-400 bg-gray-800">
                                <img
                                    src={pluginImages[index].src}
                                    alt={pluginImages[index].alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Progress Bar */}
                            <div className="flex-1 h-1 bg-purple-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full bg-purple-500 transition-all duration-300 ease-in-out"
                                    style={{
                                        width: index === 0 ? '85%' : 
                                               index === 1 ? '72%' : 
                                               index === 2 ? '90%' : '68%'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserProgressIndicator;
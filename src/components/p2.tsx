
const PurpleGridContainer = () => {
    return (
        <div className="bg-transparent overflow-hidden">
            {/* Grid lines container */}
            <div className="absolute inset-0">
                {/* Top horizontal lines */}
                <div className="absolute top-[15%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-20 w-[90%] mx-auto"></div>
                <div className="absolute top-[20%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent w-[90%] opacity-20 mx-auto"></div>

                {/* Bottom horizontal lines */}
                <div className="absolute bottom-[35%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent w-[90%] opacity-20 mx-auto"></div>
                <div className="absolute bottom-[40%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent w-[90%] opacity-20 mx-auto"></div>

                {/* Left vertical lines */}
                <div className="absolute left-[10%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>
                <div className="absolute left-[20%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>

                {/* Right vertical lines */}
                <div className="absolute right-[10%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>
                <div className="absolute right-[20%] top-[10%] bottom-[20%] w-[1px] bg-gradient-to-t from-transparent via-purple-600 to-transparent opacity-20"></div>

                {/* Intersection stars - Top left */}
                <div className="absolute left-[10%] top-[15%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute left-[20%] top-[15%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute left-[10%] top-[20%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute left-[20%] top-[20%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] -translate-y-[50%] rotate-45"></div>

                {/* Intersection stars - Top right */}
                <div className="absolute right-[10%] top-[15%] h-1 w-1 bg-red-300 shadow-lg shadow-amber-300/70 translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[20%] top-[15%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[10%] top-[20%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] -translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[20%] top-[20%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] -translate-y-[50%] rotate-45"></div>


                {/* Intersection stars - Bottom left */}
                <div className="absolute left-[10%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] translate-y-[50%] rotate-45"></div>
                <div className="absolute left-[20%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] translate-y-[50%] rotate-45"></div>
                <div className="absolute left-[10%] bottom-[40%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] translate-y-[50%] rotate-45"></div>
                <div className="absolute left-[20%] bottom-[40%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 -translate-x-[50%] translate-y-[50%] rotate-45"></div>

                {/* Intersection stars - Bottom right */}
                <div className="absolute right-[10%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[20%] bottom-[35%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[10%] bottom-[40%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] translate-y-[50%] rotate-45"></div>
                <div className="absolute right-[20%] bottom-[40%] h-1 w-1 bg-amber-300 shadow-lg shadow-amber-300/70 translate-x-[50%] translate-y-[50%] rotate-45"></div>

            </div>

            {/* Content area */}
            {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-3xl font-light">
                    Your content goes here
                </div>
            </div> */}
        </div>
    );
};

export default PurpleGridContainer;
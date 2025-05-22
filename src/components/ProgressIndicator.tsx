
const UserProgressIndicator = () => {
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
              <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-400">
                <img
                  src="/synapseLogo2.svg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Progress Bar */}
              <div className="flex-1 h-1 bg-purple-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-purple-500 w-[60%] transition-all duration-300 ease-in-out"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    );
};

export default UserProgressIndicator;

{/* <div className="relative h-12 w-full">
      <div 
        className="absolute inset-0 border-l border-t border-b border-purple-500 rounded-full
                  [mask-image:linear-gradient(to_right,white,transparent)]"
      ></div>
      

      <div className="relative flex items-center h-full px-3 text-blue-white">
        Border fades out →
      </div>
    </div> */}
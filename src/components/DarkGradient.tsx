
import Logos from "./Logos";
import PurpleGridContainer from "./PurpleGrid";

const DarkGradient = () => {


  return (
   <div className="relative w-full h-[844px] lg:h-[1080px] xl:h-[800px] bg-black overflow-hidden ">
  {/* Top left purple gradient */}
  <div className="
      absolute aspect-square rounded-full bg-gradient-to-br from-purple-400 to-transparent opacity-40 [filter:blur(64px)] transform-gpu
      xl:-top-50 xl:-left-20 xl:w-2/5 xl:h-3/4
      lg:-top-20 lg:-left-20 lg:w-1/2 lg:h-3/4
      md:-top-30 md:-left-40 md:w-2/3
      -top-10 -left-20 w-2/3 h-1/2
      z-0
    "></div>

  {/* Bottom right purple gradient */}
  <div className="
    absolute bg-gradient-to-tl from-purple-400 to-transparent opacity-40 [filter:blur(64px)] transform-gpu
    xl:-bottom-50 xl:-right-20 xl:w-2/5 xl:h-3/4
    lg:-bottom-20 lg:-right-20 lg:w-1/2 lg:h-3/4
    md:-bottom-30 md:-right-20 md:w-2/3  
    -bottom-10 -right-20 w-2/3 h-1/2 z-0
  "></div>

  {/* Navbar Component */}
  {/* <Navbar /> */}

  {/* Content container */}
  <div className="relative z-10 w-full h-full flex items-center justify-center text-white ">
    <PurpleGridContainer />
  </div>

      {/* Bottom-aligned hello div */}
    <div className="absolute bottom-0 w-full h-60 bg-transparent flex items-center justify-center ">
     <Logos />
    </div>
</div>

  );
};

export default DarkGradient;
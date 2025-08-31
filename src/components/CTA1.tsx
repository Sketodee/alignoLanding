
const CTA1 = () => {
  return (
    <div className="py-24 md:py-32 w-[95%] lg:w-[80%] mx-auto">
        <p className="text-3xl md:text-5xl text-[#1D1D1D] font-medium text-center">Take the first step towards 
            😇 stress-free project management with EditLab 👋 Simplify tasks, boost productivity</p>

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

             {/* <button className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
        
        <div className="relative px-8 py-3 bg-black rounded-full leading-none flex items-center border-4 border-purple-600">
          <span className="text-gray-300 group-hover:text-white transition duration-300 font-medium">
            Get Started
          </span>
        </div>
      </button> */}
    </div>
  )
}

export default CTA1
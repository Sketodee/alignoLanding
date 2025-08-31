
const WhyChooseUs = () => {
    return (
        <div className="bg-black text-white">
            <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                <div className="text-white text-center ">
                    <p className="text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[90%] ">Why choose <span className="italic">EditLab</span>?</p>
                    <p className="w-[80%] lg:w-[80%] xl:w-[70%] mx-auto text-center py-3 font-extralight text-base lg:text-xl text-[#858381] ">An immediate contrast of EditLab's functionalities against other project coordination utilities. Discover why we excel.</p>
                </div>
            </div>


            <div className="w-[95%] lg:w-[90%] xl:w-[70%] mx-auto md:flex justify-between md:space-x-8 lg:space-x-8">
                <div className=" basis-1/2 mb-5 md:mb-0">
                    <p className="text-3xl text-center pb-6">Alingo</p>
                    <div className="relative  border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)]  px-14 py-3 rounded-2xl bg-white/8 backdrop-blur-sm ">
                        {/* Gradient blur background */}
                          <div className="
                            absolute bottom-0 left-0 
                            w-3/4 h-3/4 
                            bg-gradient-to-tr from-purple-500 to-transparent 
                            opacity-40 [filter:blur(14px)] transform-gpu 
                            z-0
                            "></div>

                        {/* Content */}
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3">Lorem, ipsum dolor.</p>
                    </div>
                </div>


                <div className=" basis-1/2 ">
                   <p className="text-3xl text-center pb-6">Other tools </p>
                    <div className="relative  border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)]  px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm ">
                        {/* Gradient blur background */}
                          <div className="
                            absolute bottom-0 left-0 
                            w-3/4 h-1/4 
                            bg-gradient-to-tr from-purple-500 to-transparent 
                            opacity-40 [filter:blur(14px)] transform-gpu 
                            z-0
                            "></div>

                        {/* Content */}
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3 border-b-[0.5px] border-purple-900">Lorem, ipsum dolor.</p>
                        <p className="py-3">Lorem, ipsum dolor.</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default WhyChooseUs
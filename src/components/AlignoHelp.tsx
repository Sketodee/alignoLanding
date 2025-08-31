
const EditLabHelp = () => {
    return (
        <div className="bg-black text-white">
            <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                <div className="text-white text-center ">
                    <p className="text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[90%] ">How <span className="italic">EditLab</span> helps you</p>
                    <p className="w-[80%] lg:w-[80%] xl:w-[70%] mx-auto text-center py-3 font-extralight text-base lg:text-xl text-[#858381] ">An immediate contrast of EditLab's functionalities against other project coordination utilities. Discover why we excel.</p>
                </div>
            </div>


            <div className="w-[95%] lg:w-[90%] xl:w-[70%] mx-auto md:flex justify-between md:space-x-8 lg:space-x-8">
                <div className=" basis-1/2 mb-5 md:mb-0">
                    <div className="relative  border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)]  px-6 py-3 rounded-2xl bg-white/8 backdrop-blur-sm ">
                        {/* Gradient blur background */}
                        <div className="
                            absolute bottom-0 left-0 
                            w-3/4 h-3/4 
                            bg-gradient-to-tr from-purple-500 to-transparent 
                            opacity-40 [filter:blur(14px)] transform-gpu 
                            z-0
                            "></div>

                        {/* Content */}
                        <div className="text-white text-center py-10">
                            <p className="text-xl lg:text-2xl xl:text-3xl "><span className="italic">Effortless </span>Task Management</p>
                            <p className="py-3 font-extralight text-base  text-[#858381] ">Keep all your tasks organized and visible in one place. EditLab helps you assign, track, and prioritize tasks easily, ensuring nothing falls through the crack</p>
                        </div>
                    </div>
                </div>


                <div className=" basis-1/2 ">
                    <div className="relative  border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)]  px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm ">
                        {/* Content */}
                        <div className="text-white text-center py-10">
                            <p className="text-xl lg:text-2xl xl:text-3xl  "><span className="italic">Seamless </span>Team Collaboration</p>
                            <p className="py-3 font-extralight text-base line-clamp-4 text-[#858381] ">Work together with your team in real time, no matter where they are. EditLab’s collaborative tools make it easy to communicate, share files, and keep everyone in sync</p>
                        </div>
                    </div>
                </div>

            </div>

             <div className="w-[95%] lg:w-[90%] xl:w-[70%] mx-auto py-5">
                 <div className="relative  border-purple-900 shadow-[0_0_5px_4px_rgba(88,28,135,0.6)]  px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm ">
                            {/* Content */}
                            <div className="text-white text-center py-10">
                                <p className="text-xl lg:text-2xl xl:text-3xl  "><span className="italic">Comprehensive </span>Project Insights</p>
                                <p className="py-3 font-extralight text-base  text-[#858381] ">Stay on top of your projects with advanced analytics and reporting. EditLab gives you the insights you need to make data-driven decisions and improve overall efficiency.</p>
                            </div>
                        </div>
             </div>

        </div>
    )
}

export default EditLabHelp
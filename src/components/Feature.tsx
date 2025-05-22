import CTA1 from "./CTA1"
import UserProgressIndicator from "./ProgressIndicator"

const Feature = () => {
    return (
        <div className="relative w-full h-[900px] md:h-[744px] lg:h-[780px] xl:h-[800px] bg-black overflow-hidden ">
            {/* Top left purple gradient */}
            <div className="
                absolute aspect-square rounded-full bg-gradient-to-bl from-purple-400 to-transparent opacity-40 [filter:blur(64px)] transform-gpu
                xl:-top-50 xl:-right-20 xl:w-3/5 xl:h-3/4
                lg:-top-20 lg:-right-20 lg:w-1/2 lg:h-1/2
                md:-top-30 md:-right-40 md:w-2/3
                -top-10 -right-20 w-2/3 h-1/2
                z-0
                "></div>


            {/* Bottom right purple gradient */}
            {/* <div className="
                absolute bg-gradient-to-tl from-purple-400 to-transparent opacity-40 [filter:blur(64px)] transform-gpu
                xl:-bottom-50 xl:-right-20 xl:w-2/5 xl:h-3/4
                lg:-bottom-20 lg:-right-20 lg:w-1/2 lg:h-3/4
                md:-bottom-30 md:-right-20 md:w-2/3  
                -bottom-10 -right-20 w-2/3 h-1/2 z-0
            "></div> */}

            <div className="pt-20 w-[95%] lg:w-[80%] mx-auto md:flex justify-between items-center ">
                <div className="text-white w-full text-center md:text-left md:w-[60%] lg:w-[60%] ">
                    <p className="text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[90%] "><span className="italic">faster,</span> smarter Project Management</p>
                    <p className="md:w-[80%] lg:w-[70%] xl:w-[80%] text-center md:text-left py-5 font-extralight text-base lg:text-xl text-[#858381]">Our intuitive platform provides everything you need to efficiently manage your projects, from real-time collaboration to detailed task tracking.</p>
                </div>
                <div className="text-white w-[95%] md:w-[40%] lg:w-[40%] ">
                    <UserProgressIndicator />
                </div>
            </div>

                   <div>
                    <CTA1 />
                </div>


        </div>
    )
}

export default Feature
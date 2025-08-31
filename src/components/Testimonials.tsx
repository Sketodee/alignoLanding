import TestimonialContent from "./TestimonialContent"

const Testimonials = () => {
    return (
        <div className='relative bg-black text-white '>
            <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                <div className="text-white text-center ">
                    <p className="text-4xl lg:text-5xl xl:text-7xl w-full xl:w-[50%] mx-auto ">People Can't Stop <span className="italic">Talking</span> About Us</p>
                </div>
            </div>

       <div className="relative w-full bg-black overflow-hidden ">
                <div className="
                    absolute bg-gradient-to-tl from-purple-400 to-transparent opacity-40 [filter:blur(64px)] transform-gpu
                    xl:bottom-0 xl:left-1/2 xl:-translate-x-1/2 xl:w-2/5 xl:h-3/4
                    lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-1/2 lg:h-3/4
                    md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:w-2/3  
                    bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 z-0
                "></div>
                <TestimonialContent/> 
</div>


        </div>
    )
}

export default Testimonials
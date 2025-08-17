import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Banner = () => {


    const images = [
        'https://i.ibb.co/N6CTPp1k/close-up-people-collecting-food.jpg',
        'https://i.ibb.co/tM0xFn7F/close-up-people-holding-apples-bag-1.jpg', 
        'https://i.ibb.co/6cSnWyF6/close-up-people-with-food-donations.jpg',
        'https://i.ibb.co/chtZ2yFY/medium-shot-volunteers-with-food-donations.jpg',  
    ]

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false); // New state for zoom effect

    useEffect(() => {
        const intervalId = setInterval(() => {

            setIsZoomed(false);

           
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % images.length;
                    return nextIndex;
                });
                setIsZoomed(true); 
            }, 500); 
        }, 3000); 

       
        setIsZoomed(true);
        return () => {
            clearInterval(intervalId);
            setIsZoomed(false); 
        };
    }, [images.length]); 
    return (
        <div className="mb-20">
            <div className="bg-gradient-to-r from-slate-900 py-20 lg:h-screen to-slate-800 text-white px-6  md:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10 overflow-hidden">
                {/* Left Content */}
                <div className="w-full md:w-1/2 z-10">
                    <motion.p
                        className="text-yellow-400 text-lg md:text-xl font-semibold mb-2"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false }}
                    >
                        Reducing Food Waste, Feeding Communities.
                    </motion.p>

                    <motion.h1
                        className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: false }}
                    >
                        Share Food, Share Hope
                    </motion.h1>

                    <motion.p
                        className="text-sm md:text-base text-gray-300 mb-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        Connect restaurants with surplus food to charities and community members.
                        Together, we can reduce waste while ensuring no one goes hungry.
                    </motion.p>

                    {/* CTA Card */}
                    <motion.div
                        className="flex items-center gap-4 bg-white/10 p-4 rounded-xl w-fit backdrop-blur mb-6"
                        initial={{ opacity: 0, x: 100, y: 40 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: false }}
                    >
                        <div className="bg-yellow-400 p-3 rounded-full text-black">
                            <FaPlay />
                        </div>
                        <div>
                            <p className="font-semibold text-base md:text-lg">Join Our Eco Food Community</p>
                            <p className="text-xs text-gray-300">
                                Give them a chance. Believe in The Better Future of Others.
                            </p>
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <div className="flex flex-col lg:flex-row items-center justify-center md:justify-start gap-4">
                        <Link to="/allDonations" className="bg-orange-500  hover:bg-orange-600 px-6 py-3 text-white font-semibold rounded-full transition duration-150 hover:scale-105 active:scale-95">
                            <span className="mr-2">&rarr;</span> Get Started Today
                        </Link>
                        <Link to="/allDonations" className="bg-white text-black hover:bg-green-700 hover:text-white px-6 py-3 font-semibold rounded-full transition duration-150 hover:scale-105 active:scale-95">
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="w-full md:w-1/2 relative ml-5 hidden md:flex justify-center items-center">
                
                   <div>
                     <div className="relative w-105 h-105  rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Display ${currentImageIndex + 1}`}
                            className={`
                    w-full h-full object-cover rounded-tl-4xl
                    transition-transform duration-1000 ease-out 
                    ${isZoomed ? 'scale-105' : 'scale-100'}
                    transition-opacity duration-500 ease-in-out 
                    opacity-100 
                `}
                        />

                    </div>
                    <div className='flex space-x-3 mt-3'>
                        <div>
                            <p className="text-xl sm:text-2xl font-bold text-white">
                                Partner Restaurants

                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm">Active contributors</p>
                        </div>

                        <div className="flex  space-x-1">
                            {[
                                'https://i.ibb.co/Psd1J82r/download-25.jpg',
                                'https://i.ibb.co/hJ70drJb/download-26.jpg',
                                'https://i.ibb.co/tTGSNfy9/download-27.jpg',
                                'https://i.ibb.co/Qjq17whv/images-14.jpg',
                            ].map((src, i) => (
                                <img
                                    key={i}
                                    className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-gray-800"
                                    src={src}
                                    alt={`Avatar ${i + 1}`}
                                />
                            ))}
                        </div>
                   </div>
                    </div>

                 <motion.div
        className="absolute top-4 right-4 sm:top-4 sm:right-6 bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg flex items-center space-x-3"
        initial={{ opacity: 0, x: 100, y: -40 }} // Adjusted initial animation for top/right
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: false }}
      >
        <div className="text-red-500 text-2xl sm:text-3xl">
          ❤️
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold text-white">
            <CountUp end={120} duration={2} />+
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">Positive Testimonials</p>
        </div>
        <div className="flex -space-x-2">
          <img  className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-gray-800" 
          src="https://i.ibb.co/Qjq17whv/images-14.jpg" alt="" />
        </div>
      </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;















//  <div className="relative w-full min-h-[85vh] bg-[#15803d] text-white flex flex-col md:flex-row items-center justify-center p-6 md:p-10 overflow-hidden">

//             {/* Left Section (Content) */}
//             <div className="flex-1 z-10 max-w-3xl text-center md:text-left">
//                 <p className="text-orange-400 text-sm md:text-lg font-semibold mb-2">
//                     Reducing Food Waste, Feeding Communities
//                 </p>
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 molle-regular-italic">
//                     Share Food, Share Hope
//                 </h1>
//                 <p className="text-sm sm:text-base md:text-lg mb-8 mx-auto md:mx-0 max-w-xl">
//                     Connect restaurants with surplus food to charities and community members.
//                     Together, we can reduce waste while ensuring no one goes hungry.
//                 </p>


// <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
//     <button className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 px-6 py-3 text-white font-semibold rounded-full transition duration-150 hover:scale-105 active:scale-95">
//         <span className="mr-2">&rarr;</span> Get Started Today
//     </button>
//     <button className="flex items-center justify-center bg-white text-black hover:bg-green-700 hover:text-white px-6 py-3 font-semibold rounded-full transition duration-150 hover:scale-105 active:scale-95">
//         Learn More
//     </button>
// </div>
//             </div>


//             <div className="relative flex-1 hidden md:block w-full min-h-[500px] my-10 rounded-tl-[200px] overflow-hidden">
//                 {images.map((image, index) => (
//                     <motion.img
//                         key={index}
//                         animate={{ scale: [1, 1.1] }}
//                         transition={{
//                             duration: 5,
//                             repeat: Infinity,
//                             repeatType: 'reverse',
//                             ease: 'easeInOut',
//                         }}
//                         src={image}
//                         alt={Slide ${index + 1}}
                        // className={absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        //     }}
//                     />
//                 ))}


                
//             </div>
//         </div>

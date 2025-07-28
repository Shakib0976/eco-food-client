import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VantaBackground from './VantaBackground';

// Assuming you have these images in your public folder or import them
const images = [
    'https://i.ibb.co/kVN8hqY7/side-view-mix-meat-snacks-with-french-fries-grilled-vegetables-salad-sauces-board.jpg',
    'https://i.ibb.co/Xry1RyW1/plate-food-with-different-dishes-including-chickpeas-spinach-spinach.jpg', // Replace with your actual image paths
    'https://i.ibb.co/B2vst3v5/bowl-beet-salad-with-quinoa-quinoa-quinoa.jpg',
    'https://i.ibb.co/7tntBRXx/top-view-table-full-delicious-food-composition.jpg',
];

const Banner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(sliderInterval);
    }, []);

    return (
        <VantaBackground height="85vh">
            <div className="relative w-full min-h-[85vh] text-white flex flex-col md:flex-row items-center justify-center p-6 md:p-10 overflow-hidden">

                {/* Left Section (Content) */}
                <div className="flex-1 z-10 max-w-3xl text-center md:text-left">
                    <p className="text-orange-400 text-sm md:text-lg font-semibold mb-2">
                        Reducing Food Waste, Feeding Communities
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 molle-regular-italic">
                        Share Food, Share Hope
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg mb-8 mx-auto md:mx-0 max-w-xl">
                        Connect restaurants with surplus food to charities and community members.
                        Together, we can reduce waste while ensuring no one goes hungry.
                    </p>

        
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                        <button className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 px-6 py-3 text-white font-semibold rounded-full transition duration-150 hover:scale-105 active:scale-95">
                            <span className="mr-2">&rarr;</span> Get Started Today
                        </button>
                        <button className="flex items-center justify-center bg-white text-black hover:bg-green-700 hover:text-white px-6 py-3 font-semibold rounded-full transition duration-150 hover:scale-105 active:scale-95">
                            Learn More
                        </button>
                    </div>
                </div>

                
                <div className="relative flex-1 hidden md:block w-full min-h-[500px] my-10 rounded-tl-[200px] overflow-hidden">
                    {images.map((image, index) => (
                        <motion.img
                            key={index}
                            animate={{ scale: [1, 1.1] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                            }}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ))}

                   
                    <motion.div
                        animate={{ y: [0, -40, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-8 right-8 bg-black bg-opacity-50 p-4 rounded-full cursor-pointer hover:bg-opacity-70 transition duration-300 z-20"
                    >
                        <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </VantaBackground>


    );
};

export default Banner;
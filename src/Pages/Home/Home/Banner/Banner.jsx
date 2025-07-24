import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
        <div className="relative  h-screen md:p-10  mb-20 bg-[#0e2b1d] text-white min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Left Section (Content) */}
            <div className="flex-1 max-w-4xl md:-mt-15 mx-auto p-8 z-10">
                <p className="text-orange-400 md:text-lg font-semibold mb-2">Reducing Food Waste, Feeding Communities</p>
                <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold leading-tight mb-6 molle-regular-italic">Share Food,Share Hope</h1>
                <p className="md:text-lg text-sm mb-8 max-w-xl">
                    Connect restaurants with surplus food to charities and community members. Together, we can reduce waste while ensuring no one goes hungry.
                </p>
                <div className="flex space-x-4">
                    <button className="flex items-center bg-orange-500 hover:bg-orange-600 px-3 text-white font-semibold md:py-3 md:px-6 rounded-full transition duration-100 hover:scale-105 active:scale-95">
                        <span className="mr-2">&rarr;</span>Get Start Today
                    </button>
                    <button className="md:flex items-center bg-white text-black hover:bg-green-700 hover:text-white font-semibold py-3 px-6 rounded-full transition duration-100 hover:scale-105 active:scale-95">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Right Section (Image Slider) */}
            <div className="relative flex-1  my-20 rounded-tl-[200px] hidden md:block w-full  min-h-[500px] overflow-hidden">
                {images.map((image, index) => (
                    <motion.img

                        animate={{
                            scale: [1, 1.1], // zoom from scale 1 to 1.1
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'reverse', // zoom in then out
                            ease: 'easeInOut',
                        }}
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
                {/* Placeholder for play button/overlay if desired, like in the image */}
                <motion.div
                    animate={{
                        y: [0, -40, 0], // Move up to -20px and back to 0
                    }}
                    transition={{
                        duration: 2,      // 2 seconds for full up-down cycle
                        repeat: Infinity, // Keep repeating forever
                        ease: "easeInOut" // Smooth easing
                    }}
                    className="absolute bottom-8 right-8 bg-black bg-opacity-50 p-4 rounded-full cursor-pointer hover:bg-opacity-70 transition duration-300 z-20">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
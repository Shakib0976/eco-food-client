import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const Donation = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className='text-center items-center my-20'>
               <h1 className='md:text-5xl text-3xl mb-4 molle-regular-italic  font-semibold'>Featured Donations</h1>
               <p className='text-sm molle-regular-italic'>Fresh food donations available right now. Join our <br />community to help reduce waste and feed those in need.</p>
            </div>
            <div className='mb-10 mt-5'>
                <motion.div
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={{
                        rest: {},
                        hover: {},
                    }}
                    className="relative rounded-xl h-100 overflow-hidden shadow-lg cursor-pointer group max-w-sm"
                >
                    {/* Image */}
                    <img
                        src="https://i.ibb.co/kVN8hqY7/side-view-mix-meat-snacks-with-french-fries-grilled-vegetables-salad-sauces-board.jpg"
                        alt="Waste Collection"
                        className="w-full h-72 object-cover"
                    />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                            Available
                        </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span>2 hours</span>
                    </div>

                    {/* Overlay content */}
                    <motion.div
                        variants={{
                            rest: { opacity: 1, y: 80 },
                            hover: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-950 to-green-900 p-4 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-green-600 p-2 rounded-full">
                                {/* Truck icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 17v-2h6v2a2 2 0 002 2h1a1 1 0 001-1v-5a4 4 0 00-4-4H8a4 4 0 00-4 4v5a1 1 0 001 1h1a2 2 0 002-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold">Waste Collection</h3>
                        </div>
                        <p className="text-sm text-gray-300">
                            Efficient and reliable waste collection services tailored for residential
                        </p>

                        {/* Read More - Animated */}
                        <div className='mt-10 mb-5'>
                            <p className="text-orange-400 font-semibold flex items-center gap-1">
                                Read More <ArrowRight className="w-4 h-4" />
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Donation;

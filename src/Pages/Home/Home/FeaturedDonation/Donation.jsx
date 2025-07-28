import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import simpleAxios from '../../../../Hooks/simpleAxios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Donation = () => {

    const axiosSecure = simpleAxios();

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['/feature'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/feature`);
            return res.data;
        },
    });
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // if true, animation happens only once
        });
    }, []);

    console.log(donations);

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='w-11/12 mx-auto'>
            <div className='text-center items-center mb-5 md:mb-10 mt-30'>
                <h1 className='md:text-5xl text-4xl molle-regular-italic  font-semibold'>Featured Donations</h1>
                <p className='text-sm molle-regular-italic'>Fresh food donations available right now. Join our <br />community to help reduce waste and feed those in need.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 space-x-6 space-y-4'>
                {
                    donations.map(donation => <div
                        data-aos="fade-up"
                        

                        className='mb-10 mt-5'>
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
                                src={donation.image}
                                alt="Waste Collection"
                                className="w-full h-72 object-cover"
                            />

                            {/* Top badges */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                    {donation.status}
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
                                <div className="max-w-md ">
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
                                        <h3 className="text-lg font-semibold">{donation.foodType}</h3>
                                    </div>

                                    <p className="mb-1"><span className='text-lg'>Restaurant Name: </span><span className='text-gray-200'>{donation.restaurantName}</span></p>
                                    <p className="mb-3"><span className='text-lg'>Locations: </span><span className='text-gray-200' >{donation.location}</span></p>

                                    {/* Read More - Animated */}
                                    <div className="mt-10 mb-5">
                                        <Link to={`/donations/${donation?._id}`}>
                                            <p className="text-orange-500 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                                                View  Details <ArrowRight className="w-4 h-4" />
                                            </p></Link>
                                    </div>
                                </div>

                            </motion.div>
                        </motion.div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Donation;

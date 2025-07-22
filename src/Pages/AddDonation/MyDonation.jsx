import React, { use } from 'react';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { ArrowRight, Clock, Package, Pizza, Utensils } from 'lucide-react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const MyDonation = () => {


    const { user } = use(AuthContext);
    const axiosSecure = useAxios();

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['donations', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // only fetch when email exists
    });

    console.log(donations)

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <div className='mb-10 mt-5'>
                <h1 className='text-5xl text-bold text-center mt-10'> All donations </h1>
                <p className='text-center text-bold mt-2 mb-10'>Create By Restaurant</p>
                <div className='w-11/12 mx-auto grid grid-cols-3 space-x-4 space-y-4'>
                    {
                        donations.map(donation => <div
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
                            <div
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
                                    <h3 className="text-lg font-semibold">{donation.title}</h3>
                                </div>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2">
                                        <Utensils className="w-5 h-5 text-indigo-600" />
                                        <span>{donation.restaurantName}</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Pizza className="w-5 h-5 text-green-600" />
                                        <span>{donation.foodType}</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-rose-600" />
                                        <span>Quantity: {donation.quantity}</span>
                                    </p>
                                </div>


                                {/* Read More - Animated */}
                                <div className='mt-5 mb-5'>
                                    <div className="text-orange-400 font-semibold flex justify-between gap-2"> {/* Increased gap for better spacing */}
                                        {/* Update Button */}
                                        <button
                                            className="flex items-center gap-1 px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                                transform hover:scale-105
                               focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75"
                                            onClick={() => console.log('Update button clicked')} // Add your update logic here
                                        >
                                            <FiEdit className="text-lg" /> {/* Edit icon */}
                                            Update
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            className="flex items-center gap-1 px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                                transform hover:scale-105
                               focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75"
                                            onClick={() => console.log('Delete button clicked')} // Add your delete logic here
                                        >
                                            <FiTrash2 className="text-lg" /> {/* Trash icon */}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyDonation;
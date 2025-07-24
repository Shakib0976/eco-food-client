import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import simpleAxios from '../../Hooks/simpleAxios';
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../Loader/Loader';
import { FaBoxes, FaCheckCircle, FaClock, FaMapMarkerAlt, FaUtensils } from 'react-icons/fa';

const MyPickup = () => {

    const axiosSecure = simpleAxios();

    const { user } = use(AuthContext);
    const email = user.email;
    const status = 'Assigned'

    const { data: assignedData, isLoading } = useQuery({
        queryKey: ['pickupReq', email, status],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pickupReqWith?email=${email}&status=${status}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    console.log(assignedData);
    return (
        <div className='w-11/12 mx-auto my-20 '>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
             {
                assignedData.map( assign =>    <div className="
            bg-white rounded-lg shadow-xl overflow-hidden
            flex flex-col h-full
            transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl
        ">
                    {/* Optional: Image at the top if available */}
                    {assign?.image && (
                        <div className="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img
                                src={assign?.image}
                                alt={''}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {/* Opacity overlay for better text readability later if text was on image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    )}

                    <div className="p-6 flex-grow flex flex-col">
                        {/* Title */}
                        <h3 className="text-2xl font-extrabold text-gray-800 mb-3 leading-tight">
                            {assign?.title}
                        </h3>

                        {/* Restaurant Name */}
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                            {assign?.restaurantName}
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-gray-600 text-base mb-4 flex-grow">
                            <p className="flex items-center gap-2">
                                <FaUtensils className="text-xl text-indigo-500" />
                                <span className="font-medium">Food Type:</span> {assign?.foodType}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaBoxes className="text-xl text-indigo-500" />
                                <span className="font-medium">Quantity:</span> {assign?.quantity}
                            </p>
                            <p className="flex items-center gap-2 md:col-span-2">
                                <FaClock className="text-xl text-indigo-500" />
                                <span className="font-medium">Pickup Time:</span> {assign?.pickupWindow}
                            </p>
                            <p className="flex items-center gap-2 md:col-span-2">
                                <FaMapMarkerAlt className="text-xl text-indigo-500" />
                                <span className="font-medium">Location:</span> {assign?.location}
                            </p>
                        </div>

                        {/* Footer with Status and Button */}
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-gray-200 mt-4 gap-4">
                            {/* Status Badge */}
                            <span className={` bg-green-400 text-white px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide w-full sm:w-auto text-center`}>
                                {assign?.status}
                            </span>

                            {/* Confirm Pickup Button - Only shown if status is 'Assigned' */}
                            {assign?.status === 'Assigned' && (
                                <button
                                    // onClick={handleConfirmPickup}
                                    className="
                                bg-green-600 text-white px-6 py-3 rounded-full font-semibold
                                flex items-center justify-center gap-2
                                transition-all duration-300 ease-in-out
                                hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5
                                active:translate-y-0 active:bg-green-800
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75
                                w-full sm:w-auto
                            "
                                >
                                    <FaCheckCircle className="text-xl" /> Confirm Pickup
                                </button>
                            )}
                            {assign?.status === 'Picked Up' && (
                                <span className="text-green-600 font-semibold flex items-center gap-2">
                                    <FaCheckCircle className="text-2xl" /> Successfully Picked Up!
                                </span>
                            )}
                        </div>
                    </div>
                </div>)
             }
            </div>
        </div>
    );
};

export default MyPickup;
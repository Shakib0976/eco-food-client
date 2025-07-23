import React from 'react';
import { Link } from 'react-router'; // For navigating to donation details
import { FaMapMarkerAlt, FaUtensils, FaUserTie, FaBoxOpen, FaTruckLoading, FaCheckCircle, FaHourglassHalf, FaEye } from 'react-icons/fa'; // Icons for clarity
import simpleAxios from '../../Hooks/simpleAxios';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

const FoodDonationCard = () => {


    const axiosSecure = simpleAxios();

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['varifiedDonation'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/varifiedDonation`);
            return res.data;
        },

    });
    console.log(donations);
    if (isLoading) {
        return <Loader></Loader>
    }




    return (
        <div className='my-10 w-11/12 mx-auto'>
            <div className='mb-5'>
                <h1 className='  text-2xl md:text-5xl mb-2 font-semibold'>All Donations</h1>
                <p className='text-xl text-gray-500'>Browse verified food donations from restaurants in your area</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {donations.map((donation) => (
                    <div
                        key={donation?._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-200 flex flex-col"
                    >
                        {/* Image and Status Badge */}
                        <div className="relative h-44 w-full">
                            {donation?.image ? (
                                <img
                                    src={donation?.image}
                                    alt={donation?.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100 text-5xl text-gray-400">
                                    <FaUtensils />
                                </div>
                            )}
                            <div
                                className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full border ${donation?.status === 'Available'
                                    ? 'bg-green-100 text-green-600 border-green-300'
                                    : donation?.status === 'Claimed'
                                        ? 'bg-yellow-100 text-yellow-600 border-yellow-300'
                                        : 'bg-gray-100 text-gray-600 border-gray-300'
                                    }`}
                            >
                                {donation?.status}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-grow">
                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {donation?.title || 'No Title'}
                            </h3>

                            {/* Category */}
                            <p className="text-sm text-gray-500 flex items-center mb-1">
                                <FaBoxOpen className="mr-1 text-xs" /> {donation?.category || 'Food'}
                            </p>

                            {/* Restaurant Name & Location */}
                            <p className="text-sm font-semibold text-gray-800">{donation?.restaurantName}</p>
                            <p className="text-sm text-gray-500 flex items-center mb-2">
                                <FaMapMarkerAlt className="mr-1 text-xs" />
                                {donation?.location}
                            </p>

                            {/* Assigned Charity */}
                            {donation?.charityName && (
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Assigned to:</span>{' '}
                                    <span className="font-semibold">{donation?.charityName}</span>
                                </p>
                            )}

                            {/* Quantity */}
                            <div className='flex justify-between mt-3'>
                                <p className="text-green-600 font-semibold text-sm mb-4">
                                    {donation?.quantity || 0} kg
                                </p>

                                {/* Button */}
                                <Link to={`/donations/${donation?._id}`}>
                                    <button className="w-full btn py-2 border rounded-md text-gray-800 hover:bg-green-500 flex justify-center items-center gap-2">
                                        <FaEye className="text-sm" /> Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default FoodDonationCard;
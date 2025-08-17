import React, { useState } from 'react';
import { Link } from 'react-router'; // For navigating to donation details
import { FaMapMarkerAlt, FaUtensils, FaUserTie, FaBoxOpen, FaTruckLoading, FaCheckCircle, FaHourglassHalf, FaEye } from 'react-icons/fa'; // Icons for clarity
import simpleAxios from '../../Hooks/simpleAxios';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

const FoodDonationCard = () => {


    const [searchLocation, setSearchLocation] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

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

    const filteredDonations = donations
        .filter((donation) =>
            donation?.location?.toLowerCase().includes(searchLocation.toLowerCase())
        )
        .sort((a, b) => {
            const qtyA = Number(a?.quantity) || 0;
            const qtyB = Number(b?.quantity) || 0;

            return sortOrder === 'asc' ? qtyA - qtyB : qtyB - qtyA;
        });
    console.log('Sorted Donations:', filteredDonations.map(d => d.quantity));


    return (
        <div className='my-10 w-11/12 mx-auto'>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold dark:text-gray-200 text-gray-800 mb-3 leading-tight">Nourish Your Community</h1>
                    <p className="text-lg md:text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">Discover and secure verified food donations from local restaurants and businesses.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                    {/* Search Input */}
                    <div className="relative w-full dark:text-gray-900 md:w-1/2 lg:w-2/5">
                        <input
                            type="text"
                            placeholder="Search donations by city..."
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="input input-bordered input-lg w-full pl-12 pr-4 rounded-full shadow-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Sort Dropdown */}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="select bg-2 select-bordered select-lg w-full md:w-56 rounded-full shadow-md text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    >
                        <option value="asc">Quantity: Low to High</option>
                        <option value="desc">Quantity: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredDonations.map((donation) => (
                    <div
                        key={donation?._id}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition duration-300 ease-in-out overflow-hidden border border-gray-200 flex flex-col"



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
                                <div className="flex items-center justify-center h-full  bg-gray-100 text-5xl text-gray-400">
                                    <FaUtensils />
                                </div>
                            )}
                            <div
                                className={`absolute  top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full border ${donation?.status === 'Available'
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
                            <h3 className="text-lg font-semibold dark:text-gray-200 text-gray-800 mb-1">
                                {donation?.title || 'No Title'}
                            </h3>

                            {/* Category */}
                            <p className="text-sm dark:text-gray-300 text-gray-500 flex items-center mb-1">
                                <FaBoxOpen className="mr-1 text-xs" /> {donation?.category || 'Food'}
                            </p>

                            {/* Restaurant Name & Location */}
                            <p className="text-sm dark:text-gray-300 font-semibold text-gray-800">{donation?.restaurantName}</p>
                            <p className="text-sm dark:text-gray-400 text-gray-500 flex items-center mb-2">
                                <FaMapMarkerAlt className="mr-1 text-xs" />
                                {donation?.location}
                            </p>

                            {/* Assigned Charity */}
                            {donation?.charityName && (
                                <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">
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
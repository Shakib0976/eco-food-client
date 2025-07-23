import React from 'react';
import { FaBoxOpen, FaBuilding, FaCheckCircle, FaClock, FaInfoCircle, FaMapMarkerAlt, FaTruckLoading, FaUtensils } from 'react-icons/fa';
import simpleAxios from '../../Hooks/simpleAxios';
import Swal from 'sweetalert2';

const DetailsPage = ({ donateData }) => {

    const axiosSecure = simpleAxios();

    const handleAddToFavorite = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosSecure.post('favorites', donateData);
            Swal.fire({
                icon: 'success',
                title: 'Added to Favorites!',
                text: 'This donation has been saved to your favorites.',
                timer: 2000,
                showConfirmButton: false
            });
            console.log('add fovorite data is', res.data);
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Could not save to favorites. Already data saved',
            });
            console.log(error);
        }



    }

    const donation = donateData;
    return (
        <div>
            <div className="max-w-5xl mx-auto p-6 space-y-6">

                {/* Donation Info */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-4 border border-gray-100 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
                    {/* Donation Title - If you have one, add it here for better context */}
                    {donation.title && (
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">
                            {donation.title}
                        </h2>
                    )}

                    {/* Grid for two-column layout on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">

                        {/* Description */}
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaInfoCircle className="w-5 h-5 mr-2 text-blue-500" />
                                <span className="font-semibold text-lg">Description:</span>
                            </div>
                            <p className="text-gray-800 ml-7">Food Type : {donation.foodType}</p>
                        </div>

                        {/* Food Type */}
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaUtensils className="w-5 h-5 mr-2 text-orange-500" />
                                <span className="font-semibold text-lg">Food Type:</span>
                            </div>
                            <p className="text-gray-800 ml-7">{donation.foodType}</p>
                        </div>

                        {/* Quantity */}
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaBoxOpen className="w-5 h-5 mr-2 text-teal-500" />
                                <span className="font-semibold text-lg">Quantity:</span>
                            </div>
                            <p className="text-gray-800 ml-7">{donation.quantity}</p>
                        </div>


                        {/* Restaurant */}
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaBuilding className="w-5 h-5 mr-2 text-red-500" />
                                <span className="font-semibold text-lg">Restaurant:</span>
                            </div>
                            <p className="text-gray-800 ml-7">{donation.restaurantName}</p>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaMapMarkerAlt className="w-5 h-5 mr-2 text-green-500" />
                                <span className="font-semibold text-lg">Location:</span>
                            </div>
                            <p className="text-gray-800 ml-7">{donation.location}</p>
                        </div>

                        {/* Pickup Time Window */}
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaClock className="w-5 h-5 mr-2 text-indigo-500" />
                                <span className="font-semibold text-lg">Pickup Time Window:</span>
                            </div>
                            <p className="text-gray-800 ml-7">{donation.pickupWindow}</p>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaCheckCircle className="w-5 h-5 mr-2 text-gray-500" />
                                <span className="font-semibold text-lg">Status:</span>
                            </div>
                            <span className={`inline-block ml-7 px-3 py-1 rounded-full text-sm font-medium`}>
                                {donation.status}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    <button onClick={handleAddToFavorite} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                        Save to Favorites
                    </button>

                    <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
                        Request Donation
                    </button>

                    <button className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600">
                        Confirm Pickup
                    </button>
                </div>

                {/* Reviews Section */}
                <div className="bg-gray-100 rounded-xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Reviews</h2>

                    <div className="space-y-3">
                        <div className="bg-white shadow p-3 rounded-md">
                            <p><strong>Name:</strong> Charity ABC</p>
                            <p><strong>Rating:</strong> ⭐⭐⭐⭐☆</p>
                            <p>"Very helpful and timely support!"</p>
                        </div>

                        <div className="bg-white shadow p-3 rounded-md">
                            <p><strong>Name:</strong> John Doe</p>
                            <p><strong>Rating:</strong> ⭐⭐⭐⭐⭐</p>
                            <p>"Well packaged and fresh food!"</p>
                        </div>
                    </div>

                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600">
                        Add Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
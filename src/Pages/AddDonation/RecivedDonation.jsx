import React, { use, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import simpleAxios from '../../Hooks/simpleAxios';
import Loader from '../Loader/Loader';
import { FaBoxes, FaCheckCircle, FaClock, FaMapMarkerAlt, FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RecivedDonation = () => {

    const [currentAssignId, setCurrentAssignId] = useState(null);

    const axiosSecure = simpleAxios();
    const { user } = use(AuthContext);
    const email = user.email;
    const status = 'Picked Up'


    const { data: assignedData, isLoading } = useQuery({
        queryKey: ['pickupReq', email, status],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pickupReqWith?email=${email}&status=${status}`);
            return res.data;
        },
    });

    // add review 
    const handleReview = async (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const reviewData = Object.fromEntries(formData.entries());
        const review = {
            ...reviewData,
            id: currentAssignId

        }
        const res = await axiosSecure.post('review', review);
        console.log('review', res.data);
        document.getElementById('review_modal').close();
        if (res.data.insertedId) {
            Swal.fire({
                title: 'Thank you!',
                text: 'Your review has been submitted.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }

    }

    console.log(assignedData);

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <div className='w-11/12 mx-auto my-20 '>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 '>
                    {
                        assignedData.length == 0 ?

                            <div className="col-span-full flex items-center justify-center min-h-[50vh] bg-blue-50 rounded-lg shadow-md p-8 m-4">
                                <div className="text-center">
                                    <FaBoxes className="text-blue-500 text-6xl mx-auto mb-4" />
                                    <h2 className="text-3xl font-bold text-blue-800 mb-2">No Pickup Requests Assigned Yet!</h2>
                                    <p className="text-lg text-blue-700">
                                        It looks like you don't have any food pickup requests assigned to you at the moment.
                                    </p>
                                    <p className="text-md text-blue-600 mt-2">
                                        Check back later or explore other opportunities.
                                    </p>
                                </div>
                            </div>

                            : assignedData.map(assign => <div className="
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
                                        <p className="flex items-center gap-2 md:col-span-2">
                                            <FaCheckCircle className="text-xl text-indigo-500" />
                                            <span className="font-medium">Status:</span>   {assign?.status}
                                        </p>
                                    </div>

                                    {/* Footer with Status and Button */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-gray-200 mt-4 gap-4">
                                        {/* Status Badge */}

                                        <div>
                                            {/* Open Modal Button */}
                                            <button
                                                className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
                                                onClick={() => {
                                                    setCurrentAssignId(assign._id);
                                                    document.getElementById('review_modal').showModal();
                                                }}

                                            >
                                                Add Review
                                            </button>

                                            {/* Review Modal */}
                                            <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
                                                <form onSubmit={handleReview} method="dialog" className="modal-box">
                                                    <h3 className="font-bold text-lg mb-4">Save Review</h3>

                                                    {/* Reviewer Name */}
                                                    <label className="block font-semibold mb-1">Name:</label>
                                                    <input
                                                        type="text"
                                                        name="reviewerName"
                                                        placeholder="write your name"
                                                        className="input input-bordered w-full mb-3"
                                                        required
                                                    />

                                                    {/* Description */}
                                                    <label className="block font-semibold mb-1">description:</label>
                                                    <textarea
                                                        name="description"
                                                        placeholder="write description"
                                                        className="textarea textarea-bordered w-full mb-3"
                                                        required
                                                    ></textarea>

                                                    {/* Rating */}
                                                    <label className="block font-semibold mb-1">Rating:</label>
                                                    <select
                                                        name="rating"
                                                        className="select select-bordered w-full mb-4"
                                                        required
                                                    >
                                                        <option value="">Give Rating</option>
                                                        <option value="1">⭐☆☆☆☆</option>
                                                        <option value="2">⭐⭐☆☆☆</option>
                                                        <option value="3">⭐⭐⭐☆☆</option>
                                                        <option value="4">⭐⭐⭐⭐☆</option>
                                                        <option value="5">⭐⭐⭐⭐⭐</option>
                                                    </select>

                                                    {/* Action Buttons */}
                                                    <div className="modal-action">
                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                        <button
                                                            type="button"
                                                            className="btn"
                                                            onClick={() => document.getElementById('review_modal').close()}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </form>
                                            </dialog>

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

export default RecivedDonation;
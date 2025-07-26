import React, { use } from 'react';
import { FaBoxOpen, FaBuilding, FaCheckCircle, FaClock, FaInfoCircle, FaMapMarkerAlt, FaTruckLoading, FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import useAxios from '../../Hooks/useAxios';

const DetailsPage = ({ donateData }) => {


    const queryClient = useQueryClient();
    const { user } = use(AuthContext);
    console.log(user.email)
    console.log(donateData);

    // ✅ Status Label & Color Setup
    let DonationStatus = '';

    if (donateData.status == 'Verified') {
        DonationStatus = 'Available';

    } else if (donateData.status == 'Requested') {
        DonationStatus = 'Requested';

    } else if (donateData.status == 'Accepted') {
        DonationStatus = 'Accepted';
    } else if (donateData.status == 'Picked Up') {
        DonationStatus = 'Picked Up';

    } else if (donateData.status == 'Assigned') {
        DonationStatus = 'Assigned';

    } else {
        DonationStatus = 'Unavailable';
    }



    const favoriteData = {
        ...donateData,
        userEmail: user?.email,
        addedAt: new Date().toISOString(),
    };







    const axiosSecure = useAxios();

    const { data: reqDonation } = useQuery({
        queryKey: ['pickupReq'],
        queryFn: async () => {
            const res = await axiosSecure.get(`pickupReq/${donateData._id}`);
            return res.data
        }
    })

    console.log(reqDonation);


    //    handle pickup 
    const handleConfirmPickup = async () => {
        try {
            const res = await axiosSecure.patch(`/pickupReq/charity/${donateData._id}`, {
                email: user.email,
                status: 'Picked Up'
            });

            if (res.data.success) {
                Swal.fire({
                    title: 'Pickup Confirmed!',
                    text: 'The status has been updated to Picked Up.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Refresh the data
                queryClient.invalidateQueries(['pickupReq']);
            } else {
                Swal.fire({
                    title: 'Update Failed',
                    text: res.data.message || 'Could not update the status.',
                    icon: 'error',
                    confirmButtonText: 'Retry'
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message || 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    }

    const handleAddToFavorite = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosSecure.post('favorites', favoriteData);
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


    // only cherity requested

    const handlePostDonation = async (e) => {

        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const DonationData = Object.fromEntries(formData.entries());


        const allDonation = {
            donationId: donation._id,
            title: donation.title,
            foodType: donation.foodType,
            pickupWindow: donation.pickupWindow,
            location: donation.location,
            image: donation.image,
            quantity: donation.quantity,
            restaurantName: donation.restaurantName,
            restaurantEmail: donation.restaurantEmail,
            ...DonationData,
            status: 'Requested',
            createdAt: new Date()
        };
        console.log(allDonation);


        try {

            const res = await axiosSecure.post('/pickupReq', allDonation);

            if (res.data.insertedId) {

                await axiosSecure.patch(`/donations/${donation._id}`, {
                    status: 'Requested'
                });


                queryClient.invalidateQueries(['donations']);

                Swal.fire({
                    title: 'Donation Requested!',
                    text: 'Your food request was submitted successfully.',
                    icon: 'success',
                    confirmButtonText: 'Awesome!',
                    confirmButtonColor: '#4f46e5',
                });

                document.getElementById('request_modal').close();
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Something went wrong or already requested.',
            });
            document.getElementById('request_modal').close();
        }



    }


    const handleReview = async (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const reviewData = Object.fromEntries(formData.entries());
        const review = {
            ...reviewData,
            id: donation._id,
            donationTitle: donation.title,
            restaurantName: donation.restaurantName,
            reviewerEmail: user.email,
            createdAt: new Date().toISOString()
        }
        const res = await axiosSecure.post('review', review);
        console.log('review', res.data);
        document.getElementById('review_modal').close();
        queryClient.invalidateQueries(['review']);

    }

    const donation = donateData;


    const { data: allReview = [], isLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${donation._id}`);
            return res.data;
        },

    });

    if (isLoading) {
        return <Loader></Loader>
    }

    console.log(allReview);
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

                            <span className='bg-green-300  w-25 inline-block ml-7 px-4 py-1 rounded-full text-sm font-medium'>
                                {DonationStatus}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    <button onClick={handleAddToFavorite} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                        Save to Favorites
                    </button>
                    {/* request donation with modal */}

                    {/* open modal */}
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
                        onClick={() => document.getElementById('request_modal').showModal()}
                    >
                        Request Donation
                    </button>


                    <dialog id="request_modal" className="modal modal-bottom sm:modal-middle">
                        <form method="dialog" onSubmit={handlePostDonation}>
                            <div className="modal-box">
                                <h3 className="font-bold text-lg mb-4">Request Donation</h3>
                                <label className='text-semibold'> Title :</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={donation.title}
                                    readOnly
                                    className="input input-bordered w-full mb-3"
                                />
                                <label className='text-semibold'> Restaurant name:</label>
                                <input
                                    type="text"
                                    name="restaurant"
                                    value={donation.restaurantName}
                                    readOnly
                                    className="input input-bordered w-full mb-3"
                                />
                                <label className='text-semibold'> Charity name :</label>
                                <input
                                    type="text"
                                    name="charityName"
                                    value={user.displayName}
                                    readOnly
                                    className="input input-bordered w-full mb-3"
                                />
                                <label className='text-semibold'> Charity email:</label>
                                <input
                                    type="email"
                                    name="charityEmail"
                                    value={user.email}
                                    readOnly
                                    className="input input-bordered w-full mb-3"
                                />
                                <label className='text-semibold'> Description.:</label>
                                <textarea
                                    name="description"
                                    required
                                    placeholder="Request Description"
                                    className="textarea textarea-bordered w-full mb-3"
                                ></textarea>
                                <label className='text-semibold'> Pickup time :</label>
                                <input
                                    type="text"
                                    name='pickupWindow'
                                    value={donation?.pickupWindow}
                                    required
                                    className="input input-bordered w-full mb-4"
                                />

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-success">Submit Request</button>
                                    <button type="button" className="btn" onClick={() => document.getElementById('request_modal').close()}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </dialog>






                    {
                        DonationStatus == "Assigned" && <button onClick={() => handleConfirmPickup()} className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600">
                            Confirm Pickup
                        </button>
                    }
                </div>

                {/* Reviews Section */}
                <div className="bg-gray-100 rounded-xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Reviews</h2>

                    <div className="space-y-3">
                        {
                            allReview.length == 0 ? <div> No Review available</div> : allReview.map(review => <div className="bg-white shadow p-3 rounded-md">
                                <p><strong>Name:</strong> {review.name}</p>
                                <p>
                                    <strong>Rating:</strong>{' '}
                                    <span className="text-yellow-500">
                                        {'⭐'.repeat(parseInt(review.rating))}{'☆'.repeat(5 - parseInt(review.rating))}
                                    </span>
                                </p>
                                <p>{review.description}</p>
                            </div>)
                        }


                    </div>

                    {/* review section */}
                    <div>
                        {/* Open Modal Button */}
                        <button
                            className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
                            onClick={() => document.getElementById('review_modal').showModal()}
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
        </div>
    );
};

export default DetailsPage;
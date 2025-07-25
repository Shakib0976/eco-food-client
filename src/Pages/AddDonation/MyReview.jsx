import React, { use } from 'react';
import useAxios from '../../Hooks/useAxios';
import Loader from '../Loader/Loader';
import { AuthContext } from '../../Context/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyReview = () => {

    const axiosSecure = useAxios();
    const { user } = use(AuthContext);
    const queryClient = useQueryClient();

    const { data: MyReview = [], isLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/email/${user.email}`);
            return res.data;
        },

    });
    console.log(MyReview);




    if (isLoading) {
        return <Loader></Loader>
    }

    const handleReviewDelete = async(id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/review/${id}`);
                if (res.data.success) {
                    Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                    queryClient.invalidateQueries(['review']); 
                } else {
                    Swal.fire('Error!', 'Review could not be deleted.', 'error');
                }
            } catch (error) {
                console.error("Error deleting review:", error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    }
    return (
        <div className='w-11/12 mx-auto my-20'>
            {
                MyReview.map(review => <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            {/* Donation Title - Assumed to be passed as a prop */}
                            {review?.donationTitle && (
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                    {review?.donationTitle}
                                </h3>
                            )}

                            {/* Restaurant Name - Assumed to be passed as a prop */}
                            {review?.restaurantName && (
                                <p className="text-md text-gray-600 mb-2">
                                    <span className="font-medium">Restaurant:</span> {review?.restaurantName}
                                </p>
                            )}

                            {/* Review Time */}
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Reviewed On:</span>{' '}
                                {new Date(review?.createdAt).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </p>
                        </div>
                        <div>
                            {/* Delete Button */}
                            <button
                                onClick={() => handleReviewDelete(review._id)}
                                className="bg-red-500 mt-20 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                aria-label={`Delete review for`}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        {/* Review Description */}
                        <p className="text-gray-700 leading-relaxed text-base">
                            Description: {review?.description}
                        </p>
                    </div>

                    {/* Review Rating - Display if available, optional */}
                    {review?.rating && (
                        <div className="text-yellow-500 flex items-center">
                            <span className="font-medium mr-1">Rating:</span>
                            {/* You might want to render star icons based on the rating */}
                            {'★'.repeat(parseInt(review?.rating))}
                            {'☆'.repeat(5 - parseInt(review?.rating))}
                            <span className="ml-1 text-gray-600">({review?.rating} / 5)</span>
                        </div>
                    )}
                </div>)
            }
        </div>
    );
};

export default MyReview;
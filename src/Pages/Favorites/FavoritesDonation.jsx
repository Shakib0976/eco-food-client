import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { FaBoxOpen, FaEye, FaMapMarkerAlt, FaTrash, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const FavoritesDonation = () => {

    const { user } = use(AuthContext);
    console.log(user.email);
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();

    const { data: allFavorites, isLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const res = await axiosSecure.get(`favorites/email/${user?.email}`)
            return res.data;

        }
    })
    console.log(allFavorites);

    if (isLoading) {
        return <Loader></Loader>
    }


    const handleDeleteFavorite = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: 'This favorite will be permanently removed!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`favorites/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Favorite has been removed.', 'success');
                            // Optional: refresh list or remove item from local state
                            queryClient.invalidateQueries(['favorites']);
                        }
                    })
                    .catch(error => {
                        console.error('Delete failed:', error);
                        Swal.fire('Error!', 'Something went wrong.', 'error');
                    });
            }
        });
    };
    return (
        <div>
            <div className='w-11/12 mx-auto  my-10'>
                <div>
                    <h1 className='text-4xl font-bold mb-5'>All Favorites Here</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {allFavorites.map((donation) => (
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
                                <p className="text-green-600 font-semibold text-sm mb-4">
                                    {donation?.quantity || 0} kg
                                </p>

                                {/* Quantity */}
                                <div className='flex justify-between mt-3'>
                                    <button
                                        onClick={() => handleDeleteFavorite(donation._id)}

                                        className=" btn py-2 border rounded-md text-gray-800 hover:bg-red-500 flex justify-center items-center gap-2">
                                        <FaTrash className="text-sm" /> Delete
                                    </button>


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
        </div>
    );
};

export default FavoritesDonation;
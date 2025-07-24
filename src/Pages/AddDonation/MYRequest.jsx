import React, { use } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../Loader/Loader';
import { FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MYRequest = () => {
    const axiosSecure = useAxios();
    const { user } = use(AuthContext);
    const queryClient = useQueryClient();

    const { data: reqData, isLoading } = useQuery({
        queryKey: ['requestData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pickupReq/email/${user.email}`)
            return res.data
        }
    })


    const handleReqDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/pickupReq/id/${id}`);
                if (res.status === 200) {
                    Swal.fire('Deleted!', 'Request deleted successfully.', 'success');
                    queryClient.invalidateQueries(['requestData']);
                } else {
                    Swal.fire('Error', 'Something went wrong.', 'error');
                }
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed  delete donation.', 'error');
            }
        }

    }

    console.log(reqData);

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='w-11/12 mx-auto my-20'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    reqData.map(reData => <div key={reData._id} className=" h-90
            bg-white rounded-xl shadow-lg p-6 mb-5 flex flex-col gap-4
            transition-transform duration-200 ease-in-out hover:-translate-y-1
        ">
                        <h3 className="text-2xl text-gray-800 font-bold mb-0">
                            {reData.title}
                        </h3>
                        <div className="text-gray-700 space-y-2 h-50">
                            <p><strong className="font-semibold text-gray-900">Restaurant:</strong> {reData.restaurantName}</p>
                            <p><strong className="font-semibold text-gray-900">Food Type:</strong> {reData.foodType}</p>
                            <p><strong className="font-semibold text-gray-900">Quantity:</strong> {reData.quantity}</p>
                            <p><strong className="font-semibold text-gray-900">Status:</strong> {reData.status === 'Requested' ? 'Pending' : reData.status}</p>
                        </div>
                        <div className="
                flex justify-between items-center pt-4 border-t border-gray-200 mt-2
                flex-col md:flex-row md:items-center gap-3 md:gap-0
            ">
                            {/* Status Badge */}
                            <span className={`px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wider w-fit md:w-auto`}>

                            </span>

                            {/* Cancel Button - Only show if status is 'Pending' */}
                            {reData.status === 'Requested' && (
                                <button
                                    onClick={() => handleReqDelete(reData._id)}
                                    className="
                            bg-red-600 text-white px-5 py-2 rounded-lg font-semibold
                            flex items-center justify-center gap-2 cursor-pointer
                            transition-colors duration-300 hover:bg-red-700 hover:shadow-md
                            active:translate-y-0
                            w-full md:w-auto
                        "
                                // onClick={handleCancelRequest}
                                >
                                    <FaTimesCircle className="text-lg" /> Cancel Request
                                </button>
                            )}
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MYRequest;
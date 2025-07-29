import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageRequest = () => {
    const axiosSecure = useAxios();
    const { data = [], isLoading   , refetch} = useQuery({
        queryKey: ['pickupReq'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pickupReq`);
            const data = res.data;

            console.log("Fetched requestData:", data);
            return Array.isArray(data) ? data : [];
        },
         initialData: [],
    })

    console.log('all req is', data);

    if (isLoading) {
        return <Loader></Loader>
    }


    const handleDelete = async (id) => {
        console.log(id);
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This request will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/donation_requests/delete/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success('Request deleted');
                    refetch();
                } else {
                    toast.error('Failed to delete request');
                }
            } catch (err) {
                console.error('Error deleting request:', err);
                toast.error('Something went wrong');
            }
        }
    };
    return (
        <div className="p-4 md:p-6 w-11/12 mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Charity Donation Requests</h2>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Charity Name</th>
                            <th className="p-3">Charity Email</th>
                            <th className="p-3">Description</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((req) => (
                            <tr key={req._id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3 font-medium text-gray-800">{req.title}</td>
                                <td className="p-3">{req.charityName}</td>
                                <td className="p-3">{req.charityEmail}</td>
                                <td className="p-3">{req.description}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleDelete(req._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {Array.isArray(data) && data.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRequest;
import React from 'react';
import simpleAxios from '../../Hooks/simpleAxios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageUser = () => {

    const axiosSecure = simpleAxios();
    const { data: Allusers, isLoading, refetch } = useQuery({
        queryKey: ['Allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get('users');
            return res.data
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }


    const handleMakeRole = async (userId, newRole) => {
        try {
            const res = await axiosSecure.put(`/users/role/${userId}`, { role: newRole });
            if (res.data.success) {
                toast.success(`User role changed to ${newRole}`);
                refetch(); // Refresh user list to reflect changes
            } else {
                toast.error(res.data.message || 'Failed to update role');
            }
        } catch (error) {
            toast.error('Something went wrong!');
            console.error(error);
        }
    };

    //   delete user
    const handleDeleteUser = async (userId) => {
        
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const res = await axiosSecure.delete(`/users/${userId}`);
            if (res.data.success) {
                toast.success('User deleted successfully');
                refetch();
            } else {
                toast.error(res.data.message || 'Failed to delete user');
            }
        } catch (error) {
            toast.error('Something went wrong!');
            console.error(error);
        }
    };
    console.log(Allusers);

    return (
        <div className="w-11/12 mx-auto my-10">
            <h1 className="text-2xl font-bold mb-6">
                Manage Users ({Allusers.length})
            </h1>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
                <table className="min-w-full text-left text-xs sm:text-sm divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">#</th>
                            <th className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">Name</th>
                            <th className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">Email</th>
                            <th className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">Role</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-center whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Allusers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{user.name || 'N/A'}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                                <td className="px-4 py-2 capitalize whitespace-nowrap">{user.role || 'User'}</td>
                                <td className="px-4 py-2 space-y-1 sm:space-x-2 text-center whitespace-nowrap">
                                    <button
                                        onClick={() => handleMakeRole(user._id, 'Admin')}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
                                        disabled={user.role === 'admin'}
                                    >
                                        Make Admin
                                    </button>
                                    <button
                                        onClick={() => handleMakeRole(user._id, 'Restaurant')}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
                                        disabled={user.role === 'restaurant'}
                                    >
                                        Make Restaurant
                                    </button>
                                    <button
                                        onClick={() => handleMakeRole(user._id, 'Charity')}
                                        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
                                        disabled={user.role === 'charity'}
                                    >
                                        Make Charity
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ManageUser;
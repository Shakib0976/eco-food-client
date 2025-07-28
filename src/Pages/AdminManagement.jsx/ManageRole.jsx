import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';

const ManageRole = () => {
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();



    const { data: allCherityReq, isLoading } = useQuery({
        queryKey: ['charity_request'],
        queryFn: async () => {
            const res = await axiosSecure.get('charity_request')
            return res.data
        }

    })

    const [donationList, setDonationList] = useState(allCherityReq);

    const updateStatus = async (id, email, newStatus) => {
        try {
            const result = await axiosSecure.patch(`adminRole/${id}`, {
                status: newStatus,
            });
            console.log(result);

            const updated = donationList.map((donation) =>
                donation._id === id ? result.data : donation
            );
            if (result.data.modifiedCount > 0) {
                setDonationList(newStatus);
                await axiosSecure.put(`/users/emailRole/${email}`, { role: 'charity' });
                queryClient.invalidateQueries(['donations']);
            }
            setDonationList(updated);
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };






    console.log('charitypayment', allCherityReq);
    if (isLoading) {
        return <Loader></Loader>
    }


    const handleVerify = async (id, email) => {
        const result = await Swal.fire({
            title: 'Approve Request?',
            text: "Are you sure you want to approve this charity request?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            await updateStatus(id, email, "Approved");
            Swal.fire({
                icon: 'success',
                title: 'Approved!',
                text: 'The request has been approved.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };


    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: 'Reject Request?',
            text: "Are you sure you want to reject this charity request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            await updateStatus(id, "", "Rejected");
            Swal.fire({
                icon: 'info',
                title: 'Rejected',
                text: 'The request has been rejected.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };





    return (
        <div className="overflow-x-auto p-4">
            <table className="table-auto w-full text-sm border-collapse shadow-lg rounded-xl overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">User Name</th>
                        <th className="px-4 py-2 text-left">User Email</th>
                        <th className="px-4 py-2 text-left">Organization</th>
                        <th className="px-4 py-2 text-left">Mission</th>
                        <th className="px-4 py-2 text-left">Transaction ID</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {allCherityReq.map((req) => (
                        <tr key={req._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{req.UserName}</td>
                            <td className="px-4 py-2">{req.Useremail}</td>
                            <td className="px-4 py-2">{req.OrgName}</td>
                            <td className="px-4 py-2">{req.Mission}</td>
                            <td className="px-4 py-2 font-mono text-xs">{req.transactionId}</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded text-white text-xs font-medium ${req.status === 'Pending'
                                    ? 'bg-yellow-500'
                                    : req.status === 'Approved'
                                        ? 'bg-green-600'
                                        : 'bg-red-500'
                                    }`}>
                                    {req.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 flex justify-center gap-2">
                                {req.status === 'Pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleVerify(req._id, req.email)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(req._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-gray-400 italic text-sm">Action Taken</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRole;
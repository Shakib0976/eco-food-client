import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';

const AdminManageDonation = () => {
    const axiosSecure = useAxios();
    const [disabledButton, setDisabledButton] = useState(null);
    const queryClient = useQueryClient();



    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations`);
            return res.data;
        },
        refetchOnWindowFocus: true

    });
    const [donationList, setDonationList] = useState(donations);

    if (isLoading) {
        return <Loader></Loader>
    }




    const updateStatus = async (id, newStatus) => {
        setDisabledButton(newStatus);
        try {
            const result = await axiosSecure.patch(`donations/${id}`, {
                status: newStatus,
            });

            const updated = donationList.map((donation) =>
                donation._id === id ? result.data : donation
            );
            if (result.data.modifiedCount > 0) {
                setDonationList(newStatus);
                queryClient.invalidateQueries(['donations']);
            }
            setDonationList(updated);
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };


    const handleVerify = (id) => {
        updateStatus(id, "Verified");
    };

    const handleReject = (id) => {
        updateStatus(id, "Rejected");
    };

    return (
        <div className="overflow-x-auto mt-6 m-6">
            <table className="min-w-full border text-sm text-left">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Food Type</th>
                        <th className="px-4 py-2 border">Restaurant Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border text-center" colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((donation , index) => (
                        <tr key={`${donation._id}-${index}`} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{donation.title}</td>
                            <td className="px-4 py-2 border">{donation.foodType}</td>
                            <td className="px-4 py-2 border">{donation.restaurantName}</td>
                            <td className="px-4 py-2 border">{donation.restaurantEmail}</td>
                            <td className="px-4 py-2 border">{donation.quantity}</td>
                            <td className="px-4 py-2 border">
                                <span
                                    className={`px-2 py-1 rounded ${donation.status === "Verified"
                                        ? "bg-green-200 text-green-800"
                                        : donation.status === "Rejected"
                                            ? "bg-red-200 text-red-800"
                                            : "bg-yellow-200 text-yellow-800"
                                        }`}
                                >
                                    {donation.status}
                                </span>
                            </td>
                            <td className="px-2 py-2 border text-center">
                                {donation.status === "Pending" && (
                                    <>
                                        <button
                                            onClick={() => handleVerify(donation._id)}
                                            disabled={disabledButton === "verified"}
                                            className={`px-3 py-1 rounded mr-2 transition-all duration-200 ${disabledButton === "verified"
                                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                : "bg-green-600 text-white hover:bg-green-700"
                                                }`}
                                        >
                                            Verify
                                        </button>
                                        <button
                                            onClick={() => handleReject(donation._id)}
                                            disabled={disabledButton === "rejected"}
                                            className={`px-3 py-1 rounded transition-all duration-200 ${disabledButton === "rejected"
                                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                : "bg-red-600 text-white hover:bg-red-700"
                                                }`}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageDonation;
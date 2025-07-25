import React, { use, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { AuthContext } from '../../Context/AuthContext';

const RequestDonation = () => {
    const [disabledButton, setDisabledButton] = useState(null);
    const queryClient = useQueryClient();
    const { user } = use(AuthContext);

    const axiosSecure = useAxios();
    const { data: requestData = [], isLoading } = useQuery({
        queryKey: ['pickupReqByRestaurant', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pickupReq/restaurant/${user?.email}`);
            const data = res.data;

            console.log("Fetched requestData:", data);
            return Array.isArray(data) ? data : [];
        }
    })


    if (isLoading) {
        return <Loader></Loader>
    }



    const updateStatus = async (id, donationId, newStatus, charityName, charityEmail) => {
        setDisabledButton(newStatus);
        try {
            const result = await axiosSecure.patch(`pickupReq/${id}`, {
                status: newStatus,
            });


            if (result.data.modified > 0 || result.data.modifiedCount > 0) {
                await axiosSecure.patch(`/donations/${donationId}`, {
                    status: 'Assigned',
                    charityName,
                    charityEmail,
                });

                queryClient.invalidateQueries(['pickupReq']);

            }

        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handleVerify = (id, donId, charityName, charityEmail) => {
        updateStatus(id, donId, "Accepted", charityName, charityEmail);
    };

    const handleReject = (id) => {
        updateStatus(id, "Rejected");
    };

    console.log(requestData);
    return (
        <div className='w-11/12 mx-auto mt-10'>
            <div className="overflow-x-auto w-full">
                {
                    requestData ? <div className="min-w-[800px] md:min-w-full">
                        <table className="w-full text-sm text-left border-collapse border border-gray-200">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 border">Title</th>
                                    <th className="px-4 py-2 border">Food Type</th>
                                    <th className="px-4 py-2 border">Charity Name</th>
                                    <th className="px-4 py-2 border">Charity Email</th>
                                    <th className="px-4 py-2 border">Description</th>
                                    <th className="px-4 py-2 border">Pickup Time</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestData.map((req) => (
                                    <tr key={req._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">{req.title}</td>
                                        <td className="px-4 py-2 border">{req.foodType}</td>
                                        <td className="px-4 py-2 border">{req.charityName}</td>
                                        <td className="px-4 py-2 border">{req.charityEmail}</td>
                                        <td className="px-4 py-2 border">{req.description}</td>
                                        <td className="px-4 py-2 border">{req.pickupWindow}</td>
                                        <td className="px-4 py-2 border font-semibold">
                                            <span className={
                                                req.status === 'Pending' ? 'text-yellow-600' :
                                                    req.status === 'Accepted' ? 'text-green-600' :
                                                        'text-red-600'
                                            }>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-4  py-2 border text-center space-x-2">
                                            {req.status === "Requested" && (
                                                <div className='flex'>
                                                    <button
                                                        onClick={() => handleVerify(req._id, req.donationId, req.charityName, req.charityEmail)}
                                                        disabled={disabledButton === "Accepted"}
                                                        className={`px-3 py-1 rounded mr-2 transition-all duration-200 ${disabledButton === "verified"
                                                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                            : "bg-green-600 text-white hover:bg-green-700"
                                                            }`}
                                                    >
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(req._id)}
                                                        disabled={disabledButton === "Rejected"}
                                                        className={`px-3 py-1 rounded transition-all duration-200 ${disabledButton === "rejected"
                                                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                            : "bg-red-600 text-white hover:bg-red-700"
                                                            }`}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : <h1>no request data available</h1>
                }
            </div>
        </div>
    );
};

export default RequestDonation;

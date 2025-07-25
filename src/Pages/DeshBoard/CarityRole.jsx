import React, { useContext, useState } from 'react';
// import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const CarityRole = () => {


    const { user } = useContext(AuthContext);
    const [orgName, setOrgName] = useState("");
    const [mission, setMission] = useState("");
    const navigate = useNavigate();


    // const [isPending, setIsPending] = useState(false); // to prevent duplicate requests

    // useEffect(() => {
    //     // Fetch existing request for this user (e.g., from API or Firebase)
    //     fetch(`/api/role-requests/${user.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.status === "Pending" || data.status === "Approved") {
    //                 setIsPending(true);
    //             }
    //         });
    // }, [user.email]);


    const axiosSecure = useAxios()

    const handlePayment = (e) => {
        e.preventDefault()
        const name = user?.displayName;
        const email = user?.email;
     


        if (requests.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Request Already Exists',
                text: 'You already have a pending or approved request.',
            });
            return;
        }

        navigate(`/dashboard/payment/${user?.email}`)


    
        const charityData = {
            name,
            email,
            orgName,
            mission,
        };

        axiosSecure.post('/charity_request', charityData)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })



    }


    const email = user.email;

    // pending data this email 
    const { data: requests = [] } = useQuery({
        queryKey: ['charity_requests', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/charity_request?email=${email}&status=Pending`);
            return res.data;
        }
    });

    console.log('pendingr', requests.length)



    
    return (
        <div className="lg:w-8/12 md:10/12 mt-10 mx-auto p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>


            <form
                onSubmit={handlePayment}
                className="space-y-4"
            >
                <div>
                    <label className="font-semibold">User Name:</label>
                    <input
                        type="text"
                        name='name'
                        defaultValue={user?.displayName}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Email:</label>
                    <input
                        type="email"
                        name='email'
                        defaultValue={user?.email}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Organization Name:</label>
                    <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Mission Statement:</label>
                    <textarea
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                        required
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                <div className="font-semibold text-lg text-gray-700">
                    Payment: $25
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Pay & Submit Request
                </button>
            </form>
        </div>
    );
};

export default CarityRole;
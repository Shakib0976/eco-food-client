import React, { useContext, useState } from 'react';
// import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
// import useAxios from '../../Hooks/useAxios';
import { useNavigate } from 'react-router';

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


    // const axiosSecure = useAxios()

    const handlePayment = (e) => {
        e.preventDefault()
        const name = user?.displayName;
        const email = user?.email;
        console.log(name, email, orgName, mission);

        navigate(`/dashboard/payment/${user?.email}`)



        // const charityData = {
        //     name,
        //     email,
        //     orgName,
        //     mission,
        // };

        // axiosSecure.post('/charity_request', charityData)
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })



    }



    // const handlePayment = async () => {
    //     if (!orgName || !mission) {
    //         toast.error("Please fill in all required fields.");
    //         return;
    //     }

    //     const stripe = await stripePromise;

    //     // Call your backend to create a Stripe Checkout session
    //     const response = await fetch("/api/create-checkout-session", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             amount: 2500, // $25 in cents
    //             email: user.email,
    //             purpose: "Charity Role Request",
    //             orgName,
    //             mission,
    //         }),
    //     });

    //     const session = await response.json();

    //     if (session?.id) {
    //         await stripe.redirectToCheckout({ sessionId: session.id });
    //     } else {
    //         toast.error("Stripe session creation failed.");
    //     }
    // };
    return (
        <div className="lg:w-8/12 md:10/12 mt-10 mx-auto p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>

            {/* {isPending ? (
                <p className="text-red-600 font-medium">
                    You already have a pending or approved request.
                </p>
            ) : (
               
            )} */}

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
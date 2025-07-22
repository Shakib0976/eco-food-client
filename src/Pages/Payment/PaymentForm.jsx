import React, { useState, useContext } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../Pages/Loader/Loader';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { ReqEmail } = useParams();
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);

    const { isPending, data: paymentInfo = {} } = useQuery({
        queryKey: ['charity_request', ReqEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/charity_request/${ReqEmail}`);
            return res.data;
        }
    });

    const amount = paymentInfo.cost || 0;
    const reqId = paymentInfo._id;
    const amountInCents = amount * 100;

    if (isPending) return <Loader />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: cardError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (cardError) {
            setError(cardError.message);
            return;
        }

        // Step 2: create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amount: amountInCents,
            reqId
        });

        const clientSecret = res.data.clientSecret;

        // Step 3: confirm card payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            console.log('success');
            const transactionId = result.paymentIntent.id;

            if (result.paymentIntent.status === 'succeeded') {
                // Step 4: Save payment info
                const paymentData = {
                    reqId,
                    amount,
                    email: user.email,
                    transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types
                };

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                        confirmButtonText: 'Go to My Parcels',
                    });
                }
            }
        }
    };

    return (
        <div className="items-center  m-4 md:m-0 justify-center h-screen pt-20 md:bg-[url('https://i.ibb.co/pvnrX5Jy/duplo25.jpg')] bg-cover bg-center">
            <div>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                    <CardElement className="p-2 border rounded" />
                    <button
                        type="submit"
                        className="btn btn-primary text-black w-full"
                        disabled={!stripe}
                    >
                        Pay ${amount}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;

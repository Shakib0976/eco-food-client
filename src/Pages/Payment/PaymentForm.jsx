import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const { ReqEmail} = useParams();
    console.log(ReqEmail);
    const axios = useAxios();




    const { isPending, data: paymentInfo = {} } = useQuery({
        queryKey: ['charity_request', ReqEmail],
        queryFn: async () => {
            const res = await axios.get(`/charity_request/${ReqEmail}`);
            return res.data;
        }
    })

    console.log(paymentInfo);

    if (isPending) {
        return '...loading'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }


        // step- 1: validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        if (error) {
            setError(error.message);
        }
        else {
            setError('')
            console.log('payment method ', paymentMethod);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded">
                </CardElement>
                <button
                    type='submit'
                    className="btn btn-primary text-black w-full"
                    disabled={!stripe}
                >
                    {/* Pay ${amount} */}pay
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;
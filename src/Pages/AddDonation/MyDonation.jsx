import React, { use } from 'react';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';

const MyDonation = () => {


    const { user } = use(AuthContext);
    const axiosSecure = useAxios();

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['donations', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // only fetch when email exists
    });

    console.log(donations)

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h1>this is my donations</h1>
        </div>
    );
};

export default MyDonation;
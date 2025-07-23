import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import simpleAxios from '../../Hooks/simpleAxios';
import Loader from '../Loader/Loader';
import DetailsPage from '../AddDonation/DetailsPage'

const DonationDetail = () => {
    const { id } = useParams()

    const axiosSecure = simpleAxios();

    const { data: donation = [], isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${id}`);
            return res.data
        }
    })
    console.log(donation);

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            {
                donation.map(donateData => <DetailsPage  key={donateData._id} donateData={donateData}></DetailsPage>)
            }
        </div>
    );
};

export default DonationDetail;
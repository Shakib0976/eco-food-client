import React from 'react';
import Banner from './Banner/Banner';
import Donation from './FeaturedDonation/Donation';
import AllCherityReq from '../../AllCherityHome/AllCherityReq';
import Extra1 from '../../ExtraSection/Extra1';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Donation></Donation>
            <AllCherityReq></AllCherityReq>
            <Extra1></Extra1>
        </div>
    );
};

export default Home;
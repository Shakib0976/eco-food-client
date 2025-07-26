import React from 'react';
import Banner from './Banner/Banner';
import Donation from './FeaturedDonation/Donation';
import AllCherityReq from '../../AllCherityHome/AllCherityReq';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Donation></Donation>
            <AllCherityReq></AllCherityReq>
        </div>
    );
};

export default Home;
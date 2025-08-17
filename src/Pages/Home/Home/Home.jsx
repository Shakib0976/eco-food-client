import React from 'react';
import Banner from './Banner/Banner';
import Donation from './FeaturedDonation/Donation';
import AllCherityReq from '../../AllCherityHome/AllCherityReq';
import Extra1 from '../../ExtraSection/Extra1';
import Extra2 from '../../ExtraSection/Extra2';
import MetOurteam from '../../ExtraSection/MetOurteam';

const Home = () => {
    return (
        <div className='overflow-x-hidden'>
            <Banner></Banner>
            <Donation></Donation>
            <AllCherityReq></AllCherityReq>
            <Extra1></Extra1>
            <Extra2></Extra2>
            <MetOurteam></MetOurteam>
        </div>
    );
};

export default Home;
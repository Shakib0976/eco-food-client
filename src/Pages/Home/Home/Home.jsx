import React from 'react';
import Banner from './Banner/Banner';
import Donation from './FeaturedDonation/Donation';
import AllCherityReq from '../../AllCherityHome/AllCherityReq';
import Extra1 from '../../ExtraSection/Extra1';
import Extra2 from '../../ExtraSection/Extra2';
import MetOurteam from '../../ExtraSection/MetOurteam';
import ExtraSection from '../../ExtraSection/ExtraSection';
import Newsletter from '../../ExtraSection/Newsletter';

const Home = () => {
    return (
        <div className='overflow-x-hidden'>
            <Banner></Banner>
            <Donation></Donation>
            <AllCherityReq></AllCherityReq>
            <Extra1></Extra1>
            <MetOurteam></MetOurteam>
            <Extra2></Extra2>
            <ExtraSection></ExtraSection>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;
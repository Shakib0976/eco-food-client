import React from 'react';
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';

const Footer = () => {
    return (
        <div className="bg-[#0F1E19] text-white py-12 px-4 md:px-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
                {/* Nourish Share Info */}
                <div>
                    <div className="flex items-center -mt-8">
                        <div className='w-40'>
                            <Logo />
                        </div>
                        <h3 className="text-3xl font-bold text-white molle-regular-italic"><span className='text-green-800'>Eco</span> Food</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4">
                        Connecting restaurants with surplus food to charities and community members. Together, we reduce waste while ensuring no one goes hungry in our community.
                    </p>
                    <div className="flex space-x-4 text-gray-400">
                        <a href="#" className="hover:text-white"><FaFacebookF className="text-xl" /></a>
                        <a href="#" className="hover:text-white"><FaTwitter className="text-xl" /></a>
                        <a href="#" className="hover:text-white"><FaInstagram className="text-xl" /></a>
                        <a href="#" className="hover:text-white"><FaLinkedinIn className="text-xl" /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white text-sm">All Donations</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white text-sm">How It Works</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white text-sm">Our Impact</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white text-sm">Partners</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Contact</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                            <MdLocationOn className="text-light-green mr-2 text-lg" />
                            <span>123 Community St, Food City, FC 12345</span>
                        </li>
                        <li className="flex items-center text-sm">
                            <MdPhone className="text-light-green mr-2 text-lg" />
                            <span>(555) 123-FOOD</span>
                        </li>
                        <li className="flex items-center text-sm">
                            <MdEmail className="text-light-green mr-2 text-lg" />
                            <span>hello@nourishshare.org</span>
                        </li>
                    </ul>
                </div>
            </div>

        
            <div className='border border-gray-500 my-5'></div>
            <div className='text-center md:flex justify-between text-gray-300'>
                <h1 className='mb-2'>© 2025 TaskForce</h1>
                <p> All rights reserved.   <span className='ml-4'> Terms of ServicePrivacy Policy</span></p>
            </div>
        </div>
    );
};

export default Footer;
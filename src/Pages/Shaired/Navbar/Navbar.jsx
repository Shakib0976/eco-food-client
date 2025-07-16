import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import { motion } from "motion/react"

const Navbar = () => {


    // const { logOutUser, user } = useContext(AuthContext);

    // console.log(user);

    // const signOutUser = () => {
    //     logOutUser()
    //         .then(result => {
    //             console.log('user sign out success ', result);
    //         })
    // }

    const navItems = <>

        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/sendParcel'}>Send a parcel</NavLink></li>
        <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>
        {/* {
            user && <>
                <li><NavLink to={'/dashBoard'}>DeshBoard</NavLink></li>

            </>
        } */}

    </>


    return (
        <div className=" sticky top-0 z-50 bg-transparent backdrop-blur-sm navbar  shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <div className="btn  btn-ghost  text-xl">
                    <div className='w-25'>
                        <Logo></Logo>
                    </div>
                    <h3 className="text-2xl font-bold  molle-regular-italic"><span className='text-green-700'>Eco</span> Food</h3>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu font-bold text-lg text-gray-700 menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {/* {
                    user ? <a onClick={signOutUser} className="btn">SignOut</a> : <Link to={'/login'} className='btn bg-lime-400'>Login</Link>
                } */}
            </div>
        </div>
    );
};


export default Navbar;
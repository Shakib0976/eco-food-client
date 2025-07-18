import React, { use, useState } from 'react';
import { NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import { AuthContext } from '../../../Context/AuthContext';
import { IoIosLogOut } from 'react-icons/io';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.config';
import { GrUserManager } from 'react-icons/gr';
import { RxAvatar } from 'react-icons/rx';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, setUser } = use(AuthContext);
    console.log(user);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };





    const logoutUser = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                    .then(() => {
                        console.log("User signed out");
                        localStorage.removeItem('devtalksToken');
                        setUser(null); // Clear user from context
                    })
                    .catch((error) => {
                        console.log("Logout error:", error.message);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });




    }
    const closeMenu = () => {
        setMenuOpen(false);
    };

    const navItems = (
        <>
            <li><NavLink onClick={closeMenu} to="/">Home</NavLink></li>
            <li><NavLink onClick={closeMenu} to="/donations">All Donations</NavLink></li>
            <li><NavLink onClick={closeMenu} to="/dashboard">Dashboard</NavLink></li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm px-4 md:px-10">
            <div className="navbar justify-between">
                {/* Left: Logo */}
                <div className="navbar-start flex items-center">
                    <div className="btn btn-ghost p-0">
                        <div className="w-15 mr-2">
                            <Logo />
                        </div>
                        <h3 className="text-2xl font-bold molle-regular-italic">
                            <span className="text-green-700">Eco</span> Food
                        </h3>
                    </div>
                </div>

                {/* Center: Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-4 font-semibold text-lg text-gray-700">
                        {navItems}
                    </ul>
                </div>

                {/* Right: Auth Buttons */}
                <div className="navbar-end  space-x-3">
                    <div className=' space-x-3 hidden md:flex'>
                        {
                            user ? <div className="flex items-center justify-between ">
                                {/* User image */}
                                <div className="w-8 h-8 rounded-full object-cover mr-2">
                                    {user?.photoURL ? (
                                        <img className='rounded-full ' src={user?.photoURL} alt="User" />
                                    ) : (
                                        <RxAvatar className="w-full h-full text-2xl" />
                                    )}
                                </div>

                                {/* User name */}
                                <span className="text-gray-800  mr-2">
                                    {user?.displayName || "No Name"}
                                </span>

                                {/* Logout icon button */}
                                <button
                                    onClick={logoutUser}
                                    className="text-gray-600 hover:text-red-500"
                                    title="Logout"
                                >
                                    <IoIosLogOut size={25} />
                                </button>
                            </div> : <div className='navbar-end space-x-3 hidden md:flex'>
                                <NavLink
                                    className="btn bg-gray-200 hover:bg-blue-600 hover:text-white font-bold rounded-2xl px-5"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    className="btn bg-green-500 hover:bg-green-600 text-white rounded-2xl px-5"
                                    to="/join"
                                >
                                    Join Us
                                </NavLink>
                            </div>
                        }
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={handleMenuToggle}
                            className="btn btn-ghost p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden mt-2">
                    <ul className="menu bg-base-400  hover:bg-blue-100  rounded-box shadow p-4 space-y-2">
                        {navItems}
                    </ul>
                    <div className='flex flex-c space-y-3'>
                        {
                            user ? <div className="flex items-center justify-between ">
                                {/* User image */}
                                <div className="w-8 h-8 rounded-full object-cover mr-2">
                                    {user?.photoURL ? (
                                        <img src={user?.photoURL} alt="User" />
                                    ) : (
                                        <RxAvatar className="w-full h-full text-2xl" />
                                    )}
                                </div>

                                {/* User name */}
                                <span className="text-gray-800  mr-2">
                                    {user?.displayName || "No Name"}
                                </span>

                                {/* Logout icon button */}
                                <button
                                    onClick={logoutUser}
                                    className="text-gray-600 hover:text-red-500"
                                    title="Logout"
                                >
                                    <IoIosLogOut size={25} />
                                </button>
                            </div> : <div className='navbar-end space-x-3 hidden md:flex'>
                                <NavLink
                                    className="btn bg-gray-200 hover:bg-blue-600 hover:text-white font-bold rounded-2xl px-5"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    className="btn bg-green-500 hover:bg-green-600 text-white rounded-2xl px-5"
                                    to="/join"
                                >
                                    Join Us
                                </NavLink>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;

import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaSearchLocation, FaUserCheck, FaUserClock, FaUserShield, FaMotorcycle, FaTasks, FaCheckCircle, FaWallet, FaUser, FaPlusCircle, FaGift, FaClipboardList, FaTruck, FaHandHoldingHeart, FaUsers, FaStar } from 'react-icons/fa';
import Logo from '../../Pages/Shaired/Logo/Logo';


const DashboardLayouts = () => {




    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <NavLink to={'/'}><Logo></Logo></NavLink>
                    <h1 className='text-red-500'>User</h1>
                    <li>
                        <NavLink to="/dashboard">
                            <FaUserEdit className="inline-block mr-2" />
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/request-charity">
                            <FaUserCheck className="inline-block mr-2" />
                            Request Charity Role
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/favorites">
                            <FaCheckCircle className="inline-block mr-2" />
                            Favorites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reviews">
                            <FaTasks className="inline-block mr-2" />
                            My Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/transactions">
                            <FaMoneyCheckAlt className="inline-block mr-2" />
                            Transaction History
                        </NavLink>
                    </li>


                    {/* rasturent link*/}
                    <h1 className='text-red-600'>Restaurant</h1>
                    <li>
                        <NavLink to="/dashboard/restaurant-profile">
                            <FaUser className="inline-block mr-2" />
                            Restaurant Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-donation">
                            <FaPlusCircle className="inline-block mr-2" />
                            Add Donation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-donations">
                            <FaGift className="inline-block mr-2" />
                            My Donations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/requested-donations">
                            <FaClipboardList className="inline-block mr-2" />
                            Requested Donations
                        </NavLink>
                    </li>

                    {/* {charity link} */}
                    <h1 className='text-red-500'>Charity link</h1>
                    <li>
                        <NavLink to="/dashboard/charity-profile">
                            <FaUserEdit className="inline-block mr-2" />
                            Charity Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-requests">
                            <FaTasks className="inline-block mr-2" />
                            My Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-pickups">
                            <FaTruck className="inline-block mr-2" />
                            My Pickups
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/received-donations">
                            <FaGift className="inline-block mr-2" />
                            Received Donations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/transactions">
                            <FaMoneyCheckAlt className="inline-block mr-2" />
                            Transaction History
                        </NavLink>
                    </li>


                    {/* admin link */}
                    <h1 className='text-red-400'>Admin </h1>
                    <li>
                        <NavLink to="/dashboard/admin-profile">
                            <FaUserShield className="inline-block mr-2" />
                            Admin Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-donations">
                            <FaHandHoldingHeart className="inline-block mr-2" />
                            Manage Donations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-users">
                            <FaUsers className="inline-block mr-2" />
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-role-requests">
                            <FaUserCheck className="inline-block mr-2" />
                            Manage Role Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-requests">
                            <FaClipboardList className="inline-block mr-2" />
                            Manage Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/feature-donations">
                            <FaStar className="inline-block mr-2" />
                            Feature Donations
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayouts;
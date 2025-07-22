import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaSearchLocation, FaUserCheck, FaUserClock, FaUserShield, FaMotorcycle, FaTasks, FaCheckCircle, FaWallet, FaUser, FaPlusCircle, FaGift, FaClipboardList } from 'react-icons/fa';
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



                    {/* admin link */}
                    {/* {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assign-rider">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/active-riders">
                                    <FaUserCheck className="inline-block mr-2" />
                                    Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pending-riders">
                                    <FaUserClock className="inline-block mr-2" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin">
                                    <FaUserShield className="inline-block mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    } */}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayouts;
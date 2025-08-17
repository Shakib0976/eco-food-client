import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import { FiHome } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import simpleAxios from '../../Hooks/simpleAxios';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

const UserProfile = () => {



    const dataPie = [
        { name: "Users", value: 400 },
        { name: "Donations", value: 300 },
        { name: "Requests", value: 300 },
        { name: "Restaurants", value: 200 },
    ]

    const dataBar = [
        { name: "Jan", donations: 40 },
        { name: "Feb", donations: 55 },
        { name: "Mar", donations: 70 },
        { name: "Apr", donations: 60 },
        { name: "May", donations: 90 },
    ]

    const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]


    const { user } = useContext(AuthContext)

    const axiosSecure = simpleAxios()



    const { data: profileUser, isLoading } = useQuery({
        queryKey: ['profileUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`user/${user?.email}`)
            return res.data
        }
    })


    if (isLoading) {
        return <Loader></Loader>
    }

    console.log(profileUser);


    return (
        <div className="p-8 min-h-screen dark:bg-black bg-[#FAFAF8] text-[#1A1A1A]">
            <div className='flex items-center space-x-2'>


                <h1 className="text-4xl dark:text-gray-200 font-bold">Dashboard</h1>
            </div>


            <p className="mt-2 dark:text-gray-200 text-lg">Welcome back, {profileUser?.role || "User"}!</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile */}
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 col-span-1 flex flex-col items-center justify-center">
                    {
                        user?.photoURL ? <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-20 h-20 rounded-full mb-2"
                        /> : <div className="text-3xl mb-4">👤</div>
                    }
                    <p className="text-lg font-semibold">{profileUser?.name || "John Doe"}</p>
                    <p className="text-sm dark:text-gray-200 text-gray-500">{user?.email || "user@demo.com"}</p>
                    <span className="mt-2 text-xs dark:bg-gray-400 bg-gray-200 px-3 py-1 rounded-full">{profileUser?.role}</span>
                </div>

                {/* Quick Actions */}
                <div className="col-span-2 dark:bg-gray-900 bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to={'/'} className="w-full dark:bg-gray-800 dark:text-gray-200 p-6 flex flex-col justify-center items-center bg-[#FBFAF9] rounded-xl border hover:shadow transition">
                            <FiHome
                                size={25}
                            />
                            <p className="font-medium">Go Home</p>

                        </Link>
                        <button className="w-full p-6  dark:bg-gray-800 dark:text-gray-200 bg-[#FBFAF9] rounded-xl border hover:shadow transition">
                            <div className="text-2xl mb-2">📋</div>
                            <p className="font-medium">Charity Role Request Pending : 0 </p>
                        </button>
                    </div>
                </div>
            </div>

            <div className=" py-6 space-y-6">

                {/* Stats boxes */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center">
                        <h2 className="text-2xl dark:text-white font-semibold">1,250</h2>
                        <p className="text-gray-500 dark:text-gray-400">Total Users</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center">
                        <h2 className="text-2xl dark:text-white font-semibold">530</h2>
                        <p className="dark:text-gray-400 text-gray-500">Donations</p>
                    </div>
                    <div className="bg-white p-6 dark:bg-gray-900 rounded-2xl shadow-md text-center">
                        <h2 className="text-2xl dark:text-white font-semibold">210</h2>
                        <p className="text-gray-500 dark:text-gray-400">Requests</p>
                    </div>
                    <div className="bg-white p-6 dark:bg-gray-900 rounded-2xl shadow-md text-center">
                        <h2 className="text-2xl dark:text-white font-semibold">45</h2>
                        <p className="text-gray-500 dark:text-gray-400">Restaurants</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Distribution</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={dataPie}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label
                                >
                                    {dataPie.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Monthly Donations</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={dataBar}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="donations" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
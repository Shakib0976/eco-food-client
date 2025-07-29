import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link} from 'react-router';
import { FiHome } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import simpleAxios from '../../Hooks/simpleAxios';

const UserProfile = () => {

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
        <div className="p-8 min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
            <div className='flex items-center space-x-2'>


                <h1 className="text-4xl font-bold">Dashboard</h1>
            </div>


            <p className="mt-2 text-lg">Welcome back, {profileUser?.role || "User"}!</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile */}
                <div className="bg-white shadow-md rounded-2xl p-6 col-span-1 flex flex-col items-center justify-center">
                    {
                        user?.photoURL ? <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-20 h-20 rounded-full mb-2"
                        /> : <div className="text-3xl mb-4">👤</div>
                    }
                    <p className="text-lg font-semibold">{profileUser?.name || "John Doe"}</p>
                    <p className="text-sm text-gray-500">{user?.email || "user@demo.com"}</p>
                    <span className="mt-2 text-xs bg-gray-200 px-3 py-1 rounded-full">{profileUser?.role}</span>
                </div>

                {/* Quick Actions */}
                <div className="col-span-2 bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to={'/'} className="w-full p-6 flex flex-col justify-center items-center bg-[#FBFAF9] rounded-xl border hover:shadow transition">
                            <FiHome
                              size={25}
                            />
                            <p className="font-medium">Go Home</p>

                        </Link>
                        <button className="w-full p-6 bg-[#FBFAF9] rounded-xl border hover:shadow transition">
                            <div className="text-2xl mb-2">📋</div>
                            <p className="font-medium">Charity Role Request Pending : 0 </p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <p className="text-3xl font-bold">totla action</p>
                    <p className="text-gray-500 mt-2">Total Actions</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <p className="text-3xl font-bold text-green-600">
                        {user?.metadata?.creationTime
                            ? new Date(user.metadata.creationTime).toLocaleDateString()
                            : "N/A"}
                    </p>
                    <p className="text-gray-500 mt-2">Join Date</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6">
                    <p className="text-3xl font-bold text-green-600">success rate%</p>
                    <p className="text-gray-500 mt-2">Success Rate</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
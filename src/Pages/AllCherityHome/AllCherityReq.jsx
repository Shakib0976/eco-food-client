import React from 'react';
import simpleAxios from '../../Hooks/simpleAxios';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

const AllCherityReq = () => {

    const axiosSecure = simpleAxios();

    const { data: allChrityReq, isLoading } = useQuery({
        queryKey: ['AllCharityRequestHome'],
        queryFn: async () => {
            const res = await axiosSecure.get('AllCharityRequestHome')
            return res.data
        }
    })


    const latestRequests = Array.isArray(allChrityReq)
        ? [...allChrityReq]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
        : [];




    if (isLoading) {
        return <Loader></Loader>
    }
    console.log(allChrityReq);
    return (
        <div className="my-12 w-11/12 mx-auto">
            <h2 className="text-3xl font-bold text-center text-primary mb-10">
                Latest Charity Requests
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestRequests.map((req) => (
                    <div
                        key={req._id}
                        className="bg-gradient-to-br from-[#f9fafb] to-[#f1f5f9] border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6"
                    >
                        <div className="flex flex-col items-center text-center">
                            <img
                                src="https://i.ibb.co/vXjM0PG/charity-placeholder.jpg"
                                alt="Charity Logo"
                                className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-white mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">{req.name}</h3>
                            <p className="text-sm text-gray-500 italic mb-3">{req.orgName}</p>
                            <p className="text-sm text-gray-700 px-2 mb-4">{req.mission}</p>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                            Requested on:{" "}
                            <span className="font-medium text-gray-500">
                                {new Date(req.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllCherityReq;
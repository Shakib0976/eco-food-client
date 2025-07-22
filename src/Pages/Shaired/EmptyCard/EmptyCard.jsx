import React from 'react';
import { FiInfo } from 'react-icons/fi'; // Using Feather Icons for a simple info icon
import { NavLink } from 'react-router';

// Ensure you have react-icons installed: npm install react-icons

const EmptyCard = () => {
    return (
        <div className="flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden
                            transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl
                            flex flex-col items-center justify-center text-center p-6 sm:p-8">

                {/* Icon for visual indication */}
                <div className="mb-4 text-gray-400">
                    <FiInfo className="w-16 h-16 mx-auto" /> {/* Large info icon */}
                </div>

                {/* Title/Header */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                    No Data Available
                </h3>

                {/* Descriptive text */}
                <p className="text-sm sm:text-base text-gray-500 mb-6">
                    It looks like there's nothing to display here yet.
                    Please check back later or add new content.
                </p>

                {/* Optional: Call to action button */}
                <NavLink to={'/dashboard/add-donation'}
                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600
                                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                transition-colors duration-200 ease-in-out"
                    
                >
                    Add New Item
                </NavLink>
            </div>
        </div>
    );
};

export default EmptyCard;
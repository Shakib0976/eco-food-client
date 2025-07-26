import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
            <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                {/* Replace with a real illustration path or an icon library */}
                <img src="https://i.ibb.co/wNDm6Z4B/396851-PCPXUF-274.jpg" alt="Forbidden Illustration" className="w-48 h-48 mx-auto mb-6 opacity-75" />
                <h1 className="text-5xl font-extrabold text-red-600 dark:text-red-500 mb-4">Access Denied</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    It seems you don't have the necessary permissions to view this page.
                    If you believe this is an error, please reach out to the site administrator.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/" className="btn btn-primary btn-lg">
                        Go to Homepage
                    </Link>
                    <Link className="btn btn-ghost btn-lg dark:text-gray-400">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
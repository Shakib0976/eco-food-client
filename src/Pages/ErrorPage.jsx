import React from 'react';
import { Link } from 'react-router'; // Assuming you're using react-router-dom for <Link>
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa'; // Icons for visual flair

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-center px-4 font-mono relative overflow-hidden">
            {/* Background Scanline/Noise Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-static-noise"></div>
            <div className="absolute inset-0 z-0 animate-scanline"></div>

            {/* Central Content */}
            <div className="relative z-10 p-10 rounded-xl border-4 border-emerald-500 shadow-md bg-gray-900 bg-opacity-90 backdrop-blur-sm transform skew-x-1 -rotate-1"> {/* Slight skew for retro feel */}
                <FaWifi className="text-8xl text-emerald-400 mb-6 mx-auto animate-pulse-slow" /> {/* Wifi icon for "no signal" */}
                <h1 className="text-6xl md:text-7xl font-extrabold text-emerald-300 mb-4 tracking-tight uppercase animate-glitch-text">
                    SIGNAL LOST
                </h1>
                <p className="text-xl text-gray-200 mt-2 leading-relaxed animate-fade-in-up delay-1">
                    <FaExclamationTriangle className="inline-block text-emerald-400 mr-2" />
                    Connection severed.
                    <br />
                    The data stream is disrupted. Target page unreachable.
                </p>
                <p className="text-sm text-gray-500 mt-4 animate-fade-in-up delay-2">
                    Error Code: 404_BROADCAST_FAILURE
                </p>

                <div className="mt-10 animate-fade-in-up delay-3">
                    <Link to="/">
                        <button className="btn bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-emerald-md">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;
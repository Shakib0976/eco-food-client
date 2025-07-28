import React from 'react';
import { useState, useEffect } from "react";

// bg-gradient-to-br from-green-200 to-green-300 

const Extra1 = () => {


    const RADIUS = 40;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            if (current >= 100) {
                clearInterval(interval);
            } else {
                current += 1;
                setProgress(current);
            }
        }, 100); // Speed of animation
    }, []);


    const [progressing, setProgressing] = useState(0);
    const totalKg = 3250;

    useEffect(() => {
        let value = 0;
        const interval = setInterval(() => {
            value += 1;
            if (value >= 100) {
                value = 100;
                clearInterval(interval);
            }
            setProgressing(value);
        }, 50); // speed of fill-up
    }, []);


    const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
    return (
        <div>
            <div className="min-h-screen bg-[#8c7fef10] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="overflow-hidden lg:flex lg:items-center lg:justify-between p-8 md:p-12 lg:p-16">
                    {/* Left Side */}
                    <div
                        className="lg:w-1/2 flex justify-center items-center relative mb-8 lg:mb-0"
                        data-aos="fade-up-right"
                    >
                        <div className="absolute inset-0 rounded-full blur-3xl opacity-50 transform scale-150 -translate-x-1/4 -translate-y-1/4 lg:translate-x-0 lg:translate-y-0"></div>
                        <img
                            src="https://i.ibb.co/nsJ06jFB/close-up-smiley-girl-getting-apples.jpg"
                            alt="Volunteer"
                            className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-xl shadow-lg object-cover"
                        />
                    </div>

                    {/* Right Side */}
                    <div
                        className="lg:w-1/2 lg:pl-16 text-center lg:text-left"
                        data-aos="fade-up-left"
                    >
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                            OUR IMPACT
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                            We Are Here to Support <br className="hidden sm:inline" /> Vulnerable
                            Communities
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                            EcoFood is a platform that connects restaurants, grocery stores, and individuals with local charities and communities to donate surplus food. Our mission is to reduce food waste and ensure that no one goes hungry. Together, we can build a more sustainable and compassionate future.
                        </p>

                        <ul className="space-y-3 mb-8 text-left max-w-md mx-auto lg:mx-0">
                            {[
                                "Easy Donation Process: List surplus food in just a few clicks.",
                                "Easy Donation Process: List surplus food in just a few clicks.",
                                "Safe & Hygienic: Follow food safety standards for pickups..",
                                "Pickup Support: Charities come to you to collect food.",
                                " Donation History: Track your impact through your dashboard.",
                            ].map((item, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                    <svg
                                        className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-base">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-6 sm:space-y-0 sm:space-x-12 mb-8">
                            {/* Donation Progress Circle */}
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-200"
                                        strokeWidth="8"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r={RADIUS}
                                        cx="50"
                                        cy="50"
                                    />
                                    <circle
                                        className="text-green-500"
                                        strokeWidth="8"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r={RADIUS}
                                        cx="50"
                                        cy="50"
                                        strokeDasharray={CIRCUMFERENCE}
                                        strokeDashoffset={offset}
                                        style={{
                                            transition: "stroke-dashoffset 0.3s ease",
                                        }}
                                    />
                                </svg>
                                <div className="absolute text-2xl font-bold text-green-600">
                                    {progress}%
                                </div>
                            </div>
                            <div className="w-full max-w-xl mx-auto mt-6">
                                {/* Label */}
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-lg font-medium text-gray-700">
                                        Total Food Donated
                                    </p>
                                    <span className="text-green-600 font-semibold">
                                        {(totalKg * progressing / 100).toLocaleString()} kg
                                    </span>
                                </div>

                                {/* Line Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
                                    <div
                                        className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progressing}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Extra1;
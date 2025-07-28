import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
            {/* Container for the bouncing dots */}
            <div className="flex space-x-2 mb-8">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-bounce-dot-1"></div>
                <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce-dot-2"></div>
                <div className="w-6 h-6 bg-red-400 rounded-full animate-bounce-dot-3"></div>
            </div>

            <h2 className="text-3xl font-bold text-green-800 mb-3 text-center">
                Gathering data...
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-md">
                Please wait a moment while we prepare a feast of generosity!
            </p>

            {/* Tailwind CSS for Custom Keyframe Animations */}
            <style>{`
        @keyframes bounce-dot-1 {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
        }
        @keyframes bounce-dot-2 {
          0%, 100% {
            transform: translateY(0);
          }
          20% {
            transform: translateY(-20px);
          }
        }
        @keyframes bounce-dot-3 {
          0%, 40%, 100% {
            transform: translateY(0);
          }
          80% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce-dot-1 {
          animation: bounce-dot-1 1.4s infinite ease-in-out;
        }
        .animate-bounce-dot-2 {
          animation: bounce-dot-2 1.4s infinite ease-in-out;
          animation-delay: 0.2s; /* Stagger the animation */
        }
        .animate-bounce-dot-3 {
          animation: bounce-dot-3 1.4s infinite ease-in-out;
          animation-delay: 0.4s; /* Stagger the animation */
        }
      `}</style>
        </div>
    );
};

export default Loader;
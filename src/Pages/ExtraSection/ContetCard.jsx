import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ContetCard = ({ icon, target, suffix, label, sublabel, color }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.5, 
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const end = parseFloat(target);
            const duration = 3000; 
            const frameRate = 30; 
            const step = end / (duration / frameRate);

            const interval = setInterval(() => {
                start += step;
                if (start >= end) {
                    setCount(end);
                    clearInterval(interval);
                } else {
                    setCount(start);
                }
            }, frameRate);
        }
    }, [inView, hasAnimated, target]);

    return (
        <div
            ref={ref}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md flex items-start space-x-4 w-full"
        >
            <div className={`p-3 rounded-xl bg-${color}-100 text-${color}-600 text-xl`}>
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold dark:text-gray-200 text-gray-900">
                    {Number.isInteger(target)
                        ? Math.floor(count).toLocaleString()
                        : count.toFixed(1)}{" "}
                    {suffix}
                </div>
                <div className="font-medium dark:text-gray-400 text-gray-700">{label}</div>
                <div className="text-sm dark:text-gray-600 text-gray-500">{sublabel}</div>
            </div>
        </div>
    );
};

export default ContetCard;

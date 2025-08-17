import { Gift, Heart, Star, Truck, Users } from 'lucide-react';
import { motion } from "framer-motion";
import React from 'react';
import CountUp from 'react-countup';

const ExtraSection = () => {
    const stats = [
        { label: "Meals Donated", num: 12000, icon: <Gift className="w-10 h-10 text-green-500 mb-3" /> },
        { label: "Volunteers", num: 350, icon: <Users className="w-10 h-10 text-green-500 mb-3" /> },
        { label: "Charities Helped", num: 85, icon: <Heart className="w-10 h-10 text-green-500 mb-3" /> },
        { label: "Deliveries Made", num: 5000, icon: <Truck className="w-10 h-10 text-green-500 mb-3" /> },
    ];
    const reviews = [
        {
            name: "Sarah Ahmed",
            role: "Charity Worker",
            text: "This platform has helped us feed hundreds of people every week. The process is simple and efficient.",
            img: "https://i.pravatar.cc/100?img=5",
            rating: 5
        },
        {
            name: "Shakib Khan",
            role: "Volunteer",
            text: "Volunteering here is so rewarding. I feel proud knowing my time helps reduce hunger.",
            img: "https://i.pravatar.cc/100?img=14",
            rating: 5
        },
        {
            name: "David Miller",
            role: "Restaurant Owner",
            text: "We used to waste so much food. Now, we can donate easily and make a real difference in the community.",
            img: "https://i.pravatar.cc/100?img=8",
            rating: 4
        },
        {
            name: "Lina Roy",
            role: "Volunteer",
            text: "Volunteering here is so rewarding. I feel proud knowing my time helps reduce hunger.",
            img: "https://i.pravatar.cc/100?img=14",
            rating: 5
        }
    ];

    return (
        <div>
            <section className="py-20  px-6 md:px-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl dark:text-gray-200 font-bold mb-12"
                >
                    What People Say
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col items-center"
                        >
                            <img
                                src={review.img}
                                alt={review.name}
                                className="w-20 h-20 rounded-full border-4 border-green-500 mb-4"
                            />
                            {/* Rating Stars */}
                            <div className="flex justify-center mb-4">
                                {[...Array(5)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        className={`w-5 h-5 ${idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-200 italic mb-4">“{review.text}”</p>
                            <h3 className="text-lg font-semibold">{review.name}</h3>
                            <p className="text-green-600 text-sm">{review.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* impact section  */}

            <section className="py-20 px-6 md:px-20 text-center ">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl dark:text-gray-200 font-bold mb-16 text-green-800"
                >
                    Our Impact in Numbers
                </motion.h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {stats.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center hover:shadow-2xl transform hover:-translate-y-2 transition-all"
                        >
                            {item.icon}
                            <h3 className="text-4xl md:text-4xl font-extrabold mb-2 text-green-600">
                                <CountUp end={item.num} duration={3} separator="," />+
                            </h3>
                            <p className="text-lg md:text-xl font-medium dark:text-gray-400 text-gray-700">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExtraSection;
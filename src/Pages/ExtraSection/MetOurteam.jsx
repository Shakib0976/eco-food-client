import React from 'react';
import { motion } from "framer-motion";

const MetOurteam = () => {
    return (
        <div>
            {/* Team Section */}
            <section className="py-16 px-6 md:px-20 text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12"
                >
                    Meet Our Team
                </motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                    {[
                        { name: "Alice Johnson", role: "Founder", img: "https://i.pravatar.cc/200?img=32" },
                        { name: "Mark Davis", role: "Operations Lead", img: "https://i.pravatar.cc/200?img=12" },
                        { name: "Ahmed Khan", role: "Data Analyst", img: "https://i.pravatar.cc/200?img=10" },
                        { name: "Sophia Lee", role: "Community Manager", img: "https://i.pravatar.cc/200?img=48" }
                    ].map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-green-500"
                            />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="dark:text-gray-400 text-gray-600">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MetOurteam;
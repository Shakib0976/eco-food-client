import React from 'react';
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="relative bg-[#8c7fef20] text-black py-20 px-6 text-center overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    About Our EcoFood Platform
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="max-w-2xl text-gray-500 mx-auto text-lg"
                >
                    We connect restaurants, charities, and people in need to reduce food waste
                    and ensure no one goes hungry.
                </motion.p>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-white px-6 md:px-20">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                    {[
                        { step: "1. Donate", desc: "Restaurants and individuals list surplus food through our platform." },
                        { step: "2. Request", desc: "Charities and organizations request food donations based on need." },
                        { step: "3. Deliver", desc: "Volunteers or delivery partners ensure food reaches those in need." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gray-100 rounded-2xl p-8 shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold mb-3">{item.step}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-6 md:px-20 text-center">
                <motion.h2
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-6"
                >
                    Our Mission
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-lg text-gray-600"
                >
                    Our mission is to create a community where surplus food is shared
                    instead of wasted. By bridging the gap between donors and receivers,
                    we aim to make a real impact in the fight against hunger.
                </motion.p>
            </section>



            {/* Impact Section */}
            <section className="py-16 px-6 md:px-20 text-center bg-green-50">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-6"
                >
                    Our Impact
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-lg text-gray-600 mb-10"
                >
                    Together, we have saved thousands of meals from going to waste and
                    provided food to countless families in need. Every contribution counts!
                </motion.p>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {[
                        { num: "10K+", label: "Meals Donated" },
                        { num: "500+", label: "Charities Supported" },
                        { num: "200+", label: "Restaurants Partnered" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow p-6"
                        >
                            <h3 className="text-2xl font-bold text-green-600">{stat.num}</h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

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
                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                    {[
                        { name: "Alice Johnson", role: "Founder", img: "https://i.pravatar.cc/200?img=32" },
                        { name: "Mark Davis", role: "Operations Lead", img: "https://i.pravatar.cc/200?img=12" },
                        { name: "Sophia Lee", role: "Community Manager", img: "https://i.pravatar.cc/200?img=48" }
                    ].map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-green-500"
                            />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
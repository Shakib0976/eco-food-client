import React, { useState } from 'react';
import { motion } from "framer-motion";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail("");
            // Here you can connect with your backend API to store the email
        }
    };
    return (
        <div>
            <div className="bg-gray-50">
               
                {/* Newsletter Subscription Section */}
                <section className="bg-green-50 py-20 px-6 md:px-20 text-center rounded-t-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-4xl font-bold mb-6 text-green-800"
                    >
                        Subscribe Now
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-gray-700 mb-8 max-w-2xl mx-auto"
                    >
                        Join our community and stay informed about all the ways you can help reduce food waste and support those in need.
                    </motion.p>
                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col md:flex-row justify-center gap-4 max-w-2xl mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none w-full md:w-2/3"
                            required
                        />
                        <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                            Subscribe
                        </button>
                    </form>
                    {submitted && (
                        <p className="mt-6 text-green-700 font-medium">
                            Thank you for subscribing! 🎉
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Newsletter;
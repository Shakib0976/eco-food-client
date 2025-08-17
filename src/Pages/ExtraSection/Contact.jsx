import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here (e.g., API call)
        Swal.fire({
            title: "Success!",
            text: "Your message  has been sent successfully.",
            icon: "success",
            confirmButtonColor: "#22c55e", // Tailwind green-500
            confirmButtonText: "OK",
            timer: 3000, // Auto close after 3s
        });
        setFormData({ name: "", email: "", message: "" });
    };
    return (
        <div>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className=' h-50 md:h-60 lg:h-90' >
                    <iframe
                        title="Our Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902538!2d90.399452!3d23.780887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c780f0c5b7e3%3A0x5b1dcd2a045fbdc!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1692265363938!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div className="max-w-7xl px-10 mx-auto grid md:grid-cols-2 gap-10 pb-10 mt-10 ">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-green-700">Get in Touch</h2>
                        <p className="text-gray-700 dark:text-gray-400">
                            We'd love to hear from you! Whether you have questions, suggestions, or want to volunteer, fill out the form and we'll get back to you.
                        </p>

                        <div className="space-y-4">
                            <p>
                                <span className="font-semibold text-green-700">Email:</span> support@fooddonation.com
                            </p>
                            <p>
                                <span className="font-semibold text-green-700">Phone:</span> +880 1227487419
                            </p>
                            <p>
                                <span className="font-semibold text-green-700">Address:</span> 123 Food Street, Dhaka, Bangladesh
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-800 p-8 max-w-3xl rounded-2xl shadow-lg space-y-6"
                    >
                        <div>
                            <label className="block dark:text-gray-200 text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='type your name'
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block dark:text-gray-200 text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='type your email'
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block dark:text-gray-200 text-gray-700 font-medium mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
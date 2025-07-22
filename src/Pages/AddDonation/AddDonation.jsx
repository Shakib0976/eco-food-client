import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import simpleAxios from '../../Hooks/simpleAxios';

const AddDonation = () => {





    const { user } = use(AuthContext);
    const axiosSecure = simpleAxios();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const imageFile = form.image.files[0];

        if (!imageFile) {
            alert("Please select an image.");
            return;
        }


        try {


            const options = {
                maxSizeMB: 0.1, // target max size (MB)
                maxWidthOrHeight: 800, // optional max dimension
                useWebWorker: true,
            };

            Swal.fire({
                title: 'Uploading...',
                text: 'Compressing and uploading image...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const compressedFile = await imageCompression(imageFile, options);
            const formData = new FormData();
            formData.append("image", compressedFile);



            const apiKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
            const url = `https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`;

            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                const imageUrl = data.data.url; // This is the uploaded image URL

                // Collect all form fields except image
                const donationData = Object.fromEntries(new FormData(form).entries());

                // Add imageUrl and user info to donation data
                donationData.image = imageUrl;
                donationData.restaurantName = user?.displayName || "Unknown";
                donationData.restaurantEmail = user?.email || "Unknown";
                donationData.status = "Pending";
                donationData.createdAt = new Date().toISOString();


                console.log(donationData);

                axiosSecure.post('/donations', donationData)
                    .then(async (res) => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Donation Added!',
                                text: 'Your food donation was submitted successfully.',
                                icon: 'success',
                                confirmButtonText: 'Awesome!',
                                confirmButtonColor: '#4f46e5', // Indigo
                            });


                        }
                    })






                form.reset();
            } else {
                console.error("Image upload failed:", data.error.message);
            }
        } catch (error) {
            console.error("Error converting image or uploading:", error);
        }
    };



    return (
        <div className='my-10'>
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
            >
                <h2 className="text-2xl font-semibold mb-4">Add Food Donation</h2>

                <div>
                    <label className="block font-medium mb-1">Donation Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full input input-bordered"
                        placeholder="e.g., Surplus Pastries"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Food Type</label>
                    <input
                        type="text"
                        name="foodType"
                        className="w-full input input-bordered"
                        placeholder="e.g., Bakery, Produce"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Quantity</label>
                    <input
                        type="text"
                        name="quantity"
                        className="w-full input input-bordered"
                        placeholder="e.g., 5 kg or 10 portions"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Pickup Time Window</label>
                    <input
                        type="text"
                        name="pickupWindow"
                        className="w-full input input-bordered"
                        placeholder="e.g., 3:00 PM - 6:00 PM"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="w-full input input-bordered"
                        placeholder="Address or coordinates"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Image Upload</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Restaurant Name</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="w-full input input-bordered bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Restaurant Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="w-full input input-bordered bg-gray-100"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Add Donation
                </button>
            </form>
        </div>
    );
};

export default AddDonation;
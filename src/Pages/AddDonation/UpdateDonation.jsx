import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import imageCompression from 'browser-image-compression';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';

const UpdateDonation = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const { user } = React.useContext(AuthContext);

    const { data: donation, isLoading } = useQuery({
        queryKey: ['donations', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/donation/${id}`);
            return res.data;
        },
        enabled: !!id
    });


    if (isLoading) return <Loader />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const imageFile = form.image.files[0];

        let imageUrl = donation?.image; // Initialize with the existing image URL

        if (imageFile) {
            const options = {
                maxSizeMB: 0.1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };

            Swal.fire({
                title: 'Uploading...',
                text: 'wait some second uploading image...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            try {
                const compressedFile = await imageCompression(imageFile, options);
                const formData = new FormData();
                formData.append("image", compressedFile);

                const apiKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
                const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

                const response = await axios.post(url, formData);
                imageUrl = response.data.data.url; // Update imageUrl with the new one
                Swal.close(); // Close the loading SweetAlert
            } catch (error) {
                console.error("Image upload failed:", error);
                Swal.fire('Error', 'Image upload failed. Please try again.', 'error');
                return; // Stop the function if image upload fails
            }
        }


        const updatedData = {
            title: form.title.value,
            foodType: form.foodType.value,
            quantity: form.quantity.value,
            pickupWindow: form.pickupWindow.value,
            location: form.location.value,
            image: imageUrl, // Use the determined imageUrl
            restaurantName: donation.restaurantName,
            restaurantEmail: donation.restaurantEmail,
            status: donation.status,
            createdAt: donation.createdAt // keep original date
        };

        console.log(updatedData);

        try {
            const res = await axiosSecure.patch(`/donations/update/${id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Donation updated successfully.',
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    title: 'No Changes',
                    text: 'No changes were made to the donation.',
                    icon: 'info',
                });
            }
        } catch (error) {
            console.error('Update failed:', error);
            Swal.fire('Error', 'Something went wrong while updating.', 'error');
        }
    };

    return (
        <div className="my-10">
            <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4'>
                <h2 className="text-2xl flex font-semibold mb-4 "><Link to={'/dashboard/my-donations'} className="back-button ">
                    <FaArrowLeft className="arrow-icon mr-4" /> {/* Use the imported icon as a component */}
                </Link>Update Food Donation</h2>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
                >


                    <div>
                        <label className="block font-medium mb-1">Donation Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={donation?.title}
                            className="w-full input input-bordered"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Food Type</label>
                        <input
                            type="text"
                            name="foodType"
                            defaultValue={donation?.foodType}
                            className="w-full input input-bordered"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            defaultValue={donation?.quantity}
                            className="w-full input input-bordered"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Pickup Time Window</label>
                        <input
                            type="text"
                            name="pickupWindow"
                            defaultValue={donation?.pickupWindow}
                            className="w-full input input-bordered"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={donation?.location}
                            className="w-full input input-bordered"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Image Upload (optional)</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                        />
                        {donation?.image && (
                            <p className="text-sm text-gray-500 mt-1">Current Image: <a href={donation.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Current Image</a></p>
                        )}
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
                        Update Donation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDonation;
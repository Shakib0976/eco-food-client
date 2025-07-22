import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { AuthContext } from '../../../Context/AuthContext';
import toast from 'react-hot-toast';
import simpleAxios from '../../../Hooks/simpleAxios';


const JoinUs = () => {
    const { createUser, updateUser, setUser, user } = use(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const locations = useLocation();
    console.log(user);
    const axiosInstance = simpleAxios();

    const handleJoinUs = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        console.log(name, email, photo, password);


        if (password.length < 6) {
            return setError('Password must be at least 6 characters long.');
        } else if (!/[A-Z]/.test(password)) {
            return setError('Password must contain at least one uppercase letter.');
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return setError('Password must contain at least one special character.');
        }
        else {
            setError('');




            createUser(email, password)
                .then(async (result) => {
                    // localStorage.setItem('devtalksToken', result?.user?.accessToken);
                    toast.success('Successfully Signin')
                    navigate(locations?.state || '/', {
                        state: { toastMessage: 'Login successful!' }
                    });
                    const user = (result.user);
                    const userInfo = {
                        email: email,
                        role: 'user', // default role
                        created_at: new Date().toISOString(),
                        last_log_in: new Date().toISOString()
                    }

                    const userRes = await axiosInstance.post('/users', userInfo);
                    console.log(userRes.data);



                    updateUser({ displayName: name, photoURL: photo })
                        .then(() => {
                            setUser({ ...user, displayName: name, photoURL: photo });

                        })
                        .catch((error) => {
                            console.log(error);
                            setUser(user);
                        })


                }
                )

                .catch((error) => {
                    console.log(error);

                    toast.error(error.message);
                    setError('Account already created !')
                })


        }

    }

    return (
        <div className=' flex flex-col py-15  justify-center items-center mx-3'>

            <div>
                <h1 className='space-grotesk-500 text-xl md:text-2xl lg:text-4xl font-bold text-center mt-4'>Sign Up your account</h1>
                <p className='text-gray-500 space-grotesk-500 font-bold text-center m-2 mb-4'>Please enter your details to sign Up.</p>
            </div>
            <div className="card mx-auto border border-gray-300 w-11/12  md:w-11/18 lg:w-11/28 shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleJoinUs} className="fieldset">
                        {/* name */}
                        <label className="font-bold text-sm label space-grotesk-500">Name</label>
                        <input
                            name='name'
                            type="text"
                            className="input  w-full"
                            placeholder="enter your name here" />
                        {/* email */}
                        <label className="label font-bold text-sm space-grotesk-500">Email</label>
                        <input
                            required
                            name='email'
                            type="email"
                            className="input w-full"
                            placeholder="enter your Email here" />
                        {/* photo-url */}
                        <label className="label font-bold text-sm space-grotesk-500">Photo_url</label>
                        <input
                            name='photo'
                            type="text"
                            className="input w-full"
                            placeholder="Photo_url" />
                        {/* password */}
                        <label className="label font-bold text-sm space-grotesk-500">Password</label>
                        <input
                            required
                            name='password'
                            type="password"
                            className="input w-full"
                            placeholder="Password" />
                        {/* button */}

                        <a href="#_" class="relative mt-4 inline-flex items-center justify-center  overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                            <button type='submit' className="font-bold text-2xl my-2">Sign up</button>
                        </a>
                        {/* <div className='text-center text-red-700 font-semibold'>{error}</div> */}
                    </form>
                    <div>
                        <h1 className='text-red-500'>{error}</h1>
                        <p className='text-center mb-1'>Already have an account?<span className='text-blue-700 ml-2'><Link to='/login'>Login</Link></span></p>
                        <p className='font-bold text-gray-400 text-center'>Or, login with</p>

                    </div>
                    {/* google login button */}

                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </div>
    );
};

export default JoinUs;
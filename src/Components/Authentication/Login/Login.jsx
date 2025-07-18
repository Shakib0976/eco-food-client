import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext';
import SocialLogin from '../SocialLogin/SocialLogin';
import toast from 'react-hot-toast';
// import { Link, useLocation, useNavigate } from 'react-router';
// import { AuthContext } from '../../Context/AuthContext';
// import toast, { Toaster } from 'react-hot-toast';






const Login = () => {



const {logInUser, setUser } = use(AuthContext);
const navigate = useNavigate();
const locations = useLocation();

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;


        logInUser(email, password)
            .then((result) => {
                const user = (result.user);
                setUser(user)
                localStorage.setItem('devtalksToken', result?.user?.accessToken);
                toast.success('Successfully Login')
                navigate(locations?.state || '/', {
                    state: { toastMessage: 'Login successful!' }
                });



            })
            .catch((error) => {
                console.log(error.message);
                toast.error('Invalid email or password!');
            })


    }




    return (
        <div className=' flex flex-col py-15  justify-center items-center  mx-3  bg-cover' >
            <div>
                <p className=' text-gray-500 font-semibold text-center mt-4'>Welcome Back</p>
                <h1 className='space-grotesk-500 text-xl md:text-2xl lg:text-4xl font-bold text-center mt-2'>Sign In your account</h1>
                <p className='text-gray-500 space-grotesk-500 font-bold text-center m-2 mb-6'>Please enter your details to sign in.</p>
            </div>
            <div className="card  mx-auto border border-gray-300 w-11/12  md:w-11/18 lg:w-11/28 shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        {/* email */}
                        <label className="label font-bold text-sm space-grotesk-500">Email</label>
                        <input
                            required
                            name='email'
                            type="email"
                            className="input w-full"
                            placeholder="enter your name here" />
                        {/* password */}
                        <label className="label font-bold text-sm space-grotesk-500">Password</label>
                        <input

                            name='password'
                            type="password"
                            className="input w-full"
                            placeholder="Password" />
                        <div><button type='button' className="link link-hover">Forgot password?</button></div>
                        {/* button */}
                        <a href="#_" class="relative mt-4 inline-flex items-center justify-center  overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                            <button type='submit' className="font-bold text-2xl  my-2">Signin</button>
                        </a>

                    </form>
                    <p className='text-center  mb-3'>Don't have an account?<span className='text-blue-700 ml-2'>
                        <Link to='/join'>Join Us</Link></span></p>
                    <p className='font-bold text-gray-400 text-center'>Or, login with</p>

                    {/* google login button */}

                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </div>
    );
};

export default Login;
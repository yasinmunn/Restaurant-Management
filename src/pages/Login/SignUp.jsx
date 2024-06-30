import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import toast from 'react-hot-toast';
import { axiosPublic } from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate()

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        //Create user in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            profile: data.photoURL
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    toast.success('Successfully User Created!')
                                    navigate('/');
                                    console.log('user added to the database')
                                }
                            })

                    })
            })
    }


    return (
        <>
            <Helmet>
                <title>Sign Up | Bistro Boss</title>
            </Helmet>
            <div className="flex items-center  min-h-screen ">
                <div className="flex w-full max-w-sm  mx-auto overflow-hidden bg-white rounded-lg shadow-lg :bg-gray-800 lg:max-w-4xl">
                    <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80")' }}></div>

                    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                        </div>

                        <p className="mt-3 text-xl text-center text-gray-600 :text-gray-200">
                            Welcome back!
                        </p>

                        <SocialLogin></SocialLogin>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b :border-gray-600 lg:w-1/4"></span>

                            <a href="#" className="text-xs text-center text-gray-500 uppercase :text-gray-400 hover:underline">or login
                                with email</a>

                            <span className="w-1/5 border-b :border-gray-400 lg:w-1/4"></span>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200" for="LoggingEmailAddress">Your Name</label>
                                <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" {...register("name", { required: true })} name="name" />
                                {errors.name && <span>Name is required</span>}

                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200" for="LoggingEmailAddress">Photo URL</label>
                                <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" {...register("photoURL", { required: true })} />
                                {errors.photoURL && <span>Photo URL is required</span>}

                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200" for="LoggingEmailAddress">Email Address</label>
                                <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" {...register("email", { required: true })} name="email" />
                                {errors.email && <span>Email is required</span>}

                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200" for="loggingPassword">Password</label>
                                    <a href="#" className="text-xs text-gray-500 :text-gray-300 hover:underline">Forget Password?</a>
                                </div>

                                <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])./ })} />
                                {errors.password?.type === 'required' && <span>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span>use at least 6 character </span>}
                                {errors.password?.type === 'maxLength' && <span>Password Max 20 character</span>}
                                {errors.password?.type === 'pattern' && <span>Password Is not Strong</span>}
                            </div>
                            {/* <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200">

                                <LoadCanvasTemplate />

                            </label>
                            <input  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" name="captcha" placeholder='Type The Captcha Above' ref={captchaRef} />
                            <div className='text-right '>
                                <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2 '>Validate</button>
                            </div>
                        </div> */}
                            <div className="mt-6">
                                <input className="btn btn-primary w-full" type="submit" value="Sing Up" />
                            </div>
                        </form>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b :border-gray-600 md:w-1/4"></span>

                            <a href="#" className="text-xs text-gray-500 uppercase :text-gray-400 hover:underline"> <Link to='/login'>Have an Account? Login</Link> </a>

                            <span className="w-1/5 border-b :border-gray-600 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
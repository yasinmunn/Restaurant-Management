import { useContext, useEffect, useState } from 'react';
import { LoadCanvasTemplate,  validateCaptcha, loadCaptchaEnginge } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {

    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
                
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }

    }
    return (
        <>
            <Helmet>
                <title>Login | Bistro Boss</title>
            </Helmet>
            <div className="flex items-center  min-h-screen ">
                <div className="flex w-full max-w-sm  mx-auto overflow-hidden bg-white rounded-lg shadow-lg :bg-gray-800 lg:max-w-4xl lg:flex-row-reverse">
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

                        <form onSubmit={handleLogin}>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200" for="LoggingEmailAddress">Email Address</label>
                                <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" name="email" />
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200" for="loggingPassword">Password</label>
                                    <a href="#" className="text-xs text-gray-500 :text-gray-300 hover:underline">Forget Password?</a>
                                </div>

                                <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name="password" />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 :text-gray-200">

                                    <LoadCanvasTemplate />

                                </label>
                                <input className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" name="captcha" placeholder='Type The Captcha Above' onBlur={handleValidateCaptcha} />
                            </div>
                            <div className="mt-6">
                                <input disabled={disabled} className="btn btn-primary w-full" type="submit" value="Login" />
                            </div>
                        </form>

                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b :border-gray-600 md:w-1/4"></span>

                            <a href="#" className="text-xs text-gray-500 uppercase :text-gray-400 hover:underline"> <Link to='/sign-up'>or sign up</Link> </a>

                            <span className="w-1/5 border-b :border-gray-600 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
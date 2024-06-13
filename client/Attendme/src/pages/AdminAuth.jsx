import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
    const navigate = useNavigate();
    document.title = "Admin Auth - AttendMe";
    const [data, setData] = useState({
        admincode: '', name: '', email: '', phone: '', password: ''
    })

    function reset() {
        data.admincode = '';
        data.name = '';
        data.email = '';
        data.phone = '';
        data.password = '';
    }
    const register = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post('http://localhost:8800/api/admin/register', data);
            console.log(result)
            if (result.status === 201) {
                toast.success(result.data.message);
                reset();
                toRegister();
            }
        } catch (error) {
            toast.warn(error.data.message);
        }
    }
    const login = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post('http://localhost:8800/api/admin/login', data);
            console.log(result)
            if (result.status === 200) {
                toast.success("Login Successful");
                localStorage.setItem('token', result.data.token);
                if(result.data.admin){
                    localStorage.setItem('guru', true);
                }
                navigate('/dashboard')
                reset();
            }
        } catch (error) {
            toast.warn(error.data.message);
        }
    }
    const onchange = async (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function toRegister() {
        document.getElementById('login').classList.toggle('hidden');
        document.getElementById('register').classList.toggle('hidden');
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://www.svgrepo.com/show/345334/tick-box-delivery-check-approved-confirm-accept.svg" alt="logo" />
                        AttendMe
                    </Link>
                    <div id='register' className="hidden w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register Now
                            </h1>
                            <form className="space-y-2" onSubmit={(e) => register(e)}>
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" value={data.name} onChange={onchange} required="" />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={data.email} onChange={onchange} required="" />
                                </div>
                                <div>
                                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
                                    <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+92312345678" value={data.phone} onChange={onchange} required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={data.password} onChange={onchange} />
                                </div>
                                <div>
                                    <label for="secretcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Secret Code</label>
                                    <input type="password" name="admincode" id="admincode" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={data.admincode} onChange={onchange} />
                                </div>

                                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => register(e)}>Register Now</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already Register? <span onClick={() => toRegister()} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</span>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div id='login' className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login to Continue
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e) => login(e)}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="loginemail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={data.email} onChange={onchange} required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="loginpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.password} onChange={onchange} required="" />
                                </div>

                                <button type="submit" onClick={(e) => login(e)} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Not Registered? <span onClick={() => toRegister()} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Register Now</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminAuth

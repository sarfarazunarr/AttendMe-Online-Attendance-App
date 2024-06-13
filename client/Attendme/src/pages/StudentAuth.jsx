import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const StudentAuth = () => {
    const navigate = useNavigate();
    document.title = "Admin Auth - AttendMe";
    const [data, setData] = useState({
         email: '', password: ''
    })

    function reset() {
        data.email = '';
        data.password = '';
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post('http://localhost:8800/api/students/login', data);
            console.log(result)
            if (result.status === 200) {
                toast.success("Login Successful");
                localStorage.setItem('token', result.data.token);
                navigate('/dashboard')
            }
        } catch (error) {
            toast.warn(error.data.message);
        }
    }
    const onchange = async (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="https://www.svgrepo.com/show/345334/tick-box-delivery-check-approved-confirm-accept.svg" alt="logo" />
                        AttendMe
                </Link>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to Continue
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={(e)=>login(e)}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={data.email} required="" onChange={onchange} />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={data.password} onChange={onchange} />
                            </div>
                            
                            <button onClick={(e) => login(e)} type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Not Registered? <a href="/contact" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Contact Us</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentAuth

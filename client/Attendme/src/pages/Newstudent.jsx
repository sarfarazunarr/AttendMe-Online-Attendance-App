import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Newstudent = () => {
    const [data, setData] = useState({
        rollnumber: '', name: '', email: '', phone: '', password: ''
    })

    const register = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        try {
          let result = await axios.post('http://localhost:8800/api/admin/registerstudent', data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          console.log(result)
          if (result.status === 201) {
            toast.success(result.data.message);
          }
        } catch (error) {
          toast.warn(error);
          console.log(error)
        }
      }

    const onchange = async (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <section className="bg-gray-50 pl-28 h-screen w-full dark:bg-gray-900">
            <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center dark:text-white">
                    Register Now
                </h1>
                <form className="space-y-2 w-2/6 mx-auto" onSubmit={(e) => register(e)}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student's Roll Number</label>
                        <input type="text" name="rollnumber" id="rollnumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A1125" value={data.rollnumber} onChange={onchange} required="" />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student's Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" value={data.name} onChange={onchange} required="" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student's email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={data.email} onChange={onchange} required="" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student's Phone</label>
                        <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+92312345678" value={data.phone} onChange={onchange} required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={data.password} onChange={onchange} />
                    </div>

                    <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => register(e)}>Register Now</button>

                </form>
            </div>
        </section>
    )
}

export default Newstudent

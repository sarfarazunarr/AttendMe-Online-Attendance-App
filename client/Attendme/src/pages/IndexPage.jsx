import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { MyContext } from '../MainContext';
import Loading from '../components/loading';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const IndexPage = () => {
    const { userdata, getdata, checkAdmin, isAdmin, sum, getSummary, getsSummary, error } = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchdata(){
        await getdata();
        checkAdmin();
        isAdmin ? await getSummary() : await getsSummary()
        setLoading(false);
    } fetchdata()
    }, [])
    
    if(error){
        toast.error(error)
    }
    console.log(sum)
    return (
        <>
            {userdata === undefined || loading ? (
                <Loading />
            ) : (
                <div className='pl-72 py-20 w-full h-screen bg-gray-900'>
                    <h4 className='text-4xl text-white font-semibold pb-5'>Hi {userdata.name},</h4>
                    <p className='text-left font-semibold text-white'>Your Details:</p>
                    <ul className='font-normal pl-2 text-gray-400'>
                        <li>Email: {userdata.email}</li>
                        <li>Phone: {userdata.phone}</li>
                        <li>Roll Number: {userdata.rollnumber}</li>
                    </ul>
                    {isAdmin && sum ? (
                    <div className='grid grid-cols-4 px-10 gap-3'>
                        <div className='w-full my-10 bg-gradient-to-br from-purple-600 to-gray-900 border border-purple-600 px-8 rounded-md'>
                            <h4 className='text-6xl pt-10 font-semibold text-center text-white'>{sum.students}</h4>
                            <p className='text-white text-center pt-7 pb-2 font-semibold text-sm'>Total Students</p>
                        </div>
                        <div className='w-full my-10 bg-gradient-to-br from-green-600 to-gray-900 border border-green-600 px-10 rounded-md'>
                            <h4 className='text-6xl pt-10 font-semibold text-center text-white'>{sum.attendmonth}</h4>
                            <p className='text-white text-center pt-7 pb-2 font-semibold text-sm'>Attendence in this Month</p>
                        </div>
                        <div className='w-full my-10 bg-gradient-to-br from-red-600 to-gray-900 border border-red-600 px-10 rounded-md'>
                            <h4 className='text-6xl pt-10 font-semibold text-center text-white'>{sum.attends}</h4>
                            <p className='text-white text-center pt-7 pb-2 font-semibold text-sm'>Total Attendances</p>
                        </div>
                        
                    </div>) :
                    (<div className='grid grid-cols-4 px-10 gap-3'>
                        <div className='w-full my-10 bg-gradient-to-br from-purple-600 to-gray-900 border border-purple-600 px-8 rounded-md'>
                            <h4 className='text-6xl pt-10 font-semibold text-center text-white'>{sum.attendmonth}</h4>
                            <p className='text-white text-center pt-7 pb-2 font-semibold text-sm'>Attendence in this Month</p>
                        </div>
                        <div className='w-full my-10 bg-gradient-to-br from-green-600 to-gray-900 border border-green-600 px-10 rounded-md'>
                            <h4 className='text-6xl pt-10 font-semibold text-center text-white'>{sum.attends}</h4>
                            <p className='text-white text-center pt-7 pb-2 font-semibold text-sm'>Attendence in this Year</p>
                        </div>
                        
                    </div>)}
                </div>
            )}</>
    )
}
export default IndexPage

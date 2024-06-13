import React, { useContext } from 'react'
import { MyContext } from '../MainContext';
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Checkinout = () => {
  const { checkin, checkout, error, data } = useContext(MyContext)
  const date = new Date();
  const checktime = localStorage.getItem('checktime');
    const cancheckout = checktime ? checktime > Date.now() : false;
  if (error) {
    toast.error(error)
  }
  return (
    <div className='pl-72 py-20 w-full h-screen flex justify-center items-center bg-gray-900'>
      <div className="w-2/4 bg-gradient-to-br from-blue-900 to-gray-900 border border-blue-800 p-10 rounded-md">
        <h3 className='text-3xl text-white text-center font-semibold'>Check In / Out</h3>
        <p className='text-white text-center pb-5 font-semibold text-xl'>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} `}</p>
        <h4 className={`text-white ${data || cancheckout ? '' : 'hidden'} py-5 text-center font-semibold`}>{data || cancheckout ? "Checked In! You can checkout after 2 hours" : ''}</h4>
        <div className="flex justify-center gap-3">
          <button id='checkin' className='bg-blue-600 text-white font-semibold text-xl px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-200 disabled:bg-gray-500 disabled:text-gray-800' onClick={(e) => checkin()}>Check In</button>
          <button id='checkout' className={`bg-red-600 text-white font-semibold text-xl px-6 py-3 rounded-md hover:bg-white hover:text-red-600 transition-colors duration-200 disabled:bg-gray-500 disabled:text-gray-800`} disabled={cancheckout} onClick={() => checkout()}>Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Checkinout

import React, { useEffect } from 'react'
import Loading from '../components/loading'
import { useContext, useState } from 'react';
import { MyContext } from '../MainContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Attendences = () => {
  const { getattends, attends, checkAdmin, isAdmin, stattends, userdata, getdata } = useContext(MyContext);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getdata()
        checkAdmin();
        isAdmin ? await getattends() : await stattends();
        setIsloading(false);
      } catch (error) {
        toast.error(error.message);
        setIsloading(false);
      }
    };
    fetchData();
  }, []);

  function millisecondsToTime(milliseconds) {
    // Calculate total seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // Pad with leading zeros if necessary
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    // Return formatted time
    return `${hours}:${minutes}:${seconds}`;
  }
  return (
    <div className='pl-72 py-20 w-full h-screen bg-gray-900'>
      {isloading || attends === undefined ? (
        <Loading />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[96%] mx-2 bg-gray-900">
          <h3 className='text-center text-white text-3xl font-semibold py-5'>All Attendances</h3>

          <table className="w-full pr-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Check-in
                </th>
                <th scope="col" className="px-6 py-3">
                  Check-out
                </th>
                <th scope="col" className="px-6 py-3">
                  Stay Time
                </th>

              </tr>
            </thead>
            <tbody>
              {attends && attends.map((item, index) => {
                return (
                  !attends ? (<p className='text-center py-10 text-gray-500'>No Attendances available</p>) : (
                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-auto dark:text-white">
                      <td scope="row" className="px-4 py-4 text-center">
                        {userdata.name}
                      </td>
                      <td scope="row" className="px-4 py-4 text-center">
                        {item.checkin}
                      </td>
                      <td scope="row" className="px-4 py-4 text-center">
                        {item.checkout ? item.checkout : "Present"}
                      </td>
                      <td scope="row" className="px-4 py-4 text-center">
                        {item.stayTime ? millisecondsToTime(item.stayTime) : "Counting"}
                      </td>
                    </tr>)
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default Attendences

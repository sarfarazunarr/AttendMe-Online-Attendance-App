import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../MainContext';
import Loading from '../components/loading';
import { toast } from 'react-toastify';
import axios from 'axios';

const Students = () => {
  const { getstudents, students } = useContext(MyContext);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState();
  const [data, setData] = useState({
    rollnumber: '', name: '', email: '', phone: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getstudents();
        setIsloading(false);
      } catch (error) {
        setError(error.message);
        setIsloading(false);
      }
    };
    fetchData();
  }, []);


  const update = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    try {
      let result = await axios.put(`http://localhost:8800/api/admin/updatestudent/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (result.status === 200) {
        toast.success("Updated Successfully");
      }
    } catch (error) {
      toast.warn(error.data.message);
    }
  }
  const deletestudent = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    try {
      let result = await axios.delete(`http://localhost:8800/api/admin/deletestudent/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (result.status === 200) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.warn(error.data.message);
    }
  }

  const onchange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const popup = (uid, open) => {
    if(open){
      setId(uid);
      let newdata = students.find(item => item._id === uid);
      console.log(newdata)
      data.name = newdata.name;
      data.email = newdata.email;
      data.phone = newdata.phone;
      data.rollnumber = newdata.rollnumber;
      document.getElementById('popup').classList.toggle('hidden');
    }
    else {
      setId(uid);
      document.getElementById('popup').classList.toggle('hidden');
    }
  }

  return (
    <>
    <div className='pl-72 py-20 w-full h-screen bg-gray-900'>
      {isloading || students === undefined ? (
        <Loading />
      ) : error ? (
        <div className='text-red-500'>{error}</div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[96%] mx-2 bg-gray-900">
          <h3 className='text-center text-white text-3xl font-semibold py-5'>All Students</h3>
          <table className="w-full pr-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Roll #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students && students.map((item, index) => {
                return (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-auto dark:text-white">
                    <td scope="row" className="px-4 py-4 text-center">
                      {item.rollnumber}
                    </td>
                    <td scope="row" className="px-4 py-4 text-center">
                      {item.name}
                    </td>
                    <td scope="row" className="px-4 py-4 text-center">
                      {item.email}
                    </td>
                    <td scope="row" className="px-4 py-4 text-center">
                      {item.phone}
                    </td>
                    <td scope="row" className="relative  overflow-visible px-4 group text-blue-500 py-4 text-center cursor-pointer">
                      <div className='hidden group-hover:block absolute top-auto left-auto -bottom-0 text-left right-0 z-50 bg-gray-950 p-5 rounded-md'>
                        <ul className='list-none gap-1 text-white'>
                          <li className='cursor-pointer hover:text-blue-500' onClick={() => popup(item._id, true)}>Update</li>
                          <li className='cursor-pointer hover:text-blue-500' onClick={() => deletestudent(item._id)}>Delete</li>
                        </ul>
                      </div>
                      Options
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
    <div id='popup' className='fixed top-0 left-0 z-50 w-full h-full bg-gray-900/70 backdrop-blur-md flex justify-center items-center hidden'>
        <div className="w-1/3 bg-gray-800 p-5 rounded-md">
          <h3 className='text-center text-2xl text-white font-semibold py-5'>Update Data</h3>
          <form className="space-y-2 w-full mx-auto" onSubmit={(e) => update(e)}>
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

            <button type='submit' className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => update(e)}>Update Now</button>
          </form>
          <p className='text-red-500 text-center ' onClick={() => popup(0, false)}>Close</p>
        </div>
      </div>
    </>
  );
};

export default Students;
import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = ({ data }) => {
    return (
        <div className='w-28'>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 pt-20 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <Link to="/" className="flex items-center ps-2.5 mb-5">
                        <img src="https://www.svgrepo.com/show/345334/tick-box-delivery-check-approved-confirm-accept.svg" className="h-6 me-3 sm:h-7" alt="Logo" />
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">AttendMe</span>
                    </Link>
                    <ul className="space-y-2 font-medium">
                        {data.map((item, id) => {
                            return (
                                <li>
                                    <Link to={item.link} key={id} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <img src={item.imgpath} className="h-10 w-10 me-2 bg-white p-2 rounded-full" alt="Logo" />
                                        <span className="ms-3">{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar

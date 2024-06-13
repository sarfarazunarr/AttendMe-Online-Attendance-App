import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


const Dashboard = () => {
    const isAdmin = localStorage.getItem('guru');
    
    const studentdata = [
        {
            "name": "Dashboard",
            "link": "/dashboard",
            "imgpath": "https://www.svgrepo.com/show/485607/dashboard-layout.svg"
        },
        {
            "name": "Check in /out",
            "link": "/dashboard/checkinout",
            "imgpath": "https://www.svgrepo.com/show/327329/log-in.svg"
        },
        {
            "name": "Attendances",
            "link": "/dashboard/attendances",
            "imgpath": "https://www.svgrepo.com/show/533455/table-tree.svg"
        },
        {
            "name": "Logout",
            "link": "/auth/logout",
            "imgpath": "https://www.svgrepo.com/show/525415/logout-2.svg"
        },
    ]
    const admindata = [
        {
            "name": "Dashboard",
            "link": "/dashboard",
            "imgpath": "https://www.svgrepo.com/show/485607/dashboard-layout.svg"
        },
        {
            "name": "New Student",
            "link": "/dashboard/new-student",
            "imgpath": "https://www.svgrepo.com/show/526461/add-circle.svg"
        },
        {
            "name": "Students",
            "link": "/dashboard/students",
            "imgpath": "https://www.svgrepo.com/show/483686/male-student-16.svg"
        },
        {
            "name": "Attendances",
            "link": "/dashboard/attendances",
            "imgpath": "https://www.svgrepo.com/show/533455/table-tree.svg"
        },
        {
            "name": "Logout",
            "link": "/auth/logout",
            "imgpath": "https://www.svgrepo.com/show/525415/logout-2.svg"
        },
    ]
    return (
        <>

            <Sidebar data={isAdmin ? admindata : studentdata} />
            <Outlet />
        </>
    )
}

export default Dashboard

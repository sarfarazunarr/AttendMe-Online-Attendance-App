import React, { useState } from "react";
import { MyContext } from "./MainContext";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const MainProvider = ({ children }) => {
    const [userdata, setUserdata] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [students, setStudents] = useState();
    const [attends, setAttends] = useState();
    const [sum, setSum] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState()
    const token = localStorage.getItem('token');
    const adminroute = 'http://localhost:8800/api/admin/';
    const userroute = 'http://localhost:8800/api/students/'

    const redirectTo = (path) => {
        const navigate = useNavigate();
        navigate(path);
    }
    const getdata = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirectTo("/auth/student")
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`${adminroute}data`, config);
            if (response.status === 200) {
                setUserdata(response.data.adminData);
            }
        } catch (error) {
            setError(error.data.message);
            if(error.status === 401 || 403){
                localStorage.removeItem('token');
                redirectTo('/auth/login')
            }
        }
    }

    const checkAdmin = async () => {
        let guru = localStorage.getItem('guru');

        if (guru) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    const getstudents = async () => {
        try {
            await checkAdmin();
            if (!isAdmin) {
                redirectTo('/dashboard')
                return 0;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            let data = await axios.get(`${adminroute}viewstudents`, config);
            setStudents(data.data.students);
        } catch (error) {
            setError(error.data.message)
        }
    }

    const getattends = async () => {
        try {
            await checkAdmin();
            if (!isAdmin) {
                redirectTo('/dashboard')
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            let data = await axios.get(`${adminroute}viewattendances`, config);
            setAttends(data.data.attendences);
        }
        catch (error) {
            setError(error.data.message)
        }
    }

    const getSummary = async () => {
        try {
            await checkAdmin();
            if (!isAdmin) {
                redirectTo('/dashboard')
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            let data = await axios.get(`${adminroute}summary`, config);
            setSum(data.data);
        } catch (error) {
            setError(error.data)
        }
    }

    const getsSummary = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            let data = await axios.get(`${userroute}summary`, config);
            setSum(data.data);
        } catch (error) {
            setError(error.data.message)
        }
    }

    const checkin = async () => {
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            let data = await axios.post(`${userroute}checkin`, null, config);
            setData(data.data.current);
            localStorage.setItem('checktime', Date.now() + 7200000);
        } catch(error){
            setError(error.data.message)
        }
    }
    const checkout = async () => {
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            let data = await axios.post(`${userroute}checkout`, null, config);
            setData(data.data.current);
        } catch(error){
            setError(error.data)
        }
    }

    const stattends = async () => {
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            let data = await axios.get(`${userroute}viewattendances`, config);
            setAttends(data.data.attendences);
        } catch(error){
            setError(error.data.message)
        }
    }
    return (
        <MyContext.Provider value={{ students, checkAdmin, isAdmin, userdata, getdata, getstudents, getattends, attends, sum, getSummary, getsSummary, stattends, checkin, data, redirectTo, checkout }}>
            {children}
        </MyContext.Provider>
    );
};

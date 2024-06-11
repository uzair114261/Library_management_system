import React, {useEffect, useState} from 'react'
import StudentHeader from './StudentHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'
import { setLocale } from 'yup'

const StudentPanel = () => {
    const navigate = useNavigate()
    const [loading, setLaoding] = useState(true)
    const { notifyError } = useToast()
    useEffect(() => {
        const access = localStorage.getItem("StudentAccess");
        const refresh = localStorage.getItem("StudentRefresh");
        const user = localStorage.getItem("studentData");
        if (access && refresh && user) {
            setLaoding(false)
        } else {
            notifyError("Please log in to access this page.");
            navigate("/");
        }
    }, [navigate, notifyError]);

    if(loading){
        return(
            <div className='h-screen w-screen flex items-center justify-center bg-white: dark:bg-slate-800'>
                <div>Loading</div>
            </div>
        )
    }
    return (
        <div className='h-screen w-screen bg-gray-100 dark:bg-slate-900 overflow-y-scroll'>
                    <StudentHeader />
                    <Outlet />
        </div>
    )
}

export default StudentPanel
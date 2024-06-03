import React, {useEffect} from 'react'
import StudentHeader from './StudentHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'

const StudentPanel = () => {
    const navigate = useNavigate()
    const { notifyError } = useToast()
    useEffect(() => {
        const access = localStorage.getItem("StudentAccess");
        const refresh = localStorage.getItem("StudentRefresh");
        const user = localStorage.getItem("studentData");
        if (access && refresh && user) {

        } else {
            notifyError("Please log in to access this page.");
            navigate("/");
        }
    }, [navigate, notifyError]);
    return (
        <div className='h-screen w-screen bg-gray-100 dark:bg-slate-900 overflow-y-scroll'>
            <StudentHeader />
            <Outlet />
        </div>
    )
}

export default StudentPanel
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
    const navigate = useNavigate()
    const admin = localStorage.getItem('user')
    const student = localStorage.getItem('studentData')
    const goBack = () => {
        if(admin){
            navigate('/dashboard/analytics')
        }else if(student){
            navigate('/student_panel')
        }else{
            navigate('')
        }
    }
    return (
        <div className='fixed top-0 left-0 w-screen h-screen z-20 bg-blue-300 dark:bg-slate-950 flex items-center justify-center p-4 overflow-y-scroll'>
            <div className="rounded-lg bg-white dark:bg-slate-800 p-5">
                <h1 className="text-[50px] text-blue-500 dark:text-white text-center font-[900]">404</h1>
                <p className='text-[20px] md:text-[30px]  font-[900] text-center dark:text-white'>OOPS! PAGE NOT FOUND</p>
                <div className='w-full md:w-9/12 mx-auto text-center py-5 dark:text-white'>
                    <p className='text-[20px] font-[400]'> Sorry, The page you're looking for does not exist in our site. Thank you!</p>
                </div>
                <div className="text-center">
                    <button onClick={goBack} className='md:py-3 md:px-5 py-2 px-3 bg-blue-500 rounded dark:bg-white dark:text-black text-white ease-linear duration-200 hover:scale-105'>Return Home</button>
                </div>
            </div>
        </div>
    )
}

export default Error404
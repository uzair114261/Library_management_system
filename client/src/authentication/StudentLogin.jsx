import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import { ArrowLeftShort } from 'react-bootstrap-icons'
import ReactInputMask from 'react-input-mask'

const StudentLogin = () => {
    const navigate = useNavigate()
    const {notifySuccess, notifyError} = useToast()
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const schema = yup.object().shape({
        cnic: yup.string().required(),
        password: yup.string().required(),
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const loginHandler = async (data) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('cnic', data.cnic);
            formData.append('password', data.password);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/student_login`,{
                method: 'POST',
                body: formData
            })
            const responseData = await response.json()
            if(response.ok){
                const {refresh, access, studentData} = responseData
                localStorage.clear()
                localStorage.setItem('StudentRefresh', refresh)
                localStorage.setItem('StudentAccess', access)
                localStorage.setItem('studentData', JSON.stringify(studentData));
                notifySuccess('Logged in Successfully') 
                navigate('/student_panel/')
            }else{
                notifyError(responseData.error)
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='home h-screen w-screen overflow-y-scroll flex items-center justify-center'>
            <div className="rounded-lg p-5 shadow bg-white min-w-[300px] md:w-[400px] max-w-[500px] relative z-10 slide-right">
            <div className="">
                <button onClick={()=> navigate('/')} className='active:bg-blue-100 rounded-full ease-linear duration-100 p-1'><ArrowLeftShort size={25}/></button>
                </div>
                <h1 className="text-2xl font-[600] text-center">Login as Student</h1>
                <form action="" onSubmit={handleSubmit(loginHandler)}>

                    <div className='mb-2'>
                        <label htmlFor="cnic">CNIC</label>
                        <ReactInputMask mask={`99999-9999999-9`} maskChar={`_`}  {...register('cnic')} type="text" className='w-full outline-blue-500 p-2 text-gray-700 border-[1px] rounded my-1' />
                    </div>
                    <div className='pb-3'>
                        <label htmlFor="password">Password</label>
                        <input {...register('password')}  type={`${showPass ? 'text' : 'password'}`} className='w-full outline-blue-500 p-2 text-gray-700 border-[1px] rounded my-1' />
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" onClick={() => setShowPass(!showPass)} id='showPassword' />
                            <label htmlFor="showPassword">Show Password</label>
                        </div>
                    </div>
                    <button type='submit' className="bg-blue-500 outline-sky-200 w-full px-3 py-2 rounded text-white">
                        {loading ? <div className='loader mx-auto'></div>: 'Login'}
                    </button>
                </form>
                
            </div>
        </div>
    )
}

export default StudentLogin

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { ArrowLeftShort } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const StudentDetail = () => {
  const navigate = useNavigate()
  const { cnic } = useParams()
  console.log(cnic);
  const [studentInfo, setStudentInfo] = useState({})
  const fetchStudentInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/get_student/${cnic}`)
      const data = await response.json()
      setStudentInfo(data)
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchStudentInfo()
  }, [])

  return (
    <div className='p-5'>
      <div className={`p-5 min-w-[300px] bg-white max-w-full ease-linear duration-200 mx-auto rounded-lg shadow-lg`}>
        <div className="flex gap-4 items-end">
        <button onClick={()=> navigate('/dashboard/manage_students')} className='active:bg-blue-100 rounded-full ease-linear duration-100 p-1'><ArrowLeftShort size={25}/></button>
        <h1 className="text-xl p-1 font-[600]">Student Information</h1>
        </div>
        <div className="flex justify-between mt-4">
          <div className='w-full p-2'>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>Name</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{studentInfo.name}</th>
            </tr>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>CNIC</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{studentInfo.cnic}</th>
            </tr>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>Email</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{studentInfo.email}</th>
            </tr>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>Phone</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{studentInfo.phone}</th>
            </tr>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>Standard</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{studentInfo.standard}</th>
            </tr>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>Major</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{studentInfo.major}</th>
            </tr>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>Major</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{moment(studentInfo.created_at).format('ddd, DD-MMMM,YYYY')}</th>
            </tr>
            <tr className='flex gap-2'>
              <th className='w-[30%] bg-white text-left text-gray-700 py-1 font-[600]'>Address</th>
              <th className='w-[70%] bg-white text-left text-gray-700 py-1 font-[400]'>{studentInfo.address}</th>
            </tr>
          </div>
          <div className='w-full'>
            <div className="w-[300px] h-[400px] mx-auto">
              <img className='rounded-lg h-full w-full' src={`${process.env.REACT_APP_BACKEND_URL}${studentInfo.image}`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail
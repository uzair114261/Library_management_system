import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToast } from '../../context/ToastContext'

const UpdateProfile = () => {
  const studentData = JSON.parse(localStorage.getItem('studentData'))
  const {notifySuccess, notifyError} = useToast()
  
  const schema = yup.object().shape({
    cnic: yup.string().required(),
    standard: yup.string().required(),
    address: yup.string().required(),
    image: yup.mixed().required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const updateStudent = async (data) => {
    try{
      const formData = new FormData();
      formData.append('cnic', data.cnic);
      formData.append('standard', data.standard);
      formData.append('address', data.address);
      formData.append('image', data.image[0]);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/student_update`,{
        method: 'PUT',
        body: formData
      })
      const responseData = await response.json()
      const {studentData: updatedStudentData} = responseData
      console.log(updatedStudentData);
      if(response.ok){
        notifySuccess('Profile Updated Successfully')
        localStorage.setItem('studentData', JSON.stringify(updatedStudentData))
      }else{
        notifyError('Error in updating profile')
      }
    }catch(error){
      console.log(error)
    }
    
  }

  return (
    <div className='p-5 dark:text-white'>
      <div className="rounded-xl shadow mx-auto bg-white dark:bg-slate-800 p-5 md:w-[600px]">
        <h1 className="text-xl text-center font-[600] dark:text-white">Update Profile</h1>
        <form onSubmit={handleSubmit(updateStudent)}>
          <div className='grid md:grid-cols-2 gap-2'>
            <div className="p-1">
              <label htmlFor="name">Name</label>
              <input type="text" id='name' className='input-field' value={studentData.name} readOnly />
            </div>
            <div className='p-1'>
              <label htmlFor="cnic">CNIC</label>
              <input {...register('cnic')} type="text" id='cnic' className='input-field' value={studentData.cnic} readOnly />
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-2'>
            <div className="p-1">
              <label htmlFor="email">Email</label>
              <input type="email" id='email' className='input-field' value={studentData.email} readOnly />
            </div>
            <div className='p-1'>
              <label htmlFor="phone">Phone</label>
              <input type="text" id='phone' className='input-field' value={studentData.phone} readOnly />
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-2'>
            <div className="p-1">
              <label htmlFor="major">Major</label>
              <input type="text" id='major' className='input-field' value={studentData.major} readOnly />
            </div>
            <div className='p-1'>
              <label htmlFor="standard">Standard</label>
              <select {...register('standard')} id='standard' className='input-field'>
                <option selected={studentData.standard==='11th'} value="11th">1st year</option>
                <option selected={studentData.standard==='12th'} value="12th">2nd year</option>
                <option selected={studentData.standard==='1 Semester'} value="1 Semester">1 Semester</option>
                <option selected={studentData.standard==='2 Semester'} value="2 Semester">2 Semester</option>
                <option selected={studentData.standard==='3 Semester'} value="3 Semester">3 Semester</option>
                <option selected={studentData.standard==='4 Semester'} value="4 Semester">4 Semester</option>
                <option selected={studentData.standard==='5 Semester'} value="5 Semester">5 Semester</option>
                <option selected={studentData.standard==='6 Semester'} value="6 Semester">6 Semester</option>
                <option selected={studentData.standard==='7 Semester'} value="7 Semester">7 Semester</option>
                <option selected={studentData.standard==='8 Semester'} value="8 Semester">8 Semester</option>
              </select>
            </div>
          </div>
          <div className='p-1'>
            <label htmlFor="address">Address</label>
            <div className="w-full py-1">
              <textarea {...register('address')} id='address' className='input-field' defaultValue={studentData.address}></textarea>
            </div>
          </div>
          <div className='p-1'>
            <label htmlFor="image">Image</label>
            <div className="w-full py-1">
              <input {...register('image')} name="image" id="image" type='file' accept='image/*' className='file-selection'></input>
            </div>
          </div>
          <button className='p-2 bg-blue-500 text-white rounded dark:bg-slate-900' type='submit'>Update Profile</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile

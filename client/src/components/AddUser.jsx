import React, { useContext, useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToast } from '../context/ToastContext'
import { AppStates } from '../context/AppStates'

const AddUser = () => {
    const {collapse} = useContext(AppStates)
    const { notifyError, notifySuccess } = useToast()
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState('')
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        cnic: yup.string().required(),
        phone: yup.string().required(),
        password: yup.string().required(),
        role: yup.string().required(),
        address: yup.string().required(),
        profile: yup.mixed().required(),
    }).test('role-dependent-fields', 'Role-dependent fields are required', function (values) {
        if (values.role === 'Student') {
            return values.standard !== '' && values.major !== '';
        }
        return true;
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const AddUserHandler = async (formData) => {
        try {
            setLoading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('cnic', formData.cnic);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('major', formData.major);
            formDataToSend.append('standard', formData.standard);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('image', formData.profile[0]);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/create_user`, {
                method: 'POST',
                body: formDataToSend
            });
            const responseData = await response.json();
            if (response.ok) {
                notifySuccess('New User has been added successfully')
            } else {
                const firstPropertyArray = Object.values(responseData)[0][0];
                notifyError(firstPropertyArray);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5'>
            <div className={`p-5 min-w[300px] bg-white ${collapse ? 'max-w-[600px]': 'max-w-[500px]'} ease-linear duration-200 mx-auto rounded-lg shadow-`}>
                <h2 className="text-lg font-bold text-center">Add New User</h2>
                <form action="" onSubmit={handleSubmit(AddUserHandler)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                        <div className="block">
                            <label htmlFor="name">Name</label>
                            <input {...register('name')} type="text" name="name" id="name" className='input-field' />
                            {/* {errors.name && <span>{errors.name.message}</span>} */}
                        </div>
                        <div className="block">
                            <label htmlFor="email">Email</label>
                            <input {...register('email')} type="email" name="email" id="email" className='input-field' />
                            {/* {errors.email && <span>{errors.email.message}</span>} */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                        <div className="block">
                            <label htmlFor="cnic">CNIC</label>
                            <ReactInputMask {...register('cnic')} maskChar={`_`} mask={`99999-9999999-9`} type="text" name="cnic" id="cnic" className='input-field' />
                            {/* {errors.cnic && <span>{errors.cnic.message}</span>} */}
                        </div>
                        <div className="block">
                            <label htmlFor="phone">Phone</label>
                            <ReactInputMask {...register('phone')} maskChar={`_`} mask={`0399-9999999`} className='input-field' />
                            {/* {errors.phone && <span>{errors.phone.message}</span>} */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                        <div className="block">
                            <label htmlFor="password">Password</label>
                            <input {...register('password')} type="password" name="password" id="password" className='input-field' />
                            {/* {errors.password && <span>{errors.password.message}</span>} */}
                        </div>
                        <div className="block">
                            <label htmlFor="role">Role</label>
                            <select {...register('role')} onChange={(e) => setRole(e.target.value)} name="role" id="role" className='input-field'>
                                <option value="">--Select--</option>
                                <option value="ADMIN">Admin</option>
                                <option value="STUDENT">Student</option>
                            </select>
                            {/* {errors.role && <span>{errors.role.message}</span>} */}
                        </div>
                    </div>
                    {
                        role === 'STUDENT' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">

                                <div className="block">
                                    <label htmlFor="standard">Standard</label>
                                    <select {...register('standard')} className='input-field' name="standard" id="standard">
                                        <option value="">--Select--</option>
                                        <option value="11th">1st year</option>
                                        <option value="12th">2nd year</option>
                                        <option value="1 Semester">1 Semester</option>
                                        <option value="2 Semester">2 Semester</option>
                                        <option value="3 Semester">3 Semester</option>
                                        <option value="4 Semester">4 Semester</option>
                                        <option value="5 Semester">5 Semester</option>
                                        <option value="6 Semester">6 Semester</option>
                                        <option value="7 Semester">7 Semester</option>
                                        <option value="8 Semester">8 Semester</option>
                                    </select>
                                </div>
                                <div className="block">
                                    <label htmlFor="major">Majors</label>
                                    <select {...register('major')} className='input-field' name="major" id="major">
                                        <option value="">--Select--</option>
                                        <option value="11th">FSC Pre-Engineering</option>
                                        <option value="11th">FSC Pre-Medical</option>
                                        <option value="BS Computer Science">BS Computer Science</option>
                                        <option value="BS Software Engineering">BS Software Engineering</option>
                                        <option value="BS Information Technology">BS Information Technology</option>
                                        <option value="BS Data Science">BS Data Science</option>
                                        <option value="BS Artificial Intelligence">BS Artificial Intelligence</option>

                                    </select>
                                </div>
                            </div>
                        )
                    }
                    <div className="grid grid-cols-1 py-2">
                        <div className="block">
                            <label htmlFor="address">Address</label>
                            <textarea {...register('address')} name="address" id="address" className='input-field resize-none'></textarea>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 py-2">
                        <div className="block">
                            <label htmlFor="profile">profile</label>
                            <input {...register('profile')} name="profile" id="profile" type='file' accept='image/*' multiple={false} className='file-selection'></input>
                        </div>
                    </div>
                    <button type='submit' className='btn flex justify-center'> {loading ? <span class="loader"></span> : 'Register'}</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToast } from '../context/ToastContext'
import { AppStates } from '../context/AppStates'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
    const navigate = useNavigate()
    const {collapse} = useContext(AppStates)
    const { notifyError, notifySuccess } = useToast()
    const [loading, setLoading] = useState(false)
    const schema = yup.object().shape({
        title: yup.string().required(),
        author: yup.string().required(),
        description: yup.string().required(),
        quantity: yup.string().required(),  // Corrected field name
        status: yup.string().required(),
        publish_date: yup.string().required(),
        category: yup.string().required()
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const AddBookHandler = async (data) => {
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('title', data.title);
            formData.append('author', data.author);
            formData.append('description', data.description);
            formData.append('quantity', data.quantity);
            formData.append('status', data.status);
            formData.append('publish_date', data.publish_date);
            formData.append('category', data.category);
            formData.append('image', data.image[0]);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}books/create_book`,{
                method: 'POST',
                body: formData
            })
            const result = await response.json()
            if(response.ok){
                notifySuccess("New book has been added successfully")
                navigate('/dashboard/all_books')
            }else{
                const firstPropertyArray = Object.values(result)[0][0];
                notifyError(firstPropertyArray);
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='p-5'>
            <div className={`p-5 min-w[300px] bg-white ${collapse ? 'max-w-[600px]': 'max-w-[500px]'} ease-linear duration-200 mx-auto rounded-lg shadow-`}>
                <h2 className="text-lg font-bold text-center">Add Book</h2>
                <form action="" onSubmit={handleSubmit(AddBookHandler)} enctype="multipart/form-data" >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                        <div className="block">
                            <label htmlFor="title">Book Title</label>
                            <input {...register('title')} type="text" name="title" id="title" className='input-field' />
                            {errors.title && <span className='text-red-600'>{errors.title.message}</span>}
                        </div>
                        <div className="block">
                            <label htmlFor="author">Author</label>
                            <input {...register('author')} type="text" name="author" id="author" className='input-field' />
                            {errors.author && <span className='text-red-600'>{errors.author.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                        <div className="block">
                            <label htmlFor="quantity">Copies</label>
                            <input {...register('quantity')} type="text" name="quantity" id="quantity" className='input-field' />
                            {errors.quantity && <span className='text-red-600'>{errors.quantity.message}</span>}
                        </div>
                        <div className="block">
                            <label htmlFor="status">Status</label>
                            <select {...register('status')} className='input-field' name="status" id="status">
                                <option value="">Select</option>
                                <option value="AVAILABLE">Available</option>
                                <option value="LOANED">Loaned</option>
                            </select>
                            {errors.status && <span className='text-red-600'>{errors.status.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                    <div className="block">
                            <label htmlFor="category">Book Category</label>
                            <select {...register('category')} className='input-field' name="category" id="category">
                                <option value="">Select</option>
                                <option value="Business">Business</option>
                                <option value="Accounting">Accounting</option>
                                <option value="Psychology">Psychology</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Coding">Coding</option>
                                <option value="Medical">Medical</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Physics">Physics</option>
                                <option value="Mathematics">Mathematics</option>
                            </select>
                            {errors.category && <span className='text-red-600'>{errors.category.message}</span>}
                        </div>
                        <div className="block">
                            <label htmlFor="date">Publish Date</label>
                            <input {...register('publish_date')} type="date" className='input-field' />
                            {errors.publish_date && <span className='text-red-600'>{errors.publish_date.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 py-2">
                        <div className="block">
                            <label htmlFor="description">Description</label>
                            <textarea {...register('description')} name="description" rows={5} id="description" className='input-field resize-none'></textarea>
                            {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 py-2">
                        <div className="block">
                            <label htmlFor="image">Book Mock</label>
                            <input {...register('image')} name="image" id="image" type='file' accept='image/*' multiple={false} className='file-selection'></input>

                            {errors.image && <span className='text-red-600'>{errors.image.message}</span>}
                        </div>
                    </div>
                    <button type='submit' className='btn flex justify-center'> {loading ? <span class="loader"></span> : 'Add Book'}</button>

                </form>
            </div>
        </div>
    )
}

export default AddBook
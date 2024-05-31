import React, { useEffect, useState } from 'react'
import { X, InfoCircleFill, Trash3Fill } from 'react-bootstrap-icons';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';

const ManageStudent = () => {
    const navigate = useNavigate()
    const { notifySuccess, notifyError } = useToast()
    const [deletePopup, setDeletePopup] = useState(false)
    const [studentCNIC, setStudentCNIC] = useState('')
    const [allStudents, setAllStudents] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });
    const [totalCount, setTotalCount] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [search, setSearch] = useState('')
    const getAllStudents = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/all_students?page=${pagination.page}&page_size=${pagination.pageSize}&search=${search}`)
            const data = await response.json()
            setAllStudents(data.results)
            setTotalCount(data.count)
            setNextPage(data.next);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllStudents()
    }, [pagination, search])
    const handlePagination = (type) => {
        if (type === 'next' && nextPage) {
            setPagination({
                ...pagination,
                page: pagination.page + 1,
            });
        } else if (type === 'previous' && pagination.page > 1) {
            setPagination({
                ...pagination,
                page: pagination.page - 1,
            });
        }
    };
    const handlePageSizeChange = (e) => {
        setPagination({
            ...pagination,
            pageSize: parseInt(e.target.value),
            page: 1
        });
    };
    const showPopup = (studentCNIC) => {
        setDeletePopup(true);
        setStudentCNIC(studentCNIC)
    }
    const deleteStudentHandler = async (studentCNIC) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/delete_student/${studentCNIC}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                notifySuccess('Student is deleted successfully')
                getAllStudents(); // Call getAllStudents again to fetch the updated list
            }
        } catch (error) {
            console.log(error)
        }
    }
        return (
            <div className='p-5'>
                <div className={`p-5 min-w-[300px] bg-white max-w-full ease-linear duration-200 mx-auto rounded-lg shadow-lg`}>
                    <div className="flex items-center justify-end pb-4">
                        <div className="flex border rounded text-sm">
                            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='search by Name' className=' outline-none p-2 h-full  text-gray-800' />
                            <button className='bg-blue-500 px-2 text-white rounded-tr rounded-br'>Search</button>
                        </div>
                    </div>
                    <table className='w-full'>
                        <thead className='border-b'>
                            <tr>
                                <td className='pb-3 px-3 font-[500]'>Sr.No</td>
                                <td className='pb-3 px-3 font-[500]'>Student Name</td>
                                <td className='pb-3 px-3 font-[500]'>Student CNIC</td>
                                <td className='pb-3 px-3 font-[500]'>Email</td>
                                <td className='pb-3 px-3 font-[500]'>Phone</td>
                                <td className='pb-3 px-3 font-[500]'>Address</td>
                                <td className='pb-3 px-3 font-[500]' colSpan={2}>
                                    <button>Action</button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {allStudents.map((student, index) => (
                                <tr className='hover:bg-gray-100 ease-linear duration-200 px-1' key={student.id}>
                                    <td className='py-2 text-center border px-1 text-sm'>{index + 1}</td>
                                    <td className='py-2 border px-1 text-sm'>{student.name}</td>
                                    <td className='py-2 border px-1 text-sm'>{student.cnic}</td>
                                    <td className='py-2 border px-1 text-sm'>{student.email}</td>
                                    <td className='py-2 border px-1 text-sm'>{student.phone}</td>
                                    <td className='py-2 border px-1 text-sm'>{student.address}</td>
                                    <td className='py-2 border px-1 text-sm'>
                                        <div className="flex gap-2 justify-center mx-auto">
                                            <button onClick={()=> navigate(`/dashboard/student_info/${student.cnic}`)} className='bg-blue-500 text-sm rounded p-2 text-white'><InfoCircleFill /></button>
                                            <button onClick={() => showPopup(student.cnic)} className='bg-red-500 text-sm rounded p-2 text-white'><Trash3Fill /></button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex items-center justify-between pt-3 gap-2'>
                        <div>
                            <span>Total Count: {totalCount}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span>Show:</span>
                            <select name='pageSize' value={pagination.pageSize} onChange={handlePageSizeChange} className='w-[50px] border outline-blue-500'>
                                <option value='10'>10</option>
                                <option value='20'>20</option>
                                <option value='40'>40</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button onClick={() => handlePagination('previous')} className='bg-gray-200 px-2 py-1 text-sm rounded-lg text-black'>Prev</button>
                            <span className='mx-2'>{pagination.page}</span>
                            <button onClick={() => handlePagination('next')} className={`bg-gray-200 px-2 py-1 text-sm rounded-lg text-black ${nextPage ? '' : 'pointer-events-none opacity-50'}`} disabled={!nextPage}>Next</button>
                        </div>
                    </div>
                </div>
                {
                    deletePopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ease-linear duration-200">
                        <div className="bg-white rounded shadow-lg min-w-[320px] md:w-[450px] max-w-[500px] ease-linear duration-200 py-2 px-3">
                            <div className="p-2">
                                <div className='flex items-center justify-between border-b pb-2'>
                                    <h2 className="text-xl font-[600]">Confirmation</h2>
                                    <button onClick={() => setDeletePopup(false)} className="bg-none"><X size={30} /> </button>
                                </div>
                            </div>
                            <div className='p-3'>
                                <p className="mb-4">Are you sure want to delete this Student?</p>
                                <div className='flex justify-end gap-2'>
                                    <button onClick={() => setDeletePopup(false)} className="px-2 py-1 bg-gray-200 text-sm text-gray-800 rounded">Cancel</button>
                                    <button onClick={() => {
                                    deleteStudentHandler(studentCNIC)
                                    setDeletePopup(false)
                                    }
                                    } className="px-2 py-1 bg-red-500 text-sm text-white rounded">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }

    export default ManageStudent
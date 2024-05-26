import React, {useState, useEffect} from 'react'
import { useToast } from '../context/ToastContext'
import moment from 'moment'

const AllocatedBooks = () => {
    const [students, setStudents] = useState({});
    const [books, setBooks] = useState({});
    const { notifySuccess, notifyError } = useToast()
    const [search, setSearch] = useState('')
    const [showPopup, setShowPopUp] = useState(false)
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });
    const [LoanedBooks, setAllLoanedBooks] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const fetchLoanedBooks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}loan/get_allocated_books?page=${pagination.page}&page_size=${pagination.pageSize}&search=${search}`);
            const data = await response.json();
            console.log(data.results)
            setAllLoanedBooks(data.results);
            setTotalCount(data.count);
            setNextPage(data.next);

            // fetch student and book data based on IDs
            // const studentId = new Set(data.results.map(loan=> loan.student))
            // const bookId = new Set(data.results.map(loan => loan.book))
            // await fetchStudentData(Array.from(studentId))
            // await fetchBookData(Array.from(bookId))
            
        } catch (error) {
            console.log(error);
        }
    };
    // const fetchStudentData = async (studentIds) => {
    //     try {
    //         const queryParams = new URLSearchParams({student_ids: studentIds})
    //         console.log(studentIds)
    //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/get_student_list?${queryParams}`);
    //         const data = await response.json();
    //         console.log(data)
    //         setStudents(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const fetchBookData = async (bookIds) => {
    //     try {
    //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}books?id=${bookIds.join(',')}`);
    //         const data = await response.json();
    //         setBooks(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    useEffect(() => {
        fetchLoanedBooks();
    }, [pagination, search]);

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
  return (
    <div className='p-5'>
        <div className={`p-5 min-w-[300px] bg-white max-w-full ease-linear duration-200 mx-auto rounded-lg shadow-lg`}>
                <div className="flex items-center justify-end pb-4">
                    <div className="flex border rounded text-sm">
                        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Type Searching' className=' outline-none p-2 h-full  text-gray-800' />
                        <button className='bg-blue-500 px-2 text-white rounded-tr rounded-br'>Search</button>
                    </div>
                </div>
                <table className='w-full'>
                    <thead className='border-b'>
                        <tr>
                            <td className='pb-3 px-3 font-[500]'>Sr.No</td>
                            <td className='pb-3 px-3 font-[500]'>Student Name</td>
                            <td className='pb-3 px-3 font-[500]'>Student CNIC</td>
                            <td className='pb-3 px-3 font-[500]'>Books</td>
                            <td className='pb-3 px-3 font-[500]'>Status</td>
                            <td className='pb-3 px-3 font-[500]'>Loaned Date</td>
                            <td className='pb-3 px-3 font-[500]'>Due Date</td>
                            <td className='pb-3 px-3 font-[500]'>Return Date</td>
                            <td className='pb-3 px-3 font-[500]'>Fine</td>
                            <td className='pb-3 px-3 font-[500]'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {LoanedBooks.map((book, index) => (
                            <tr className='hover:bg-gray-50 ease-linear duration-200 px-1' key={book.id}>
                                <td className='py-1 border px-1 text-sm'>{book.id}</td>
                                <td className='py-1 border px-1 text-sm'>{book.student_data.name}</td>
                                <td className='py-1 border px-1 text-sm'>{book.student_data.cnic}</td>
                                <td className='py-1 border px-1 text-sm'>{book.book_data.title}</td>
                                <td className='py-1 border px-1 text-sm'>{`${book.status.charAt(0).toUpperCase()}${book.status.slice(1).toLowerCase()}`}</td>
                                <td className='py-1 border px-1 text-sm'>{moment(book.loan_date).format('ddd, DD-MMM-YYYY')}</td>
                                <td className='py-1 border px-1 text-sm'>{moment(book.due_date).format('ddd, DD-MMM-YYYY')}</td>
                                <td className='py-1 border px-1 text-sm'>{book.return_date && moment(book.return_date).format('ddd, DD-MMM-YYYY')}</td>
                                <td className='py-1 border px-1 text-sm'>{book.fine}</td>
                                <td className='py-1 border px-1 text-sm'>
                                    <button  className='bg-blue-500 px-2 py-1 text-sm rounded text-white'>Received</button>
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
                            <option value='1'>10</option>
                            <option value='2'>20</option>
                            <option value='4'>40</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => handlePagination('previous')} className='bg-gray-200 px-2 py-1 text-sm rounded-lg text-black'>Prev</button>
                        <span className='mx-2'>{pagination.page}</span>
                        <button onClick={() => handlePagination('next')} className={`bg-gray-200 px-2 py-1 text-sm rounded-lg text-black ${nextPage ? '' : 'pointer-events-none opacity-50'}`} disabled={!nextPage}>Next</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AllocatedBooks
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PencilFill, Trash2Fill, Trash3Fill, X } from 'react-bootstrap-icons';
import { BookContext } from '../context/BookCart';
import { useToast } from '../context/ToastContext';

const AllBooks = () => {
    const { bookList, setBookList } = useContext(BookContext)
    const { notifySuccess, notifyError } = useToast()
    const [search, setSearch] = useState('')
    const [deletePopup, setDeletePopup] = useState(false)
    const [bookID, setBookID] = useState(null)
    const [bookData, setBookData] = useState()
    const [showPopup, setShowPopUp] = useState()
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });
    const [books, setAllBooks] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const fetchAllBooks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}books/get_all_books?page=${pagination.page}&page_size=${pagination.pageSize}&search=${search}`);
            const data = await response.json();
            setAllBooks(data.results);
            setTotalCount(data.count);
            setNextPage(data.next);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllBooks();
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



    const detailHandler = (book) => {
        setShowPopUp(true)
        setBookData(book)
    }

    const deletePopupHandler = (bookId) => {
        setBookID(bookId)
        setDeletePopup(true)
    }


    const deleteBook = async (bookId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}books/delete_book/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 204) {
                // Successfully deleted, refetch the book list
                fetchAllBooks();
            } else {
                console.error('Failed to delete the book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const AddBookToCart = (bookData) => {
        const existingBook = JSON.parse(localStorage.getItem("bookList")) || [];
        const existingBookInLocalState = bookList.find(book => book.id === bookData.id);
      
        if (existingBookInLocalState) {
          notifyError('Book already in the cart');
          setShowPopUp(false);
          return;
        }
        const updatedBookList = [...existingBook, bookData];
        setBookList(updatedBookList);
        localStorage.setItem("bookList", JSON.stringify(updatedBookList));
        notifySuccess('Book is ready to Allocate');
        setShowPopUp(false);
      };
    return (
        <div className='p-5'>
            <div className={`p-5 min-w-[300px] bg-white max-w-full ease-linear duration-200 mx-auto rounded-lg shadow-`}>
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
                            <td className='pb-3 px-3 font-[500]'>Title</td>
                            <td className='pb-3 px-3 font-[500]'>Author</td>
                            <td className='pb-3 px-3 font-[500]'>Category</td>
                            <td className='pb-3 px-3 font-[500]'>Status</td>
                            <td className='pb-3 px-3 font-[500]'>Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr className='hover:bg-gray-50 ease-linear duration-200 px-2' key={book.id}>
                                <td className='py-1 border px-3'>{book.id}</td>
                                <td className='py-1 border px-3'>{book.title}</td>
                                <td className='py-1 border px-3'>{book.author}</td>
                                <td className='py-1 border px-3'>{book.category}</td>
                                <td className='py-1 border px-3'>{`${book.status.charAt(0).toUpperCase()}${book.status.slice(1).toLowerCase()}`}</td>
                                <td className='py-1 border px-3'>
                                    <button onClick={() => detailHandler(book)} className='bg-blue-500 px-2 py-1 text-sm rounded text-white'>Details</button>
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
                showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ease-linear duration-200">
                        <div className="bg-white rounded shadow-lg min-w-[320px] md:w-[800px] max-w-[800px] ease-linear duration-200">
                            <div className="flex items-center justify-end">
                                <button onClick={() => setShowPopUp(false)} className="bg-none p-2"><X size={30} /> </button>
                            </div>
                            <div className="flex py-2 px-4 ">
                                <div className='w-[400px] h-[400px]'>
                                    <img className='' src={`${process.env.REACT_APP_BACKEND_URL}${bookData.image.slice(1)}`} alt="" />
                                </div>
                                <div className='w-[800px]'>
                                    <h2 className="text-lg font-[600]">{bookData.title}</h2>
                                    <h3 className="text-gray-500 font-[400]">Written by {bookData.author}</h3>
                                    <div className='bg-gray-50 p-2 my-2 max-h-[300px] overflow-y-scroll rounded w-full'>
                                        <h2 className="font-[500]">Description:</h2>
                                        <p className='text-gray-500 text-justify text-sm'>{bookData.description}</p>
                                    </div>
                                    <h3 className="text-gray-500 font-[400]">Total Copies in Library: {bookData.quantity}</h3>

                                    <div className="flex gap-3 items-center py-3">
                                        <button onClick={() => AddBookToCart(bookData)} className='bg-blue-600 rounded text-sm  text-white px-2 py-1 flex items-center gap-2'><ArrowRight /> Allocate</button>
                                        <button onClick={() => deletePopupHandler(bookData.id)} className='bg-red-600 rounded text-sm  text-white px-2 py-1 flex items-center gap-2'><Trash3Fill /> Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                deletePopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ease-linear duration-200">
                        <div className="bg-white rounded shadow-lg min-w-[320px] md:w-[400px] max-w-[400px] ease-linear duration-200">
                            <div className="p-2">
                                <div className='flex items-center justify-between border-b pb-2'>
                                    <h2 className="text-xl font-[600]">Confirmation</h2>
                                    <button onClick={() => setDeletePopup(false)} className="bg-none"><X size={30} /> </button>
                                </div>
                            </div>
                            <div className='p-3'>
                                <p className="mb-4">Are you sure want to delete this book?</p>
                                <div className='flex justify-end gap-2'>
                                    <button onClick={() => setDeletePopup(false)} className="px-2 py-1 bg-gray-200 text-sm text-gray-800 rounded">Cancel</button>
                                    <button onClick={() => {
                                        deleteBook(bookID)
                                        setDeletePopup(false)
                                        setShowPopUp(false)
                                    }
                                    } className="px-2 py-1 bg-red-500 text-sm text-white rounded">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AllBooks;

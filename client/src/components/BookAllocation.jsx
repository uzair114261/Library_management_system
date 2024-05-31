import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookCart';
import { X } from 'react-bootstrap-icons';
import ReactInputMask from 'react-input-mask';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const BookAllocation = () => {
    const navigate = useNavigate()
    const { notifyError, notifySuccess } = useToast();
    const { bookList, setBookList } = useContext(BookContext);
    const [searchVal, setSeachVal] = useState('');
    const [student, setStudent] = useState(null);
    const [showPopup, setShowPopUp] = useState(false);
    const [showStudent, setShowStudent] = useState(false);
    const [returnDate, setReturnDate] = useState('');

    const removeBook = (bookID) => {
        const newList = bookList.filter((book) => book.id !== bookID);
        setBookList(newList);
        localStorage.setItem('bookList', JSON.stringify(newList));
    };

    const fetchStudentDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/get_student/${searchVal}`);
            const data = await response.json();
            setStudent(data);
            calculateReturnDate(bookList.length);
            if (!response.ok) {
                setShowStudent(false);
                notifyError(data.error);
            }
            if (response.ok) {
                setShowStudent(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const calculateReturnDate = (numberOfBooks) => {
        const currentDate = new Date();
        const returnDate = new Date(currentDate.setDate(currentDate.getDate() + numberOfBooks * 10));
        const formattedDate = returnDate.toISOString(); // Format to ISO string
        setReturnDate(formattedDate);
    };

    useEffect(() => {
        calculateReturnDate(bookList.length);
    }, [bookList]);

    const handleSearch = () => {
        fetchStudentDetails();
    };

    const allocateBook = async () => {
        const bookIds = bookList.map(book => book.id);
        const payload = {
            student_cnic: searchVal,
            book_ids: bookIds,
            due_date: returnDate
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/allocate_book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                notifySuccess("Books allocated successfully");
                setBookList([]);
                localStorage.removeItem('bookList');
                setShowPopUp(false);
                navigate('/dashboard/allocated_books')
            } else {
                notifyError(data.error);
                setBookList([])
                localStorage.removeItem('bookList')
                setShowPopUp(false)
                navigate('/dashboard/all_books')
            }
        } catch (error) {
            console.log(error);
            notifyError("Failed to allocate books");
        }
    };


    return (
        <div className="p-5">
            <h2 className="text-xl font-bold">Book to be Allocated to Student</h2>
            <div className="mt-4 p-5 min-w[300px] bg-white max-w-full ease-linear duration-200 mx-auto rounded-lg shadow-">
                {bookList.length > 0 ? (
                    <ol className="list-decimal px-4 py-5">
                        {bookList.map((book) => (
                            <li key={book.id} className="py-2 flex justify-between items-center">
                                <span>{book.title}  <b>by "{book.author}"</b></span>
                                <button onClick={() => removeBook(book.id)}>
                                    <X size={25} />
                                </button>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <div className="">
                        <h3 className="font-[500]">No Book to be Allocated</h3>
                    </div>
                )}
            </div>
            <div className="p-3">
                <h2 className="text-xl font-bold">Search for Student</h2>
                <div className="flex truncate rounded text-sm my-2">
                    <ReactInputMask
                        mask={`99999-9999999-9`}
                        maskChar={`_`}
                        onChange={(e) => setSeachVal(e.target.value)}
                        type="text"
                        placeholder="Search by CNIC"
                        className=" outline-blue-500 p-2 h-full text-gray-800"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 px-2 text-white rounded-tr rounded-br">
                        Search
                    </button>
                </div>
            </div>
            {showStudent && (
                <div className="p-3 ">
                    <div className="bg-white w-[300px] relative p-5 rounded-lg shadow-lg">
                        <div className='absolute top-3 right-3 bg-blue-500 rounded text-[10px] text-white p-1'>{student.standard}</div>
                        <h2 className="text-sm font-bold py-2">Student Details</h2>
                        <div className="text-gray-800 font-[500] text-lg">{student.name}</div>
                        <p className='text-sm text-gray-500'>{student.phone}</p>
                        <p className='text-sm text-gray-500'>{student.major}</p>
                        <p className='text-sm text-gray-500'>{student.address}</p>
                        <button
                            disabled={bookList.length === 0}
                            onClick={() => setShowPopUp(true)}
                            className="bg-blue-500 mt-4 py-1 px-2 text-white rounded text-sm disabled:bg-sky-400"
                        >
                            Allocate Book
                        </button>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ease-linear duration-200">
                    <div className="bg-white rounded shadow-lg min-w-[320px] md:w-[800px] max-w-[600px] ease-linear duration-200">
                        <div className="px-5">
                            <div className="border-b flex items-center justify-between">
                                <h1 className="text-xl font-[600]">Instructions</h1>
                                <button onClick={() => setShowPopUp(false)} className="bg-none p-2"><X size={30} /></button>
                            </div>
                        </div>
                        <div className="px-5">
                            <ol className="list-decimal px-5 py-4">
                                <li>{student?.name} is taking {bookList.length > 1 ? 'these books' : 'this book'}.</li>
                                <ol className="list-disc px-4 py-2">
                                    {bookList.map((book) => (
                                        <li key={book.id} className="flex justify-between items-center">
                                            <span>{book.title}</span>
                                        </li>
                                    ))}
                                </ol>
                                <li>You have to return {bookList.length > 1 ? 'these books' : 'this book'} by {new Date(returnDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</li>
                                <li>You will be charged a fine of 100 rupees each day if you do not return it on the specified date</li>
                            </ol>
                        </div>
                        <div className="px-5 py-4 flex items-center gap-2">
                            <button onClick={allocateBook} className="bg-blue-500 p-2 rounded text-sm text-white">Allocate</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookAllocation;

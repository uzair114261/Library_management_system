import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import moment from 'moment';
import { CheckLg } from 'react-bootstrap-icons';
import _ from 'lodash';

const AllocatedBooks = () => {
    const renderCount = useRef(0)
    renderCount.current += 1
    const { notifySuccess, notifyError } = useToast();
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
    const [LoanedBooks, setAllLoanedBooks] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [nextPage, setNextPage] = useState(null);

    const fetchLoanedBooks = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}loan/get_allocated_books?page=${pagination.page}&page_size=${pagination.pageSize}&search=${search}`);
            const data = await response.json();
            setAllLoanedBooks(data.results);
            setTotalCount(data.count);
            setNextPage(data.next);
        } catch (error) {
            notifyError('Failed to fetch loaned books.');
        }
    }, [pagination.page, pagination.pageSize, search, notifyError]);

    useEffect(() => {
        fetchLoanedBooks();
    }, [fetchLoanedBooks]);

    const handlePagination = useCallback((type) => {
        setPagination((prev) => ({
            ...prev,
            page: type === 'next' && nextPage ? prev.page + 1 : type === 'previous' && prev.page > 1 ? prev.page - 1 : prev.page,
        }));
    }, [nextPage]);

    const handlePageSizeChange = useCallback((e) => {
        setPagination({ page: 1, pageSize: parseInt(e.target.value) });
    }, []);

    const debouncedSetSearch = _.debounce(setSearch, 300);

    const handleReturnBook = useCallback(async (loanBookID) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}loan/return_book/${loanBookID}`, { method: 'POST' });
            if (response.ok) {
                notifySuccess('Book has been returned successfully');
                fetchLoanedBooks();
            } else {
                notifyError('Failed to return book.');
            }
        } catch (error) {
            notifyError('An error occurred while returning the book.');
        }
    }, [fetchLoanedBooks, notifySuccess, notifyError]);

    const calculateFine = useMemo(() => (dueDate, returnDate) => {
        const dueDateTime = new Date(dueDate);
        const returnDateTime = new Date(returnDate);
        const dayDifference = Math.ceil((returnDateTime - dueDateTime) / (1000 * 60 * 60 * 24));
        return dayDifference > 0 ? dayDifference * 100 : 0;
    }, []);

    console.log(`This componet is rendered ${renderCount.current} times`)
    return (
        <div className="p-5">
            <div className="p-5 min-w-[300px] bg-white dark:bg-slate-700 dark:text-white max-w-full ease-linear duration-200 mx-auto rounded-lg shadow-lg">
                <div className="flex items-center justify-end pb-4">
                    <div className="flex border rounded text-sm">
                        <input
                            onChange={(e) => debouncedSetSearch(e.target.value)}
                            type="text"
                            placeholder="Type Searching"
                            className="outline-none p-2 h-full dark:bg-slate-800 dark:text-white text-gray-800"
                        />
                        <button className="bg-blue-500 px-2 text-white rounded-tr dark:bg-white dark:text-gray-900 rounded-br">
                            Search
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="border-b">
                            <tr>
                                <td className="pb-3 px-3 font-[500]">Sr.No</td>
                                <td className="pb-3 px-3 font-[500]">Student Name</td>
                                <td className="pb-3 px-3 font-[500]">Student CNIC</td>
                                <td className="pb-3 px-3 font-[500]">Books</td>
                                <td className="pb-3 px-3 font-[500]">Status</td>
                                <td className="pb-3 px-3 font-[500]">Loaned Date</td>
                                <td className="pb-3 px-3 font-[500]">Due Date</td>
                                <td className="pb-3 px-3 font-[500]">Return Date</td>
                                <td className="pb-3 px-3 font-[500]">Fine</td>
                                <td className="pb-3 px-3 font-[500]">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {LoanedBooks.map((book, index) => (
                                <tr className="hover:bg-gray-50 dark:hover:bg-slate-800 ease-linear duration-200 px-1" key={book?.id}>
                                    <td className="py-1 border px-1 text-sm">{book.id}</td>
                                    <td className="py-1 border px-1 text-sm">{book.student_data.name}</td>
                                    <td className="py-1 border px-1 text-sm">{book.student_data.cnic}</td>
                                    <td className="py-1 border px-1 text-sm">{book.book_data.title}</td>
                                    <td className="py-1 border px-1 text-sm">{`${book.status.charAt(0).toUpperCase()}${book.status.slice(1).toLowerCase()}`}</td>
                                    <td className="py-1 border px-1 text-sm">{moment(book.loan_date).format('ddd, DD-MMM-YYYY')}</td>
                                    <td className="py-1 border px-1 text-sm">{moment(book.due_date).format('ddd, DD-MMM-YYYY')}</td>
                                    <td className="py-1 border px-1 text-sm">{book.return_date && moment(book.return_date).format('ddd, DD-MMM-YYYY')}</td>
                                    <td className="py-1 border px-1 text-sm">
                                        {calculateFine(
                                            moment(book.due_date).format('YYYY-MM-DD'),
                                            book.return_date ? moment(book.return_date).format('YYYY-MM-DD') : null
                                        )}
                                    </td>
                                    <td className="py-1 border px-1 text-sm">
                                        <button disabled={book.status === 'RETURNED'} onClick={() => handleReturnBook(book.id)} className={`${book.status === "BORROWED" ? 'bg-blue-500' : 'bg-green-500'} px-2 py-1 w-full flex items-center justify-center mx-auto text-sm rounded text-white`}>
                                            {book.status === 'BORROWED' ? 'Receive' : <CheckLg />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between pt-3 gap-2">
                    <div>
                        <span>Total Count: {totalCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Show:</span>
                        <select name="pageSize" value={pagination.pageSize} onChange={handlePageSizeChange} className="w-[50px] border dark:bg-slate-800 outline-blue-500">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handlePagination('previous')} className={`bg-gray-200 px-2 py-1 text-sm rounded-lg text-black ${pagination.page <= 1 && 'opacity-50 cursor-not-allowed'}`} disabled={pagination.page <= 1}>
                            Prev
                        </button>
                        <span className="mx-2">{pagination.page}</span>
                        <button onClick={() => handlePagination('next')} className={`bg-gray-200 px-2 py-1 text-sm rounded-lg text-black ${!nextPage && 'opacity-50 cursor-not-allowed'}`} disabled={!nextPage}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(AllocatedBooks);

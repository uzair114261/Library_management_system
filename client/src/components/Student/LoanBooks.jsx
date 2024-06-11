import React, { useEffect, useState } from 'react'
import moment from 'moment'

const LoanBooks = () => {
    const [loans, setLoans] = useState([])
    const [loading, setLoading] = useState(false)
    const studentData = localStorage.getItem('studentData')
    const {cnic} = studentData ? JSON.parse(studentData) : {}
    const [search, setSearch] = useState('')
    const fetchAllLoans = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}loan/student/${cnic}`)
            const data = await response.json()
            setLoans(data.results)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchAllLoans()
    }, [])
    const borrowedBooks = loans.filter(loan => loan.status === 'BORROWED');
    const overdueBooks = loans.filter(loan => loan.status === 'OVERDUE');
    const filteredLoans = loans.filter(loan => loan.book_data.title.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className='container mx-auto'>
            <div className="p-5 bg-white dark:bg-slate-700 dark:text-white rounded-lg mt-3">
                {borrowedBooks.length > 0 || overdueBooks.length > 0 ? (
                    <div className=''>
                        {borrowedBooks.length > 0 && (
                            <div className="">
                                <p>You have the following books to return before the due date:</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-5">
                                    {borrowedBooks.map((loan, index) => (
                                        <div key={loan.id} className='border rounded-lg p-2 mb-2'>
                                            <p><strong>{index + 1}. Book Name:</strong> {loan.book_data.title}</p>
                                            <p><strong>Author Name:</strong> {loan.book_data.author}</p>
                                            <p><strong>Issue Date:</strong> {moment(loan.loan_date).format('ddd, DD-MM-YYYY')}</p>
                                            <p><strong>Due Date:</strong> {moment(loan.due_date).format('ddd, DD-MM-YYYY')}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {overdueBooks.length > 0 && (
                            <div className="">
                                <p>Please return the following books as soon as possible and pay the fine:</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-5">
                                    {overdueBooks.map((loan, index) => (
                                        <div key={loan.id} className='border p-2 mb-2'>
                                            <p><strong>{index + 1}. Book Name:</strong> {loan.book_data.title}</p>
                                            <p><strong>Author Name:</strong> {loan.book_data.author}</p>
                                            <p><strong>Issue Date:</strong> {moment(loan.loan_date).format('ddd, DD-MM-YYYY')}</p>
                                            <p><strong>Due Date:</strong> {moment(loan.due_date).format('ddd, DD-MM-YYYY')}</p>
                                            <p><strong>Fine:</strong> {loan.fine}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>You have no books to return. Thank you.</p>
                )}
            </div>
            <h1 className='text-center font-[600] text-3xl py-5 dark:text-white'>Loan History</h1>
            <div className="flex justify-end px-4 py-4">
                <input type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)} className='p-2 dark:outline-none dark:border-white dark:text-gray-900 dark:bg-slate-700 border rounded outline-blue-500 my-2' />
            </div>
            <div className='pb-5 overflow-x-auto'>
                <table className='min-w-full dark:text-white'>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Return Date</th>
                            <th>Fine</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredLoans.length > 0 ? (
                                <>
                                    {filteredLoans.map((loan, index) => (
                                        <tr key={loan.id} className='border p-2'>
                                            <td className='px-2 text-sm py-2 border'>{index + 1}</td>
                                            <td className='px-2 text-sm py-2 border'>{loan.book_data.title}</td>
                                            <td className='px-2 text-sm py-2 border'>{loan.book_data.author}</td>
                                            <td className='px-2 text-sm py-2 border'>{moment(loan.loan_date).format('ddd, DD-MM-YYYY')}</td>
                                            <td className='px-2 text-sm py-2 border'>{moment(loan.due_date).format('ddd, DD-MM-YYYY')}</td>
                                            <td className='px-2 text-sm py-2 border'>{loan.return_date && moment(loan.return_date).format('ddd, DD-MM-YYYY')}</td>
                                            <td className='px-2 text-sm py-2 border'>{loan.fine}</td>
                                            <td className='px-2 text-sm py-2 border'>{loan.status.charAt(0).toUpperCase() + loan.status.slice(1).toLowerCase()}</td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr className=''>
                                    <td colSpan={6} className='text-center py-5'>
                                        <div className='mx-auto w-300px'>
                                            No data to show
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default LoanBooks
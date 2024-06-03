import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home h-screen w-screen flex items-center justify-center py-4 px-4 overflow-y-scroll'>
            <div className="bg-white p-2 rounded border min-w-[300px] max-w-[700px] relative z-10 slide-up">
                <h1 className='text-center font-[800] text-[25px] py-2'>Library Management System</h1>
                <div className="p-2">
                    <p className='text-sm text-justify'>
                        The Library Management System is an innovative platform designed to streamline the management of library resources and services. It offers a comprehensive suite of features, including book cataloging, user management, and loan tracking. Users can easily search for, borrow, and return books, while administrators can efficiently oversee inventory, update book availability, and monitor overdue items. The system also includes advanced functionalities like fine calculation, real-time analytics, and server-side pagination for seamless data handling. With a user-friendly interface and robust backend support, this system enhances the overall efficiency and user experience of library operations.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <button 
                        className='p-2 rounded text-sm bg-blue-500 text-white border ease-linear duration-200 hover:bg-blue-700'
                        onClick={() => navigate('/admin_login')}
                    >
                        Login as Admin
                    </button>
                    <button 
                        className='p-2 rounded text-sm text-gray-800 border ease-linear duration-200 hover:bg-gray-100'
                        onClick={() => navigate('/student_login')}
                    >
                        Login as Student
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;

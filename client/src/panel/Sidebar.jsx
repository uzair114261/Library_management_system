import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { List,X, BarChartFill, PeopleFill, BookFill } from "react-bootstrap-icons";
import { AppStates } from "../context/AppStates";
import { BookContext } from "../context/BookCart";

const Sidebar = () => {
    const location = useLocation()
    const { collapse, setCollapse } = useContext(AppStates);
    useEffect(()=>{
        if(window.matchMedia('(max-width: 768px').matches){
            setCollapse(true)
        }
    },[location])
    const {bookList} = useContext(BookContext)
    return (
        <div
        className={`fixed md:relative ${
            collapse ? "w-[50px] md:w-[5%]" : "w-[200px] md:w-[15%]"
        } ease-linear duration-200 bg-blue-500 dark:bg-slate-800 h-full z-10`}
    >
        <div className={`flex items-center my-3 ${collapse ? 'justify-center' : 'justify-between'} p-2 text-white`}>
            <h1 className={`font-[600] text-xl px-2 ${collapse ? 'hidden' : 'block'}`}>Dashboard</h1>
        </div>
            <div className="py-2 mt-10">
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard/analytics"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="w-[50px] mx-auto flex justify-end">
                                <BarChartFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
                            </div>
                            <div className="w-[80%]">
                                <p className={`${collapse && "hidden"}`}>Analytics</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/allocate_book"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center     ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="   w-[50px] mx-auto flex justify-end relative">
                                <BookFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
                                {bookList.length > 0 && (
                                    <span className="bg-red-500 rounded-full px-1 absolute top-[-8px] right-[-10px] text-[10px] text-white">{bookList.length}</span>
                                )}
                            </div>
                            <div className="w-[80%]">
                                <p className={`${collapse && "hidden"}`}>Allocate Books</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/allocated_books"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center     ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="   w-[50px] mx-auto flex justify-end">
                                <BookFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
                            </div>
                            <div className="w-[80%]">
                                <p className={`${collapse && "hidden"}`}>Books Allocated</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/add_book"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center     ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="   w-[50px] mx-auto flex justify-end">
                                <BookFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
                            </div>
                            <div className="w-[80%]">
                                <p className={`${collapse && "hidden"}`}>Add Book</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/all_books"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center     ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="   w-[50px] mx-auto flex justify-end">
                                <BookFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
                            </div>
                            <div className="w-[80%]">
                                <p className={`${collapse && "hidden"}`}>All Books</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/add_user"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center     ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="   w-[50px] mx-auto flex justify-end">
                                <PeopleFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
                            </div>
                            <div className="w-[80%]">
                                <p className={`${collapse && "hidden"}`}>Add New User</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/manage_students"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center     ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="   w-[50px] mx-auto flex justify-end">
                                <PeopleFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
                            </div>
                            <div className="w-[80%]">
                                <p className={`${collapse && "hidden"}`}>Manage Students</p>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { List,X, BarChartFill, PeopleFill, BookFill } from "react-bootstrap-icons";
import { AppStates } from "../context/AppStates";

const Sidebar = () => {
    const { collapse, setCollapse } = useContext(AppStates);
    return (
        <div
            className={`${
                collapse ? "w-[50px] md:w-[5%]" : "w-[200px] md:w-[15%]"
            } ease-linear duration-200 bg-blue-500 h-full`}
        >
            <div className={`flex items-center ${collapse ? 'justify-center': 'justify-between'} p-2 text-white`}>
                <h1 className={`font-[600] text-xl px-2 ${collapse ? 'hidden':'block'}`}>Dashboard</h1>
                <button onClick={() => setCollapse(!collapse)}>
                    {
                        collapse ? (<List size={30} />) : (<X size={30}/>)
                    }
                    
                    
                </button>
            </div>
            <div className="py-2 mt-2">
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard/"
                            exact
                            className={({ isActive }) =>
                                `flex items-center ${collapse ? '':'gap-3'} p-2 justify-center ${
                                    isActive ? 'bg-gray-50 text-black' : 'text-white hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            <div className="   w-[50px] mx-auto flex justify-end">
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
                            <div className="   w-[50px] mx-auto flex justify-end">
                                <BookFill className={({ isActive }) => (isActive ? 'text-black' : 'text-white')} />
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
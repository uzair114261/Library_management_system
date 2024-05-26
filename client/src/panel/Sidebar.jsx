import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { List, BarChartFill, PeopleFill, BookFill } from "react-bootstrap-icons";
import { AppStates } from "../context/AppStates";

const Sidebar = () => {
    const { collapse, setCollapse } = useContext(AppStates);
    return (
        <div
            className={`${
                collapse ? "w-[50px] md:w-[5%]" : "w-[200px] md:w-[20%]"
            } ease-linear duration-200 bg-blue-500 h-full`}
        >
            <div className="flex justify-end p-2">
                <button onClick={() => setCollapse(!collapse)}>
                    <List size={30} color="white" />
                </button>
            </div>
            <div className="py-2">
                <ul>
                    <li>
                        <NavLink
                        activeClassName="active-link"
                            to="/dashboard/analytics"
                            className="flex items-center gap-5 p-2 justify-center hover:bg-gray-50 my-2 text-white hover:text-black"
                        >
                            <BarChartFill className="" />
                            <p className={`${collapse && "hidden"} `}>Analytics</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="active-link"
                            to="/dashboard/allocate_book"
                            className="flex items-center gap-5 p-2 justify-center hover:bg-gray-50 my-2 text-white hover:text-black"
                        >
                            <BookFill className="" />
                            <p className={`${collapse && "hidden"} `}>Allocate Books</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="active-link"
                            to="/dashboard/allocated_books"
                            className="flex items-center gap-5 p-2 justify-center hover:bg-gray-50 my-2 text-white hover:text-black"
                        >
                            <BookFill className="" />
                            <p className={`${collapse && "hidden"} `}>Books Allocated</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="active-link"
                            to="/dashboard/add_book"
                            className="flex items-center gap-5 p-2 justify-center hover:bg-gray-50 my-2 text-white hover:text-black"
                        >
                            <BookFill className="" />
                            <p className={`${collapse && "hidden"} `}>Add Book</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        activeClassName="active-link"
                            to="/dashboard/all_books"
                            className="flex items-center gap-5 p-2 justify-center hover:bg-gray-50 my-2 text-white hover:text-black"
                        >
                            <BookFill className="" />
                            <p className={`${collapse && "hidden"} `}>All Books</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="active-link"
                            to="/dashboard/add_user"
                            className="flex items-center gap-5 p-2 justify-center hover:bg-gray-50 my-2 text-white hover:text-black"
                        >
                            <PeopleFill className="" />
                            <p className={`${collapse && "hidden"} `}>Add New User</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

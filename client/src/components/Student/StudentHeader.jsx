import React, { useEffect, useState, useRef } from "react";
import { X, List } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../../context/DarkModeToggle";

function StudentHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const studentData = localStorage.getItem('studentData')
  const {image} = studentData ? JSON.parse(studentData) : {}

  const logoutHandler = () => {
    localStorage.removeItem("studentData");
    localStorage.removeItem("StudentRefresh");
    localStorage.removeItem("StudentAccess");
    navigate("/");
  };

  useEffect(() => {
    setIsOpen(false);
    setDropdown(false)
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location]);

  return (
    <div className=" left-0 right-0 flex bg-blue-500 dark:bg-slate-800">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3 px-2">
          <Link to="/student_panel">
            <h5 className="text-xl fon-bold text-white">
              Library Management System
            </h5>
          </Link>
          <div className="hidden md:block">
            <Link className="mx-2 text-white" to="/student_panel/books_available">
              Books Available
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} color="#FFF" /> : <List size={22} color="#FFF" />}
            </div>

            <div className="relative" ref={dropdownRef}>
              <div className="h-[40px] w-[40px] cursor-pointer" onClick={() => setDropdown(!dropdown)}>
                <img className="h-full w-full rounded-full" src={`${process.env.REACT_APP_BACKEND_URL}${image}`} alt="" />
              </div>
              {dropdown && (
                <div className="dropdown z-50 absolute right-[-1px] md:left-[-140px] mt-2 rounded-lg dark:bg-slate-700 border border-gray-200 w-[200px] bg-white py-2 px-1">
                  <ul className="mt-2">
                    <li className="hover:bg-gray-200 py-1 px-2 ease-linear duration-200 rounded hover:text-gray-800">
                      <button onClick={() => navigate('/student_panel/update_profile')} className="w-full text-left dark:text-white dark:hover:text-gray-900">Update Profile</button>
                    </li>
                    <li className="hover:bg-gray-200 py-1 px-2 ease-linear duration-200 rounded hover:text-gray-800">
                      <DarkModeToggle /> 
                    </li>
                    <li className="hover:bg-gray-200 py-1 px-2 ease-linear duration-200 rounded hover:text-gray-800">
                      <button onClick={logoutHandler} className="w-full text-left dark:text-white dark:hover:text-gray-900">Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {isOpen && (
            <div className="bg-slate-200 dark:bg-gray-800 fixed left-0 right-0 top-[65px] h-[calc(100vh-65px)] flex items-center justify-center overflow-y-auto">
              <div className=" flex flex-col gap-3 py-3 w-full px-3">
                <Link className="bg-blue-500 sm:mx-2 text-white dark:text-black dark:bg-white rounded py-3 text-center" to="/student_panel/books_available">
                  Books Available
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentHeader;

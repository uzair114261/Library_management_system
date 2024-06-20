// Navbar.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { BookHalf, X, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import DarkModeToggle from "../context/DarkModeToggle";
import { AppStates } from "../context/AppStates";
import { AnimatePresence, delay, motion } from "framer-motion";

const Navbar = () => {
  const { collapse, setCollapse } = useContext(AppStates);
  const { notifySuccess } = useToast();
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const user = localStorage.getItem("user");
  const { image } = user ? JSON.parse(user) : {};
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    navigate("/admin_login");
    notifySuccess("Logout Successfully");
  };

  useEffect(() => {
    // Update body class on component mount
    const savedDarkMode = localStorage.getItem("darkMode");
    const isDarkMode = savedDarkMode === "true";
    document.body.classList.toggle("dark", isDarkMode);
  }, []);

  useEffect(() => {
    setDropdown(false);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const logoutVariant = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
  };
  return (
    <div className="shadow dark:border-l-[1px]">
      <div className="py-2 px-7 flex items-center justify-between bg-white dark:bg-slate-800">
        <div className="flex items-center gap-2 dark:text-white">
          <button onClick={() => setCollapse(!collapse)}>
            {collapse ? <List size={30} /> : <X size={30} />}
          </button>
        </div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="h-[40px] w-[40px] cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            <img
              className="h-full w-full rounded-full"
              src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
              alt=""
            />
          </div>
          <AnimatePresence>
            {dropdown && (
              <motion.div
                whileInView={{ scale: 1 }}
                initial="hidden"
                animate="visible"
                exit={dropdownVariants.hidden}
                variants={dropdownVariants}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="dropdown z-50 absolute right-[1px] md:right-[-10px] mt-2 rounded-lg dark:bg-slate-700 border border-gray-200 w-[200px] bg-white py-2 px-1"
              >
                <ul className="mt-2">
                  <li className="hover:bg-gray-200 py-1 px-2 ease-linear duration-200 rounded hover:text-gray-800">
                    <DarkModeToggle />
                  </li>
                  <li className="hover:bg-gray-200 py-1 px-2 ease-linear duration-200 rounded hover:text-gray-800">
                    <button
                      onClick={() => setLogoutConfirm(true)}
                      className="w-full text-left dark:text-white dark:hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {logoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
            variants={logoutVariant}
            initial="hidden"
            animate="visible"
            exit={`hidden`}
            className="bg-white rounded-lg shadow-lg min-w-[300px] md:w-[400px] max-w-[500px]">
              <div className="py-2 px-2 ">
                <div className="flex items-center justify-end border-b pb-1">
                  <button
                    onClick={() => setLogoutConfirm(false)}
                    className="bg-none text-gray-700"
                  >
                    <X size={30} />{" "}
                  </button>
                </div>
              </div>
              <div className="px-2">
                <h2 className="text-xl font-[400] py-2">
                  Are you sure you want to logout?
                </h2>
                <div className="flex gap-3 justify-end items-center py-3 px-2">
                  <button
                    onClick={() => setLogoutConfirm(false)}
                    className="bg-transparent border px-2 py-1 text-gray-800 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={logoutHandler}
                    className="bg-red-500 px-2 text-white rounded py-1 border-transparent"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

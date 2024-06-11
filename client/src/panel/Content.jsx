import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppStates } from '../context/AppStates';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

const Content = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const { notifyError } = useToast();
  const { collapse, setCollapse } = useContext(AppStates);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!collapse && contentRef.current && contentRef.current.contains(event.target)) {
        setCollapse(true);
      }
    };
    if (window.matchMedia('(max-width:768px)').matches) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [collapse, setCollapse]);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");
    if (access && refresh && user) {
      setLoading(false)
  } else {
      notifyError("Please log in to access this page.");
      navigate("/admin_login");
  }
  }, [navigate, notifyError]);

  if (loading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center bg-white: dark:bg-slate-800'>
        <div>Loading</div>
      </div>
    )
  }

  return (
    <div
      ref={contentRef}
      className={`${collapse ? 'w-[calc(100% - 50px)] md:w-[calc(100% - 5%)] ml-10 md:ml-0' : 'w-[calc(100% - 200px)] md:w-[calc(100% - 20%)]'} 
      grow overflow-y-scroll ease-linear duration-200 bg-gray-100 dark:bg-slate-900 h-full
      ${!collapse && window.matchMedia('(max-width: 768px)').matches ? 'brightness-50' : ''}`}
    >
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Content;

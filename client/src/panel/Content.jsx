import React, { useState, useContext, useEffect } from 'react';
import { AppStates } from '../context/AppStates';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

const Content = () => {
  const navigate = useNavigate()
  const { notifyError } = useToast()
  const { collapse } = useContext(AppStates);
  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");
    if (access && refresh && user) {

    } else {
      notifyError("Please log in to access this page.");
      navigate("/login");
    }
  }, [navigate, notifyError]);
  return (
    <div className={`${collapse ? 'w-[calc(100% - 50px)] md:w-[calc(100% - 5%)]' : 'w-[calc(100% - 200px)] md:w-[calc(100% - 20%)]'} grow overflow-y-scroll ease-linear duration-200 dark:bg-slate-900 h-full`}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Content;
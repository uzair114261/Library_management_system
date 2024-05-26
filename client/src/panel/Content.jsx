import React, { useContext } from 'react'
import { AppStates } from '../context/AppStates'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AddUser from '../components/AddUser'
import Analytics from '../components/Analytics'

const Content = () => {
    const { collapse } = useContext(AppStates)
    return (
        <div className={`${collapse ? 'w-[calc(100% - 50px)] md:w-[calc(100% - 5%)]' : 'w-[calc(100% - 200px)] md:w-[calc(100% - 20%)]'} grow overflow-y-scroll ease-linear duration-200 bg-gray-50 h-full`}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Content

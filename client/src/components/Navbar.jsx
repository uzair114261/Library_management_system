import React from 'react'
import {BookHalf} from 'react-bootstrap-icons'

const Navbar = () => {
  return (
    <div className='py-2 px-3 flex items-center justify-between bg-white'>
      <div className="flex items-center gap-2">
      <h2 className="text-xl font-[600]">Library Management System</h2>
      <BookHalf/>
      </div>
        <button className='bg-blue-500 px-3 py-2 rounded text-white'>Logout</button>
    </div>
  )
}

export default Navbar
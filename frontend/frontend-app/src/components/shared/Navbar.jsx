import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white shadow px-6 py-6 flex justify-between items-center'>
        <h2 className='text-2xl font-semibold'> Dashboard</h2>
        <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-medium">
            Avinash
          </p>

          <p className="text-sm text-gray-500">
            Admin
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-300"></div>

      </div>

    </div>
  )
}

export default Navbar
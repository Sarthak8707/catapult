import React from 'react'

const Organizations = () => {
  return (
    <div className='bg-neutral-950 min-h-screen w-300 m-10'>
      
      <div className=' text-white flex flex-col gap-5'>
        <h1 className='ml-20 text-2xl font-bold text-start'>Your Organizations</h1>
        <p className='ml-20 text-start text-gray-200'>Here is the  list of all your organizations you are part of and associated with...</p>
      </div>

      <div className='grid grid-cols-4 ml-20 gap-4 mt-10'>
        <div className='text-gray-500 text-sm font-medium'>Organization</div>
        <div className='text-gray-500 text-sm font-medium'>Role</div>
        <div className='text-gray-500 text-sm font-medium'>Created On</div>
        <div className='text-gray-500 text-sm font-medium'>Actions</div>
        <div className='text-white'>JQ Enterprises </div>
        <div className='text-white'>Admin</div>
        <div className='text-white'>24 July 2025</div>
        <div className='text-white'>Delete</div>

      </div>
      
    </div>
  )
}

export default Organizations
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const OrganizationDetails = () => {

    const {id} = useParams();

    useEffect(() => {

        const j=9
    }, [])

  return (
    <div>
        <div className='bg-neutral-950 min-h-screen w-300 m-10'>
            
            <div className='text-white flex ml-20 flex-col gap-5'>
                <div className=' text-start text-2xl font-bold'> 
                    Organization Name
                </div>
                <div className='grid grid-cols-2  mt-10 gap-6'>
                    <div> Projects </div>
                    <div> Members </div>
                    <div> Created By </div>
                    <div> Your Role </div>
                </div>
            </div>

            <div className='ml-20'>
                <div>
                    <div className='text-white flex text-2xl font-bold mt-15 text-start' >Projects</div>
                </div>
                <div>

                    <div className='grid grid-cols-3 mt-10'>
                        <div> Project Name </div>
                        <div> Created On </div>
                        <div> Actions </div>
                    </div>

                    {/* <div className='grid grid-cols-3 mt-10'>
                        <div> Project Name </div>
                        <div> Created On </div>
                        <div> Actions </div>
                    </div> */}


                </div>
            </div>

        </div>
    </div>
  )
}

export default OrganizationDetails
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useParams } from 'react-router-dom'

const Guardrails = () => {

    const {id} = useParams();
  return (
    <div>
        <div className='min-h-screen px-10 py-5 bg-white'>


        <div className='flex mb-5'>
        <div className=' border-amber-950 ml-0'>
            <div>
                <div className='text-2xl font-medium'> Checkout Service </div>
                <div className='text-gray-800' > Themes and Payments flag rollouts </div>
            </div>
        </div>
            
        </div>

        <Separator className="my-2" />


        {/* Guardrails */}


        <div className='mt-10'>
            <div className='flex border-red-200'>
            <div className='text-xl font-medium'> Guardrails </div>
                            
            </div>

            <div className='mt-3'>
                <div className='h-8 w-120 border rounded-sm text-gray-400 py-1 px-2'> Search... </div>
            </div>
        </div>


    </div>
    </div>
  )
}

export default Guardrails
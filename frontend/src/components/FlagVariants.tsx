import { Plus } from 'lucide-react'
import React from 'react'

const FlagVariants = () => {
  return (
    <div className='w-220 border-red-300'>
        <div className=' border-red-500'>
            <div className='text-xl mt-10 font-semibold'> Variants</div>
            <div className='text-gray-600 mt-1 flex gap-1 text-sm'> Alternative values or behaviors that a single feature flag can return, for custom usecases.</div>  
        </div>

        <div className='flex flex-col   mt-10'>
            <div className='border  border-gray-200 rounded-sm h-50'>
                <div className='mt-5 font-md text-sm text-muted-foreground ml-5 flex gap-5'>
                    Variant Name <div className='border w-80 border-white bg-white rounded-xs'><input type="text" /></div>
                </div>
                <div className='mt-5 font-md text-sm text-muted-foreground ml-5'>
                    Parameter
                </div>
                <div className='mt-5 font-md text-sm text-muted-foreground ml-5'>
                    Value
                </div>
            </div>
            <button className='bg-blue-700 mt-5 text-white w-35 px-3 py-2 font-medium text-sm rounded-sm cursor-pointer hover:bg-blue-600 transition-colors duration-200'>
              <div className='flex items-center gap-1'> <Plus className='h-4 w-4'/>  Add Variant </div>
            </button>
        </div>
    </div>
  )
}

export default FlagVariants
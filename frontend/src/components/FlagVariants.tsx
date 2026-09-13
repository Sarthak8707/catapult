import { Plus } from 'lucide-react'
import React from 'react'
import VariantDialog from './VariantDialog'

type variantsType = {
    variantName: string,
    id?: number,
    value: {
        param: string,
        val: any
    }
}[]

const FlagVariants = ({variants, flagID} : {variants: variantsType, flagID: number}) => {

   // console.log("variants:::", variants)


    

  return (
    <div className='w-220  border-red-300'>
        <div className='flex border-red-500'>
            <div>
                <div className='text-xl mt-10 font-semibold'> Variants</div>
                <div className='text-gray-600 mt-1 flex gap-1 text-sm'> Alternative values or behaviors that a single feature flag can return, for custom usecases.</div>
            </div> 
            <div className='ml-auto pt-3'>
                <VariantDialog id={flagID} /> 
            </div>
        </div>

        <div className=' flex flex-col mt-10'>
            <div className='flex flex-col gap-5'>
                {variants.map((variant, idx) => (
                    
                 
            <div className='border flex border-gray-200 rounded-sm h-50'>
                <div className='pt-4 px-4 text-foreground'> <div className=' bg-gray-200 h-6 rounded-full w-6 flex items-center justify-center'> {idx + 1} </div> </div>
                <div>
                    <div className='mt-5 font-md text-sm text-muted-foreground ml-5 flex gap-5'>
                    <div className='w-60'> Variant Name </div> <div className='text-foreground'> {variant.variantName} </div>
                </div>
                <div className='mt-5 font-md text-sm text-muted-foreground ml-5 flex gap-5'>
                    <div  className='w-60'> Parameter </div> <div className='text-foreground'> {variant.value.param} </div>
                </div>
                <div className='mt-5 font-md text-sm text-muted-foreground ml-5 flex gap-5'>
                    <div  className='w-60 '> Value </div> <div className='text-foreground'> {variant.value.val} </div>
                </div>
                </div>
            </div>
                    
                
                ))}
            </div>
            
        </div>
    </div>
  )
}

export default FlagVariants
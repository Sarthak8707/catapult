import { ArrowRight, ChartNoAxesCombined, ChevronsRight, CircleChevronRight } from 'lucide-react'
import React from 'react'

const Landing = () => {
  return (
    <div className=' min-h-screen px-5'>

      <div className='h-20'>

      </div>

      <div className="h-120 bg-[#befc03] rounded-md  pt-20 pl-10">
        <div className="max-w-3xl text-7xl font-semibold text-black">
          Your Runtime Control of Software
        </div>

        <div className='max-w-3xl text-black text-xl mt-10 font'>
          Feature flags to control the behaviour of your application at runtime with precision. Deploy and control
          your features with precision and safety!
        </div>

        <div className='mt-10 flex gap-5'>
          <button className='text-white bg-black rounded-full px-6 py-2 cursor-pointer'>
            <div className='flex items-center gap-2'>
              <div> Get Started </div>
              <div> <ArrowRight className='h-4 w-4' /> </div>
            </div>
          </button>

          <button className='text-black border border-black rounded-full px-6 py-2 cursor-pointer'>
            <div className='flex items-center gap-2'>
              <div> Read Docs </div>
            </div>
          </button>
        </div>

      </div>

      <div className='mt-20 flex '>

        <div className='text-3xl max-w-2xl font-medium h-100 ml-20'>
          Get the Most Out of Your Application Behaviour
        </div>

        <div className='flex flex-col gap-10 ml-auto mr-40'>
          <div className='bg-gray-100 h-70 w-120 rounded-lg  pl-6'>

            <div className='text-2xl font-medium flex'>
              <div className='mt-8'> Toggle Features Instantly </div>

              <div className='ml-auto bg-[#befc03] h-20 rounded-tr-lg rounded-bl-lg w-30 pl-8 pt-5'>
                <ChevronsRight className='h-10 w-10 '/>
              </div>
            </div>

            <div className='mt-10 text-xl'>
              Manage all your applicaton features in one place
            </div>

            <div className='mt-10'>
              <button className='text-black border border-black  rounded-full px-6 py-2 cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <div> View More </div>
                  <div> <ArrowRight className='h-4 w-4' /> </div>
                </div>
              </button>
            </div>
          </div>

          <div className='bg-gray-100 h-70 w-120 rounded-lg  pl-6'>

            <div className='text-2xl font-medium flex'>
              <div className='mt-8'> Get Full Analytics </div>

              <div className='ml-auto bg-[#befc03] h-20 rounded-tr-lg rounded-bl-lg w-30 pl-8 pt-5'>
                <ChartNoAxesCombined className='h-10 w-10 '/>
              </div>
            </div>

            <div className='mt-10 text-xl'>
              Manage all your applicaton features in one place
            </div>

            <div className='mt-10'>
              <button className='text-black border border-black  rounded-full px-6 py-2 cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <div> View More </div>
                  <div> <ArrowRight className='h-4 w-4' /> </div>
                </div>
              </button>
            </div>
          </div>

        </div>

      </div>

      <div className='mt-20 rounded-lg h-100 bg-black pt-10 '>
        <div className='text-white text-3xl text-center font-medium'>
         In-built Guardrails according to your needs
        </div>

        <div>
          
        </div>
      </div>

      <div className='mt-10 h-100'>

      </div>


    </div>
  )
}

export default Landing
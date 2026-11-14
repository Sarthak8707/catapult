import { ArrowRight, ArrowUpRight, ChartNoAxesCombined, ChevronsRight, CircleChevronRight, MoveUpRight, TrendingUp, Zap } from 'lucide-react'
import Guardrails from '../assets/guardrails3.png'
import Triggers from '../assets/Triggers.png'
import Actions from '../assets/Actions2.png'
import Environments from '../assets/Environments.png'
import Segment from '../assets/Segments.png'
import Variants from '../assets/Variants.png'


const Landing = () => {
  return (
    <div className=' min-h-screen home-page'>

      <div className='h-20'>

      </div>

      <div className='px-5'>
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
                <ChevronsRight className='h-10 w-10 ' strokeWidth={1} />
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
                <TrendingUp className='h-10 w-10 ' strokeWidth={1} />
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

      <div className='mt-20 h-230 bg-black pt-10 relative overflow-hidden'>

        {/* Dark Grid Lines Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#000000",
            backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Your Content */}
        <div className='relative z-10'>
          <div className='text-white text-5xl text-center font-medium mt-10'>
            In-built Guardrails according to your needs.
          </div>

          <div className='pt-20 px-20 flex gap-20'>

            {/* Keep all three of your existing cards here, unchanged */}

            <div className="h-150 bg-black text-neutral-100 border border-neutral-800 rounded-sm w-100 pt-5">
              <img
                src={Guardrails}
                alt="Guardrails dashboard"
                className="w-95 h-auto object-contain mx-2"
              />

              <div className="text-2xl text-neutral-100 font-semibold mt-25 mx-5">
                Create Guardrail
              </div>
              <div className='mt-3 text-neutral-100 font-medium mx-5 '>
                Create a new Guardrail corresponding to the feature flag you want.
              </div>

              <div className='mt-10 mx-5'>
                <button className='text-neutral-100 border border-neutral-100 rounded-full px-6 py-2 cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <div> View More </div>
                    <div> <ArrowUpRight className='h-4.5 w-4.5' /> </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="h-150 bg-black text-neutral-100 border border-neutral-800 rounded-sm w-100 pt-5">
              <img
                src={Triggers}
                alt="Guardrails dashboard"
                className="w-95 h-auto object-contain mx-2"
              />

              <div className="text-2xl text-neutral-100 font-semibold mt-25 mx-5">
                Define Triggers
              </div>
              <div className='mt-3 text-neutral-100 font-medium mx-5 '>
                Customize metrics which will lead to the trigger of Guardrail.
              </div>

              <div className='mt-10 mx-5'>
                <button className='text-neutral-100 border border-neutral-100 rounded-full px-6 py-2 cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <div> View More </div>
                    <div> <ArrowUpRight className='h-4.5 w-4.5' /> </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="h-150 bg-black text-neutral-100 border border-neutral-800 rounded-sm w-100 pt-5">
              <img
                src={Actions}
                alt="Guardrails dashboard"
                className="w-87 h-auto object-contain mx-5"
              />

              <div className="text-2xl text-neutral-100 font-semibold mt-25 mx-5">
                Set the Actions
              </div>
              <div className='mt-3 text-neutral-100 font-medium mx-5 '>
                Describe how will your features be managed inside your application.
              </div>

              <div className='mt-10 mx-5'>
                <button className='text-neutral-100 border border-neutral-100 rounded-full px-6 py-2 cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <div> View More </div>
                    <div> <ArrowUpRight className='h-4.5 w-4.5' /> </div>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className='mt-20 h-100 '>

        <div className='flex justify-center'>
          <div className='text-4xl font-medium text-center max-w-3xl'>
            Easily select who will see your Application's new feature.
          </div>


        </div>

        <div className='mt-10 px-10 '>

          <div className='flex items-center gap-10'>
            <img
              src={Environments}
              alt="GEnvironments"
              className="w-180 h-auto object-contain mx-5"
            />

            <div className='bg-gray-100 pt-8 px-5 h-60 w-150 flex flex-col rounded-bl-2xl rounded-tr-2xl'>
              <div className='text-3xl font-medium'> Environment Separation </div>

              <div className='mt-auto mb-8 text-xl'>
                Segregate feature management across Development, Staging and Production.
              </div>
            </div>

          </div>

          <div className='flex items-center justify-between'>

            <div className='bg-gray-100 pt-8 px-5 h-60 w-150 flex flex-col rounded-bl-2xl rounded-tr-2xl ml-20'>
              <div className='text-3xl font-medium'> Segments </div>

              <div className='mt-auto mb-8 text-xl'>
                Categorize your users and change features targeted to selected users using Segments.
              </div>
            </div>

            <img
              src={Segment}
              alt="Segments"
              className="w-100 h-auto object-contain mr-30"
            />

          </div>

          <div className='flex items-center gap-10'>
            <img
              src={Variants}
              alt="Variants"
              className="w-180 h-auto object-contain mx-5"
            />

            <div className='bg-gray-100 pt-8 px-5 h-60 w-150 flex flex-col rounded-bl-2xl rounded-tr-2xl'>
              <div className='text-3xl font-medium'> Customizable Variants </div>

              <div className='mt-auto mb-8 text-xl'>
                Fully flexible diverse range of variants for the same feature for different usecases.
              </div>
            </div>

          </div>

        </div>

        <div className='bg-[#befc03] h-80 mt-20 flex flex-col justify-center pl-35'>
          <div className='text-4xl font-medium max-w-2xl  '>
            Make Feature control feel impossibly easy, with Catapult.
          </div>

          <div>
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
        </div>

        <div className='h-80 bg-black'>
          <div className='flex  items-center h-full pl-20'>

            <div className='text-white w-100 text-9xl font-bold ml-10'> C.
            </div>

            <div className='text-neutral-100 text-xl flex items-center justify-center gap-30 h-full'>

              <div className=''>
                <div className='font-semibold'>
                  Product
                </div>
                <div className='flex flex-col mt-5 gap-2'>
                  <span>Features</span>
                  <span>Blog</span>
                  <span>Catapult Cloud</span>
                  <span>Pricing</span>
                </div>
              </div>

              <div className=''>
                <div className='font-semibold'>
                  Guide
                </div>
                <div className='flex flex-col mt-5 gap-2'>
                  <span>Tutorials</span>
                  <span>Documentation</span>
                  <span> Articles </span>
                  <span>Walkthrough</span>
                </div>
              </div>
            </div>


          </div>
        </div>

      </div>


    </div>
  )
}

export default Landing
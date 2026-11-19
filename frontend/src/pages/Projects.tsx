import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Plus, Search, SquareArrowRightExit } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import SegmentDialog from '@/components/SegmentDialog';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


const Projects = () => {

  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<{
    name: string,
    id: number
  }[]
  >([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/me/projects`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProjects(response.data);
        console.log("Projects", response.data);
      }
      catch (err) {
        console.log("errr:::", err)
      }
      finally {
        setLoading(false);
      }
    }

    getProjects();
  }, [])

  return (
    <div className='min-h-screen px-10 py-5 bg-neutral-900'>
      <div className='flex items-center justify-center'>
        <div className='text-2xl font-medium text-neutral-100 '> Projects </div>
        <div className='ml-auto h-12 flex items-center justify-center'>
          <button className= ' bg-[#e6f542]  text-neutral-900 w-33 pl-1 pr-2 py-2 font-medium text-sm rounded-full cursor-pointer hover:bg-[#e6f542] transition-colors duration-200'>
            <div className='flex items-center justify-center gap-1'>
              <Plus className='h-3.5 w-3.5'/>
              <div>New Project</div>
            </div>
          </button>
        </div>
      </div>

      <Separator className="my-2 mt-5 bg-neutral-800" />

      <div className='mt-5'>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value=""
            onChange={() => { }}
            placeholder="Search project by name, key or description..."
            className="h-8 w-120 rounded-sm border pl-8 text-sm border-neutral-800 text-neutral-100"
          />
        </div>
      </div>

      {loading ? <div className='flex flex-col gap-2 text-gray-700 items-center justify-center h-100 w-220'> <Spinner /> </div> : <div>
        <div className='grid grid-cols-3 bg- h-150 gap-10 border-red-300 w-300 mt-10 py-10 px'>

          {projects?.map((project, idx) => (<>


            <div className=' border border-neutral-800 hover:bg-neutral-800 transition-colors duration-300 rounded-md bg-neutral-800/40 h-50 w-70 pt-3 pb-5 pl-3 pr-3'>
              <Link to={`/projects/${project.id}`}>

                <div className='h-full flex flex-col'>
                  <div className='text- font- text-neutral-100'>
                    16 Flags
                  </div>

                  <div className='flex items-center justify-center h-30'>
                    <div className='text-neutral-100 text-xl'>{project.name}</div>
                  </div>

                  
                </div>

              </Link>

            </div>

          </>))}

        </div>
      </div>}


    </div>
  )
}

export default Projects
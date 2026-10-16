import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Search, SquareArrowRightExit } from 'lucide-react';
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
    const getSegments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/me/projects`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProjects(response.data);
        console.log(response.data);
      }
      catch (err) {
        console.log("errr:::", err)
      }
      finally {
        setLoading(false);
      }
    }

    getSegments();
  }, [])

  return (
    <div className='min-h-screen px-10 py-5 bg-white'>
      <div className='flex items-center justify-center'>
        <div className='text-2xl font-medium'> Projects </div>
        <div className='ml-auto flex gap-3'>
          <button className='bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 font-medium text-sm transition-colors duration-200 rounded-sm cursor-pointer'>
            New Project
          </button>
        </div>
      </div>

      {/* <Separator className="my-2 mt-5" /> */}



      {loading ? <div className='flex flex-col gap-2 text-gray-700 items-center justify-center h-100 w-220'> <Spinner /> </div> : <div>
        <div className='grid grid-cols-3 bg-gray-100 h-150 gap-10 border-red-300 w-300 mt-10 py-10 px-10'>

          {projects?.map((project, idx) => (<>

            
              <div className=' border rounded-md bg-white h-50 w-70 pt-3 pl-3'>
                <Link to={`/projects/${project.id}`}>
                <div className='text-xl text-foreground h-full'>
                  {project.name}
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
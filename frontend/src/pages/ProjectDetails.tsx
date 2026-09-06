import FlagDialog from '@/components/FlagDialog';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardPanel, CardFooter, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { ArrowRight, ChevronRight, CircleCheckIcon, Dot, EllipsisVertical, Plus, PlusIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';


import { Link, useParams } from 'react-router-dom'


const ProjectDetails = () => {

    const ID = useParams();
    const id = Number(ID.id);
    let token = window.localStorage.getItem("token");
    if(token == null) token = ""
   
    const [flags, setFlags] = useState<{
        flagID: number,
        flagName: string,
        type: string,

        envs: {
            environment: string,
            enabled: boolean,
            status: string
        }[]
    }[]>();

    const [activity, setActivity] = useState<{
        message: string
    }[]>([])

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const filteredFlags = flags?.filter((flag) => {
        const query = search.toLowerCase()
        return flag.flagName.toLowerCase().includes(query);
    })

    useEffect(() => {
        const getProjectData = async () => {
            // const response = await axios.get(`http://localhost:3000/projects/${id}/environments`);
            // setEnvironments(response.data);
            const resp = await axios.get(`http://localhost:3000/projects/${id}/flags`);
            const resp2 = await axios.get(`http://localhost:3000/projects/${id}/activity`)
            setFlags(resp.data);
            setActivity(resp2.data);
            setLoading(false);
        }

        getProjectData();
    }, [])



  return (
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


        <div className=' mt-10 flex gap-5  h-150 '>

            {/* Flags */}

            <div className='w-200'>
            <div className='flex border-red-200'>
                <div className='text-xl font-medium'> Flags </div>
                <div className='ml-auto mr-5'> 

                    <FlagDialog id = {id} token = {token}/>
                    
                 </div>
            </div>

            <div className='mt-3'>
                <div className="relative">
    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

    <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search flag by name, key or description..."
        className="h-8 w-120 rounded-sm border pl-8 text-sm"
    />
</div>
            </div>

                {loading ? (<div className='h-100 flex items-center justify-center text-gray-800'> <div className='flex flex-col items-center gap-3'> <Spinner /> Loading Flags </div> </div>) : 
                (<>
                  <div className='mt-5 bg-white rounded-[6px] border'>
                  <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dev</TableHead>
                    <TableHead>Staging</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {
                            filteredFlags?.length == 0 ? (
                                <div className='py-5 text-center'> No matching results </div>
                            ) : (
                                
                                filteredFlags?.map((flag) => {
                               const dev = flag.envs.find(
                             (env) => env.environment === "dev"
                             );

                            const staging = flag.envs.find(
                               (env) => env.environment === "stag"
                            );

                             return (
                              <TableRow key={flag.flagID}>
                                <TableCell>
                                  <Link to={`/flags/${flag.flagID}`}>
                                    {flag.flagName}
                                  </Link>
                                </TableCell>

                            <TableCell>{flag.type}</TableCell>

                            <TableCell>
                              {dev?.enabled ? "True" : "False"}
                            </TableCell>

                            <TableCell>
                              {staging?.enabled ? "True" : "False"}
                            </TableCell>
                          </TableRow>
                        );
                    }
                ))
                        }
                </TableBody>
            </Table>
            </div>
                </>)}
            
            </div>

            <Separator orientation="vertical" />

            <div>

            {/* Recent Activity */}

            <div>
                <div className=' flex border-red-400'>
                    <div className='text-xl font-medium'> Recent Activity</div> <div className='ml-auto'> <button className=' font-medium text-sm text-blue-700 rounded-sm cursor-pointer flex items-center justify-center gap-1'> View All <ArrowRight className='h-3 w-3'/> </button> </div>
                </div>
            <div className=' h-70 w-90 rounded-sm pt-3 '>
                {loading ? (<div className=' h-20 flex items-center justify-center'> Loading Recent Activity </div>) : (
                    <>
                    {activity.map((act, idx) => (
                    <>
                    <div className='flex flex-col gap-5'> 
                        <div className='mt-5 text-gray-700 text-sm gap-0'> <div className='flex'><Dot /> {act.message}</div> <div className="text-gray-500 text-[12px] ml-5"> 36 min ago </div> </div>
                    </div>
                    </>
                ))}
                    </>)}
            </div>
            </div>

            </div>

        </div>

        

        <div >

        </div>

    </div>
    
  )
}

export default ProjectDetails
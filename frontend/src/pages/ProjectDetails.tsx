import FlagDialog from '@/components/FlagDialog';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardPanel, CardFooter, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { ArrowRight, CircleCheckIcon, EllipsisVertical, Plus, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';


import { Link, useParams } from 'react-router-dom'


const ProjectDetails = () => {

    const ID = useParams();
    const id = Number(ID.id);
    let token = window.localStorage.getItem("token");
    if(token == null) token = ""
    const [environments, setEnvironments] = useState<{
        id: number,
        name: string,
        createdAt: string
    }[]
    >([]);

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
        actor: string,
        action: string,
        resource: string
    }[]>([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjectData = async () => {
            // const response = await axios.get(`http://localhost:3000/projects/${id}/environments`);
            // setEnvironments(response.data);
            const resp = await axios.get(`http://localhost:3000/projects/${id}/flags`);
            setFlags(resp.data);
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


        {/* Flags */}

        <div className='mt-15 flex gap-5'>
            <div className='w-200'>
            <div className='flex border-red-200'>
                <div className='text-xl'> Flags </div>
                <div className='ml-auto mr-5'> 

                    <FlagDialog id = {id} token = {token}/>
                    
                 </div>
            </div>

                {loading ? (<div className='h-50 flex items-center justify-center'> Loading Flags </div>) : 
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
                            {flags?.map((flag) => {
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
                    })}
                </TableBody>
            </Table>
            </div>
                </>)}
            
            </div>



            <div>

            {/* Recent Activity */}

            <div>
                <div className=' flex border-red-400'>
                    <div className='text-xl'> Recent Activity</div> <div className='text-sm ml-auto mr-8 flex gap-2 text-blue-700 items-center'>View all <ArrowRight className='h-3 w-3'/> </div>
                 </div>
            <div className='border h-70 w-90 mt-5 rounded-sm'>

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
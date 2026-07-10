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
        enabled: boolean,
        status: string,
        type: string,
        updated: string
    }[]>();

    useEffect(() => {
        const getEnvironmentsData = async () => {
            const response = await axios.get(`http://localhost:3000/projects/${id}/environments`);
            setEnvironments(response.data);
            const resp = await axios.get(`http://localhost:3000/projects/${id}/flags`);
            setFlags(resp.data);
        }

        getEnvironmentsData();
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

        <div>
           <div className='flex mt-10'> 
            <div className='text-xl '>Environments</div> 
            </div>

        </div>

        {/* Environment Cards */}

        <div className='mt-5 flex gap-8'>
            {environments.map((environment, idx) => (
                <Link to = {`/environments/${environment.id}`}> 
                    <Card className='w-60 h-40 rounded-[6px]'>
                <CardHeader>
                    <CardTitle>
                        <div className='flex'> <div> {environment.name} </div> <div className='ml-auto'> <EllipsisVertical className='h-4 w-4'/> </div> </div>
                    </CardTitle>
                    <CardDescription>
                        Make new branch
                    </CardDescription>
                </CardHeader>
                <CardPanel>
                    <div className='text-sm text-gray-700'>
                        <div> 34 out of 46 flags on </div>
                        <div> 725 evaluations in last 2 hours </div>
                    </div>
                </CardPanel>
                
                <CardFooter className=' border-red-200 h-5'>
                   <div className='text-sm text-gray-500'> changed 12m ago </div>
                </CardFooter>
            </Card>
                </Link>
            ))}

            {/* Option to add new */}

            <Link to = ""> 
                <Card className='w-60 h-40 rounded-[6px] border-white bg-blue-700'>
                
                
                    <div className='text-xl text-white  h-full flex  flex-col '>
                            <div className=' border-amber-500 flex items-center h-20 mt-10 px-4'>Create new environment and add flags <ArrowRight className='mt-auto mb-4 mr-4 border-amber-600 ml-auto'/></div>
                            
                    </div>
                
                
                
            </Card>
                </Link>

        </div>

        {/* Flags */}

        <div className='mt-15 flex gap-5'>
            <div className='w-200'>
            <div className='flex '>
                <div className='text-xl'> Flags </div>
                <div className='ml-auto mr-5'> 

                    <FlagDialog id = {id} token = {token}/>
                    
                 </div>
            </div>
            <div className='mt-5 bg-white rounded-[6px] border'>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Enabled</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flags?.map((flag, idx) => (
                        <TableRow >
                            <TableCell> <Link to = {`/flags/${flag.flagID}`}> {flag.flagName} </Link> </TableCell>
                            <TableCell> {flag.enabled && (<> On </>) } {!flag.enabled && (<>Off</>)} </TableCell>
                            <TableCell> {flag.type} </TableCell>
                            <TableCell> {flag.updated} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            </div>

            <div>
                <div className=' flex'>
                    <div className='text-xl'> Recent Activity</div> <div className='text-sm ml-auto mr-8 flex gap-2 text-blue-700 items-center'>View all <ArrowRight className='h-3 w-3'/> </div>
                 </div>
            <div className='border h-70 w-90 mt-5 rounded-sm'>

            </div>
            </div>
        </div>

        {/* Recent Activity */}

        <div >

        </div>

    </div>
    
  )
}

export default ProjectDetails
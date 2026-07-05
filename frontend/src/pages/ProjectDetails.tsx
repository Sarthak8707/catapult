import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardPanel, CardFooter, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { ArrowRight, CircleCheckIcon, EllipsisVertical, Plus, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';


import { Link, useParams } from 'react-router-dom'

const ProjectDetails = () => {

    const {id} = useParams();
    const [environments, setEnvironments] = useState<{
        id: number,
        name: string,
        createdAt: string
    }[]
    >([]);

    useEffect(() => {
        const getEnvironmentsData = async () => {
            const response = await axios.get(`http://localhost:3000/projects/${id}/environments`);
            setEnvironments(response.data);
        }

        getEnvironmentsData();
    }, [])


  return (
    <div className='min-h-screen p-12 bg-neutral-100'>

        <div>  </div>

        <div className='flex mb-5'>
        <div className=' border-amber-950 ml-0'>
            <div>
                <div className='text-2xl font-medium'> Checkout Service </div>
                <div className='text-gray-800' > Themes and Payments flag rollouts </div>
            </div>
        </div>
        <div className='flex  gap-5 border-blue-500 ml-auto'>
            <Button> <PlusIcon></PlusIcon>  New Flag </Button>
            <Button variant="destructive-outline">Leave Project</Button>
        </div>
            
        </div>

        <Separator className="my-2" />

        <div>
           <div className='flex mt-8'> 
            <div className='font-medium '>Environments</div> 
            </div>

        </div>

        {/* Environment Cards */}

        <div className='mt-5 flex gap-15'>
            {environments.map((environment, idx) => (
                <Link to = {`/environments/${environment.id}`}> 
                    <Card className='w-70 h-46 rounded-none'>
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
                <Card className='w-70 h-46 rounded-none border-white bg-blue-700'>
                
                
                    <div className='text-xl text-white  h-full flex  flex-col '>
                            <div className=' border-amber-500 flex items-center h-20 mt-10 px-4'>Create new environment and add flags</div>
                            <div className='mt-auto'>
                                <ArrowRight className='mt-auto mb-4 mr-4 border-amber-600 ml-auto'/>
                            </div>
                    </div>
                
                
                
            </Card>
                </Link>

        </div>

        {/* Recent Activity */}

        <div></div>

    </div>
    
  )
}

export default ProjectDetails
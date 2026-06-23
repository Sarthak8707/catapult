import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardPanel, CardFooter, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheckIcon, PlusIcon } from 'lucide-react';


import { useParams } from 'react-router-dom'

const ProjectDetails = () => {

    const {id} = useParams();


  return (
    <div className='min-h-screen p-6'>

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
            <div className='ml-auto'> <Button variant="outline"> <PlusIcon /> Add Environment </Button> </div>  </div>

        </div>

        {/* Environment Cards */}

        <div className='mt-5'>
            <Card className='w-70'>
                <CardHeader>
                    <CardTitle>
                        <div className='flex'> <div> Dev </div> <div className='ml-auto'> <CircleCheckIcon className='h-4 w-4 text-green-700' /> </div> </div>
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
                <Separator className="my-2" />
                <CardFooter className=' border-red-200 h-5'>
                   <div className='text-sm text-gray-500'> changed 12m ago </div>
                </CardFooter>
            </Card>
        </div>

        {/* Recent Activity */}

        <div></div>

    </div>
    
  )
}

export default ProjectDetails
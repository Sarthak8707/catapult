import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SettingsIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

const EnvironmentDetails = () => {
    const {id} = useParams();
    const [flagData, setFlagData] = useState<{
        name: string,
        enabled: boolean,
        rolloutPercentage: number,

    }[]
    >([]);
    useEffect(() => {
        const getFlags = async () => {
        const response = await axios.get(`http://localhost:3000/environments/${id}/flags`);

        }

        getFlags();
    }, [])


  return (
    <div className='min-h-screen p-6'>

        <div>  </div>

        <div className='flex mb-5'>
        <div className=' border-amber-950 ml-0'>
            <div>
                <div className=' flex items-center gap-0.5'> <div className='text-3xl font-medium'>Production</div>
                  </div>
                <div className='text-gray-800' > Live traffic. Approval required for all changes </div>
            </div>
        </div>
        <div className='flex items-center gap-2  border-blue-500 ml-auto'>
            
            <div> <Badge variant="outline" className='rounded-full px-1.5'> <div className='h-2 w-2 rounded-full bg-emerald-500'></div>  All OK </Badge> </div> 
            <Button variant="secondary"> <SettingsIcon />  Settings </Button>
            <Button variant="destructive-outline">Freeze Env</Button>
        </div>
            
        </div>

        <Separator className="my-2" />

        <div>
           <div className='flex mt-8'> 
            <div className='font-medium '>Flags</div> 
            <div className='ml-auto'> <span className='mr-4 text-sm'> Prod is 14% behind dev </span> <Button variant="outline">  View Difference </Button> </div>  </div>

        </div>

        {/* Flags Table */}

        <div className='mt-5'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead> Flag </TableHead>
                        <TableHead> Status </TableHead>
                        <TableHead> Rollout </TableHead>
                        <TableHead> Last Updated </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                </TableBody>
            </Table>
        </div>

        {/* Recent Activity */}

        <div></div>

    </div>
  )
}

export default EnvironmentDetails
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SettingsIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';


const statusVariant = {
    draft: "warning",
    active: "success",
    deprecated: "destructive"
} as const

type FlagStatus = "draft" | "active" | "deprecated"

const EnvironmentDetails = () => {
    const {id} = useParams();

    const [flagData, setFlagData] = useState<{
        id: number,
        name: string,
        enabled: boolean,
        rolloutPercentage: number,
        status: FlagStatus,
        updatedAt: string
    }[]
    >([]);

    useEffect(() => {
        const getFlags = async () => {
        const response = await axios.get(`http://localhost:3000/environments/${id}/flags`);
        setFlagData(response.data);

        }

        getFlags();
    }, [])


  return (
    <div className='min-h-screen p-12 bg-neutral-100'>

        <div>  </div>

        <div className='flex mb-5'>
        <div className=' border-amber-950 ml-0 mt-5'>
            <div>
                <div className=' flex items-center gap-0.5'> <div className='text-3xl font-medium'>Production</div>
                  </div>
                
            </div>
        </div>
        <div className='flex items-center gap-2  border-blue-500 ml-auto'>
            
            
        </div>
            
        </div>


        <div>
           <div className='flex mt-20 items-center justify-center'> 
            <div className=' text-2xl'>Flags</div>
            <button className='bg-blue-600 text-white px-6 py-2 ml-auto text-sm'> Create Flag </button>
           </div>

        </div>

        <div className='mt-8'> List of flags associated with this environment </div>

        {/* Flags Table */}

        <div className='mt-5 bg-white'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead> Flag </TableHead>
                        <TableHead> Condition </TableHead>
                        <TableHead> Status </TableHead>
                        <TableHead> Last Updated </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flagData.map((flag, index) => (
                        <TableRow>
                            <TableCell> <Link to = {`/flags/${flag.id}`}> {flag.name} </Link> </TableCell>
                            <TableCell> <Badge variant= {statusVariant[flag.status]} > {flag.status} </Badge> </TableCell>
                            <TableCell> {flag.enabled && (<> On </>) } {!flag.enabled && (<>Off</>)} </TableCell>
                            <TableCell> { new Date(flag.updatedAt).toLocaleString() } </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

        {/* Recent Activity */}

        <div></div>

    </div>
  )
}

export default EnvironmentDetails
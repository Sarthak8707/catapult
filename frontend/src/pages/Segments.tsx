import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, SquareArrowRightExit } from 'lucide-react';

const Segments = () => {
    const {id} = useParams();
    const [segments, setSegments] = useState<{
        name: string,
        description: string,
        conditions: {
            operator: string,
            conditions: {
                field: string,
                operator: string,
                value: any
            }[]
        }
    }[]>([]);


    useEffect(() => {
        const getSegments = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/projects/${id}/segments`);
            setSegments(response.data);
            console.log(response.data);
            }
            catch(err){
                console.log("errr:::", err)
            }
        }

        getSegments();
    }, [])
  return (
    <div className='min-h-screen px-10 py-5 bg-white'>
        <div className='flex items-center justify-center'> 
            <div className='text-2xl font-medium'> Segments </div>
            <div className='ml-auto flex gap-5'>
                <button className=' px-3 py-2 text-gray-700 hover:bg-gray-100 text-sm rounded-sm font-medium cursor-pointer flex gap-1 items-center'> <SquareArrowRightExit className='h-3 w-3'/> <div>Export</div> </button>
                <button className='bg-blue-700 text-white px-3 py-2 font-medium text-sm rounded-sm cursor-pointer'> Create Segment </button>
            </div>
        </div>

        <Separator  className="my-2 mt-5"/>

        <div className='mt-5'>
            <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

    <input
        type="text"
        value=""
        onChange={() => {}}
        placeholder="Search segment by name, key or description..."
        className="h-8 w-120 rounded-sm border pl-8 text-sm"
    />
            </div>
        </div>

        <div className=' border-gray-300 w-300 mt-10'> 
            <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell className="">
            12/05/2026
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mechanical Keyboard</TableCell>
          <TableCell>$129.99</TableCell>
          <TableCell className="text-right">
            
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">USB-C Hub</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell className="text-right">
            
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
        </div>
    </div>
  )
}

export default Segments
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, SquareArrowRightExit } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import SegmentDialog from '@/components/SegmentDialog';

const Segments = () => {
  const { projectID } = useParams();
  const [segments, setSegments] = useState<{
    id: number,
    name: string,
    description: string,
    type?: string,
    createdAt: string,
    conditions: {
      operator: string,
      conditions: {
        field: string,
        operator: string,
        value: any
      }[]
    }
  }[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getSegments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/${projectID}/segments`);
        setSegments(response.data);
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
    <div className='min-h-screen px-10 py-5 bg-neutral-900'>
      <div className='flex items-center justify-center'>
        <div className='text-2xl font-medium text-neutral-100'> Segments </div>
        <div className='ml-auto flex gap-3  items-center '>
          <button className='py-3 px-3 h-fit leading-none text-neutral-100 hover:bg-neutral-800 transition-colors duration-200 text-sm rounded-full font-medium cursor-pointer border border-neutral-800'>
            <div className='flex items-center gap-1'>
              <SquareArrowRightExit className='h-3 w-3' /> <div>Export</div>
            </div>
          </button>
          <div className=''> <SegmentDialog /> </div>
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
            placeholder="Search segment by name, key or description..."
            className="h-8 w-120 rounded-sm border pl-8 text-sm border-neutral-800 text-neutral-400"
          />
        </div>
      </div>

      {loading ? <div className='flex flex-col gap-2 text-gray-700 items-center justify-center h-100 w-220'> <Spinner /> Loading Segments </div> : <div>
        <div className=' border-red-300 w-300 mt-10'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {segments.map((segment, idx) => (

                <TableRow>
                  <TableCell className=""> <Link to={`/projects/${projectID}/segments/${segment.id}`}> {segment.name}</Link> </TableCell>
                  <TableCell> {segment.type ? segment.type : "No tags"} </TableCell>
                  <TableCell className="">
                    {new Date(segment.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>

              ))}

            </TableBody>
          </Table>
        </div>
      </div>}


    </div>
  )
}

export default Segments
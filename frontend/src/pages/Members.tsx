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
import { EllipsisVertical, Search, SquareArrowRightExit } from 'lucide-react';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';

const Members = () => {

  const [members, setMembers] = useState<{
    username: string,
    role: string,
    joinedAt: string
  }[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMembers = async () => {
      const response = await axios.get(`http://localhost:3000/projects/2/members`);
      setMembers(response.data);
      setLoading(false);
    }

    getMembers();
  }, [])
   
  return (
    <div className='min-h-screen px-10 py-5 bg-white'>
        <div className='flex items-center justify-center'> 
            <div className='text-2xl font-medium'> Members </div>
            <div className='ml-auto flex gap-3'>
                <button className=' px-3 py-2 text-foreground hover:bg-gray-100 transition-colors duration-200 text-sm rounded-sm font-medium cursor-pointer flex gap-1 items-center'> <SquareArrowRightExit className='h-3 w-3'/> <div>Export</div> </button>
                <button className='bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 font-medium text-sm transition-colors duration-200 rounded-sm cursor-pointer'> Add Member </button>
            </div>
        </div>

        <Tabs className="mt-5">
          <TabsList variant="underline" className=" ">
            <TabsTab value="val-1" className="w-40">Members</TabsTab>
            <TabsTab value="val-2" className="w-40">Invitations</TabsTab>
          </TabsList>
          {/* <Separator  className="my-0"/> */}
          <TabsPanel className="" value="val-1">
            <div className='mt-5'>
            <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

    <input
        type="text"
        value=""
        onChange={() => {}}
        placeholder="Search segment by name, key or description..."
        className="h-8 w-120 bg-gray-50 rounded-sm border pl-8 text-sm"
    />
            </div>
        </div>

        {loading ? <div className='flex items-center justify-center h-100 w-220'> <Spinner /> </div> : <div> 
                  <div className=' border-red-300 w-300 mt-10'> 
                    <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="">Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='text-foreground'>
                
                {members.map((member, idx) => (
                          
                            <TableRow>
                           <TableCell className=""> {member.username} </TableCell>
                          <TableCell> {member.role} </TableCell>
                          <TableCell className="">
                            { new Date(member.joinedAt).toLocaleDateString() }
                          </TableCell>
                          <TableCell> <button className='cursor-pointer text-gray-800'><EllipsisVertical className='size-4'/></button> </TableCell>
                        </TableRow>
                          
                        ))}
                
              </TableBody>
            </Table>
                </div>
                  </div> }
          </TabsPanel>

          

        
          
          <TabsPanel value="val-2">Invitations
          </TabsPanel>
        </Tabs>

        
    </div>
  )
}

export default Members
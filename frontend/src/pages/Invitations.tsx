
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
import { MailOpen, Search, SquareArrowRightExit } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const Invitations = () => {
  return (
    <div className='min-h-screen px-10 py-5 bg-white'>
        <div className='flex items-center justify-center'> 
            <div className='text-2xl font-medium'> Invitations </div>
            <div className='ml-auto flex gap-3'>
                
            </div>
        </div>

        <Separator  className="my-2 mt-5"/>

        <div className='flex flex-col items-center'>
        <div className='mt-10'>
            <div className='text-xl font-semibold'>
                Current Invitations
            </div>
            <div className='text-gray-800 h-50 w-220 border border-gray-200 bg-zinc-50 rounded-md flex flex-col items-center justify-center mt-5'>
                <div> <MailOpen className='text-gray-500 size-9'/> </div>
                <div className='text-foreground text-sm font-semibold mt-5'> No Invitations yet </div>
                <div className='text-muted-foreground text-center text-sm w-170  mt-3'> 
                    Your Invitations appear here once you are invited to a project to collaborate. Accept or Reject the invitation to respond.
                </div>
            </div>
        </div>

        <div className='mt-10'>
            <div className='text-xl font-semibold'>
                Past Invitations
            </div>
            <div className='text-gray-800 h-40 w-220 border border-gray-200 rounded-sm flex items-center justify-center mt-5'>
                
            </div>
        </div>

        
        </div>

        
    </div>
  )
}

export default Invitations
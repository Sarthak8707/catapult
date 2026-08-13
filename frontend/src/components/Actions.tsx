import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';



const Actions = ({flagID}: {flagID: number}) => {

    const navigate = useNavigate();

    const handleDelete = async (flagID: number) => {

       try{
          const response = await axios.delete(`http://localhost:3000/flags/${flagID}`);
          navigate(`/projects/${response.data.projectID}`);
       }
       catch(err){
          console.log(err)
       }

    }


  return (
    <div className=' border-red-400'>

        <AlertDialog>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className='border border-gray-300 px-2 py-1 font- text-sm rounded-sm cursor-pointer'>
        <div className='text-sm font-bold flex justify-center items-center gap-1'>Actions <ChevronDown className='mt-0.5 h-4 w-4' /> </div>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => {}}>
        Archive
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => {}}>
        Star
      </DropdownMenuItem>

      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-destructive"
        >
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
    </DropdownMenuContent>
  </DropdownMenu>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this
        flag.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => handleDelete(flagID)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  )
}

export default Actions
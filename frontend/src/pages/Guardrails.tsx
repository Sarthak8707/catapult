import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator'
import axios from 'axios';
import { CircleAlert, Search, ShieldCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Guardrails = () => {

    const {id} = useParams();
    const [guardrails, setGuardrails] = useState<any[]>([]);
    const [loading,  setLoading] = useState(true);
    useEffect(() => {
        const getGuardrails = async () => {
            const response = await axios.get(`http://localhost:3000/projects/${id}/guardrails`);
            setGuardrails(response.data);
            setLoading(false);
          //  console.log(response.data)
        }
        getGuardrails();
    }, [])

    const [actionTypeFilter, setActionTypeFilter] = useState("any");

    const filteredGuardrails = guardrails.filter((guardrail) => {

        const matchesActionType = actionTypeFilter == "any" || guardrail.actionType == actionTypeFilter;
        console.log(guardrail.name, guardrail.actionType, matchesActionType)

        return (matchesActionType)
    })

   // console.log(filteredGuardrails)

  return (
    <div>
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


        {/* Guardrails */}


        <div className='mt-10'>
            <div className='flex border-red-200'>
            <div className='text-xl font-medium'> Guardrails </div>
                            
            </div>

            <div className='mt-3 flex'>
                <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
            type="text"
            value=""
            placeholder="Search flag by name, key or description..."
            className="h-8 w-120 rounded-sm border pl-8 text-sm"
            />
            </div>
            <div className='ml-auto flex text-sm font-semibold items-center gap-5'>

                <div className='text-sm font-semibold text-gray-600 flex items-center'>
                    <div> <CircleAlert className='h-3 w-3'/> </div>
                    <Select 
    >
        
        <SelectTrigger className="w-25 justify-between">
            <SelectValue placeholder="Signal"/>
        </SelectTrigger>

        <SelectContent position='popper'>
            <SelectItem value="any">
                Any
            </SelectItem>
        </SelectContent>
    </Select>
                </div>

                <div className='text-sm font-semibold text-gray-600 flex items-center'>
                    <div> <ShieldCheck className='h-3 w-3'/> </div>
                    <Select value = {actionTypeFilter}
        onValueChange={setActionTypeFilter}  
    >
        
        <SelectTrigger className="w-30 justify-between">
            <SelectValue placeholder="Action Type" />
        </SelectTrigger>

        <SelectContent position='popper'>

            <SelectItem value="any">
                Any Action
            </SelectItem>
            <SelectItem value="Kill Switch">
                Kill Switch
            </SelectItem>

            <SelectItem value="Notification">
                Notification
            </SelectItem>
        </SelectContent>
    </Select>
                </div>
            </div>
            </div>
        </div>

        {loading ? (<div className='text-center mt-30'> Loading Guardrails... </div>) : (

            <div>
            {filteredGuardrails.length == 0 ? (
                <div>
                     
                    <div className='mt-10 flex flex-col gap-5 text-gray-600 items-center justify-center border border-gray-200 h-60 rounded-sm'>
                        <ShieldCheck className='h-15 w-15 text-gray-500'/>
                        No Guardrails Yet
                        <button className='bg-blue-700 text-white px-3 py-2 font-medium text-sm rounded-sm cursor-pointer'>Create Guardrail</button>
                    </div>

                    <div className='mt-5 text-sm text-gray-600'> Guardrails help to make sure the flag evaluations have working services by integrating flag dependencies.  </div>
                 </div>
            ) : (
                <div  className='mt-5 flex flex-col gap-2 border pt-2 rounded-sm'>
                    {filteredGuardrails.map((guardrail, idx) => (
                <>
                <div className=' border-gray-200 h-30 rounded-sm pl-5 flex'>
                    <div className=' w-100'>
                    <div className='font-semibold'>
                        {guardrail.name}
                    </div>
                    <div className=' text-gray-800 mt-2 text-sm'>
                        {guardrail.description}
                    </div>
                    <div className='mt-2'>
                        <Badge variant="secondary"> <div className='text-gray-600'> {guardrail.service} </div> </Badge>
                    </div>
                    </div>

                    <div className='ml-10 pt-8 '>
                        <div className='text-sm text-gray-800'>
                            {guardrail.action}
                        </div>
                        <div className='mt-2'>
                        <Badge className={guardrail.actionType == "Kill Switch" ? "bg-red-100 text-red-800" : "bg-blue-50 text-blue-800" }
                        >  {guardrail.actionType}  </Badge>
                        </div>
                    </div>
                </div>
                {(idx != guardrails.length - 1) && <Separator /> }
                {(idx == guardrails.length - 1) && <div className='h-2'></div> }
                </>
            ))}
                </div>
            
            ) }
        </div>

        )}

    </div>
    </div>
  )
}

export default Guardrails
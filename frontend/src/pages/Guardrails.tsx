import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner';
import axios from 'axios';
import { CircleAlert, Search, ShieldCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Guardrails = () => {

    const { projectID } = useParams();
    const [guardrails, setGuardrails] = useState<{
        name: string,
        description: string,
        status: string,
        createdAt: string,
        flag: string,
        environment: string
    }[]
    >([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getGuardrails = async () => {
            const response = await axios.get(`http://localhost:3000/projects/${Number(projectID)}/guardrails`);
            setGuardrails(response.data);
            setLoading(false);
            console.log(response.data)
        }
        getGuardrails();
    }, [])

    const [actionTypeFilter, setActionTypeFilter] = useState("any");

    const filteredGuardrails = guardrails.filter((guardrail) => guardrail);

    // console.log(filteredGuardrails)

    return (
        <div>
            <div className='min-h-screen px-10 py-5 bg-neutral-900 text-neutral-100'>


                <div className='flex mb-5'>
                    <div className=' border-neutral-800 ml-0'>
                        <div>
                            <div className='text-2xl font-medium'> Checkout Service </div>
                            <div className='text-neutral-400' > Themes and Payments flag rollouts </div>
                        </div>
                    </div>

                </div>

                <Separator className="my-2 bg-neutral-800" />


                {/* Guardrails */}


                <div className='mt-10'>
                    <div className='flex border-neutral-800'>
                        <div className='text-xl font-medium'> Guardrails </div>

                    </div>

                    <div className='mt-3 flex'>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                            <input
                                type="text"
                                value=""
                                placeholder="Search flag by name, key or description..."
                                className="h-8 w-120 rounded-sm border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 pl-8 text-sm"
                            />
                        </div>
                        <div className='ml-auto flex text-sm font-semibold items-center gap-5'>

                            <div className='text-sm font-semibold text-neutral-400 flex items-center'>
                                <div> <CircleAlert className='h-3 w-3' /> </div>
                                <Select
                                >

                                    <SelectTrigger className="w-25 justify-between bg-neutral-900 border-neutral-800 text-neutral-100">
                                        <SelectValue placeholder="Signal" />
                                    </SelectTrigger>

                                    <SelectContent position='popper' className="bg-neutral-900 border-neutral-800 text-neutral-100">

                                        <SelectItem value="any">
                                            Any
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='text-sm font-semibold text-neutral-400 flex items-center'>
                                <div> <ShieldCheck className='h-3 w-3' /> </div>
                                <Select value={actionTypeFilter}
                                    onValueChange={setActionTypeFilter}
                                >

                                    <SelectTrigger className="w-30 justify-between bg-neutral-900 border-neutral-800 text-neutral-100">
                                        <SelectValue placeholder="Action Type" />
                                    </SelectTrigger>

                                    <SelectContent position='popper' className="bg-neutral-900 border-neutral-800 text-neutral-100">

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

                {loading ? (<div className='flex flex-col items-center justify-center gap-3 mt-30 text-neutral-400'> <Spinner /> Loading Guardrails...</div>) : (

                    <div>
                        {filteredGuardrails.length == 0 ? (
                            <div>

                                <div className='mt-10 flex flex-col gap-5 text-neutral-400 items-center justify-center border border-neutral-800 h-60 rounded-sm'>
                                    <ShieldCheck className='h-15 w-15 text-neutral-500' />
                                    No Guardrails Yet
                                    <button className='bg-[#becf03] text-black px-3 py-2 font-medium text-sm rounded-sm cursor-pointer'>Create Guardrail</button>
                                </div>

                                <div className='mt-5 text-sm text-neutral-500'> Guardrails help to make sure the flag evaluations have working services by integrating flag dependencies.  </div>
                            </div>
                        ) : (
                            <div className='mt-5 flex flex-col gap-2 border border-neutral-800 pt-2 rounded-sm'>
                                {filteredGuardrails.map((guardrail, idx) => (
                                    <>
                                        <div className=' border-neutral-800 h-30 rounded-sm pl-5 flex'>
                                            <div className=' w-100'>
                                                <div className='font-semibold text-neutral-100'>
                                                    {guardrail.name}
                                                </div>
                                                <div className=' text-neutral-400 mt-2 text-sm'>
                                                    {guardrail.description}
                                                </div>
                                                <div className='mt-2'>
                                                    <Badge variant="secondary" className="bg-neutral-800 text-neutral-300"> <div className='text-neutral-300'> {guardrail.flag} </div> </Badge>
                                                </div>
                                            </div>

                                            <div className='ml-10 pt-8 '>
                                                <div className='text-sm text-neutral-400'>
                                                    {guardrail.environment}
                                                </div>
                                                <div className='mt-2'>
                                                    <Badge size="lg"
                                                     className={guardrail.status == "Kill Switch" ? "bg-red-950 text-red-300" : "bg-[#becf03] text-neutral-900 rounded-full px-1.5 "}
                                                    >  {guardrail.status === "active" && <div className="font-medium">Active</div> } 
                                                       {guardrail.status === "stale" && <>Stale</> } 
                                                      </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        {(idx != guardrails.length - 1) && <Separator className="bg-neutral-800" />}
                                        {(idx == guardrails.length - 1) && <div className='h-2'></div>}
                                    </>
                                ))}
                            </div>

                        )}
                    </div>

                )}

            </div>
        </div>
    )
}

export default Guardrails
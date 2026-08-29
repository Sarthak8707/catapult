import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import React, { useState } from 'react'

const GuardrailDetails = () => {


    const [reducingRollout, setReducingRollout] = useState(true);
    return (
        <div className='min-h-screen px-10 py-5 bg-gray-50'>
            <div className=''>
                <div className='text-2xl font-medium'> New checkout guardrail </div>

            </div>

            <Separator className="my-2 mt-5" />

            <div className='mt-10 h-100 bg-white py-5 px-5 flex border-red-400'>
                <div className='w-180  pr-3 border-amber-500 '>
                    <div>
                        <div className='text-xl font-semibold'> Triggers </div>
                        <div className='text-muted-foreground text-sm mt-1'> The set of conditions which a user has to follow to lie in this segment. </div>
                    </div>

                    <div className='border border-gray-200 text-sm rounded-sm flex h-70 py-3 px-3 mt-5 gap-40'>
                        <div className='text-muted-foreground '>
                            <div> Metric </div>

                            <div className='text-foreground border border-gray-300 mt-3 rounded-xs'>
                                <Select defaultValue="lat">

                                    <SelectTrigger className="w-25 justify-between">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent position='popper'>
                                        <SelectItem value="err">
                                            Error Rate
                                        </SelectItem>
                                        <SelectItem value="tra">
                                            Traffic
                                        </SelectItem>
                                        <SelectItem value="lat">
                                            Latency
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>



                        </div>
                        <div className='text-muted-foreground'>
                            Threshold
                        </div>
                        <div className='text-muted-foreground'>
                            Time Window
                        </div>
                    </div>
                </div>

                <div></div>

                <div className='pl-3  w-110 border-blue-500'>
                    <div className='text-xl font-semibold'>  Actions </div>
                    <div className='text-muted-foreground text-sm mt-1'> Actions which will be executed. </div>
                    <div className='border text-sm border-gray-200 rounded-sm flex flex-col h-70 py-3 px-3 mt-5'>
                        <div className='mb-2'>
                            <div className='flex items-center h-10 gap-3'> <Switch /> <div> Turn Off Feature Flag </div> </div>
                        </div>
                        <Separator />
                        <div className='mt-2'>
                            <div className='flex items-center h-10 gap-3 '> <Switch checked={reducingRollout} onCheckedChange={() => setReducingRollout((prev) => !prev)} /> <div> Reduce Rollout Percentage </div> </div>
                            <div className='mt-1'>
                                <Slider
                                    defaultValue={[75]}
                                    max={100}
                                    step={1}
                                    className="mx-auto w-full max-w-xs" disabled={!reducingRollout}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default GuardrailDetails
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const GuardrailDetails = ({environmentName, triggers, actions }: {

    environmentName: string,

    triggers: {
        metric: string,
        enabled: boolean,
        threshold: any,
        timeWindow: number
    }[], actions: {
        type: string,
        enabled: boolean,
        config: any
    }[]
}) => {


    const [reducingRollout, setReducingRollout] = useState(true);
    return (
        <div className=' border-red-500  py-5 bg-gray-50 '>
            <div className='flex border-red-300 items-center justify-center pl-6 pr-6'>
                <div className=' text-blue-700 rounded-full text-sm px-2.5 border border-blue-700 font-medium'> {environmentName == "dev" ? "Development" : "Staging" } </div>

                <div className='ml-auto flex gap-3'>
                    <button className='  text-blue-700 border border-blue-600 flex items-center gap-1 px-3 py-1 font-medium text-sm transition-colors duration-200 rounded-sm cursor-pointer'>  <div>Pause</div> </button>
                </div>
            </div>

            <div className=' h-100  py-5 px-7 flex border-red-400'>
                <div className='w-180  pr-3 border-amber-500 '>
                    <div>
                        <div className='text-xl font-medium'> Triggers </div>
                        <div className='text-muted-foreground text-sm mt-1'> The set of conditions which a user has to follow to lie in this segment. </div>
                    </div>

                    <div className='border border-gray-200 bg-white text-sm rounded-sm flex flex-col gap-5 h-70 py-3 px-3 mt-5 '>
                        <div className='flex gap-40 pl-17'>
                            <div className='text-muted-foreground '>
                                <div> Metric </div>

                            </div>
                            <div className='text-muted-foreground'>
                                Threshold
                            </div>
                            <div className='text-muted-foreground'>
                                Time Window
                            </div>
                        </div>

                        <div className=' border-red-400 text-foreground flex flex-col gap-2'>
                            <div className='bg-gray-100 rounded-md flex  h-15 items-center pl-2  gap-9'>
                                <Checkbox className='size-6 cursor-pointer' checked={triggers[0]?.enabled } />
                                <div className='flex '>
                                    <div className=''> {triggers[0]?.metric} reaches</div>
                                    <div className='ml-25'> {triggers[0]?.threshold}% </div>
                                    <div className='ml-45'> within {triggers[0]?.timeWindow} minutes </div>
                                </div>
                            </div>
                            {/* <div className=" h-[0.5px] w-full bg-border" /> */}
                            <div className='flex bg-gray-100 rounded-md h-15 items-center pl-2 gap-9'>
                                <Checkbox className='size-6 cursor-pointer' />
                                <div className='flex '>
                                    <div className=''> {triggers[1]?.metric} reaches</div>
                                    <div className='ml-25'> {triggers[1]?.threshold}% </div>
                                    <div className='ml-45'> within {triggers[1]?.timeWindow} minutes </div>
                                </div>
                            </div>
                            {/* <div className=" h-[0.5px] w-full bg-border" /> */}
                            <div className='flex bg-gray-100 rounded-md h-15 items-center pl-2 gap-9'>
                                <Checkbox className='size-6 cursor-pointer' />
                                <div className='flex '>
                                    <div className=''> Traffic spikes upto </div>
                                    <div className='ml-18'> 10K requests </div>
                                    <div className='ml-37'> within 10 minutes </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div></div>

                <div className='pl-3  w-110 border-blue-500'>
                    <div className='text-xl font-medium'>  Actions </div>
                    <div className='text-muted-foreground text-sm mt-1'> Actions which will be executed. </div>
                    <div className='border text-sm bg-white border-gray-200 rounded-sm flex flex-col h-70 py-3 px-3 mt-5'>
                        <div className='mb-4 mt-1'>
                            <div className='flex items-center h-6 gap-3'> <Switch className="cursor-pointer" checked={actions[0]?.enabled} /> <div> {actions[0]?.type} </div> </div>
                            <div className='ml-11 text-xs text-muted-foreground '> Instantly turn off feature flag </div>
                        </div>
                        <Separator />
                        <div className='mt-2 mb-6'>
                            <div className='flex items-center h-10 gap-3 '> <Switch className="cursor-pointer" checked={reducingRollout} onCheckedChange={() => setReducingRollout((prev) => !prev)} /> <div> Rollback </div> </div>
                            <div className=''>
                                <Slider
                                    defaultValue={[75]}
                                    max={100}
                                    step={1}
                                    className="mx-auto w-full max-w-xs" disabled={!reducingRollout}
                                />
                            </div>
                            <div className='ml-11 text-xs text-muted-foreground mt-2'> Reduce rollout percentage to selected value </div>
                        </div>
                        <div className="my-2 h-[0.5px] w-full bg-border" />
                        <div className='mt-3 flex flex-col gap-0'>
                            <div className='flex  items-center h-6 gap-3'> <Switch className="cursor-pointer" /> <div> Send Notification </div> </div>
                            <div className='ml-11 text-xs text-muted-foreground '> Update audit trails to notify your team members </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default GuardrailDetails
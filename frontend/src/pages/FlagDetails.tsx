
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { Card, CardHeader, CardPanel, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const FlagDetails = () => {

    const {id} = useParams();

  return (
    <div className='min-h-screen p-6'>
    
            <div>  </div>
    
            <div className='flex mb-5'>
            <div className=' border-amber-950 ml-0'>
                <div>
                    <div className=' flex items-center gap-0.5'> <div className='text-2xl font-medium'>greetings</div>
                      </div>
                    
                </div>
            </div>
            
                
            </div>
    
            <Separator className="my-2" />
    
            
    
            <div className=' border-red-500 w-220 h-100 mt-5'>
                <Card className='h-200'>
                    <CardHeader>
                        <CardTitle className='flex'> <div className=''>Flag is On</div> <Switch className="ml-auto [--thumb-size:--spacing(4)] cursor-pointer"/>
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardPanel>
                        <div className='mt-5'>
                            <div className='mt-8'> Release Conditions</div>
                            <Separator className="my-8"/> 
                            <div className=' border-red-500'>
                                <div className='ml-10'>Flow 1</div>
                                <div className='flex justify-center mt-8'>
                                    <Card className="w-170 h-20 flex justify-center px-8">
                                    <div className=" border-red-500 flex">
                                    <div className='text-gray-500 w-30'>Rollout %</div>
                                    <div>70% of your users included</div>
                                    </div>
                                    </Card>
                                </div>
                            </div>  

                            <Separator className="my-8"/> 
                            <div >
                                <div className='ml-10'>Flow 2</div>
                                <div className='flex flex-col justify-center items-center gap-2 mt-8'>
                                    
                                    <Card className="w-170 h-20 flex justify-center px-8">
                                    <div className=" flex">
                                    <div className='w-30 text-gray-500'>Rollout %</div>
                                    <div >70% of your users included</div>
                                    </div>
                                    </Card>
                                    
                                    <Badge variant="info"> AND </Badge>
                                    
                                    <Card className="w-170 h-20 flex justify-center px-8">
                                    <div className="flex ">
                                    <div className='w-30 text-gray-500'>Constraint</div>
                                    <div>device is one of mobile device </div>
                                    </div>
                                    </Card>
                                    
                                </div>
                            </div> 

                        </div>
                    </CardPanel>
                </Card>
            </div>
    
            
    
            {/* Recent Activity */}
    
            <div></div>
    
        </div>
  )
}

export default FlagDetails
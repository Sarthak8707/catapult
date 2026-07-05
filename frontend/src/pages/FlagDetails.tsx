
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { Card, CardHeader, CardPanel, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import EvaluationCards from '@/components/EvaluationCards';
import { ArrowRight } from 'lucide-react';

const FlagDetails = () => {

    const {id} = useParams();
    const [flagRules, setFlagRules] = useState<{
        ruleName: string,
    conditions: {
      operator: string,
      conditions: {
        field: string,
        value: string,
        operator: string
      }[]
    },
    
    rollouts: {
      percentage: number,
      variantName: string,
      value: {
        param: string,
        val: any
      }
    }[]
    }[]
    >([]);

    useEffect(() => {
        const getFlagRules = async () => {
            const reponse = await axios.get(`http://localhost:3000/flags/${id}`);
            setFlagRules(reponse.data);
        }

        getFlagRules();
    }, [])

  return (
    <div className='min-h-screen p-12 bg-neutral-50 border-red-400'>
    
            <div>  </div>
    
            <div className='flex mb-5'>
            <div className=' border-amber-950 ml-0 mt-5'>
                <div>
                    <div className=' flex items-center gap-0.5'> <div className='text-3xl font-medium'>greetings</div>
                    </div>
                    
                </div>
            </div>
            
                
            </div>
    
            {/* Top Analytics */}

            <div className='text-2xl mt-20'>Summary</div>
            <div className='text mt-8'> Highlights of the flag based on past evaluations and changes</div>

            <div className='bg-white h-40 flex  mt-5'>
                <div className='pt-5 pl-4'> <div className='flex gap-2 items-center text-blue-500 hover:text-blue-700 cursor-pointer'>Evaluations/day <ArrowRight className='h-4 w-4' /> </div> <div className='text-xl mt-8'>1.2 Million</div> </div>
                <Separator orientation="vertical" className="ml-40"></Separator>
                <div className='pt-5 pl-4'> <div className='flex gap-2 items-center text-blue-500 hover:text-blue-700 cursor-pointer'>Last evaluation <ArrowRight className='h-4 w-4' /> </div> <div className='text-xl mt-8'>8 seconds ago</div> </div>
                <Separator orientation='vertical' className="ml-40"></Separator>
                <div className='pt-5 pl-4'> <div className='flex gap-2 items-center text-blue-500 hover:text-blue-700 cursor-pointer'>Unique users <ArrowRight className='h-4 w-4' /> </div> <div className='text-xl mt-8'>48 thousand</div> </div>
                <Separator orientation='vertical' className="ml-40"></Separator>
                <div className='pt-5 pl-4'> <div className='flex gap-2 items-center text-blue-500 hover:text-blue-700 cursor-pointer'>Rollouts <ArrowRight className='h-4 w-4' /> </div> <div className='text-xl mt-8'>4 Strategies</div> </div>
            </div>

           
           {/* Flag Rules */}
            
            <div className='text-2xl mt-20'>Flag Evaluation</div>
            <div className='mt-8'> The evalution flow shows in which order the rules will be applied to flag, and how rollouts will work </div>
    
            <div className='border-red-500 w-220  mt-5'>
                <Card className='border-none rounded-none'>
                    <CardHeader>
                        <CardTitle className='flex'> <div className=''>Flag is On</div> <Switch className="ml-auto [--thumb-size:--spacing(4)] cursor-pointer"/>
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardPanel className=''>
                        <div className='mt-5'>
                            <div className='mt-8'> Release Flow</div>
                            <Separator className="my-8"/> 

                            {/* Evaluation Cards */}

                            <EvaluationCards rules={flagRules} />

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
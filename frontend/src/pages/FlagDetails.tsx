
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
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';


type RulesType = {
    
    ruleID: number,
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
    }


const FlagDetails = () => {

    const {id} = useParams();

    const [flagData, setFlagData] = useState<{
        configID: number,
        environment: string,
        rules: RulesType[]
    }[]>([])
    const [devRules, setDevRules] = useState<RulesType[]>([]);
    const [stagRules, setStagRules] = useState<RulesType[]>([]);

    useEffect(() => {
        const getFlagData = async () => {
            const response = await axios.get(`http://localhost:3000/flags/${id}`);
            setFlagData(response.data);

            console.log(response.data)

            const dev = response.data.find((c: any) => c.environment == "dev");
            setDevRules(dev.rules);

            const prod = response.data.find((c: any) => c.environment == "stag");
            setStagRules(prod.rules);
            console.log(dev)

        }

        getFlagData();
    }, [])

  return (
    <div className='min-h-screen p-12 bg-neutral-100 border-red-400'>
    
    
            <div className='flex mb-5'>
            <div className=' border-amber-950 ml-0 mt-5'>
                <div>
                    <div className=' flex items-center gap-0.5'> <div className='text-3xl font-medium'>greetings</div>
                    </div>
                    
                </div>
            </div>
            
                
            </div>
    
            {/* Top Analytics */}

            

           
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
                            <div className='mt-8 mb-5'> Release Flow</div>
                             

                            {/* Evaluation Cards */}

                            <Tabs defaultValue="tab-1">
                                <TabsList variant="underline" className="mb-5">
                                    <TabsTab value="tab-1">Development</TabsTab>
                                    <TabsTab value="tab-2">Staging</TabsTab>
                                </TabsList>

                                <TabsPanel value="tab-1">

                                    <EvaluationCards rules={devRules} />
                                </TabsPanel>
                                <TabsPanel value="tab-2">
                                    <EvaluationCards rules={stagRules} />
                                </TabsPanel>

                            </Tabs>

                            

                        </div>
                    </CardPanel>
                </Card>
            </div>
    
            
    
            {/* About Flag */}

            <div className='text-2xl mt-20'>About</div>
            <div className='mt-8'> Details about the flag </div>
            <div className='mt-5 bg-white  flex'>

                <div className='flex flex-col  border-red-600 w-140 pt-5 pb-5 pl-10 gap-3'>
                    <div className='flex'> <div className='text-gray-500 w-40'>Type</div> Release flag  </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Environment</div> Production </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Lifecycle</div> Active  </div>
                </div>

                <div className='flex flex-col  border-amber-800 w-140 pt-5 pb-5 pl-10 gap-3 ml-auto'>
                    <div className='flex'> <div className='text-gray-500 w-40'>Created </div> 23 June, 2026 </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Created by</div> Nick  </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Tags</div> Dashboard  </div>
                </div>

            </div>
    
        </div>
  )
}

export default FlagDetails
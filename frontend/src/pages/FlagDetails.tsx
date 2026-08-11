
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { Card, CardHeader, CardPanel, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import EvaluationCards from '@/components/EvaluationCards';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Actions from '@/components/Actions';


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
    const Id = Number(id);

    const [devRules, setDevRules] = useState<RulesType[]>();
    const [stagRules, setStagRules] = useState<RulesType[]>([]);    

    const [flagInfo, setFlagInfo] = useState<{name: string, description: string, type: string}>();

    useEffect(() => {
        const getFlagData = async () => {
            const response = await axios.get(`http://localhost:3000/flags/${id}`);

            const res2 = await axios.get(`http://localhost:3000/flags/${id}/summary`);
            setFlagInfo(res2.data);
            console.log(response.data)

            const dev = response.data.find((c: any) => c.environment == "dev");
            if(dev)  setDevRules(dev.rules);
            else setDevRules([])

            const stag = response.data.find((c: any) => c.environment == "stag");
            if(stag)  setStagRules(stag.rules);
            else setStagRules([])
            console.log(dev)

        }

        getFlagData();
    }, [])

  return (
    <div className='min-h-screen px-10 py-5 bg-white'>
    
    
            <div className='mb-5'>
            <div className=' border-amber-950 ml-0'>
                <div>
                    <div className=''> 
                        <div className=' border-red-950 flex'>
                             <div className='text-2xl font-medium'>{ flagInfo ? (flagInfo.name) : (<>Flag Name</>) }</div>
                              <div className='ml-auto mr-5'> 
                                <Actions flagID={Id}/>
                              </div>
                         </div>
                    <div className='text-gray-600'> { flagInfo ? (flagInfo.description) : (<>Flag Description</>) } </div>
                    </div>
                    
                </div>
            </div>
                
            </div>

            <Separator className="my-2" />
    
            {/* Top Analytics */}

            

           
           {/* Flag Rules */}
            
            <div className='text-xl mt-10 font-semibold'>Flag Evaluation</div>
            <div className='text-gray-600 mt-1 flex gap-1 text-sm'> The release flow of the flag across various rules. In case server is unreachable, <div className='text-blue-700 font-medium'>default rule</div> will be applied.</div>
    
            <div className='border-red-500 w-220  mt-10'>
                <Card className=' rounded-sm'>
                    <CardHeader>
                        <CardTitle className='flex'> <div className=''>Flag is On</div> <Switch className="ml-auto [--thumb-size:--spacing(4)] cursor-pointer"/>
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardPanel className=''>
                        <div className='mt-5'>
                            <div className='mt-8 mb-5'> Release Flow</div>
                             

                            {/* Evaluation Cards */}

                            <Tabs >
                                <TabsList variant="underline" className="mb-5">
                                    <TabsTab value="tab-1">Development</TabsTab>
                                    <TabsTab value="tab-2">Staging</TabsTab>
                                </TabsList>

                                <TabsPanel value="tab-1">

                                    {devRules ? (<EvaluationCards rules={devRules} />) : 
                                    (<div className='flex items-center justify-center'>Loading Release Flow</div>)}
                                </TabsPanel>
                                <TabsPanel value="tab-2">
                                    {stagRules ? (<EvaluationCards rules={stagRules} />) : 
                                    (<div className='flex items-center justify-center'>Loading Release Flow</div>)}
                                </TabsPanel>

                            </Tabs>

                            

                        </div>
                    </CardPanel>
                </Card>
            </div>

            <div className='mt-10'></div>


            <div className="my-2 h-[0.5px] w-full bg-border" />
    
            {/* About Flag */}

            <div className='text-xl mt-10 font-semibold'>About</div>
            <div className='mt-1 text-gray-600 text-sm'> Details about the flag </div>
            <div className='mt-5 border-red-300 bg-white text-sm flex'>

                <div className='flex flex-col border-red-600 w-140 pt-5 pb-5 pl-10 gap-3 text-sm'>
                    <div className='flex text-sm'> <div className='text-gray-500 w-40'>Type</div> Release flag  </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Environment</div> Production </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Type</div> { flagInfo ? (flagInfo.type) : (<>type</>) }  </div>
                </div>

                <div className='flex flex-col  border-amber-800 w-140 pt-5 pb-5 pl-10 gap-3 ml-auto'>
                    <div className='flex text-sm'> <div className='text-gray-500 w-40'>Created </div> 23 June, 2026 </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Created by</div> Nick  </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Tags</div> Dashboard  </div>
                </div>

            </div>
    
        </div>
  )
}

export default FlagDetails
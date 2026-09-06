import React from 'react'
import { Tabs, TabsList, TabsTab, TabsPanel } from './ui/tabs'
import { Card, CardHeader, CardTitle, CardPanel } from './ui/card'
import { Separator } from './ui/separator'
import { Switch } from './ui/switch'
import EvaluationCards from './EvaluationCards'
import { Spinner } from './ui/spinner'

const FlagEvaluation = ({loading, devRules, setDevRules, devEnabled, stagRules, stagEnabled, handleChange, 
    disabled, variants
} :
     {loading: any, devRules: any, setDevRules: any, devEnabled: any, stagRules: any, stagEnabled: any, 
        handleChange: any, disabled: any, variants: any
     }) => {


  return (
    <div>
        <div className=' border-red-500'>
                <div className='text-xl mt-10 font-semibold'>Flag Evaluation</div>
            <div className='text-gray-600 mt-1 flex gap-1 text-sm'> The release flow of the flag across various rules. In case server is unreachable, <div className='text-blue-700 font-medium'>default rule</div> will be applied.</div>
    
            {loading ? <div className=' h-150 w-220  mt-10 rounded-sm font-medium border flex flex-col gap-2 text-gray-700 items-center justify-center' > <Spinner /> Loading Flag Evaluation... </div> : 
            <>
            <div className='border-red-500 w-220  mt-10'>

            <Tabs >
                    <TabsList  className="mb-5">
                                    <TabsTab value="tab-1" className="w-40 data-active:text-indigo-800">Development</TabsTab>
                                    <TabsTab value="tab-2" className="w-40 data-active:text-yellow-800">Staging</TabsTab>
                    </TabsList>

                    <TabsPanel value="tab-1">


            <Card className=' rounded-sm'>
                    <CardHeader>
                        <CardTitle className='flex'> <div className=''>Flag is On {devEnabled ? <>True</>: <>False</> }  </div> <Switch className="ml-auto [--thumb-size:--spacing(4)] cursor-pointer" checked = {devEnabled} onCheckedChange={(check) => {handleChange(check, "dev")}} disabled = {disabled} />
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardPanel className=''>
                        <div className='mt-5'>
                            <div className='mt-8 mb-5'> Release Flow</div>
                             

                            {/* Evaluation Cards */}

                            {devRules && <EvaluationCards rules={devRules} variants={variants}  setDevRules={setDevRules}/>}

                            

                        </div>
                    </CardPanel>
            </Card>                
                        </TabsPanel>
                        <TabsPanel value="tab-2">

            <Card className=' rounded-sm'>
                    <CardHeader>
                        <CardTitle className='flex'> <div className=''>Flag is On {stagEnabled ? <>True</>: <>False</> }  </div> <Switch className="ml-auto [--thumb-size:--spacing(4)] cursor-pointer" checked = {stagEnabled} onCheckedChange={(check) => {handleChange(check, "stag")}} disabled = {disabled} />
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardPanel className=''>
                        <div className='mt-5'>
                            <div className='mt-8 mb-5'> Release Flow</div>
                             

                            {/* Evaluation Cards */}

                           {stagRules && <EvaluationCards variants={variants} rules={stagRules} setDevRules={setDevRules}/>}

                            

                        </div>
                    </CardPanel>
            </Card>                 
                        </TabsPanel>

        </Tabs>

        </div>
            </> }
            </div>
    </div>
  )
}

export default FlagEvaluation
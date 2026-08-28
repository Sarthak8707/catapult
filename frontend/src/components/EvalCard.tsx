import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import RuleEditor from './RuleEditor'


type RuleType = {
    ruleID: number
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

const EvalCard = ({conditions, rollouts, ruleID}: RuleType) => {

  

  return (
    <div>
                        <div >
                            
                            <div className='border bg-gray-50 rounded-sm border-gray-200 flex flex-col justify-center items-center gap-2 mt-8'>
                            
                                    
                                    {/* Conditions */}

                                {conditions.conditions.map((condition, index) => (
                                <div className='flex flex-col items-center gap-2'>

                                <div className=" flex items-center w-170 h-20  px-8 rounded-sm text-sm">
                                <div className="flex ">
                                <div className='w-30 text-muted-foreground'>Constraint</div>
                                <div className='text-muted-foreground flex gap-1'>  If <div className='font-medium text-foreground'>{condition.field}</div> {` `} {condition.operator} {` `} <Badge variant="secondary" size="lg">
                                    <div className='font-medium text-foreground'>{condition.value}</div>
                                    </Badge>  </div>
                                </div>
                                </div>


                                {(index != conditions.conditions.length - 1)  && 

                                (<div className='text-sm border border-white bg-blue-100 text-info-foreground px-2 rounded-sm font-semibold'>And</div>)
                                
                                }

                                </div>
                                ))}    

                                {/* Rollouts */}

                                <div className='flex flex-col items-center gap-2'>

                                <div className='text-sm text-gray-600 font-semibold'>Then</div> 

                                <div className="w-170 flex items-center px-8 rounded-sm text-sm">
                                <div className=" flex  py-4 border-red-400">
                                <div className='w-30 text-muted-foreground  border-blue-600 flex items-center'>Rollout </div>
                                <div > {rollouts.map((rollout, index) => (
                                  <div className='text-muted-foreground flex gap-1'> 
                                    <div className='font-medium text-foreground'> {rollout?.percentage}% </div> of users get <div className='font-medium text-foreground'>{rollout?.value?.val}</div> 
                                  </div>
                                ))} </div>
                                </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>        
    </div>
  )
}

export default EvalCard
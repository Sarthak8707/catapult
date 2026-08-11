import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'


type RuleType = {
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

const EvalCard = ({conditions, rollouts}: RuleType) => {
  return (
    <div>
                        <div >
                            
                            <div className=' border-red-600 flex flex-col justify-center items-center gap-2 mt-8'>
                            
                                    
                                    {/* Conditions */}

                                {conditions.conditions.map((condition, index) => (
                                <div className='flex flex-col items-center gap-2'>

                                <Card className="w-170 h-20 flex justify-center px-8 rounded-sm text-sm">
                                <div className="flex ">
                                <div className='w-30 text-gray-600'>Constraint</div>
                                <div className='text-gray-600 flex gap-1'>  If <div className='font-semibold'>{condition.field}</div> {` `} {condition.operator} {` `} <Badge variant="secondary" size="lg">
                                    <div className='font-medium text-gray-600'>{condition.value}</div>
                                    </Badge>  </div>
                                </div>
                                </Card>


                                {(index != conditions.conditions.length - 1)  && 

                                (<div className='text-sm text-gray-600 font-semibold'>And</div>)
                                
                                }

                                </div>
                                ))}    

                                {/* Rollouts */}

                                <div className='flex flex-col items-center gap-2'>

                                <div className='text-sm text-gray-600 font-semibold'>Then</div> 

                                <Card className="w-170  flex justify-center px-8 rounded-sm text-sm">
                                <div className=" flex  py-4 border-red-400">
                                <div className='w-30 text-gray-600  border-blue-600 flex items-center'>Rollout %</div>
                                <div > {rollouts.map((rollout, index) => (
                                  <div className='text-gray-600 flex gap-1'> 
                                    <div className='font-semibold'> {rollout?.percentage}% </div> of users get <div className='font-medium'>{rollout?.value?.val}</div> 
                                  </div>
                                ))} </div>
                                </div>
                                </Card>
                                </div>
                                
                            </div>
                        </div>        
    </div>
  )
}

export default EvalCard
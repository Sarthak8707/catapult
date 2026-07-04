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

                                <Card className="w-170 h-20 flex justify-center px-8">
                                <div className="flex ">
                                <div className='w-30 text-gray-500'>Constraint</div>
                                <div>  If {condition.field} {` `} {condition.operator} {` `} {condition.value}  </div>
                                </div>
                                </Card>


                                {(index != conditions.conditions.length - 1)  && 

                                (<Badge variant="info"> AND </Badge>)
                                
                                }

                                </div>
                                ))}    

                                {/* Rollouts */}

                                <Card className="w-170 h-20 flex justify-center px-8">
                                <div className=" flex">
                                <div className='w-30 text-gray-500'>Rollout %</div>
                                <div > {rollouts[0].percentage} % of users get {rollouts[0].value.val} </div>
                                </div>
                                </Card>
                                
                            </div>
                        </div>        
    </div>
  )
}

export default EvalCard
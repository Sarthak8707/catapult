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

                                <Card className="w-170 h-20 flex justify-center px-8 rounded-none">
                                <div className="flex ">
                                <div className='w-30 text-gray-500'>Constraint</div>
                                <div>  If {condition.field} {` `} {condition.operator} {` `} <Badge variant="secondary" size="lg">
                                    {condition.value}
                                    </Badge>  </div>
                                </div>
                                </Card>


                                {(index != conditions.conditions.length - 1)  && 

                                (<Badge variant="default"> AND </Badge>)
                                
                                }

                                </div>
                                ))}    

                                {/* Rollouts */}

                                <div className='flex flex-col items-center gap-2'>

                                <Badge variant="default">THEN</Badge> 

                                <Card className="w-170  flex justify-center px-8 rounded-none">
                                <div className=" flex  py-4 border-red-400">
                                <div className='w-30 text-gray-500  border-blue-500 flex items-center'>Rollout %</div>
                                <div > {rollouts.map((rollout, index) => (
                                  <div> 
                                    {rollout.percentage} % of users get {rollout.value.val} 
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
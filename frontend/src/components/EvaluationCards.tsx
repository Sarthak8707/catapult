import React from 'react'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card } from './ui/card';
import EvalCard from './EvalCard';


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


interface EvaluationCardsProps { rules: RuleType[] }

const EvaluationCards = ({rules}: EvaluationCardsProps) => {
  return (
    <div>
        <div className=' border-red-800'>
            <div>
                {rules.map((rule, index) => (
                    <div>
                        <div className='ml-10'>Rule {index + 1}</div>
                        <EvalCard {...rule}/>
                        {(index != rules.length - 1) && 
                           <Separator className="my-8"/>
                        }
                    </div>
                ))}
            </div>
                             
                             
        </div>
    </div>
  )
}

export default EvaluationCards
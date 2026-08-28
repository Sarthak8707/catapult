
import { Separator } from '@/components/ui/separator';
import EvalCard from './EvalCard';
import { EllipsisVertical, Pencil, Trash2, } from 'lucide-react';
import { Button } from './ui/button';
import RuleEditor from './RuleEditor';
import { useState } from 'react';

type VariantsType = {
    variantName: string,
      variantID: number,
      value: {
        param: string,
        val: any
      }
}[]

type RuleType = {
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
      rolloutID: number,
      percentage: number,
      variantName: string,
      variantID: number,
      value: {
        param: string,
        val: any
      }
    }[]
}


interface EvaluationCardsProps { rules: RuleType[], setDevRules: React.Dispatch<React.SetStateAction<any>>, variants: VariantsType}

const EvaluationCards = ({rules, setDevRules, variants}: EvaluationCardsProps) => {

  const [editing, setEditing] = useState<number | null>(null);

  if(rules.length == 0){
    return <>
     <div className=' flex items-center justify-center'>
       <button className='bg-blue-700 text-white px-6 py-2 font-bold text-sm rounded-sm cursor-pointer'>Create your Release Flow</button>
    </div> 
    </>
  }

  return (
    <div>
        <div className='border-red-800 min-h-100 mb-10'>
            <div>
                {rules.map((rule, index) => (
                    <div>
                        <div className='ml-10 mr-10 flex'>Rule {index + 1}  <div className='ml-auto flex border border-gray-200 rounded'> 
                          {index == editing ? <>
                              <button className='hover:bg-neutral-100 rounded-xs px-1 text-gray-600 font-medium text-sm cursor-pointer' onClick={() => setEditing(null)}>Cancel</button>
                          </> : <>
                              <Button variant="ghost" className='border-none' onClick={() => setEditing(index)} > <Pencil /> </Button>
                          </> }
                          <Button variant="ghost" className='border-none'> <EllipsisVertical /> </Button>
                          
                           </div>  </div>

                        {index == editing ? <> <RuleEditor conditions={rule.conditions.conditions} 
                            rollouts = {rule.rollouts} ruleID={rule.ruleID} setEditing={setEditing} 
                            setDevRules={setDevRules} variants={variants}
                         /> </> : <> <EvalCard {...rule}/> </> }


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
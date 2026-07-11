
import { Separator } from '@/components/ui/separator';
import EvalCard from './EvalCard';
import { EllipsisVertical, Pencil, Trash2, } from 'lucide-react';
import { Button } from './ui/button';

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
                          <Button variant="ghost" className='border-none'> <Pencil /> </Button>
                          <Button variant="ghost" className='border-none'> <EllipsisVertical /> </Button>
                          <Button variant="destructive-outline" className='border-none'> <Trash2 /> </Button>
                          
                           </div>  </div>
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
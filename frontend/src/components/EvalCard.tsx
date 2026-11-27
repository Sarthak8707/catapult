import { Badge } from './ui/badge'


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

  segments: {
    segmentID: number,
    segmentName: string,
    segmentData: {
      operator: string,
      conditions: {
        field: string,
        value: any,
        operator: string
      }[]
    }
  }[],

  rollouts: {
    percentage: number,
    variantName: string,
    value: {
      param: string,
      val: any
    }
  }[]
}

const EvalCard = ({ conditions, rollouts, segments, ruleID }: RuleType) => {
  console.log("segmentData:::", segments)


  return (
    <div>
      <div >

        <div className=' border-neutral-800 bg-neutral-800/40 rounded-sm flex flex-col justify-center items-center gap-2 mt-8'>


          {/* Conditions */}

          {conditions.conditions.map((condition, index) => (
            <div className='flex flex-col items-center gap-2'>

              <div className=" flex items-center w-170 h-20  px-8 rounded-sm text-sm">
                <div className="flex ">
                  <div className='w-30 text-neutral-400'>Constraint</div>
                  <div className='text-neutral-400 flex gap-1'>  If <div className='font-medium text-neutral-100'>{condition.field}</div> {` `} {condition.operator} {` `} <Badge variant="secondary" size="lg">
                    <div className='font-medium text-neutral-100'>{condition.value}</div>
                  </Badge>  </div>
                </div>
              </div>


              {(index != conditions.conditions.length - 1) &&

                (<div className='text-sm  bg-neutral-100 text-neutral-900 px-2 rounded-full font-semibold'>And</div>)

              }

            </div>
          ))}

          {/* Segments Data */}

          {segments.map((s) => (<>
            {s.segmentData && <div>
              <div className='bg-neutral-900 border border-neutral-800 rounded-sm '>
                <div className='text-neutral-400 text-sm border-red-400 pl-13 pt-5 flex gap-15'> Segment <div className='text-neutral-100'> {s.segmentName} </div> </div>
                <div className='bg-neutral-900 border-red-400 pl-10'>
                  {s.segmentData?.conditions.map((condition, index) => (
                    <div className='flex flex-col items-center gap-2'>

                      <div className=" flex items-center w-170 h-20  px-8 rounded-sm text-sm">
                        <div className="flex">
                          <div className='w-30 text-neutral-400'>Constraint</div>
                          <div className='text-neutral-400 flex gap-1'>  If <div className='font-medium text-neutral-100'>{condition.field}</div> {` `} {condition.operator} {` `} <Badge variant="secondary" size="lg">
                            <div className='font-medium text-neutral-100'>{condition.value}</div>
                          </Badge>  </div>
                        </div>
                      </div>


                      {(index != s.segmentData.conditions.length - 1) &&

                        (<div className=' px-1.5 text-xs bg-neutral-100 text-neutral-900 rounded-full font-semibold'>And</div>)

                      }

                    </div>
                  ))}
                </div>
              </div>
            </div>}
          </>))}

          {/* Rollouts */}

          <div className='flex flex-col items-center gap-2 mt-6 mb-5'>

            <div className='text-sm  bg-neutral-100 text-neutral-900 px-2 rounded-full font-semibold'>Then</div>

            <div className="w-170 flex items-center px-8 rounded-sm text-sm mt-3">
              <div className=" flex  py-4 border-red-400">
                <div className='w-30 text-neutral-400  border-blue-600 flex items-center'>Rollout </div>
                <div > {rollouts.map((rollout, index) => (
                  <div className='text-neutral-400 flex gap-1'>
                    <div className='font-medium text-neutral-100'> {rollout?.percentage}% </div> of users get <div className='font-medium text-neutral-100'>{rollout?.value?.val}</div>
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
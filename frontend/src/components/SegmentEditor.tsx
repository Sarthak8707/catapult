import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type conditionsType = {

    field: string,
    operator: string,
    value: any

}[]

const SegmentEditor = ({ conditions }: { conditions: conditionsType }) => {

    const [conditionsNew, setConditionsNew] = useState(conditions ?? [{

        field: "",
        operator: "equals",
        value: ""

    }])


    return (

        <div>
            <div className='border h-100 w-220 mt-10 rounded-sm py-5'>
                {conditionsNew?.map((condition, idx) => (
                    <div className='flex flex-col items-center gap-2'>

                        <div className=" flex items-center w-170 h-20  px-8 rounded-sm text-sm">
                            <div className="flex ">
                                <div className='w-30 text-muted-foreground'>Context</div>
                                <div className='text-muted-foreground flex gap-1 border px-2 py-0.5'>  If <div className='font-medium text-foreground'>{condition.field}</div> {` `} {condition.operator} {` `} <Badge variant="secondary" size="lg">
                                    <div className='font-medium text-foreground'>{condition.value}</div>
                                </Badge>
                                </div>
                            </div>
                        </div>


                        {(idx != conditions.length - 1) &&

                            (<div className='text-sm border border-white bg-blue-100 text-info-foreground px-2 rounded-sm font-semibold'>And</div>)

                        }

                    </div>
                ))}
            </div>
        </div>

    )
}

export default SegmentEditor
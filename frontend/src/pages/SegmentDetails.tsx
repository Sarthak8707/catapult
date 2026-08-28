import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SegmentDetails = () => {

    const {id} = useParams();
    const [segment, setSegment] = useState<{
      name: string,
      description: string,
      type: string,
      conditions: {
        operator: string,
        conditions: {
          field: string,
          operator: string,
          value: any
        }[]
      },
      createdAt: string
    } >();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getSegmentDetails = async () => {
        const response = await axios.get(`http://localhost:3000/segments/${id}`);
        setSegment(response.data);
        setLoading(false);
        console.log(response.data)
      }

      getSegmentDetails();
    }, [])

    console.log("segment::", segment)

  return (
    <div className='min-h-screen px-10 py-5 bg-white'>
        <div className=''> 
            <div className='text-2xl font-medium'> Segments </div>
            
        </div>

        <Separator  className="my-2 mt-5"/>
        
        <div className='text-xl font-semibold mt-10'> Segment Conditions </div>
        <div className='text-muted-foreground text-sm mt-1'> The set of conditions which a user has to follow to lie in this segment. </div>

        {loading ? <div className='flex items-center justify-center h-100 w-220'> Loading Segment Conditions... </div> : 
        <div> 
          <div className='border h-100 w-220 mt-10 rounded-sm py-5'>
            {segment && segment.conditions.conditions.map((condition, idx) => (
              <div className='flex flex-col items-center gap-2'>
              
                    <div className=" flex items-center w-170 h-20  px-8 rounded-sm text-sm">
                        <div className="flex ">
                        <div className='w-30 text-muted-foreground'>Context</div>
                        <div className='text-muted-foreground flex gap-1'>  If <div className='font-medium text-foreground'>{condition.field}</div> {` `} {condition.operator} {` `} <Badge variant="secondary" size="lg">
                            <div className='font-medium text-foreground'>{condition.value}</div>
                                </Badge>  </div>
                                    </div>
                    </div>
              
              
                      {(idx != segment.conditions.conditions.length - 1)  && 
              
                        (<div className='text-sm border border-white bg-blue-100 text-info-foreground px-2 rounded-sm font-semibold'>And</div>)
                                              
                      }
              
                      </div>
            ))}
        </div>
        </div>
         }

        
    </div>
  )
}

export default SegmentDetails
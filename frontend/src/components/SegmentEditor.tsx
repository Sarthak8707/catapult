import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator'
import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toastManager } from './ui/toast';

type conditionsType = {

    field: string,
    operator: string,
    value: any

}[]

type SegmentType = {

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
}

const SegmentEditor = ({ conditions, setSegment, setEditing }: {
    conditions: conditionsType,
    setSegment: React.Dispatch<React.SetStateAction<SegmentType | undefined>>,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [conditionsNew, setConditionsNew] = useState(conditions ?? [{

        field: "",
        operator: "equals",
        value: ""

    }])

    const { segmentID } = useParams();

    const updateConditions = (idx: number, e: any) => {
        console.log(conditionsNew !== conditions)
        setConditionsNew((prev) =>
            prev.map((condition, i) => (
                i === idx ? {
                    ...condition,
                    [e.target.name]: e.target.value,
                } : condition
            ))
        )
    }

    const addCondition = () => {

        setConditionsNew((prev) => [
            ...prev,
            {
                field: "",
                operator: "equals",
                value: ""
            }
        ])
    }

    const hasChanges = JSON.stringify(conditions) !== JSON.stringify(conditionsNew);

    const [saving, setSaving] = useState(false);

    const handleSave = async () => {

        setSaving(true);
        try {
            const response = await axios.put(`http://localhost:3000/segments/${segmentID}`, {
                "conditions": conditionsNew
            });

            setSegment((prev) => {

                if (!prev) return prev

                return {
                    ...prev,
                    conditions: {
                        ...prev.conditions,
                        conditions: conditionsNew
                    }
                }

            })

            setEditing(false);
            toastManager.add({
                description: "Your segment was successfully updated",
                title: "Segment Updated!",
            });
        }
        catch (err) {
            console.log(err);
            toastManager.add({
                description: "Updation failed",
                title: "An error occurred",
            });
        }
        finally {
            setSaving(false);
        }

    }


    return (

        <div>
            <div className='flex flex-col border h-150 w-220 mt-10 rounded-sm py-5'>
                <div>
                    {conditionsNew?.map((condition, idx) => (
                        <div className='flex flex-col items-center gap-2'>

                            <div className=" flex items-center w-170 h-20  px-8 rounded-sm text-sm">
                                <div className="flex ">
                                    <div className='w-30 text-muted-foreground'>Context</div>
                                    <div className='text-muted-foreground flex gap-1'>

                                        If <div className='font-medium text-foreground'>
                                            <input type="text" name="field" value={condition.field} onChange={(e) => { updateConditions(idx, e) }} className='border rounded-xs px-1' />
                                        </div>

                                        {` `} <input type="text" name="operator" value={condition.operator} onChange={(e) => { updateConditions(idx, e) }} className='border rounded-xs px-1' /> {` `}

                                        <div className='font-medium text-foreground'>
                                            <input type="text" name="value" value={condition.value} onChange={(e) => { updateConditions(idx, e) }} className='border rounded-xs px-1' />
                                        </div>

                                    </div>
                                </div>
                            </div>


                            {(idx != conditionsNew.length - 1) &&

                                (<div className='text-sm border border-white bg-blue-100 text-info-foreground px-2 rounded-sm font-semibold'>And</div>)

                            }

                        </div>
                    ))}
                </div>

                <div className=' h-18 w-40 mt-auto ml-auto mr-5 flex flex-col'>

                    <div>
                        <button onClick={addCondition} className='bg-white hover:bg-blue-50 border border-blue-600 rounded-xs text-blue-600 font-medium cursor-pointer w-40 px-2 py-0.5 transition-colors duration-200'><div className='flex items-center gap-2'><Plus className='h-3 w-3' /> Add Condition</div></button>
                    </div>

                    {
                        hasChanges &&
                        <div className='mt-auto'>
                            {
                                saving ? <div className='text-sm '> Saving... </div> :
                                    <button onClick={handleSave} className='bg-blue-700 hover:bg-blue-600 text-white font-medium cursor-pointer w-40 px-2 py-0.5 transition-colors duration-200 rounded-xs'>Save Conditions</button>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default SegmentEditor
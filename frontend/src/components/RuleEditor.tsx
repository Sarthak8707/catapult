import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

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
        rolloutID?: number,
        percentage: number,
        variantID?: number,
        variantName: string,
        value: {
            param: string,
            val: any
        }
    }[],

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
}

type ConditionsType = {
    field: string,
    value: string,
    operator: string
}[]

type rolloutsType = {
    rolloutID?: number,
    percentage: number,
    variantName: string,
    variantID?: number,
    value: {
        param: string,
        val: any
    }
}[]

type variantsType = {
    variantName: string,
    id?: number,
    value: {
        param: string,
        val: any
    }
}[]

type CurrentSegmentsType = {
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
    }[]

const RuleEditor = ({currentSegments, conditions, rollouts, ruleID, setEditing, setDevRules, variants, segments }:
    {   currentSegments: CurrentSegmentsType,
        conditions: ConditionsType, rollouts: rolloutsType, ruleID: number,
        setEditing: React.Dispatch<React.SetStateAction<number | null>>,
        setDevRules: React.Dispatch<React.SetStateAction<RuleType[]>>, variants: variantsType,
        segments: { id: number, name: string }[]
    }) => {

        

    const [conditionsNew, setConditionsNew] = useState<ConditionsType>(conditions ?? [
        {
            field: "",
            operator: "equals",
            value: "",
        },
    ]);

    const [rolloutsNew, setRolloutsNew] = useState<rolloutsType>(rollouts ?? [{
        variantName: "",
        percentage: 0,
        value: { param: "", val: "" }
    }])

    const seg = currentSegments.map((segment) => ({
       id: segment.segmentID,
       name: segment.segmentName
    }))

    console.log("seg::::", seg)

    const [segmentsNew, setSegmentsNew] = useState<{id : number, name: string}[]>(seg);
    const segmentsToChoose = segments.filter(s => !segmentsNew.some((item) => item.id == s.id));

    const [saving, setSaving] = useState(false);

    const updateConditions = (idx: number, field: string, newValue: string) => {

        setConditionsNew((prev) =>
            prev.map((condition, i) =>
            (
                i == idx ? {
                    ...condition,
                    [field]: newValue
                } : condition

            )
            )
        )
    }

    const addCondition = () => {

        setConditionsNew((prev) => [
            ...prev,
            {
                "field": "",
                "operator": "",
                "value": ""
            }
        ])
    }

    const deleteCondition = (index: number) => {

        setConditionsNew((prev) => prev.filter((_, i) => (i != index)))
    }

    const addSegment = (id: number) => {

        const a = segments.find(s => s.id == id);

        if(a) setSegmentsNew((prev) => [
            ...prev,
            a
        ])
    }


    const updateRollouts = (index: number, field: string, value: any) => {
        console.log("varID:::::", value);
        console.log(typeof (value))

        if (field == "percentage") {
            setRolloutsNew((prev) => (
                prev.map((rollout, i) => (
                    i == index ? {
                        ...rollout,

                        ["percentage"]: value
                    } : rollout
                ))
            ))
        }

        if (field == "variant") {
            const a = variants.find(variant => variant.id == value);

            setRolloutsNew((prev) => (
                prev.map((rollout, i) => (
                    i == index ? {
                        ...rollout,
                        variantID: value,
                        value: {
                            ...value,
                            val: a?.value.val
                        }
                    } : rollout
                ))
            ))
        }
    }

    const addRollouts = () => {
        setRolloutsNew((prev) => [...prev, {
            percentage: 100,
            variantName: "",
            value: { param: "", val: "" },

        }])
    }

    const deleteRollout = (index: number) => {
        setRolloutsNew((prev) => (
            prev.filter((rollout, i) => (i != index))
        ))
    }

    const handleSave = async () => {
        // console.log(rolloutsNew);
        setSaving(true);

        if (conditionsNew !== conditions) {
            const response = await axios.put(`http://localhost:3000/flags/17`, {
                "rules": {
                    "ruleID": ruleID,
                    "conditions": conditionsNew
                },
            })
            setSaving(false);
            setEditing(null);

            setDevRules((prev) => (
                prev.map((rule, i) => (
                    rule.ruleID == ruleID ? {
                        ...rule,
                        conditions: {
                            operator: "AND",
                            conditions: conditionsNew
                        }
                    } : rule
                ))
            ))
        }

        if (rolloutsNew !== rollouts) {
            console.log("OLD", rollouts)
            console.log("NEW", rolloutsNew)
            const response = await axios.put(`http://localhost:3000/flags/17`, {

                "rollouts": rolloutsNew
            })

            setSaving(false);
            setEditing(null);


            setDevRules((prev) => (
                prev.map((rule, i) => (
                    rule.ruleID == ruleID ? {
                        ...rule,
                        rollouts: rolloutsNew
                    } : rule
                ))
            ))
        }


    }

    return (
        <div className='flex flex-col gap-8 text-sm border bg-gray-50 border-gray-200 rounded-sm pt-4 px-4 mt-4'>
            {conditionsNew.map((condition, idx) => (
                <div className='flex gap-1'>
                    <div className=' border-red-300 flex flex-col gap-2'>
                        <div className='flex gap-5'>
                            <div className='w-30 text-gray-600 '> Field </div>
                            <div className='border rounded-xs border-gray-300'>
                                <input type="text" value={condition.field} className='w-50 '
                                    onChange={(e) => { updateConditions(idx, "field", e.target.value) }}
                                />
                            </div>
                        </div>

                        <div className='flex gap-5'>
                            <div className='w-30 text-gray-600 '> Operator </div>
                            <div className='border rounded-xs border-gray-300'>
                                <input type="text" value={condition.operator} className='w-50 border-gray-300'
                                    onChange={(e) => { updateConditions(idx, "operator", e.target.value) }}
                                />
                            </div>
                        </div>

                        <div className='flex gap-5'>
                            <div className='w-30 text-gray-600 '> Value </div>
                            <div className='border rounded-xs border-gray-300'>
                                <input type="text" value={condition.value} className='w-50 border-gray-300'
                                    onChange={(e) => { updateConditions(idx, "value", e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='ml-auto '>
                        <button className=' bg-red-700 py-0.5 px-2 font-semibold rounded-xs text-white cursor-pointer' onClick={() => { deleteCondition(idx) }}>Delete Condition</button>
                    </div>
                </div>
            ))}

            <button onClick={addCondition} className='bg-white hover:bg-blue-50 border border-blue-600 rounded-xs text-blue-600 font-medium cursor-pointer w-40 px-2 py-0.5 transition-colors duration-200'><div className='flex items-center gap-2'><Plus className='h-3 w-3' /> Add Condition</div></button>
            <div>
                <div className='flex items-center gap-10'>
                    <div className='text-gray-600'>Add Segments</div>
                <Select 
                    onValueChange={(newVal) => addSegment(Number(newVal))}
                >

                    <SelectTrigger className="w-35 border justify-between">
                        <SelectValue placeholder="Select Segment" />
                    </SelectTrigger>

                    <SelectContent position='popper'>

                        {segmentsToChoose.map((segment, i) => {
                            //console.log("valueofSelect::::", variant.id)
                            return (
                                <>
                                    <SelectItem value={String(segment.id)} >
                                        {segment.name}
                                    </SelectItem>
                                </>
                            )
                        })}


                    </SelectContent>
                </Select>
                </div>

                <div className='flex gap-2 mt-5'>
                    {segmentsNew.map((segment) => (<> <div className='bg-white text-xs text-blue-700 border border-blue-600 rounded-full py-0.5 px-2'> {segment.name} </div> </>))}
                </div>

            </div>
            {saving ? <div> Saving... </div> : (
                <button onClick={handleSave} className='bg-blue-700 hover:bg-blue-600 text-white font-medium cursor-pointer w-40 px-2 py-0.5 transition-colors duration-200 rounded-xs'>Save Conditions</button>
            )}


            <div className='flex flex-col gap-3'>
                {rolloutsNew.map((rollout, idx) => (
                    <div className='flex gap-10'>
                        <div>
                            <div className='flex gap-5'><div>Percentage</div>
                                <div className='border'>
                                    <input type="text" value={rollout.percentage} className='w-30 border-gray-300'
                                        onChange={(e) => { updateRollouts(idx, "percentage", e.target.value) }} />
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <div>Value</div>
                                <div className='border'>

                                    <Select value={String(rollout.variantID)}
                                        onValueChange={(newVal) => updateRollouts(idx, "variant", Number(newVal))}
                                    >

                                        <SelectTrigger className="w-30 justify-between">
                                            <SelectValue placeholder="select variant" />
                                        </SelectTrigger>

                                        <SelectContent position='popper'>

                                            {variants.map((variant, i) => {
                                                //console.log("valueofSelect::::", variant.id)
                                                return (
                                                    <>
                                                        <SelectItem value={String(variant.id)} >
                                                            {variant.value.val}
                                                        </SelectItem>
                                                    </>
                                                )
                                            })}


                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>
                        </div>
                        <div>
                            <button className='border border-red-500 w-40 cursor-pointer' onClick={() => { deleteRollout(idx) }}>Delete Rollout</button>
                        </div>
                    </div>
                ))}

                <button onClick={addRollouts} className='border border-gray-600 cursor-pointer w-40'>Add Rollout</button>
            </div>
        </div>


    )
}

export default RuleEditor
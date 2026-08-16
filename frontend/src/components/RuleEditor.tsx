import axios from 'axios'
import React, { useState } from 'react'

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

type ConditionsType = {
        field: string,
        value: string,
        operator: string
    }[]

type rolloutsType = {
    percentage: number,
    variantName: string,
    value: {
        param: string,
        val: any
    }
}[]

const RuleEditor = ({conditions, rollouts, ruleID, setEditing, setDevRules} :
    {conditions: ConditionsType, rollouts: rolloutsType, ruleID: number, 
    setEditing: React.Dispatch<React.SetStateAction<number | null>>,
    setDevRules: React.Dispatch<React.SetStateAction<RuleType[]>>
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


    const updateRollouts = (index: number, field: string, value: any) => {

        if(field == "percentage") {
            setRolloutsNew((prev) => (
                prev.map((rollout, i) => (
                    i == index ? {
                        ...rollout,
                        ["percentage"]: value
                    } : rollout
                ))
            ))
        }

        if(field == "val"){
            setRolloutsNew((prev) => (
            prev.map((rollout, i) => (
                i == index ? {
                    ...rollout,
                    value: {
                        ...rollout.value,
                        ["val"]: value
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
            value: { param: "", val: "" }
        }])
    }

    const deleteRollout = (index: number) => {
        setRolloutsNew((prev) => (
            prev.filter((rollout, i) => (i != index))
        ))
    }

    const handleSave = async () => {
        setSaving(true);
        const response = await axios.put(`http://localhost:3000/flags/17`, {
            "rules": {
                "ruleID": ruleID,
                "conditions": conditionsNew
            }
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

  return (
    <div className='flex flex-col gap-8 text-sm'>
        {conditionsNew.map((condition, idx) => (
            <div className='flex  gap-1'>
                <div>
                    <div className='flex gap-5'>
                <div> Field </div>
                <div className='border'>
                    <input type = "text" value={condition.field} className='w-50 border-gray-300' 
                    onChange = {(e) => {updateConditions(idx, "field", e.target.value)}}
                    />
                </div>
                </div>

                <div className='flex gap-5'> 
                <div> Operator </div>
                <div className='border'>
                    <input type = "text" value={condition.operator} className='w-50 border-gray-300' 
                    onChange = {(e) => {updateConditions(idx, "operator", e.target.value)}}
                    />
                </div>
                </div>

                <div className='flex gap-5'> 
                <div> Value </div>
                <div className='border'>
                    <input type = "text" value={condition.value} className='w-50 border-gray-300' 
                    onChange = {(e) => {updateConditions(idx, "value", e.target.value)}}
                    />
                </div>
                </div>
                </div>
                <div>
                    <button className='border border-red-500 w-40 cursor-pointer' onClick={() => {deleteCondition(idx)}}>Delete Condition</button>
                </div>
            </div>
        ))}

        <button onClick={addCondition} className='border border-gray-600 cursor-pointer w-40'>Add Condition</button>
        
        {saving ? <div> Saving... </div> : (
            <button onClick={handleSave} className='border border-green-600 cursor-pointer w-40 rounded-xs'>Save Conditions</button>
        ) }


        <div className='flex flex-col gap-3'>
            {rolloutsNew.map((rollout, idx) => (
                <div className='flex gap-10'>
                <div>
                    <div className='flex gap-5'><div>Percentage</div>
                    <div className='border'>
                        <input type="text" value = {rollout.percentage} className='w-30 border-gray-300' 
                        onChange={(e) => {updateRollouts(idx, "percentage", e.target.value)}} />
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div>Value</div>
                    <div className='border'>
                        <input type="text" value = {rollout.value.val} className='w-30 border-gray-300' 
                        onChange={(e) => {updateRollouts(idx, "val", e.target.value)}} />
                    </div>
                </div>
                </div>
                <div>
                    <button className='border border-red-500 w-40 cursor-pointer' onClick={() => {deleteRollout(idx)}}>Delete Rollout</button>
                </div>
                </div>
            ))}

            <button onClick={addRollouts} className='border border-gray-600 cursor-pointer w-40'>Add Rollout</button>
        </div>
    </div>

    
  )
}

export default RuleEditor
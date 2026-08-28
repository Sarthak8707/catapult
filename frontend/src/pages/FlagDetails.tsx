
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { Pencil } from 'lucide-react';
import FlagEvaluation from '@/components/FlagEvaluation';
import FlagVariants from '@/components/FlagVariants';

type VariantsType = {
    variantName: string,
      variantID: number,
      value: {
        param: string,
        val: any
      }
}[]

type RulesType = {
    
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


const FlagDetails = () => {
    const {id} = useParams();
    const Id = Number(id);

    const [devRules, setDevRules] = useState<RulesType[]>([]);
    const [stagRules, setStagRules] = useState<RulesType[]>([]);    

    const [flagInfo, setFlagInfo] = useState<{name: string, description: string, type: string, variants: VariantsType}>();
    const [devEnabled, setDevEnabled] = useState(false);
    const [stagEnabled, setStagEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fcID1, setFcID1] = useState("");
    const [fcID2, setFcID2] = useState("");

    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);    

    useEffect(() => {
        const getFlagData = async () => {
            const response = await axios.get(`http://localhost:3000/flags/${id}`);

            const res2 = await axios.get(`http://localhost:3000/flags/${id}/summary`);
            setFlagInfo(res2.data);
          //  console.log(response.data)
          //  console.log("variants at first", res2.data?.variants)
            const dev = response.data.find((c: any) => c.environment == "dev");
            if(dev) { setDevRules(dev.rules); console.log(dev.rules);}
            else setDevRules([])

            const stag = response.data.find((c: any) => c.environment == "stag");
            if(stag)  setStagRules(stag.rules);
            else setStagRules([])

            //console.log(response.data)

            if(response.data.length) setFcID1(response.data[0].configID);
            if(response.data.length) setFcID2(response.data[1].configID)
            if(response.data.length) setDevEnabled(response.data[0].enabled);
            if(response.data.length) setStagEnabled(response.data[1].enabled);
            setLoading(false);
            setDescription(res2.data.description)
          //  console.log(description)
            //console.log(dev.rules);
            
        }

        getFlagData();
    }, [])

    const [disabled, setDisabled] = useState(false);

    const handleChange = async (check: boolean, env: string) => {
        setDisabled(true);

        let flagConfigID = fcID1;
        if(env == "stag") flagConfigID = fcID2;

        const data = await axios.put(`http://localhost:3000/flags/${id}/`, {
            enabled: check,
            flagConfigID
        })
        setDisabled(false);
        if(env == "dev") setDevEnabled(check);
        else setStagEnabled(check);
    }



const handleSaveDescription = async () => {
    setSaving(true);
    console.log("here")
    try{
        const data = await axios.put(`http://localhost:3000/flags/${id}`, {
        description: description
        });
    console.log("done");
    setFlagInfo(prev => 
        prev ? {...prev, description} : prev
    )
    }
    catch(err){
        console.log("error:", err);
        setDescription(flagInfo?.description ?? "")
    }
    finally{
        setSaving(false);
        setEditing(false);
    }
};

  return (
    <div className='min-h-screen px-10 py-5 bg-white'>
    
    
            <div className='mb-5'>
            <div className=' border-amber-950 ml-0'>
                {/* */}
                <div>
    <div className="border-red-950 flex">
        <div className="text-2xl font-medium">
            {flagInfo ? flagInfo?.name : "Flag Name"}
        </div>

        <div className="ml-auto mr-5">
            {/* <Actions flagID={Id} /> */}
        </div>
    </div>
        
        {editing ? <div className='mt-2 flex gap-2 text-sm'> 
        <input type = "text" value={description} onChange={(e) => {setDescription(e.target.value)}} className='border border-gray-300 w-150 rounded-xs'/>
        <button onClick={handleSaveDescription} className='cursor-pointer text-blue-700'> {saving ? <>Saving...</> : <>Save</>} </button>
        { !saving && <button onClick={() => {setEditing(false); setDescription(flagInfo?.description ?? "")}} className='cursor-pointer' > Cancel </button> }
         </div> : <div>

        <div> {flagInfo ? 
            <div className='flex'> {flagInfo?.description }
                  <button className='cursor-pointer ml-2 text-blue-700' onClick={() => {setEditing(true)}}> <Pencil className='h-4 w-4'/> </button>
            </div> : "flag description"}  </div>

        </div>
        }

    
                </div>

                {/* */}
            </div>
                
            </div>

            <Separator className="my-2" />        

           
           {/* Flag Rules */}
            

            <div className='mt-10'>
                <Tabs>
                <TabsList variant='underline'>
                    <TabsTab value="val-1" className="w-40">Evaluation</TabsTab>
                    <TabsTab value="val-2" className="w-40">Variants</TabsTab>
                    <TabsTab value="val-3" className="w-40">Audit Log</TabsTab>
                </TabsList>
                <TabsPanel value="val-1">
                    <FlagEvaluation loading={loading} devEnabled={devEnabled} devRules={devRules} stagRules={stagRules} 
                    stagEnabled={stagEnabled} disabled={disabled} handleChange={handleChange} setDevRules={setDevRules} 
                    variants={flagInfo?.variants} />
                </TabsPanel>
                <TabsPanel value="val-2">
                    <div className='h-200'> {flagInfo?.variants && <FlagVariants variants={flagInfo?.variants} /> } </div>
                </TabsPanel>
                <TabsPanel value="val-3">
                    <div className='h-100'> Audit Log </div>
                </TabsPanel>
            </Tabs>
            </div>


            <div className="my-2 h-[0.5px] w-full bg-border" />
    
            {/* About Flag */}

            <div className='text-xl mt-10 font-semibold'>About</div>
            <div className='mt-1 text-gray-600 text-sm'> Details about the flag </div>
            <div className='mt-5 border-red-300 bg-white text-sm flex'>

                <div className='flex flex-col border-red-600 w-140 pt-5 pb-5 pl-10 gap-3 text-sm'>
                    <div className='flex text-sm'> <div className='text-gray-500 w-40'>Type</div> Release flag  </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Environment</div> Production </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Type</div> { flagInfo ? (flagInfo?.type) : (<>type</>) }  </div>
                </div>

                <div className='flex flex-col  border-amber-800 w-140 pt-5 pb-5 pl-10 gap-3 ml-auto'>
                    <div className='flex text-sm'> <div className='text-gray-500 w-40'>Created </div> 23 June, 2026 </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Created by</div> Nick  </div>
                    <div className='flex'> <div className='text-gray-500 w-40'>Tags</div> Dashboard  </div>
                </div>

            </div>
    
        </div>
  )
}

export default FlagDetails
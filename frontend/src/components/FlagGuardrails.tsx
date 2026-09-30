import GuardrailDetails from '@/pages/GuardrailDetails';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Spinner } from './ui/spinner';

const FlagGuardrails = ({ flagID }: { flagID: number }) => {

    const [guardrails, setGuardrails] = useState<{
        environmentName: string,
        guardrails: {
            guardrailName: string,
            guardrailStatus: string,
            triggers: {
                metric: string,
                enabled: boolean,
                threshold: any,
                timeWindow: number
            }[],
            actions: {
                type: string,
                enabled: boolean,
                config: any
            }[]
        }[]
    }[]
    >([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGuardrails = async () => {
            const response = await axios.get(`http://localhost:3000/flags/${flagID}/guardrails`);
            setGuardrails(response.data);
            setLoading(false);
        }

        getGuardrails();

    }, [])

    console.log("guardrails", guardrails)

    if(loading) return (
        <div className='min-h-screen flex pt-60 justify-center'> <Spinner /> </div>
    )

    return (
        <div className=' w-295 border-blue-600'>
            <div>
                <div className='text-xl mt-10 font-semibold'> Guardrails</div>
                <div className='text-gray-600 mt-1 flex gap-1 text-sm'> These show how sensitive flags react in certain conditions. </div>
            </div> 
            
            <div className='mt-10'>
                {guardrails?.map((envGuardrail, idx) => (
                <>
                <div className=''>

                    <div> 
                        {envGuardrail?.guardrails?.map((guardrail) => (
                            <>
                            { guardrail.triggers.length > 0 && <GuardrailDetails 
                            environmentName={envGuardrail.environmentName}
                             triggers={guardrail.triggers} 
                             actions={guardrail.actions} />}
                            </>
                        ))}
                    </div>
                </div>
                </>
            ))}
            </div>
        </div>
    )
}

export default FlagGuardrails

import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';

const Invitations = () => {

    const token = Cookies.get("token");

    const [invitations, setInvitations] = useState<{
        id: number,
        projectName: string,
        invitedBy: string,
        status: string
    }[]>([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const getInvitations = async () => {
            const response = await axios.get(`http://localhost:3000/me/invitations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data);
            setInvitations(response.data);
            setLoading(false);
        }

        getInvitations();

    }, [])

    const acceptInvitation = async (id: number) => {
        try {
            const data = await axios.put(`http://localhost:3000/invitations/${id}/accept`);
            navigate(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    const rejectInvitation = async (id: number) => {
        try {
            const data = await axios.put(`http://localhost:3000/invitations/${id}/reject`);
            navigate(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    const pastInvites = invitations.filter((invitation) => invitation.status != "pending")
    const currentInvites = invitations.filter((invitation) => invitation.status == "pending")

    if (loading) return (
        <div className='min-h-screen px-10 py-5 bg-white flex items-center justify-center gap-1 flex-col'>
            <Spinner /> Loading...
        </div>
    )

    return (
        <div className='min-h-screen px-10 py-5 bg-white'>
            <div className='flex items-center justify-center'>
                <div className='text-2xl font-medium'> Invitations </div>
                <div className='ml-auto flex gap-3'>

                </div>
            </div>

            <Separator className="my-2 mt-5" />

            <div className='flex flex-col items-center'>
                <div className='mt-10 flex flex-col w-220 '>
                    <div className='text-xl font-semibold mr-auto'>
                        Current Invitations
                    </div>
                    {/* <div className='text-gray-800 h-50 w-220 border border-gray-200 bg-zinc-50 rounded-md flex flex-col items-center justify-center mt-5'>
                        <div> <MailOpen className='text-gray-500 size-9' /> </div>
                        <div className='text-foreground text-sm font-semibold mt-5'> No Invitations yet </div>
                        <div className='text-muted-foreground text-center text-sm w-170  mt-3'>
                            Your Invitations appear here once you are invited to a project to collaborate. Accept or Reject the invitation to respond.
                        </div>
                    </div> */}

                    <div>
                        {currentInvites.length == 0 ? <div className='h-30 border mt-5 rounded-md flex items-center justify-center text-sm text-gray-600'> No invitations yet </div> : <div>
                            {currentInvites
                                .map((invitation, idx) => (
                                    <>
                                        <div className='text-gray-800 h-20 w-220 border border-gray-200 rounded-sm flex items-center mt-5 pl-10 pr-10'>
                                            <div className='flex'>
                                                <div className='w-50'> {invitation.projectName}  </div>
                                                <div className='w-20'> {invitation.invitedBy} </div>
                                                {/* <div> {invitation.status} </div> */}
                                            </div>

                                            <div className='ml-auto flex gap-3'>
                                                <button className='mt-auto bg-green-600 w-40 h-8 text-white text-sm font-medium rounded-md cursor-pointer
                                     hover:bg-green-500 transition-colors duration-200'
                                                    onClick={() => acceptInvitation(invitation.id)}
                                                >
                                                    Accept
                                                </button>
                                                <button className='mt-auto border border-red-600 bg-white w-40 h-8 text-red-600 text-sm font-medium rounded-md cursor-pointer
                                     hover:bg-red-50  transition-colors duration-200'
                                                    onClick={() => rejectInvitation(invitation.id)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                        </div>}
                    </div>
                </div>

                <div className='w-220 mt-10 flex flex-col'>
                    <div className='text-xl font-semibold mr-auto'>
                        Past Invitations
                    </div>
                    <div>
                        {pastInvites.length == 0 ? <div className='h-30 border mt-5 rounded-md flex items-center justify-center text-sm text-gray-600'> No invitations yet </div> : <div>
                            {pastInvites
                                .map((invitation, idx) => (
                                    <>
                                        <div className='text-gray-800 h-20 w-220 border border-gray-200 rounded-sm flex items-center mt-5 pl-10 pr-10'>
                                            <div className='flex'>
                                                <div className='w-50'> {invitation.projectName}  </div>
                                                <div className='w-20'> {invitation.invitedBy} </div>
                                                {/* <div> {invitation.status} </div> */}
                                            </div>

                                            <div className='ml-auto flex gap-3'>
                                                <div> {invitation.status} </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                        </div>}
                    </div>
                </div>


            </div>


        </div>
    )
}

export default Invitations
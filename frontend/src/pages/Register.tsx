import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { Spinner } from '@/components/ui/spinner';

const Register = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState<{
        username: string, password: string, email: string
    }>({
        username: "",
        password: "",
        email: ""
    });

    const [registering, setRegistering] = useState<boolean>(false);
    const [registerError, setRegisterError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }


    const handleSubmit = async () => {
        setRegistering(true);

        try {
            const response = await axios.post(`http://localhost:3000/auth/register`, formData);
            const token = response.data.token;
            const projectID = response.data.projectID;
            const username = response.data.username;
            
            Cookies.set("token", token);
            window.localStorage.setItem("username", username);
            if(projectID)  navigate(`/projects/${projectID}`);
            else navigate(`/projects/`);
        }
        catch (err) {
           if(axios.isAxiosError(err)) setRegisterError(true);
           console.log("err", err);
        }
        finally{
            setRegistering(false);
        }
    }

    return (
        <div className='min-h-screen bg-black items-center  flex flex-col'>
            <div className='h-20 flex items-center justify-start mt-10'> 
                <div className='w-300 text-white text-4xl font-semibold flex'><div>Catapul</div> 
                    <div className='text-[#e6f542]'>t.</div>
                </div>
            </div>
            <div className='mt-20 h-130 w-90 bg-white rounded-none flex flex-col items-center'>
                <div className='mt-10 text-center'>
                    <div className='text-2xl font-semibold text-neutral-900'> Get Started </div>
                    <div className='mt-2 text-neutral-900 px-5'> Create your account by entering your details here. </div>
                </div>

                <div className='w-70 mt-10 flex flex-col gap-5'>
                    <div className=''>
                        <div className='text-sm text-neutral-600 '>Username</div>
                        <div className='mt-1'>
                            <input type="text" name="username" className='border w-68 h-8 rounded-xs'
                                value={formData.username} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className=''>
                        <div className='text-sm text-neutral-600 '>Email</div>
                        <div className='mt-1'>
                            <input type="text" name="email" className='border w-68 h-8 rounded-xs'
                                value={formData.email} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className=''>
                        <div className='text-sm text-neutral-600'>Password</div>
                        <div className='mt-1'>
                            <input type="text" name="password" className='border w-68 h-8 rounded-xs'
                                value={formData.password} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className=' border-red-400 h-15 flex flex-col'>

                        <div> {registerError && <> <div className='text-red-600 text-sm text-center'>
                             Username or Password is Incorrect
                        </div> </>} </div>

                        <button className='mt-auto bg-black w-68 h-9 text-white rounded-full cursor-pointer
                        hover:bg-neutral-900 transition-colors duration-200'
                            onClick={handleSubmit} disabled={registering}> 
                            {registering ? <div className='flex gap-2 items-center justify-center'><Spinner /> Creating Account...</div> : <div>Register</div> }
                        </button>
                    </div>

                    <div className='text-sm text-neutral-600 text-center mt-5 flex justify-center gap-1'>
                        <div>Already have an account?</div>
                        <div className='text-neutral-900'>
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Register
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { Spinner } from '@/components/ui/spinner';

const Login = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState<{
        username: string, password: string
    }>({
        username: "",
        password: ""
    });

    const [logging, setLogging] = useState<boolean>(false);
    const [loginError, setLoginError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }


    const handleSubmit = async () => {
        setLogging(true);

        try {
            const response = await axios.post(`http://localhost:3000/auth/login`, formData);
            const token = response.data.token;
            const projectID = response.data.projectID;
            const username = response.data.username;
            
            Cookies.set("token", token);
            window.localStorage.setItem("username", username);
            if(projectID)  navigate(`/projects/${projectID}`);
            else navigate(`/projects/723`)
        }
        catch (err) {
           if(axios.isAxiosError(err)) setLoginError(true);
        }
        finally{
            setLogging(false);
        }
    }

    return (
        <div className='min-h-screen bg-gray-300 flex items-center justify-center'>
            <div className='h-120 w-90 bg-white rounded-xs flex flex-col items-center'>
                <div className='mt-10 text-center'>
                    <div className='text-2xl font-semibold text-gray-800'> Welcome Back! </div>
                    <div className='mt-2 text-gray-600'> Please enter your details to login to your account. </div>
                </div>

                <div className='w-70 mt-10'>
                    <div className=''>
                        <div className='text-sm text-gray-600 '>Username</div>
                        <div className='mt-1'>
                            <input type="text" name="username" className='border w-68 h-8 rounded-sm'
                                value={formData.username} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className='text-sm text-gray-600'>Password</div>
                        <div className='mt-1'>
                            <input type="text" name="password" className='border w-68 h-8 rounded-sm'
                                value={formData.password} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className=' border-red-400 h-15 flex flex-col'>

                        <div> {loginError && <> <div className='text-red-600 text-sm text-center'>
                             Username or Password is incorrect
                        </div> </>} </div>

                        <button className='mt-auto bg-indigo-900 w-68 h-8 text-white rounded-full cursor-pointer
                        hover:bg-indigo-800 transition-colors duration-200'
                            onClick={handleSubmit} disabled={logging}> 
                            {logging ? <div className='flex gap-2 items-center justify-center'><Spinner /> Logging In...</div> : <div>Login</div> }
                        </button>
                    </div>

                    <div className='text-sm text-gray-600 text-center mt-5 flex justify-center gap-1'>
                        <div>Don't have an account?</div>
                        <div className='text-indigo-900'>
                            <Link to="/register">Register Now</Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login
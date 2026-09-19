import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";

const Login = () => {

    const [formData, setFormData] = useState<{
        username: string, password: string
    }>({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async () => {
        const response  = await axios.post(`http://localhost:3000/auth/login`, formData);
        const token = response.data.token;
        Cookies.set("token", token);
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

                <div className='mt-12'>
                    <div>
                        <button className='bg-indigo-900 w-68 h-8 text-white rounded-full cursor-pointer
                        hover:bg-indigo-800 transition-colors duration-200'
                        onClick={handleSubmit} > Login </button>
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
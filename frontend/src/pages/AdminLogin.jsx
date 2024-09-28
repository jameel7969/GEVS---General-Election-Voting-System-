import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import admin from '../assets/admin.png'


function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false)

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex items-center justify-center h-screen font-[poppins]">

            <div className="flex flex-col  bg-zinc-100 px-[7rem] ">

                <div className="mb-[1rem]">
                    <img src={admin} alt="" className="" />
                </div>
                <div className="flex flex-col gap-2 text-center mb-5">
                    <h1 className="text-3xl font-bold  text-[#ed505b]">Login as an Admin</h1>
                    <p className="mb-2">Hello Sign in and manage your own website</p>
                </div>


                <div className='py-5'>
                    <label htmlFor="" className='text-xl'>Voter's ID</label>
                    <input type="text" placeholder='Enter your voter ID' className='w-full mt-[1rem] outline-none rounded p-[10px]' />
                </div>

                <div className=''>
                    <div className=''>
                        <label htmlFor="" className='text-xl '>Password</label>
                    </div>
                    <div className='flex items-center bg-white pr-[10px]'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter password' className='w-full rounded bg-white outline-none p-[10px]' />
                        {
                            showPassword ?
                                <FaEye className='text-3xl text-[#ed505b]  cursor-pointer ' onClick={handleShowPassword} />
                                :
                                <FaEyeSlash className='text-3xl text-[#ed505b] cursor-pointer ' onClick={handleShowPassword} />
                        }
                    </div>
                </div>

                <div className='flex items-center justify-center mb-5 md:mt-[1rem]'>
                    <input type="submit" value='Login' className='cursor-pointer text-xl  bg-[#ed505b] text-white px-[40px] py-[8px]' />
                </div>

            </div>
        </div>
    );
}

export default AdminLogin;
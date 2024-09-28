import { Link } from 'react-router-dom';
import { useState } from 'react';
import register from '../assets/register.jpg'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useLogin } from '../hooks/UseLogin';



const Login = () => {
    //states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //logging in
    const { login, isLoading, error } = useLogin()
    const handleLogin = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    //toggle password
    const [showPassword, setShowPassword] = useState(false)
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <section className='w-full h-[100vh] font-[poppins] py-8'>

            <form className='md:flex h-full' >

                {/* {Left Section} */}
                <div className='flex flex-col flex-1  items-center gap-10 md:gap-40'>
                    {/* Main Heading */}
                    <div className='pt-[40px]'>
                        <p className='text-center text-[#ed505b] text-2xl md:text-5xl font-semibold'>General Election Voting System</p>
                    </div>
                    <img src={register} alt="Registeration Image" className='mb-8 md:mb-0 ' />
                </div>


                {/* Right section */}
                <div className='flex flex-1 flex-col gap-0 justify-center px-10 md:px-20 '>

                    <div className='py-5'>
                        <label htmlFor="" className='text-xl'>Voter's ID</label>
                        <input
                            type="text"
                            placeholder='Enter your voter ID'
                            className='w-full mt-[1rem] outline-none bg-zinc-100 p-[10px]'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className=''>
                        <div className='mb-[10px]'>
                            <label htmlFor="" className='text-xl '>Password</label>
                        </div>
                        <div className='flex items-center bg-zinc-100 pr-[10px]'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password'
                                className='w-full bg-zinc-100 outline-none p-[10px]'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {
                                showPassword ?
                                    <FaEye className='text-3xl text-[#ed505b]  cursor-pointer ' onClick={handleShowPassword} />
                                    :
                                    <FaEyeSlash className='text-3xl text-[#ed505b]  cursor-pointer ' onClick={handleShowPassword} />
                            }
                        </div>
                    </div>


                    <div className='mt-4 md:mt-[1rem]'>
                        <button
                            className='cursor-pointer text-xl md:text-2xl bg-[#ed505b] text-white px-[40px] py-[10px]'
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            Login
                        </button>
                    </div>

                    <div>
                        {error && <p className='bg-red-100 p-2 mt-4 border border-red-600 text-[#d44040]'>{error}</p>}
                    </div>

                    <div className='mt-[0.5rem]'>
                        {/* <input type="submit" value='Do not have an Account?' className='cursor-pointer text-xl md:text-2xl text-[#ed505b] underline px-[0px] py-[10px]' /> */}
                        <Link to='/register' className='cursor-pointer text-xl md:text-2xl text-[#ed505b] underline px-[0px] py-[10px]'>
                            Do not have an Account?
                        </Link>
                    </div>

                </div>
            </form>
        </section>
    )
}

export default Login;

import { Link } from 'react-router-dom';
import register from '../assets/register.jpg'
import { FaEye } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { useSignup } from '../hooks/useSignup';
import { Html5QrcodeScanner } from 'html5-qrcode'

const Registeration = () => {
    const [scanResult, setScanResult] = useState(null)
    //qr scanner
    // useEffect(() => {
    //     const scanner = new Html5QrcodeScanner('reader', {
    //         qrbox: {
    //             width: 250,
    //             height: 250
    //         },
    //         fps: 10
    //     })

    //     scanner.render(success, scanError);

    //     function success(result) {
    //         scanner.clear();
    //         setScanResult(result)
    //         console.log(result)
    //     }
    //     function scanError(err) {
    //         console.warn(err)
    //     }

    // }, [])


    //options
    const options = [
        "Shangri-la-Town",
        "Northern-Kunlun-Mountain",
        "Western-Shangri-la",
        "Naboo-Vallery",
        "New-Felucia"
    ];

    //states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [constituency, setConstituency] = useState(options[0])
    const [uvc, setUvc] = useState('')

    //signup hook
    const { signup, isLoading, error } = useSignup()

    //toggle password
    const [showPassword, setShowPassword] = useState(false)
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    //signup function
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password, name, dob, constituency, uvc)
    }

    //qr scanner
    const qrCodeScanner = (e) => {
        e.preventDefault()
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 10
        })

        scanner.render(success, scanError);

        function success(result) {
            scanner.clear();
            setScanResult(result)
            setUvc(result)
            console.log(result)
        }
        function scanError(err) {
            console.warn(err)
        }
    }

    return (
        <section className='w-full h-[100vh] font-[poppins] '>

            <form className='md:flex px-[1rem] md:p-0'>

                {/* {Left Section} */}
                <div className='flex flex-col flex-1  items-center  py-5 md:py-0 gap-5  md:gap-40'>

                    {/* Main Heading */}
                    <div className='pt-[10px] md:pt-[40px]'>
                        <p className='text-center text-[#ed505b] text-2xl md:text-5xl font-semibold'>General Election Voting System</p>
                    </div>
                    <img src={register} alt="Registeration Image" className='h-[80px] md:h-[400px] ' />

                </div>


                {/* Right section */}
                <div className='flex flex-1 flex-col  md:gap-4 px-[1rem] py-[2rem] md:p-[2rem]'>

                    <div className=''>
                        <label htmlFor="" className='text-xl'>Voter's ID</label>
                        <input
                            type="email"
                            placeholder='Enter your voter ID'
                            className='w-full mt-[10px] md:mt-[1rem]  outline-none bg-zinc-100 p-[8px] md:p-[10px]'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mt-[0.7rem] md:mt-[1rem]'>
                        <label htmlFor="" className='text-xl'>Full Name </label>
                        <input
                            type="text"
                            placeholder='Enter your name'
                            className='w-full mt-[10px] md:mt-[1rem]   outline-none bg-zinc-100 p-[8px] md:p-[10px]'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='mt-[0.7rem] md:mt-[1rem]'>
                        <label htmlFor="" className='text-xl'>Date of Birth</label>
                        <input
                            type="date"
                            placeholder='Enter date of birth'
                            className='w-full mt-[10px] md:mt-[1rem]  outline-none bg-zinc-100 p-[8px] md:p-[10px]'
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className='mt-[0.7rem] md:mt-[1rem]'>
                        <div className='mb-[8px] md:[10px]'>
                            <label htmlFor="" className='text-xl'>Password</label>
                        </div>
                        <div className='flex items-center bg-zinc-100 pr-[10px]'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password'
                                className='w-full outline-none bg-zinc-100 p-[8px] md:p-[10px]'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {
                                showPassword ?
                                    <FaEye className='text-3xl text-[#ed505b]  cursor-pointer' onClick={handleShowPassword} />
                                    :
                                    <FaEyeSlash className='text-3xl text-[#ed505b]  cursor-pointer' onClick={handleShowPassword} />
                            }
                        </div>
                    </div>

                    <div className='mt-[0.7rem] md:mt-[1rem] '>
                        <label htmlFor="" className='text-xl'>Constituency</label>
                        <select
                            name="" id=""
                            className='w-full mt-[10px] outline-none bg-zinc-100 p-[8px] md:p-[10px]'
                            value={constituency}
                            onChange={(e) => setConstituency(e.target.value)}
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='mt-[0.7rem] md:mt-[1rem] '>
                        <label htmlFor="" className='text-xl'>Unique Voter Card (UVC)</label>
                        <input type="email"
                            placeholder='Enter UVC code'
                            className='w-full mt-[1rem] outline-none bg-zinc-100 p-[8px] md:p-[10px]'
                            value={uvc}
                            onChange={(e) => setUvc(e.target.value)}
                        />
                        <button className='border border-[#ed505b] text-[#ed505b] px-8 py-2 text-lg my-3 hover:bg-[#ed505b] hover:text-white' onClick={qrCodeScanner}>Click</button>
                        <div id='reader'></div>

                    </div>

                    <div className='mt-[1rem]'>
                        {/* <input type="submit" value='Register' className='cursor-pointer text-2xl bg-[#ed505b] text-white px-[20px] md:px-[40px] py-[6px] md:py-[10px]' /> */}
                        <button
                            className='cursor-pointer flex items-center justify-center text-2xl bg-[#ed505b] text-white px-[20px] md:px-[40px] py-[6px] md:py-[10px]'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            Register
                        </button>
                    </div>

                    <div>
                        {error && <p className='bg-red-100 p-2 mt-4 border border-red-600 text-[#d44040]'>{error}</p>}
                    </div>

                    <div className='mt-[0.5rem]'>
                        <Link
                            to='/login'
                            className=' cursor-pointer text-xl md:text-2xl text-[#ed505b] underline py-[6px] md:py-[10px]' >
                            Already have an Account?
                        </Link >
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Registeration;

{/* <option value="Shangri-la Town">Shangri-la Town</option>
<option value="Northern-Kunlun-Mountain">Northern-Kunlun-Mountain</option>
<option value="Western-Shangri-la">Western-Shangri-la</option>
<option value="Naboo-Vallery">Naboo-Vallery</option>
<option value="New-Felucia">New-Felucia</option> */}
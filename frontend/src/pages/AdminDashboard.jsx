import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { useLogout } from "../hooks/useLogout"
import { useConstituentsContext } from '../hooks/useConstituentsContext'
import { useElectionContext } from '../hooks/useElectionContext'

const AdminDashBoard = () => {
    const [result, setResult] = useState(null)

    const handleResults = async () => {
        const response = await fetch('http://localhost:4000/gevs/results/all')
        const json = await response.json()

        if (response.ok) {
            setResult(json)
        }
    }


    // setting up constituents
    const { constituents, dispatch } = useConstituentsContext()
    const { election, dispatch: electionDispatch } = useElectionContext()

    useEffect(() => {
        const fetchConstituent = async () => {
            const response = await fetch(`http://localhost:4000/gevs/constituents`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_CONSTITUENTS', payload: json })
                // console.log(json)
            }
        }
        fetchConstituent()

    }, [])

    // starting ending election
    const [electionEnded, setElectionEnded] = useState(false);
    const [electionStart, setElectionStart] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchElection = async () => {
            const response = await fetch('http://localhost:4000/gevs/election/getelection')
            const json = await response.json()

            if (response.ok) {
                electionDispatch({ type: 'SET_ELECTION', payload: json })
                console.log(json)
                setElectionStart(json.electionStarted)
                setElectionEnded(json.electionEnded)
            }
        }
        fetchElection()

    }, [])

    const handleEndElection = async () => {
        const response = await fetch('http://localhost:4000/gevs/election/endelection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            electionDispatch({ type: 'SET_ELECTION', payload: json })
            setElectionEnded(json.electionEnded)
            setElectionStart(json.electionStarted)
            setError(false)
        }

        if (!response.ok) {
            setError(json.message)
        }

    };

    const handleStartElection = async () => {
        const response = await fetch('http://localhost:4000/gevs/election/startelection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            electionDispatch({ type: 'SET_ELECTION', payload: json })
            setElectionStart(json.electionStarted)
            setElectionEnded(json.electionEnded)
            setError(false)
        }

        if (!response.ok) {
            setError(json.message)
        }
    }

    //logging out
    const { logout } = useLogout();

    return (
        <section className='font-[poppins] h-[100vh]'>
            {/* navbar */}
            <div className='flex items-center  justify-between w-full p-10'>
                {/* Left section */}
                <div className='flex cursor-pointer'>
                    <img src={logo} alt="Logo image" className='w-20 h-10 object-cover' />
                    <p className='font-bold text-4xl hover:text-[#ed505b]'>GEVS</p>
                </div>

                {/* Right Section */}
                <div className='flex gap-10'>
                    <a href="#" className='font-semibold text-2xl hover:underline hover:text-[#ed505b]'>Profile</a>
                    <button
                        className='font-semibold text-2xl hover:underline hover:text-[#ed505b]'
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>


            {/* Hero section */}
            <div className='w-[80%] mx-auto py-[2rem] '>
                {/* Start election button */}
                <div className='py-[2rem]'>
                    {!electionStart && <button
                        className="bg-[#ed505b] text-white text-2xl px-10 py-4 rounded outline-none hover:bg-[#c43842]"
                        onClick={handleStartElection}
                    >
                        Start Election
                    </button>}
                    {
                        electionStart && (
                            <div className="text-lg">
                                The election has been Started
                            </div>
                        )
                    }
                </div>

                {/* constituent list */}

                <div className=' flex flex-col gap-10'>
                    <div className='flex '>
                        <p className='text-2xl font-bold '>Here are the results of all the Constituents!</p>
                    </div>

                    {constituents && constituents.map(item => (
                        <div className='flex flex-col gap-10' key={item._id}>
                            <div className='flex items-center justify-center gap-2'>
                                <p className='text-3xl underline font-bold '>{item?.name}</p>
                            </div>

                            <div className=''>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className='border bg-gray-300 '>
                                            <th className="text-xl font-bold border py-5 px-5">Party Name:</th>
                                            <th className="text-xl font-bold border py-5 px-5">Name of Candidates</th>
                                            <th className="text-xl font-bold border py-5 px-5">Number of Votes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item?.parties?.map((party, index) => (
                                            <tr className='hover:bg-gray-100' key={index}>
                                                <td className="border py-2 px-4">{party?.name}</td>
                                                <td className="border py-2 px-4">{party?.candidateName}</td>
                                                <td className="border py-2 px-6">{party?.voteCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    ))}


                    <div className='py-[2rem]'>
                        {!electionEnded && <button className="bg-[#ed505b] text-white text-2xl px-10 py-4 rounded outline-none hover:bg-[#c43842]" onClick={handleEndElection}>End Election</button>}
                        {electionEnded && (
                            <div className="text-lg">
                                The election has been ended
                            </div>
                        )}
                        {error && <div>{error}</div>}
                    </div>
                </div>


            </div>

            {electionStart &&
                // <div className='flex flex-col justify-center items-center'>
                //     <button
                //         className=" bg-[#ed505b] text-white text-2xl px-10 py-4 rounded outline-none hover:bg-[#c43842]"
                //         onClick={handleResults}
                //     >Announce Result
                //     </button>
                //     {result &&
                //         <div>
                //             <h1>{result.status}</h1>
                //             <h1>{result.winner}</h1>
                //             {result?.seats.map((seat, index) => (
                //                 <div key={index}>
                //                     <p>{seat.party}  <span>{seat.seat}</span></p>
                //                 </div>
                //             ))}
                //         </div>
                //     }

                // </div>
                <div className='flex flex-col justify-center items-center gap-[3rem] w-[80%] mx-auto py-[2rem]'>
                    <button
                        className="bg-[#ed505b] text-white text-2xl px-10 py-4 rounded outline-none hover:bg-[#c43842]"
                        onClick={handleResults}
                    >
                        Announce Result
                    </button>
                    {result && (
                        <table className="w-full text-left ">
                            <thead>
                                <tr className='border bg-gray-300 '>
                                    <th className="text-xl font-bold border py-5 px-5">Status</th>
                                    <th className="text-xl font-bold border py-5 px-5">Winner</th>
                                    <th className="text-xl font-bold border py-5 px-5">No. of Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='hover:bg-gray-100'>
                                    <td className="border py-2 px-4">{result.status}</td>
                                    <td className="border py-2 px-4">{result.winner}</td>
                                    <td className="border py-2 px-4">
                                        {result.seats.map((seat, index) => (
                                            <div key={index} className="mb-2">
                                                <p className="mb-1">{seat.party} : {seat.seat}</p>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>


            }
        </section >
    )
}

export default AdminDashBoard

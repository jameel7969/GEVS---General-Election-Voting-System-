import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import { useLogout } from "../hooks/useLogout"
import { useConstituentContext } from '../hooks/useConstituentContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useElectionContext } from '../hooks/useElectionContext'


const UserDashBoard = () => {
  //handling election status
  const { election, dispatch: electionDispatch } = useElectionContext()
  useEffect(() => {
    const fetchElection = async () => {
      const response = await fetch('http://localhost:4000/gevs/election/getelection')
      const json = await response.json()

      if (response.ok) {
        electionDispatch({ type: 'SET_ELECTION', payload: json })
        console.log(json)
      }
    }
    fetchElection()

  }, [])


  //handling votes
  const { user, dispatch: userDispatch } = useAuthContext()

  const handleVote = async (partyName) => {
    const encodedPartyName = encodeURIComponent(partyName);
    const response = await fetch(`http://localhost:4000/gevs/vote/${user.constituency}/${encodedPartyName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })


    const userResponse = await fetch(`http://localhost:4000/gevs/user/${user.id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const json = await userResponse.json()

    if (response.ok && userResponse.ok) {
      console.log('Voted successfully')
      userDispatch({ type: 'VOTED', payload: json })
    }
  }


  //setting up the constituent
  const { constituent, dispatch } = useConstituentContext()

  useEffect(() => {
    const fetchConstituent = async () => {
      const response = await fetch(`http://localhost:4000/gevs/${user.constituency}`)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_CONSTITUENT', payload: json })
        // console.log(json)
      }
    }
    fetchConstituent()

  }, [])


  //logout functionality
  const { logout } = useLogout()

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
        <div className=''>
          <a href="#" onClick={logout} className='font-semibold text-2xl hover:underline hover:text-[#ed505b]'>Logout</a>
        </div>
      </div>


      {/* hero Section */}
      <div className='w-[80%] mx-auto'>

        {/* Constituent */}
        <div className='flex items-center gap-3 py-[2rem]'>
          <p className='text-4xl font-semibold text-[#ed505b]'>Constituent:</p>
          <p className='text-3xl underline'>{constituent && constituent.name}</p>
        </div>

        {/* parties in a constituent */}
        {election && election.electionStarted
          ?
          <div className="flex flex-col gap-5">
            {/* Parties */}
            {constituent && constituent.parties.map((party, index) => (
              <div className="flex items-center justify-between border p-5 bg-zinc-100" key={index}>
                <div className='flex flex-col gap-3'>
                  <p className="text-2xl font-bold ">{party.name}</p>
                  <p ><strong>Candidate : </strong>{party.candidateName}</p>
                </div>
                <div className='flex items-center gap-2 relative'>
                  <button
                    className={`btnVote ${user && user.voted ? 'bg-[#ff7f88]' : 'bg-[#ed505b]'} text-white px-6 py-2 rounded outline-none hover:bg-[#c43842] ${user && user.voted ? 'cursor-not-allowed' : ''}`}
                    disabled={user && user.voted}
                    onClick={() => handleVote(party.name)}
                  >{user && user.voted ? 'Voted' : 'Vote'}
                  </button>
                </div>
              </div>
            ))}

          </div>
          :
          <div>Election has not started yet. Stay Tuned</div>
        }
      </div>
    </section>
  )
}

export default UserDashBoard

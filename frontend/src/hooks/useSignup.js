import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'

export const useSignup = () => {
    const { dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const signup = async (email, password, name, dob, constituency, uvc) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/gevs/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, dob, constituency, uvc })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //saving the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //updating the auth context
            dispatch({ type: 'LOGIN', payload: json })
            console.log('Successfully Signed Up')
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}
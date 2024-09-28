import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const { dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [isloading, setIsLoading] = useState(null)

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/gevs/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //saving the user to the local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }

    return { login, isloading, error }
}
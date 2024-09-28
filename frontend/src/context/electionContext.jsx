import { createContext, useReducer } from "react";

export const ElectionContext = createContext()

export const electionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ELECTION':
            return {
                election: action.payload
            }
        default:
            return state
    }
}

export const ElectionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(electionReducer, {
        election: null,
    })

    return(
        <ElectionContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ElectionContext.Provider>
    )
}
import { createContext, useReducer } from "react";

export const ConstituentContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CONSTITUENT':
            return {
                constituent: action.payload
            }
        default:
            return state;
    }
}

export const ConstituentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        constituent: null
    })

    return (
        <ConstituentContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ConstituentContext.Provider>
    )
}
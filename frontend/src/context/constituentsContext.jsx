import { createContext, useReducer } from "react";

export const ConstituentsContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CONSTITUENTS':
            return {
                constituents: action.payload
            }
        default:
            return state;
    }
}

export const ConstituentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        constituents: null
    })

    return (
        <ConstituentsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ConstituentsContext.Provider>
    )
}
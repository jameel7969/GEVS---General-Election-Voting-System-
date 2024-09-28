import { useContext } from "react";
import { ConstituentsContext } from "../context/constituentsContext";

export const useConstituentsContext = () => {
    const context = useContext(ConstituentsContext);

    if(!context) {
        throw Error('useConstituentsContext must be used inside a ConstituentContextProvider');
    }

    return context;
}
import { useContext } from "react";
import { ConstituentContext } from "../context/constituentContext";

export const useConstituentContext = () => {
    const context = useContext(ConstituentContext);

    if(!context) {
        throw Error('useConstituentContext must be used inside a ConstituentContextProvider');
    }

    return context;

}
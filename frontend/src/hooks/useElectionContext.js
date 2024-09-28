import { useContext } from "react";
import { ElectionContext } from "../context/electionContext";

export const useElectionContext = () => {
    const context = useContext(ElectionContext)

    if(!context){
        throw Error('useElectionContext must be used inside an ElectionContextProvider')
    }

    return context;

}
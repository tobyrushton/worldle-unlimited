import React from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { statsInterface } from "./panels/statsPage"

export interface statsContextInterface{
    stats: statsInterface
    updateStats:(stats:statsInterface) =>void
}

export const StatsContext = React.createContext<statsContextInterface | null>(null)


const StatsProvider: React.FC = ({children})=>{
    const [stats,setStats] = useLocalStorage<statsInterface>('stats',{
        wins:0,
        losses:0,
        winstreak:0,
        bestStreak:0,
        played:0,
        attempts:{1:0,2:0,3:0,4:0,5:0,6:0
    }})

    return(
        <StatsContext.Provider value={{stats:stats,updateStats:setStats}}>
            {children}
        </StatsContext.Provider>
    )
}

export default StatsProvider
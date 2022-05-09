import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

type measurements = "km" | "mi";

interface settings{
    randomRotate:boolean,
    hideImage:boolean,
    measurement: measurements
}

export interface settingsContextInterface{
    settings:settings,
    updateSettings:(settings:settings)=>void
}

export const SettingsContext = React.createContext<settingsContextInterface| null>(null)

const SettingsProvider: React.FC = ({children}) =>{
    const [settings,setSettings] = useLocalStorage<settings>('settings',{randomRotate:false,hideImage:false,measurement:"km" as measurements})

    return(
        <SettingsContext.Provider value={{settings,updateSettings:setSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider
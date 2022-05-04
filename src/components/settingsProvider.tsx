import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface settings{
    randomRotate:boolean,
    hideImage:boolean,
}

export interface settingsContextInterface{
    settings:settings,
    updateSettings:(settings:settings)=>void
}

export const SettingsContext = React.createContext<settingsContextInterface| null>(null)

const SettingsProvider: React.FC = ({children}) =>{
    const [settings,setSettings] = useLocalStorage('settings',{randomRotate:false,hideImage:false})

    return(
        <SettingsContext.Provider value={{settings,updateSettings:setSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider
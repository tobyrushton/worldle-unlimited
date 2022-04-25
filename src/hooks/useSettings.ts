import { useContext } from "react";
import { SettingsContext, settingsContextInterface } from "../components/settingsProvider";


export function useSettings(){
    return useContext(SettingsContext) as settingsContextInterface
}

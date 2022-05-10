import { useContext } from 'react'
import {
    SettingsContext,
    settingsContextInterface,
} from '../components/providers/settingsProvider'

export function useSettings(): settingsContextInterface {
    return useContext(SettingsContext) as settingsContextInterface
}

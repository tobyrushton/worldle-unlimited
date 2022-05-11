import React, { useMemo } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

type measurements = 'km' | 'mi'

interface settings {
    randomRotate: boolean
    hideImage: boolean
    measurement: measurements
    smallCountriesDisabled: boolean
    enableTimer?: boolean
}

export interface settingsContextInterface {
    settings: settings
    setSettings: (settings: settings | (() => settings)) => void
}

export const SettingsContext =
    React.createContext<settingsContextInterface | null>(null)

const SettingsProvider: React.FC = ({ children }) => {
    const [settings, setSettings] = useLocalStorage<settings>('settings', {
        randomRotate: false,
        hideImage: false,
        measurement: 'km' as measurements,
        smallCountriesDisabled: false,
    })

    const providerValue: settingsContextInterface = useMemo(
        () => ({ settings, setSettings }),
        [settings, setSettings]
    )

    return (
        <SettingsContext.Provider value={providerValue}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider

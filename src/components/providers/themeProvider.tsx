import React, { useMemo } from 'react'
import { useCreateTheme } from '../../hooks/useCreateTheme'

type Theme = 'light' | 'dark'
export type ThemeContextType = {
    theme: Theme
    changeTheme: (theme: Theme) => void
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null)

const ThemeProvider: React.FC<React.ReactNode> = ({ children }) => {
    const { theme, updateTheme } = useCreateTheme<Theme>(
        'mode',
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    )

    const providerValue: ThemeContextType = useMemo(
        () => ({ theme, changeTheme: updateTheme }),
        [theme, updateTheme]
    )

    return (
        <ThemeContext.Provider value={providerValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

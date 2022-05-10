import { useContext } from 'react'
import {
    ThemeContext,
    ThemeContextType,
} from '../components/providers/themeProvider'

export default function useTheme(): ThemeContextType {
    return useContext(ThemeContext) as ThemeContextType
}

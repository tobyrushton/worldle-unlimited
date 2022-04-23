import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "../components/ThemeContext";

export default function useTheme():ThemeContextType{
    return useContext(ThemeContext) as ThemeContextType;
}
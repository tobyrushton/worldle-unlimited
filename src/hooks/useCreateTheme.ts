import { useState } from "react";

interface ThemeType<T>{
    theme:T,
    updateTheme:(theme:T)=>void
}

export function useCreateTheme<T>(key:string,mode:T):ThemeType<T>{
    const [theme,setTheme] = useState<T>(localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)|| '{}') as T:mode)

    const updateTheme = (mode:T) =>{
        localStorage.setItem(key,JSON.stringify(mode))
        setTheme(mode)
    }

    return{
        theme,
        updateTheme
    }
}
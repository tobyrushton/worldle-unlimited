import { useState, useEffect, Dispatch, SetStateAction } from "react";

type setValue<T> = Dispatch<SetStateAction<T>>

function getSavedValue<T>(key:string,initialValue:T):T{
    return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)|| '{}'): initialValue instanceof Function? initialValue(): initialValue;
}

export default function useLocalStorage<T>(key:string,initialValue:T):[T,setValue<T>]{
    const [value,setValue] = useState<T>(()=>{
        return getSavedValue<T>(key,initialValue)
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    }, [key,value])

    return [value,setValue]
}
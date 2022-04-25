import {useState, useEffect} from 'react'
import '../css/App.css'
import useTheme from '../hooks/useTheme'
import { useSettings } from '../hooks/useSettings'
import { getRandomInt } from '../domain/random'

interface svgs{
    path:string,
    file:any
}

interface mapDisplayProps{
    number:number
}

const MapDisplay = (props:mapDisplayProps)=>{
    const [countrySVGs, setCountrySVGs] = useState<svgs[]>()
    const [rotate,setRotate] = useState<number>(0)
    const {theme} = useTheme()
    const {settings} = useSettings()

    useEffect(()=>{
        const reqSvgs = require.context( '../images/countries', true, /\.svg$/ )
        const svgs = reqSvgs.keys().map( (path:string) => ({ path, file: reqSvgs ( path ) }) )
        setCountrySVGs(svgs)
    },[])

    useEffect(()=>{
        setRotate(getRandomInt(360))
    },[settings.randomRotate,props.number])

    return !settings.hideImage? <img src={countrySVGs? countrySVGs[props.number].file:null} className='CountryOutline' alt="country" style={{filter: theme==='dark'?'brightness(0) invert(1)':'',transform:settings.randomRotate?'rotate('+rotate+'deg)':''}}/>:null
}
export default MapDisplay
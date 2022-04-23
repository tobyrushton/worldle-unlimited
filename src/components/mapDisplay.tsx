import {useState, useEffect} from 'react'
import '../css/App.css'
import useTheme from '../hooks/useTheme'

interface svgs{
    path:string,
    file:any
}

interface mapDisplayProps{
    number:number
}

const MapDisplay = (props:mapDisplayProps)=>{
    const [countrySVGs, setCountrySVGs] = useState<svgs[]>()
    const {theme} = useTheme()

    useEffect(()=>{
        const reqSvgs = require.context( '../images/countries', true, /\.svg$/ )
        const svgs = reqSvgs.keys().map( (path:string) => ({ path, file: reqSvgs ( path ) }) )
        setCountrySVGs(svgs)
    },[])

    return <img src={countrySVGs? countrySVGs[props.number].file:null} className='CountryOutline' alt="country" style={{filter: theme==='dark'?'brightness(0) invert(1)':''}}/>
}
export default MapDisplay
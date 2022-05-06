import '../css/App.css'
import HelpPage from './panels/helpPage'
import { Fragment, useState } from 'react'
import SettingsPage from './panels/settingsPage'
import StatsPage from './panels/statsPage'

const Header = () =>{
    const [displayHelp,setDisplayHelp] = useState<boolean>(false)
    const [displaySettings,setDisplaySettings] = useState<boolean>(false)
    const [displayStats,setDisplayStats] = useState<boolean>(false)

    const toggleHelp = ():void =>{
        setDisplayHelp(!displayHelp)
    }

    const toggleSettings = ():void =>{
        setDisplaySettings(!displaySettings)
    }

    const toggleStats = ():void=>{
        setDisplayStats(!displayStats)
    }
    

    return(
        <Fragment>
        <div className='Header'> 
            <div className='IconContainer'>
                <div className="Icon"onClick={toggleHelp}>❓</div>
            </div>
            <div className='HeaderText'>
                WOR
                <div className='HeaderGreenText'>L</div>
                DLE 
                <div className='HeaderGreenText' >&nbsp;UNLIMITED</div>
            </div>
            <div className='RightIcons'>
                <div className="Icon" onClick={toggleStats}>📈</div>
                <div className="Icon"onClick={toggleSettings}>⚙️</div>
            </div>
        </div>
        {
            displayHelp?
            (
                <HelpPage toggle={toggleHelp} />
            ):null
        }
        {
            displaySettings?
            (
                <SettingsPage toggle={toggleSettings} />
            ):null
        }
        {
            displayStats?(
                <StatsPage toggle={toggleStats}/>
            ):null
        }
        </Fragment>
    )
}

export default Header
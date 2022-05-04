import '../css/App.css'
import SettingsIcon from '../images/icons/settings-icon.png'
import HelpIcon from '../images/icons/help-icon.png'
import HelpPage from './panels/helpPage'
import StatsIcon from '../images/icons/stats-icon.png'
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
                <img src={HelpIcon} className='Icon' alt='Help icon' onClick={toggleHelp}></img>
            </div>
            <div className='HeaderText'>
                WOR
                <div className='HeaderGreenText'>L</div>
                DLE 
                <div className='HeaderGreenText' >&nbsp;UNLIMITED</div>
            </div>
            <div className='RightIcons'>
                <img src={StatsIcon} className='Icon' alt='Stats icon' onClick={toggleStats}/>
                <img src={SettingsIcon} className='Icon' alt='Settings icon' onClick={toggleSettings}/>
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
import '../css/App.css'
import SettingsIcon from '../images/icons/settings-icon.png'
import HelpIcon from '../images/icons/help-icon.png'
import HelpPage from './panels/helpPage'
import { Fragment, useState } from 'react'
import SettingsPage from './panels/settingsPage'

//include title,help bar, stats bar(likely future update)
const Header = () =>{
    const [displayHelp,setDisplayHelp] = useState<boolean>(false)
    const [displaySettings,setDisplaySettings] = useState<boolean>(false)

    const toggleHelp = ():void =>{
        setDisplayHelp(!displayHelp)
    }

    const toggleSettings = ():void =>{
        setDisplaySettings(!displaySettings)
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
            <div className='IconContainer'>
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
        </Fragment>
    )
}

export default Header
import '../css/App.css'
import React, { useState } from 'react'
import HelpPage from './panels/helpPage'
import SettingsPage from './panels/settingsPage'
import StatsPage from './panels/statsPage'

const Header: React.FC = () => {
    const [displayHelp, setDisplayHelp] = useState<boolean>(false)
    const [displaySettings, setDisplaySettings] = useState<boolean>(false)
    const [displayStats, setDisplayStats] = useState<boolean>(false)

    const toggleHelp = (): void => {
        setDisplayHelp(!displayHelp)
    }

    const toggleSettings = (): void => {
        setDisplaySettings(!displaySettings)
    }

    const toggleStats = (): void => {
        setDisplayStats(!displayStats)
    }

    return (
        <>
            <div className="Header">
                <div className="IconContainer">
                    <div
                        className="Icon"
                        role="button"
                        onClick={toggleHelp}
                        tabIndex={0}
                    >
                        ❓
                    </div>
                </div>
                <div className="HeaderText">
                    WOR
                    <div className="HeaderGreenText">L</div>
                    DLE
                    <div className="HeaderGreenText">&nbsp;UNLIMITED</div>
                </div>
                <div className="RightIcons">
                    <div
                        className="Icon"
                        role="button"
                        onClick={toggleStats}
                        tabIndex={0}
                    >
                        📈
                    </div>
                    <div
                        className="Icon"
                        role="button"
                        onClick={toggleSettings}
                        tabIndex={0}
                    >
                        ⚙️
                    </div>
                </div>
            </div>
            {displayHelp ? <HelpPage toggle={toggleHelp} /> : null}
            {displaySettings ? <SettingsPage toggle={toggleSettings} /> : null}
            {displayStats ? <StatsPage toggle={toggleStats} /> : null}
        </>
    )
}

export default Header

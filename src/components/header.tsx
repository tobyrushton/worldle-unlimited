import '../css/App.css'
import React, { useState, useEffect } from 'react'
import HelpPage from './panels/helpPage'
import SettingsPage from './panels/settingsPage'
import StatsPage from './panels/statsPage'
import Timer, { timerProps } from './timer'
import { useSettings } from '../hooks/useSettings'
import { useGame } from '../hooks/useGame'

const Header: React.FC = () => {
    const [displayHelp, setDisplayHelp] = useState<boolean>(false)
    const [displaySettings, setDisplaySettings] = useState<boolean>(false)
    const [displayStats, setDisplayStats] = useState<boolean>(false)
    const [displayTimer, setDisplayTimer] = useState<boolean>(false)
    const [timer, setTimer] = useState<timerProps>({
        enabled: true,
        reset: false,
    })
    const { settings } = useSettings()
    const { game } = useGame()

    useEffect(() => {
        setTimer(() => ({
            enabled: true,
            reset: true,
        }))
    }, [game.country])

    useEffect(() => {
        if (game.complete.complete) {
            setTimer(() => ({
                enabled: false,
                reset: false,
            }))
        }
    }, [game.complete])

    useEffect(() => {
        setDisplayTimer(settings.enableTimer ?? false)
    }, [settings.enableTimer])

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
                        <img
                            src="https://twemoji.maxcdn.com/v/latest/svg/2753.svg"
                            alt="❓"
                        />
                    </div>
                </div>
                {displayTimer ? (
                    <Timer enabled={timer.enabled} reset={timer.reset} />
                ) : (
                    <div className="HeaderText">
                        WOR
                        <div className="HeaderGreenText">L</div>
                        DLE
                        <div className="HeaderGreenText">&nbsp;UNLIMITED</div>
                    </div>
                )}
                <div className="RightIcons">
                    <div
                        className="Icon"
                        role="button"
                        onClick={toggleStats}
                        tabIndex={0}
                    >
                        <img
                            src="https://twemoji.maxcdn.com/v/latest/svg/1f4c8.svg"
                            alt="📈"
                        />
                    </div>
                    <div
                        className="Icon"
                        role="button"
                        onClick={toggleSettings}
                        tabIndex={0}
                    >
                        <img
                            src="https://twemoji.maxcdn.com/v/latest/svg/2699.svg"
                            alt="⚙️"
                        />
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

import React from 'react'
import Game from './components/game'
import StatsProvider from './components/providers/statsProvider'
import ThemeProvider from './components/providers/themeProvider'
import SettingsProvider from './components/providers/settingsProvider'
import GameProvider from './components/providers/gameProvider'
import Footer from './components/footer'

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <StatsProvider>
                <SettingsProvider>
                    <GameProvider>
                        <Game />
                        <Footer />
                    </GameProvider>
                </SettingsProvider>
            </StatsProvider>
        </ThemeProvider>
    )
}

export default App

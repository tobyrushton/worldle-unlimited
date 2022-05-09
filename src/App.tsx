import Game from './components/game'
import StatsProvider from './components/providers/statsProvider';
import ThemeProvider from './components/providers/themeProvider';
import SettingsProvider from './components/providers/settingsProvider';
import GameProvider from './components/providers/gameProvider';

const App = () =>{
  return( 
    <ThemeProvider>
      <StatsProvider>
          <SettingsProvider>
              <GameProvider>
                  <Game/> 
              </GameProvider>
          </SettingsProvider> 
      </StatsProvider>
    </ThemeProvider>
  )
}

export default App;
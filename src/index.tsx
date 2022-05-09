import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import StatsProvider from './components/statsProvider';
import ThemeProvider from './components/ThemeContext';
import SettingsProvider from './components/settingsProvider';
import GameProvider from './components/gameProvider';

const rootElement = document.getElementById("root");
const root = rootElement? ReactDOMClient.createRoot(rootElement):null;
root?.render(
    <ThemeProvider>
        <StatsProvider>
            <SettingsProvider>
                <GameProvider>
                    <App /> 
                </GameProvider>
            </SettingsProvider> 
        </StatsProvider>
    </ThemeProvider>
);
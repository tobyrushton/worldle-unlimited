import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import StatsProvider from './components/statsProvider';
import ThemeProvider from './components/ThemeContext';

const rootElement = document.getElementById("root");
const root = rootElement? ReactDOMClient.createRoot(rootElement):null;
root?.render(
    <ThemeProvider>
        <StatsProvider>
            <App /> 
        </StatsProvider>
    </ThemeProvider>
);
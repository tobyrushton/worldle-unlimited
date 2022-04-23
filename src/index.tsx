import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import ThemeProvider from './components/ThemeContext';

const rootElement = document.getElementById("root");
const root = rootElement? ReactDOMClient.createRoot(rootElement):null;
root?.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
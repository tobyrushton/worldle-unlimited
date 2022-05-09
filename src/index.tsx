import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById("root");
const root = rootElement? ReactDOMClient.createRoot(rootElement):null;
root?.render( <App /> );
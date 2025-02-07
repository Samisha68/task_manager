import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'


// Using document.getElementById without TypeScript's strict typing
const rootElement = document.getElementById('root');

// Add a check to ensure the root element exists
if (!rootElement) {
    throw new Error('Failed to find the root element');
}

// Create the root and render the app
const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add console logging to debug rendering
console.log("Starting application initialization");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
  throw new Error("Failed to find the root element");
}

console.log("Root element found, rendering App");
createRoot(rootElement).render(<App />);

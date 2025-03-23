
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force extra logs
console.log("Starting application initialization");

// Debug render target
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="color:white;background:black;padding:20px;font-family:sans-serif"><h1>Error Initializing Application</h1><p>Could not find root element. Please check the console for more details.</p></div>';
  throw new Error("Failed to find the root element");
}

// Add debugging for React root creation
try {
  console.log("Root element found, rendering App");
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log("App component rendered successfully");
} catch (error) {
  console.error("Error rendering React application:", error);
  rootElement.innerHTML = '<div style="color:white;background:black;padding:20px;font-family:sans-serif"><h1>React Error</h1><p>Failed to render the application. See console for details.</p></div>';
}

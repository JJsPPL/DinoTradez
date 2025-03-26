
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force extra logs
console.log("Starting application initialization");
console.log("Environment:", import.meta.env.MODE);
console.log("Base path:", import.meta.env.BASE_URL);

// Debug render target
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="color:white;background:black;padding:20px;font-family:sans-serif"><h1>Error Initializing Application</h1><p>Could not find root element. Please check the console for more details.</p></div>';
  throw new Error("Failed to find the root element");
}

// Add debugging for React root creation
try {
  console.log("Root element found, creating React root");
  const root = createRoot(rootElement);
  
  // Add additional error handling for the render process
  try {
    console.log("Attempting to render App component");
    root.render(<App />);
    console.log("App component rendered successfully");
  } catch (renderError) {
    console.error("Error rendering React application:", renderError);
    rootElement.innerHTML = '<div style="color:white;background:red;padding:20px;font-family:sans-serif"><h1>Render Error</h1><p>Failed to render the application. See console for details.</p><pre>' + 
      (renderError instanceof Error ? renderError.stack : String(renderError)) + '</pre></div>';
  }
} catch (error) {
  console.error("Error creating React root:", error);
  rootElement.innerHTML = '<div style="color:white;background:black;padding:20px;font-family:sans-serif"><h1>React Error</h1><p>Failed to create React root. See console for details.</p><pre>' + 
    (error instanceof Error ? error.stack : String(error)) + '</pre></div>';
}

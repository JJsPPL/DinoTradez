
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force extra logs
console.log("Starting application initialization");
console.log("Environment:", import.meta.env.MODE);
console.log("Base path:", import.meta.env.BASE_URL);
console.log("Current URL:", window.location.href);
console.log("Pathname:", window.location.pathname);
console.log("Hash:", window.location.hash);

// Debugging support
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error caught:', {message, source, lineno, colno, error: error?.stack || error});
  return false;
};

// Debug render target
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="color:black;background:white;padding:20px;font-family:sans-serif"><h1>Error Initializing Application</h1><p>Could not find root element. Please check the console for more details.</p></div>';
  throw new Error("Failed to find the root element");
}

// Create a visual error handler element
const errorHandler = document.createElement('div');
errorHandler.style.display = 'none';
errorHandler.style.position = 'fixed';
errorHandler.style.top = '0';
errorHandler.style.left = '0';
errorHandler.style.right = '0';
errorHandler.style.padding = '20px';
errorHandler.style.backgroundColor = '#f8d7da';
errorHandler.style.color = '#721c24';
errorHandler.style.zIndex = '9999';
document.body.appendChild(errorHandler);

// Function to show errors visibly
function showError(message) {
  console.error(message);
  errorHandler.style.display = 'block';
  errorHandler.innerHTML = `<h2>Application Error</h2><p>${message}</p>`;
}

// Remove the loader element when app is initialized
function removeLoader() {
  const loader = document.querySelector('.loader');
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
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
    // Mark application as loaded
    window.__DINOTRADEZ_LOADED__ = true;
    removeLoader();
  } catch (renderError) {
    showError("Error rendering React application: " + (renderError instanceof Error ? renderError.message : String(renderError)));
  }
} catch (error) {
  showError("Error creating React root: " + (error instanceof Error ? error.message : String(error)));
}

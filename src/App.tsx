
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import "./App.css";

// Create a new QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => {
  console.log("Rendering App component");
  console.log("Current pathname:", window.location.pathname);
  console.log("Current hash:", window.location.hash);
  console.log("Full URL:", window.location.href);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          <div className="debug-info" style={{ display: 'none' }}>
            <p>App initialized successfully</p>
            <p>Path: {window.location.pathname}</p>
            <p>Hash: {window.location.hash}</p>
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

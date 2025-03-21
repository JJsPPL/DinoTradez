
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-white rounded-xl shadow-md p-10 max-w-md mx-auto text-center animate-scale-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <AlertTriangle className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useEffect } from "react";
import { useLocation, Link } from "wouter";

const NotFound = () => {
  const [location] = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Ruta no encontrada:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-4">Página no encontrada</p>
        <Link to="/" className="text-sm text-primary hover:underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

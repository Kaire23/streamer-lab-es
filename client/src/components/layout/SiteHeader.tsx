import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="inline-flex items-center font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-[hsl(var(--brand))] to-[hsl(var(--brand-2))] bg-clip-text text-transparent">
            Setups de Streamers
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Inicio</Link>
          <Link to="/herramientas/predictor-lag-ia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Predictor IA</Link>
          <Button asChild variant="hero" size="sm">
            <a href="#newsletter" aria-label="Suscríbete a novedades">Suscríbete</a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;

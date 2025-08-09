import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

const Unsubscribed: React.FC = () => {
  return (
    <div>
      <SEO
        title="Suscripción cancelada | Setups de Streamers"
        description="Has cancelado tu suscripción al newsletter de Setups de Streamers"
        canonicalPath="/unsubscribed"
      />
      
      <div className="container max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Suscripción cancelada</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Has cancelado tu suscripción exitosamente. Ya no recibirás emails de nosotros.
          </p>
          <p className="text-muted-foreground mb-8">
            Sentimos verte partir. Si cambias de opinión, siempre puedes suscribirte nuevamente 
            desde nuestra página principal.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg">
            <Link to="/">Volver al inicio</Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>¿Cancelaste por error? 
              <Link to="/" className="text-purple-600 hover:text-purple-700 ml-1">
                Suscríbete de nuevo aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribed;
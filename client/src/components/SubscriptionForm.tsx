import { useState } from "react";
import { Button } from "@/components/ui/button";
// Using regular input since Input component doesn't exist
import { useToast } from "@/hooks/use-toast";
import { Mail, Check } from "lucide-react";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa tu email",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        toast({
          title: "¡Suscripción exitosa!",
          description: "Te notificaremos cuando publiquemos nuevos artículos",
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: data.error || "Error al procesar suscripción",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error de conexión. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center justify-center gap-3 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
        <span className="text-green-700 dark:text-green-300 font-medium">
          ¡Gracias por suscribirte! Te mantendremos al día.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1">
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-2 whitespace-nowrap"
      >
        <Mail className="w-4 h-4" />
        {isLoading ? "Suscribiendo..." : "Suscribirse"}
      </Button>
    </form>
  );
};

export default SubscriptionForm;
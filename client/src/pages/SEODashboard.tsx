import SEO from "@/components/SEO";
import SEOOptimizer from "@/components/SEOOptimizer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Search, Target, Zap } from "lucide-react";

const SEODashboard = () => {
  const features = [
    {
      icon: <Search className="h-5 w-5" />,
      title: "Análisis Automático",
      description: "Escanea todos los posts buscando oportunidades de mejora SEO"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Keywords de Streaming",
      description: "Optimiza para términos específicos de gaming y streaming"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Score SEO en Tiempo Real",
      description: "Puntuación detallada con métricas de rendimiento"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Optimización One-Click",
      description: "Aplica mejoras automáticas con un solo clic"
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <SEO
        title="SEO Dashboard - Optimización de Contenido de Streaming"
        description="Herramienta avanzada para optimizar el SEO de guías de streaming. Analiza keywords, meta tags, legibilidad y estructura de contenido."
        canonicalPath="/seo-dashboard"
        keywords={["SEO optimizer", "streaming content", "keyword analysis", "meta tags", "content optimization"]}
      />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          SEO Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Optimiza automáticamente el SEO de todo tu contenido de streaming con análisis avanzado y sugerencias inteligentes
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                {feature.icon}
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEO Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Posts Analizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm text-muted-foreground">Guías de streaming</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Score SEO Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">78</div>
            <div className="text-sm text-muted-foreground">Bueno • +12 vs mes anterior</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">23</div>
            <div className="text-sm text-muted-foreground">Mejoras identificadas</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-lg">💡 Tips de SEO para Streaming</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium">Keywords Principales</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="secondary">setup streaming</Badge>
                <Badge variant="secondary">PC gaming</Badge>
                <Badge variant="secondary">micrófono streamer</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium">Mejores Prácticas</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-1">
                <li>Incluir año en títulos (2025)</li>
                <li>Meta descriptions 150-160 chars</li>
                <li>Enlaces internos 3-5 por post</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main SEO Optimizer */}
      <SEOOptimizer />
    </div>
  );
};

export default SEODashboard;
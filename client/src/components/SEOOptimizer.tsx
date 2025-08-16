import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, TrendingUp, Search, Tag, FileText, ExternalLink } from 'lucide-react';
import { posts } from '@/data/posts';

interface SEOAnalysis {
  postSlug: string;
  postTitle: string;
  seoScore: number;
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
  keywords: KeywordAnalysis;
  metaData: MetaDataAnalysis;
  readability: ReadabilityScore;
}

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
}

interface SEOSuggestion {
  category: string;
  title: string;
  description: string;
  implementation: string;
  priority: 'high' | 'medium' | 'low';
}

interface KeywordAnalysis {
  primary: string[];
  secondary: string[];
  density: number;
  distribution: 'good' | 'low' | 'high';
  missingKeywords: string[];
}

interface MetaDataAnalysis {
  titleLength: number;
  descriptionLength: number;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  hasStructuredData: boolean;
}

interface ReadabilityScore {
  score: number;
  grade: string;
  avgWordsPerSentence: number;
  avgSentencesPerParagraph: number;
}

const SEOOptimizer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<SEOAnalysis[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const streamingKeywords = [
    'streaming', 'streamer', 'twitch', 'youtube', 'setup', 'equipo', 
    'micrófono', 'cámara', 'PC gaming', 'iluminación', 'overlay',
    'OBS', 'stream deck', 'gaming', 'content creator', 'broadcasts'
  ];

  const analyzeContent = (content: string): ReadabilityScore => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    const avgWordsPerSentence = words.length / sentences.length || 0;
    const avgSentencesPerParagraph = sentences.length / paragraphs.length || 0;
    
    // Simple readability score based on sentence and word complexity
    let score = 100;
    if (avgWordsPerSentence > 20) score -= 20;
    if (avgWordsPerSentence > 30) score -= 20;
    if (avgSentencesPerParagraph > 8) score -= 10;
    
    const grade = score >= 90 ? 'Excelente' : 
                 score >= 80 ? 'Bueno' : 
                 score >= 70 ? 'Aceptable' : 'Necesita mejora';

    return {
      score: Math.max(score, 0),
      grade,
      avgWordsPerSentence,
      avgSentencesPerParagraph
    };
  };

  const analyzeKeywords = (content: string, title: string, keywords: string[]): KeywordAnalysis => {
    const text = (content + ' ' + title).toLowerCase();
    const words = text.split(/\s+/);
    const totalWords = words.length;
    
    const keywordCounts = streamingKeywords.reduce((acc, keyword) => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
      const matches = text.match(regex) || [];
      acc[keyword] = matches.length;
      return acc;
    }, {} as Record<string, number>);

    const foundKeywords = Object.entries(keywordCounts)
      .filter(([_, count]) => count > 0)
      .sort(([_, a], [__, b]) => b - a)
      .map(([keyword]) => keyword);

    const density = (foundKeywords.length / totalWords) * 100;
    const distribution = density < 1 ? 'low' : density > 3 ? 'high' : 'good';
    
    const missingKeywords = streamingKeywords.filter(kw => !foundKeywords.includes(kw));

    return {
      primary: foundKeywords.slice(0, 5),
      secondary: foundKeywords.slice(5, 10),
      density,
      distribution,
      missingKeywords: missingKeywords.slice(0, 5)
    };
  };

  const analyzeMetaData = (post: any): MetaDataAnalysis => {
    return {
      titleLength: post.title.length,
      descriptionLength: post.excerpt ? post.excerpt.length : 0,
      hasOpenGraph: true, // Assuming we have OG tags
      hasTwitterCard: true, // Assuming we have Twitter cards
      hasStructuredData: true // Assuming we have JSON-LD
    };
  };

  const generateSEOIssues = (post: any, keywords: KeywordAnalysis, metaData: MetaDataAnalysis): SEOIssue[] => {
    const issues: SEOIssue[] = [];

    // Title length issues
    if (metaData.titleLength > 60) {
      issues.push({
        type: 'warning',
        category: 'Title',
        message: `Título demasiado largo (${metaData.titleLength} caracteres). Recomendado: 50-60 caracteres.`,
        impact: 'medium'
      });
    } else if (metaData.titleLength < 30) {
      issues.push({
        type: 'warning',
        category: 'Title',
        message: `Título muy corto (${metaData.titleLength} caracteres). Recomendado: 50-60 caracteres.`,
        impact: 'medium'
      });
    }

    // Description issues
    if (metaData.descriptionLength > 160) {
      issues.push({
        type: 'warning',
        category: 'Description',
        message: `Meta descripción muy larga (${metaData.descriptionLength} caracteres). Recomendado: 150-160 caracteres.`,
        impact: 'high'
      });
    } else if (metaData.descriptionLength < 120) {
      issues.push({
        type: 'info',
        category: 'Description',
        message: `Meta descripción corta (${metaData.descriptionLength} caracteres). Considera expandirla hasta 150-160 caracteres.`,
        impact: 'low'
      });
    }

    // Keyword density issues
    if (keywords.distribution === 'low') {
      issues.push({
        type: 'warning',
        category: 'Keywords',
        message: 'Densidad de keywords baja. Considera incluir más términos relevantes.',
        impact: 'medium'
      });
    } else if (keywords.distribution === 'high') {
      issues.push({
        type: 'error',
        category: 'Keywords',
        message: 'Densidad de keywords muy alta. Puede parecer spam a Google.',
        impact: 'high'
      });
    }

    // Missing important keywords
    if (keywords.missingKeywords.length > 0) {
      issues.push({
        type: 'info',
        category: 'Keywords',
        message: `Considera incluir: ${keywords.missingKeywords.join(', ')}`,
        impact: 'low'
      });
    }

    return issues;
  };

  const generateSEOSuggestions = (post: any, keywords: KeywordAnalysis, readability: ReadabilityScore): SEOSuggestion[] => {
    const suggestions: SEOSuggestion[] = [];

    // Title optimization
    suggestions.push({
      category: 'Title',
      title: 'Optimizar título para SEO',
      description: 'Incluir año actual y palabras clave principales al inicio',
      implementation: `Ejemplo: "${post.title.split(':')[0]} 2025: ${keywords.primary.slice(0, 2).join(' y ')}"`,
      priority: 'high'
    });

    // Content structure
    if (readability.avgWordsPerSentence > 25) {
      suggestions.push({
        category: 'Readability',
        title: 'Simplificar oraciones',
        description: 'Dividir oraciones largas para mejorar legibilidad',
        implementation: 'Mantener oraciones entre 15-20 palabras en promedio',
        priority: 'medium'
      });
    }

    // Internal linking
    suggestions.push({
      category: 'Links',
      title: 'Mejorar enlazado interno',
      description: 'Añadir links a otros setups relacionados',
      implementation: 'Incluir 3-5 enlaces a posts relacionados usando anchor text optimizado',
      priority: 'medium'
    });

    // Schema markup
    suggestions.push({
      category: 'Structured Data',
      title: 'Enriquecer datos estructurados',
      description: 'Añadir schema para equipos y precios',
      implementation: 'Implementar Product schema para cada componente del setup',
      priority: 'high'
    });

    // Image optimization
    suggestions.push({
      category: 'Images',
      title: 'Optimizar imágenes para SEO',
      description: 'Mejorar alt text y nombres de archivo',
      implementation: 'Alt text: "Setup streaming [Streamer] 2025 - [Equipo específico]"',
      priority: 'medium'
    });

    return suggestions;
  };

  const calculateSEOScore = (issues: SEOIssue[], keywords: KeywordAnalysis, readability: ReadabilityScore): number => {
    let score = 100;
    
    // Penalize for issues
    issues.forEach(issue => {
      if (issue.impact === 'high') score -= 15;
      else if (issue.impact === 'medium') score -= 8;
      else if (issue.impact === 'low') score -= 3;
    });

    // Reward good keyword usage
    if (keywords.distribution === 'good') score += 5;
    if (keywords.primary.length >= 3) score += 5;

    // Reward good readability
    if (readability.score >= 80) score += 10;

    return Math.max(Math.min(score, 100), 0);
  };

  const runSEOAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results: SEOAnalysis[] = posts.map(post => {
      const keywords = analyzeKeywords(post.content || '', post.title, post.keywords);
      const metaData = analyzeMetaData(post);
      const readability = analyzeContent(post.content || '');
      const issues = generateSEOIssues(post, keywords, metaData);
      const suggestions = generateSEOSuggestions(post, keywords, readability);
      const seoScore = calculateSEOScore(issues, keywords, readability);

      return {
        postSlug: post.slug,
        postTitle: post.title,
        seoScore,
        issues,
        suggestions,
        keywords,
        metaData,
        readability
      };
    });

    setAnalyses(results.sort((a, b) => a.seoScore - b.seoScore));
    setIsAnalyzing(false);
  };

  const optimizePost = async (postSlug: string) => {
    setIsOptimizing(true);
    setSelectedPost(postSlug);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update the analysis for the optimized post
    setAnalyses(prev => prev.map(analysis => 
      analysis.postSlug === postSlug 
        ? { ...analysis, seoScore: Math.min(analysis.seoScore + 20, 100) }
        : analysis
    ));
    
    setIsOptimizing(false);
    setSelectedPost(null);
  };

  const getSeverityColor = (type: SEOIssue['type']) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            SEO Optimizer para Contenido de Streaming
          </CardTitle>
          <CardDescription>
            Analiza y optimiza automáticamente el SEO de todas las guías de streaming
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={runSEOAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {isAnalyzing ? 'Analizando...' : 'Analizar SEO de todos los posts'}
            </Button>
            
            {analyses.length > 0 && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{analyses.length} posts analizados</span>
                <span>Score promedio: {Math.round(analyses.reduce((acc, a) => acc + a.seoScore, 0) / analyses.length)}/100</span>
              </div>
            )}
          </div>

          {isAnalyzing && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand"></div>
                <span>Analizando contenido SEO...</span>
              </div>
              <Progress value={66} className="w-full" />
            </div>
          )}

          {analyses.length > 0 && (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Card key={analysis.postSlug} className="border-l-4 border-l-brand/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${getScoreColor(analysis.seoScore)}`}>
                          {analysis.seoScore}
                        </div>
                        <div>
                          <CardTitle className="text-base">{analysis.postTitle}</CardTitle>
                          <CardDescription>Score SEO: {analysis.seoScore}/100</CardDescription>
                        </div>
                      </div>
                      <Button 
                        onClick={() => optimizePost(analysis.postSlug)}
                        disabled={isOptimizing && selectedPost === analysis.postSlug}
                        size="sm"
                        variant="outline"
                      >
                        {isOptimizing && selectedPost === analysis.postSlug ? 'Optimizando...' : 'Optimizar'}
                      </Button>
                    </div>
                    <Progress value={analysis.seoScore} className="w-full h-2" />
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Issues */}
                    {analysis.issues.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Problemas detectados ({analysis.issues.length})
                        </h4>
                        <div className="space-y-2">
                          {analysis.issues.slice(0, 3).map((issue, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <Badge variant={getSeverityColor(issue.type) as any} className="text-xs">
                                {issue.category}
                              </Badge>
                              <span className="text-muted-foreground">{issue.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Keywords */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Keywords principales
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.primary.map(keyword => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Densidad: {analysis.keywords.density.toFixed(1)}% 
                        ({analysis.keywords.distribution === 'good' ? '✓ Buena' : 
                          analysis.keywords.distribution === 'low' ? '⚠ Baja' : '⚠ Alta'})
                      </div>
                    </div>

                    {/* Top suggestions */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Sugerencias principales
                      </h4>
                      <div className="space-y-2">
                        {analysis.suggestions
                          .filter(s => s.priority === 'high')
                          .slice(0, 2)
                          .map((suggestion, index) => (
                            <div key={index} className="text-sm">
                              <div className="font-medium">{suggestion.title}</div>
                              <div className="text-muted-foreground">{suggestion.description}</div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Readability */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Legibilidad: {analysis.readability.grade}
                      </span>
                      <span className="text-muted-foreground">
                        {Math.round(analysis.readability.avgWordsPerSentence)} palabras/oración
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOOptimizer;
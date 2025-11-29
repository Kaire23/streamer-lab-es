import { Link } from "wouter";
import SEO from "@/components/SEO";
import { posts } from "@/data/posts";
import { seoArticles } from "@/data/seo-articles";
import { Button } from "@/components/ui/button";
import AdSlot from "@/components/ads/AdSlot";
import OptimizedImage from "@/components/OptimizedImage";
import SubscriptionForm from "@/components/SubscriptionForm";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
// Import streamer images - removed imports, using direct paths instead

interface GeneratedPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  keywords: string;
  reading_time: number;
  published_at: string;
  is_published: boolean;
  created_at: string;
}

const Index: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Define streamer images first
  const streamerImages: { [key: string]: string } = {
    'ibai-llanos': '/assets/ibai-llanos-hero.jpg',
    'elxocas': '/assets/elxocas-hero.jpg', 
    'illojuan': '/assets/illojuan-hero.jpg',
    'thegrefg': '/assets/thegrefg-hero.jpg',
    'coscu': '/assets/coscu-hero.jpg',
    'auronplay': '/assets/auron_1754774603843.jpeg',
    'elrubius': '/assets/rubius_1754774603843.jpg'
  };

  // Helper function to get cover image for generated posts
  const getGeneratedPostCoverImage = (title: string, category: string): string => {
    const titleLower = title.toLowerCase();
    
    // First check if it's a streamer-specific setup with their actual images
    if (titleLower.includes('ibai')) {
      return streamerImages['ibai-llanos'] || '/assets/ibai-llanos-hero.jpg';
    }
    if (titleLower.includes('thegrefg')) {
      return streamerImages['thegrefg'] || '/assets/thegrefg-hero.jpg';
    }
    if (titleLower.includes('elxokas') || titleLower.includes('xokas')) {
      return streamerImages['elxocas'] || '/assets/elxocas-hero.jpg';
    }
    if (titleLower.includes('illojuan') || titleLower.includes('juan')) {
      return streamerImages['illojuan'] || '/assets/illojuan-hero.jpg';
    }
    if (titleLower.includes('coscu')) {
      return streamerImages['coscu'] || '/assets/coscu-hero.jpg';
    }
    if (titleLower.includes('auronplay') || titleLower.includes('auron')) {
      return streamerImages['auronplay'] || '/assets/auron_1754774603843.jpeg';
    }
    if (titleLower.includes('elrubius') || titleLower.includes('rubius')) {
      return streamerImages['elrubius'] || '/assets/rubius_1754774603843.jpg';
    }
    
    // Then check based on category and content type
    if (category === 'Hardware y Equipamiento' || titleLower.includes('webcam') || titleLower.includes('micrófono') || titleLower.includes('auriculares')) {
      return 'https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=600&h=400&fit=crop&auto=format&q=80';
    }
    if (category === 'Configuración y Setup Técnico' || titleLower.includes('setup') || titleLower.includes('streaming')) {
      return 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop&auto=format&q=80';
    }
    if (category === 'Guías y Tutoriales' || titleLower.includes('guía') || titleLower.includes('tutorial')) {
      return 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=600&h=400&fit=crop&auto=format&q=80';
    }
    if (category === 'Streaming Profesional' || titleLower.includes('profesional') || titleLower.includes('obs')) {
      return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop&auto=format&q=80';
    }
    
    // Default streaming setup image - ensure we always return something
    return 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop&auto=format&q=80';
  };

  // Fetch generated posts from the database
  const { data: generatedPosts = [], isLoading } = useQuery({
    queryKey: ["/api/generated-posts"],
    queryFn: async (): Promise<GeneratedPost[]> => {
      const response = await fetch("/api/generated-posts");
      if (!response.ok) {
        throw new Error("Failed to fetch generated posts");
      }
      return response.json();
    },
  });
  
  // Article placeholder images based on category
  const categoryImages: { [key: string]: string } = {
    'Hardware y Equipamiento': 'https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=600&h=400&fit=crop',
    'Guías y Tutoriales': 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=600&h=400&fit=crop',
    'Streaming Profesional': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    'Configuración y Software': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop'
  };

  // Combine all posts: original streamer setups + SEO articles + generated posts
  const allPosts = [
    ...posts.map(post => ({ 
      ...post, 
      type: 'streamer' as const, 
      category: 'Setup de Streamers',
      coverImage: post.coverImage || streamerImages[post.slug] || '/api/placeholder/600/400'
    })),
    ...seoArticles.map(article => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      author: article.author,
      coverImage: categoryImages[article.category] || 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop',
      keywords: article.keywords,
      bio: article.excerpt,
      content: article.content,
      funFacts: [],
      setup: [],
      type: 'article' as const,
      category: article.category,
      readingTime: article.readingTime
    })),
    ...generatedPosts.map(genPost => ({
      slug: genPost.slug,
      title: genPost.title,
      excerpt: genPost.excerpt,
      date: genPost.published_at,
      author: "Equipo Setups de Streamers",
      coverImage: getGeneratedPostCoverImage(genPost.title, genPost.category),
      keywords: Array.isArray(genPost.keywords) ? genPost.keywords : (typeof genPost.keywords === 'string' ? genPost.keywords.split(', ') : []),
      bio: genPost.excerpt,
      content: genPost.content,
      funFacts: [],
      setup: [],
      type: 'generated' as const,
      category: genPost.category,
      readingTime: genPost.reading_time
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());



  // Calculate pagination
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://yostreamer.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "YoStreamer",
        alternateName: "YoStreamer - Guías de Streaming en Español",
        url: siteUrl,
        description: "Portal líder en español sobre streaming, guías de OBS, setups de streamers españoles como Ibai, TheGrefg, AuronPlay y tutoriales profesionales para Twitch y YouTube.",
        inLanguage: "es",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/?q={search_term_string}`
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "YoStreamer",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-default.jpg`,
          width: 1200,
          height: 630
        },
        sameAs: [
          "https://twitter.com/yostreamer",
          "https://www.youtube.com/@yostreamer"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["Spanish", "es"]
        }
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "YoStreamer - Guías de Streaming en Español | Streamers Españoles, OBS, Twitch",
        headline: "Guías de Streaming en Español - Setups de Streamers Españoles",
        description: "El portal definitivo sobre streaming en español. Guías completas de OBS Studio, setups de streamers españoles famosos (Ibai, TheGrefg, ElXokas, AuronPlay), tutoriales profesionales para Twitch y YouTube, y recomendaciones de equipamiento.",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split('T')[0],
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: {
          "@type": "Thing",
          name: "Streaming en español"
        },
        inLanguage: "es",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-default.jpg`,
          width: 1200,
          height: 630
        }
      },
      {
        "@type": "ItemList",
        numberOfItems: allPosts.length,
        itemListElement: allPosts.slice(0, 20).map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: siteUrl + (p.type === 'streamer' ? `/setup/${p.slug}` :
             p.type === 'generated' ? `/setup/${p.slug}` :
             `/article/${p.slug}`),
          name: p.title,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cuál es el mejor setup para streaming en español?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "El mejor setup para streaming depende de tu presupuesto. Para principiantes recomendamos empezar con OBS Studio (gratuito), un micrófono USB básico y tu webcam. Streamers españoles profesionales como Ibai usan equipos Elgato, micrófonos Shure SM7B y Stream Deck XL. Consulta nuestras guías detalladas para cada nivel."
            }
          },
          {
            "@type": "Question",
            name: "¿Cómo configurar OBS Studio para streaming en Twitch?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para configurar OBS para Twitch: 1) Descarga OBS Studio gratis, 2) Conecta tu cuenta Twitch en Configuración > Stream, 3) Configura resolución 1080p/720p según tu internet, 4) Usa encoder x264 o NVENC, 5) Bitrate recomendado 4500-6000 kbps. Tenemos guías completas paso a paso en español."
            }
          },
          {
            "@type": "Question",
            name: "¿Qué equipamiento usan los streamers españoles famosos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Los streamers españoles más famosos usan: Ibai (Stream Deck XL, Shure SM7B, Sony A7III), TheGrefg (Elgato Key Light, capturadora 4K60 Pro), AuronPlay (setup minimalista profesional), ElXokas (audio profesional Rode). Analizamos cada setup en detalle con enlaces de compra."
            }
          }
        ]
      }
    ],
  };

  return (
    <div>
      <SEO
        title="YoStreamer - Guías de Streaming en Español | Streamers Españoles, OBS, Twitch 2025"
        description="El portal #1 de streaming en español. Guías completas de OBS Studio, setups de Ibai, TheGrefg, AuronPlay y ElXokas. Tutoriales profesionales para Twitch y YouTube. Equipamiento, configuración y todo lo que necesitas para empezar a streamear."
        canonicalPath="/"
        jsonLd={jsonLd}
        keywords={[
          "streaming en español",
          "streamers españoles",
          "guía de OBS",
          "guía OBS Studio español",
          "setup streaming",
          "setup Ibai",
          "setup TheGrefg",
          "setup AuronPlay",
          "equipamiento streaming",
          "Twitch España",
          "tutorial streaming español",
          "como empezar a streamear",
          "configurar OBS para Twitch",
          "mejores streamers españoles",
          "streaming profesional España"
        ]}
      />

      <section className="mb-8 text-center hero-section">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight hero-title">
          Guías de Streaming en Español
        </h1>
        <p className="mt-3 text-lg text-muted-foreground hero-subtitle max-w-3xl mx-auto">
          El portal definitivo sobre <strong>streaming en español</strong>. Setups completos de <strong>streamers españoles</strong> como Ibai, TheGrefg y AuronPlay. <strong>Guías de OBS</strong>, tutoriales profesionales para Twitch y todo el equipamiento que necesitas.
        </p>
      </section>

      <nav aria-label="Streamers destacados" className="mb-6 overflow-x-auto">
        <ul className="flex gap-2 whitespace-nowrap">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/setup/${post.slug}`}
                className="inline-block rounded-full border border-border/60 px-3 py-1 text-sm hover:bg-accent/40 transition-colors"
              >
                {post.title.replace(/^Setup de streaming de\s*/i, "").replace(/\s*\(.*\):?.*$/, "")}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Newsletter Subscription */}
      <section id="newsletter" className="mb-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡No te pierdas ninguna guía!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Publicamos nuevos artículos cada 3 días con análisis de setups, guías de equipamiento y recomendaciones de productos con los mejores precios.
          </p>
        </div>
        <SubscriptionForm />
      </section>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
          <span className="ml-2 text-muted-foreground">Cargando posts...</span>
        </div>
      )}

      {/* Total posts counter */}
      {!isLoading && (
        <div className="mb-4 text-center text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(endIndex, allPosts.length)} de {allPosts.length} artículos
        </div>
      )}

      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2 posts-grid">
          {currentPosts.map((post, index) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-xl border border-border/60 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[var(--elevate)] post-card"
          >
            <Link to={
              post.type === 'streamer' ? `/setup/${post.slug}` :
              post.type === 'generated' ? `/setup/${post.slug}` :
              `/article/${post.slug}`
            } className="block">
              <div className="aspect-video overflow-hidden bg-muted">
                <OptimizedImage
                  src={post.coverImage}
                  alt={`Setup de streaming completo de ${post.title.replace(/^Setup de streaming de\s*/i, "")} - Equipo profesional, micrófono, cámara e iluminación`}
                  priority={index === 0}
                  width={378}
                  height={213}
                  sizes="(max-width: 768px) 100vw, 378px"
                  responsive={true}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                  {post.category}
                </span>
                {post.type === 'article' && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                    {post.readingTime} min
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold tracking-tight">
                <Link to={
                  post.type === 'streamer' ? `/setup/${post.slug}` :
                  post.type === 'generated' ? `/setup/${post.slug}` :
                  `/article/${post.slug}`
                }>{post.title}</Link>
              </h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <Button asChild variant="hero">
                  <Link to={
                    post.type === 'streamer' ? `/setup/${post.slug}` :
                    post.type === 'generated' ? `/setup/${post.slug}` :
                    `/article/${post.slug}`
                  }>
                    {(post.type === 'streamer' || post.type === 'generated') ? 'Ver setup' : 'Leer guía'}
                  </Link>
                </Button>
                <time className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("es-ES")}
                </time>
              </div>
            </div>
          </article>
        ))}
        </div>
      )}

      {/* Pagination controls */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="mt-8">
        <AdSlot id="home-bottom" format="horizontal" />
      </div>
    </div>
  );
};

export default Index;

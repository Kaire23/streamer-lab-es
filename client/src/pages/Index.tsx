import { Link } from "wouter";
import SEO from "@/components/SEO";
import { posts } from "@/data/posts";
import { seoArticles } from "@/data/seo-articles";
import { Button } from "@/components/ui/button";
import AdSlot from "@/components/ads/AdSlot";
import OptimizedImage from "@/components/OptimizedImage";
import SubscriptionForm from "@/components/SubscriptionForm";

const Index: React.FC = () => {
  // Combine all posts: streamer setups + SEO articles
  const allPosts = [
    ...posts.map(post => ({ ...post, type: 'streamer' as const, category: 'Setup de Streamers' })),
    ...seoArticles.map(article => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      author: article.author,
      coverImage: "/api/placeholder/600/400",
      keywords: article.keywords,
      bio: article.excerpt,
      content: article.content,
      funFacts: [],
      setup: [],
      type: 'article' as const,
      category: article.category,
      priority: article.priority,
      readingTime: article.readingTime
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Setups de Streamers",
        url: typeof window !== "undefined" ? window.location.origin : "",
        potentialAction: {
          "@type": "SearchAction",
          target: "{url}/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        itemListElement: allPosts.map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url:
            (typeof window !== "undefined" ? window.location.origin : "") +
            (p.type === 'streamer' ? `/setup/${p.slug}` : `/article/${p.slug}`),
          name: p.title,
        })),
      },
    ],
  };

  return (
    <div>
      <SEO
        title="Setups de Streamers: Guías Futuristas en Español"
        description="Cada semana analizamos el setup de un streamer famoso: historia, curiosidades y enlaces a todo su equipo."
        canonicalPath="/"
        jsonLd={jsonLd}
        keywords={["setup de streaming", "streamers famosos", "equipo streaming", "guías en español"]}
      />

      <section className="mb-8 text-center hero-section">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight hero-title">
          Setups de Streamers
        </h1>
        <p className="mt-3 text-lg text-muted-foreground hero-subtitle">
          Guías futuristas en español para replicar el equipo de tus creadores favoritos.
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

      <div className="grid gap-6 md:grid-cols-2 posts-grid">
        {allPosts.map((post, index) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-xl border border-border/60 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[var(--elevate)] post-card"
          >
            <Link to={post.type === 'streamer' ? `/setup/${post.slug}` : `/article/${post.slug}`} className="block">
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
                <Link to={post.type === 'streamer' ? `/setup/${post.slug}` : `/article/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <Button asChild variant="hero">
                  <Link to={post.type === 'streamer' ? `/setup/${post.slug}` : `/article/${post.slug}`}>
                    {post.type === 'streamer' ? 'Ver setup' : 'Leer guía'}
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

      <div className="mt-8">
        <AdSlot id="home-bottom" format="horizontal" />
      </div>

      <section id="newsletter" className="mt-12 rounded-xl border border-border/60 p-6 shadow-sm text-center">
        <h2 className="text-2xl font-semibold">¿Quieres recibir nuevas guías?</h2>
        <p className="text-muted-foreground mt-1">Muy pronto añadiremos newsletter. ¡Estate atento!</p>
      </section>
    </div>
  );
};

export default Index;

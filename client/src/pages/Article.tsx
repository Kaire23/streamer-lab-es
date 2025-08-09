import { useParams } from "wouter";
import { seoArticles } from "@/data/seo-articles";
import SEO from "@/components/SEO";
import { ChevronLeft, Clock, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SubscriptionForm from "@/components/SubscriptionForm";

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const article = seoArticles.find(a => a.slug === slug);
  
  if (!article) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-muted-foreground mb-6">El artículo que buscas no existe o ha sido movido.</p>
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Setups de Streamers",
      logo: {
        "@type": "ImageObject",
        url: typeof window !== "undefined" ? `${window.location.origin}/logo.png` : "",
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : "",
    },
    keywords: article.keywords.join(", "),
  };

  return (
    <div>
      <SEO
        title={`${article.title} | Setups de Streamers`}
        description={article.excerpt}
        canonicalPath={`/article/${article.slug}`}
        jsonLd={jsonLd}
        keywords={article.keywords}
      />

      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              {article.readingTime} min lectura
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime} minutos</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
        </article>

        {/* Newsletter Subscription */}
        <section className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¿Te gustó este artículo?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Suscríbete para recibir más guías como esta cada 3 días directamente en tu email.
            </p>
          </div>
          <SubscriptionForm />
        </section>

        {/* Related Articles */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {seoArticles
              .filter(a => a.slug !== article.slug)
              .slice(0, 4)
              .map(relatedArticle => (
                <article key={relatedArticle.slug} className="group border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                      {relatedArticle.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      {relatedArticle.readingTime} min
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    <Link to={`/article/${relatedArticle.slug}`}>
                      {relatedArticle.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {relatedArticle.excerpt}
                  </p>
                </article>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Article;
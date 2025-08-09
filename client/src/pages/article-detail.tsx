import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, User, Tag, ExternalLink } from "lucide-react";
import { seoArticles } from "@/data/seo-articles";
import ContentRenderer from "@/components/ContentRenderer";
import { Helmet } from "react-helmet-async";

export default function ArticleDetail() {
  const params = useParams();
  const slug = params.slug;
  
  const article = seoArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            El artículo que buscas no existe o ha sido movido.
          </p>
          <Link href="/articles" className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver a artículos
          </Link>
        </div>
      </div>
    );
  }

  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  };

  const priorities = {
    high: "Alta Prioridad",
    medium: "Media Prioridad", 
    low: "Baja Prioridad"
  };

  return (
    <>
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.keywords.join(", ")} />
        <meta name="author" content={article.author} />
        <link rel="canonical" href={`https://yostreamer.com/article/${article.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yostreamer.com/article/${article.slug}`} />
        <meta property="og:site_name" content="Setups de Streamers" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "author": {
              "@type": "Organization",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Setups de Streamers"
            },
            "datePublished": article.date,
            "dateModified": article.date,
            "mainEntityOfPage": `https://yostreamer.com/article/${article.slug}`,
            "articleSection": article.category,
            "keywords": article.keywords.join(", ")
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link href="/articles" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver a artículos
          </Link>

          <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[article.priority]}`}>
                  {priorities[article.priority]}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {article.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readingTime} min de lectura</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {article.keywords.map((keyword) => (
                  <span key={keyword} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                    #{keyword}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <ContentRenderer content={article.content} />
            </div>

            {/* Related Articles */}
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Artículos relacionados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seoArticles
                  .filter(a => a.slug !== article.slug && a.category === article.category)
                  .slice(0, 2)
                  .map((relatedArticle) => (
                    <Link key={relatedArticle.slug} href={`/article/${relatedArticle.slug}`}>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{relatedArticle.readingTime} min</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
}
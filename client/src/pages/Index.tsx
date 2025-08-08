import { Link } from "wouter";
import SEO from "@/components/SEO";
import { posts } from "@/data/posts";
import { Button } from "@/components/ui/button";
import AdSlot from "@/components/ads/AdSlot";

const Index: React.FC = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Setups de Streamers",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        itemListElement: posts.map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: new URL(`/setup/${p.slug}`, siteUrl).toString(),
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

      <section className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Setups de Streamers
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
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

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-xl border border-border/60 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[var(--elevate)]"
          >
            <Link to={`/setup/${post.slug}`} className="block">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={`Setup de streaming de ${post.title}`}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold tracking-tight">
                <Link to={`/setup/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <Button asChild variant="hero">
                  <Link to={`/setup/${post.slug}`}>Ver setup</Link>
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

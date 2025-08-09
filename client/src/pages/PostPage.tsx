import { useParams, Link } from "wouter";
import SEO from "@/components/SEO";
import { posts } from "@/data/posts";
import { Button } from "@/components/ui/button";
import AdSlot from "@/components/ads/AdSlot";
import OptimizedImage from "@/components/OptimizedImage";

const PostPage: React.FC = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Entrada no encontrada</h1>
        <p className="text-muted-foreground mt-2">Puede que el enlace haya cambiado.</p>
        <Button asChild className="mt-4" variant="hero">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        image: origin + post.coverImage,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        keywords: post.keywords.join(", "),
        mainEntityOfPage: origin + `/setup/${post.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: origin + "/" },
          { "@type": "ListItem", position: 2, name: post.title, item: origin + `/setup/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <article className="grid gap-8 md:grid-cols-[1fr_320px]">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        canonicalPath={`/setup/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
        keywords={post.keywords}
      />

      <div>
        <header className="space-y-3">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {post.title}
          </h1>
          <p className="text-muted-foreground">Actualizado: {new Date(post.date).toLocaleDateString("es-ES")}</p>
        </header>

        <div className="mt-4 overflow-hidden rounded-xl border border-border/60 shadow-sm">
          <OptimizedImage
            src={post.coverImage}
            alt={`Setup de streaming profesional de ${post.title.replace(/^Setup de streaming de\s*/i, "")} - Vista completa del escritorio con equipo gaming, micrófono profesional, iluminación LED y configuración optimizada para streaming en Twitch`}
            priority={true}
            width="1200"
            height="675"
            sizes="100vw"
            responsive={false}
            className="w-full h-auto object-cover"
          />
        </div>

        <section className="mt-6 space-y-4">
          <h2 className="text-2xl font-semibold">Historia</h2>
          <p className="text-base leading-relaxed text-foreground/90">{post.bio}</p>

          <h2 className="text-2xl font-semibold">Curiosidades</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            {post.funFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold">Equipo del setup</h2>
        </section>

        <div className="mt-4 grid gap-6">
          {post.setup.map((cat) => (
            <section key={cat.name} className="rounded-lg border border-border/60 p-4 shadow-sm">
              <h3 className="font-semibold mb-3">{cat.name}</h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                    <li key={item.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.name} - Equipo de streaming profesional disponible en Amazon España con envío rápido`}
                            loading="lazy"
                            width="80"
                            height="80"
                            className="w-20 h-20 object-cover rounded-md border border-border/60"
                          />
                        ) : null}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.note ? (
                            <p className="text-sm text-muted-foreground">{item.note}</p>
                          ) : null}
                        </div>
                      </div>
                      <Button asChild variant="hero">
                        <a href={item.link} target="_blank" rel="nofollow noopener noreferrer" aria-label={`Comprar ${item.name} en Amazon`}>
                          Comprar
                        </a>
                      </Button>
                    </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <AdSlot id="post-inline" />
        </div>
      </div>

      <aside className="space-y-6">
        <AdSlot id="sidebar-rect" format="rectangle" />
        <section className="rounded-lg border border-border/60 p-4 shadow-sm">
          <h2 className="font-semibold">¿Te gustó esta guía?</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Publicamos un nuevo setup cada semana. ¡Vuelve pronto!
          </p>
        </section>
      </aside>
    </article>
  );
};

export default PostPage;

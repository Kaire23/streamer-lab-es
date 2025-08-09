import { useParams, Link } from "wouter";
import SEO from "@/components/SEO";
import { posts } from "@/data/posts";
import { Button } from "@/components/ui/button";
import AdSlot from "@/components/ads/AdSlot";
import OptimizedImage from "@/components/OptimizedImage";
import { useQuery } from "@tanstack/react-query";

// Simple markdown to HTML converter for basic formatting
const convertMarkdownToHTML = (markdown: string): string => {
  let html = markdown;
  
  // Process line by line for better list handling
  const lines = html.split('\n');
  let processedLines: string[] = [];
  let inList = false;
  let listType = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Headers
    if (line.startsWith('#### ')) {
      processedLines.push(`<h4>${line.substring(5)}</h4>`);
    } else if (line.startsWith('### ')) {
      processedLines.push(`<h3>${line.substring(4)}</h3>`);
    } else if (line.startsWith('## ')) {
      processedLines.push(`<h2>${line.substring(3)}</h2>`);
    } else if (line.startsWith('# ')) {
      processedLines.push(`<h1>${line.substring(2)}</h1>`);
    }
    // Lists
    else if (line.startsWith('- ')) {
      if (!inList || listType !== 'ul') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      processedLines.push(`<li>${line.substring(2)}</li>`);
    } else if (/^\d+\.\s/.test(line)) {
      if (!inList || listType !== 'ol') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      processedLines.push(`<li>${line.replace(/^\d+\.\s/, '')}</li>`);
    } else {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
        listType = '';
      }
      if (line.trim() === '') {
        processedLines.push('');
      } else {
        processedLines.push(line);
      }
    }
  }
  
  if (inList) {
    processedLines.push(`</${listType}>`);
  }
  
  html = processedLines.join('\n');
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Paragraphs
  html = html.replace(/\n\n+/g, '</p><p>');
  html = html.replace(/^(?!<[houl])/gm, '<p>');
  html = html.replace(/(?<!<\/[houl][^>]*>)$/gm, '</p>');
  
  // Clean up
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<[houl])/g, '$1');
  html = html.replace(/(<\/[houl][^>]*>)<\/p>/g, '$1');
  
  return html;
};

// Get cover image for generated posts
const getCoverImageForGeneratedPost = (title: string, category: string): string => {
  const titleLower = title.toLowerCase();
  
  // Streamer-specific images
  if (titleLower.includes('ibai')) return '/assets/ibai-llanos-hero.jpg';
  if (titleLower.includes('thegrefg')) return '/assets/thegrefg-hero.jpg';
  if (titleLower.includes('elxokas') || titleLower.includes('xokas')) return '/assets/elxocas-hero.jpg';
  if (titleLower.includes('illojuan') || titleLower.includes('juan')) return '/assets/illojuan-hero.jpg';
  if (titleLower.includes('coscu')) return '/assets/coscu-hero.jpg';
  if (titleLower.includes('auronplay') || titleLower.includes('auron')) return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop&auto=format&q=80';
  if (titleLower.includes('elrubius') || titleLower.includes('rubius')) return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&auto=format&q=80';
  
  // Category-based images
  if (category === 'Hardware y Equipamiento' || titleLower.includes('webcam') || titleLower.includes('micrófono')) {
    return 'https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=800&h=450&fit=crop&auto=format&q=80';
  }
  if (category === 'Configuración y Setup Técnico' || titleLower.includes('setup')) {
    return 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=450&fit=crop&auto=format&q=80';
  }
  if (category === 'Guías y Tutoriales' || titleLower.includes('guía')) {
    return 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800&h=450&fit=crop&auto=format&q=80';
  }
  
  // Default
  return 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=450&fit=crop&auto=format&q=80';
};

interface GeneratedPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  keywords: string;
  published_at: string;
  reading_time: number;
}

const PostPage: React.FC = () => {
  const { slug } = useParams();
  
  // Check for original post first
  const originalPost = posts.find((p) => p.slug === slug);
  
  // Fetch generated post if no original post found
  const { data: generatedPost, isLoading } = useQuery({
    queryKey: ["/api/generated-post", slug],
    queryFn: async (): Promise<GeneratedPost | null> => {
      if (originalPost) return null; // Don't fetch if we already have original post
      
      const response = await fetch(`/api/generated-posts`);
      if (!response.ok) return null;
      
      const allPosts: GeneratedPost[] = await response.json();
      return allPosts.find(p => p.slug === slug) || null;
    },
    enabled: !originalPost, // Only run query if no original post found
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  // If we have an original post, use it
  if (originalPost) {
    const post = originalPost;

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
              alt={`Setup de streaming de ${post.title.split(' ')[0]} - Equipamiento y configuración completa`}
              width={800}
              height={450}
              className="w-full object-cover"
              priority
            />
          </div>

          <div 
            className="prose prose-lg max-w-none mt-8 prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-primary/20 prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-3 prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

        <aside className="space-y-6">
          <AdSlot 
            slot="content-sidebar"
            format="vertical"
          />
        </aside>
      </article>
    );
  }

  // If we have a generated post, render it
  if (generatedPost) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const keywords = typeof generatedPost.keywords === 'string' ? generatedPost.keywords.split(', ') : [];
    
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: generatedPost.title,
          datePublished: generatedPost.published_at,
          author: {
            "@type": "Person",
            name: "Equipo Setups de Streamers",
          },
          keywords: keywords.join(", "),
          mainEntityOfPage: origin + `/setup/${generatedPost.slug}`,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: origin + "/" },
            { "@type": "ListItem", position: 2, name: generatedPost.title, item: origin + `/setup/${generatedPost.slug}` },
          ],
        },
      ],
    };

    return (
      <article className="grid gap-8 md:grid-cols-[1fr_320px]">
        <SEO
          title={generatedPost.title}
          description={generatedPost.excerpt}
          canonicalPath={`/setup/${generatedPost.slug}`}
          type="article"
          jsonLd={jsonLd}
          keywords={keywords}
        />

        <div>
          <header className="space-y-3">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Inicio</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{generatedPost.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {generatedPost.title}
            </h1>
            <p className="text-muted-foreground">
              Actualizado: {new Date(generatedPost.published_at).toLocaleDateString("es-ES")} • 
              Tiempo de lectura: ~{generatedPost.reading_time} min
            </p>
          </header>

          {/* Add cover image for generated posts */}
          <div className="mt-4 overflow-hidden rounded-xl border border-border/60 shadow-sm">
            <OptimizedImage
              src={getCoverImageForGeneratedPost(generatedPost.title, generatedPost.category)}
              alt={`${generatedPost.title} - Guía completa de equipamiento para streaming`}
              width={800}
              height={450}
              className="w-full object-cover"
              priority
            />
          </div>

          <div 
            className="prose prose-lg max-w-none mt-8 prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-primary/20 prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-3 prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-li:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg"
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(generatedPost.content) }} 
          />
        </div>

        <aside className="space-y-6">
          <AdSlot 
            slot="content-sidebar"
            format="vertical"
          />
        </aside>
      </article>
    );
  }

  // Neither original nor generated post found
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Entrada no encontrada</h1>
      <p className="text-muted-foreground mt-2">Puede que el enlace haya cambiado.</p>
      <Button asChild className="mt-4" variant="hero">
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
};

export default PostPage;
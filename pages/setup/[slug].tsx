import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { posts } from '../../lib/data/posts';
import styles from '../../styles/Post.module.css';

interface PostPageProps {
  post: typeof posts[0] | null;
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();

  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Entrada no encontrada</h1>
          <p>Puede que el enlace haya cambiado.</p>
          <Link href="/" className={styles.button}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        image: `https://yostreamer.com${post.coverImage}`,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        keywords: post.keywords.join(", "),
        mainEntityOfPage: `https://yostreamer.com/setup/${post.slug}/`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://yostreamer.com/" },
          { "@type": "ListItem", position: 2, name: post.title, item: `https://yostreamer.com/setup/${post.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <NextSeo
        title={`${post.title} - Setups de Streamers`}
        description={post.excerpt}
        canonical={`https://yostreamer.com/setup/${post.slug}/`}
        openGraph={{
          type: 'article',
          url: `https://yostreamer.com/setup/${post.slug}/`,
          title: post.title,
          description: post.excerpt,
          images: [
            {
              url: `https://yostreamer.com${post.coverImage}`,
              alt: `Setup de streaming de ${post.title}`,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: post.keywords.join(', '),
          },
          {
            name: 'author',
            content: post.author,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <nav className={styles.breadcrumb}>
              <Link href="/">
                Inicio
              </Link>
              <span> / </span>
              <span>{post.title}</span>
            </nav>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.date}>
              Actualizado: {new Date(post.date).toLocaleDateString("es-ES")}
            </p>
          </header>

          <div className={styles.imageWrapper}>
            <Image
              src={post.coverImage}
              alt={`Setup de streaming de ${post.title}`}
              width={1200}
              height={675}
              priority
              className={styles.coverImage}
            />
          </div>

          <section className={styles.content}>
            <h2>Historia</h2>
            <p>{post.bio}</p>

            <h2>Curiosidades</h2>
            <ul className={styles.funFacts}>
              {post.funFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>

            <h2>Equipo del setup</h2>
            <div className={styles.setupGrid}>
              {post.setup.map((category) => (
                <section key={category.name} className={styles.setupCategory}>
                  <h3>{category.name}</h3>
                  <ul className={styles.itemList}>
                    {category.items.map((item) => (
                      <li key={item.name} className={styles.item}>
                        <div className={styles.itemContent}>
                          <h4>{item.name}</h4>
                          <p className={styles.itemDescription}>{item.description}</p>
                          {item.affiliateLink && (
                            <a
                              href={item.affiliateLink}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className={styles.affiliateLink}
                            >
                              Ver en Amazon →
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.relatedPosts}>
              <h3>Otros Setups</h3>
              <ul>
                {posts
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 3)
                  .map((relatedPost) => (
                    <li key={relatedPost.slug}>
                      <Link href={`/setup/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </article>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = posts.find((p) => p.slug === slug) || null;

  return {
    props: {
      post,
    },
  };
};
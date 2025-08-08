import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '../lib/data/posts';
import styles from '../styles/Home.module.css';

interface HomeProps {
  posts: typeof posts;
}

export default function Home({ posts }: HomeProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Setups de Streamers",
        url: "https://yostreamer.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://yostreamer.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        itemListElement: posts.map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://yostreamer.com/setup/${p.slug}/`,
          name: p.title,
        })),
      },
    ],
  };

  return (
    <>
      <NextSeo
        title="Setups de Streamers: Guías de Equipos de Streaming en Español"
        description="Descubre los setups completos de streamers famosos como Ibai, ElXocas, illoJuan, TheGrefg y Coscu. Guías detalladas con enlaces para comprar todo su equipo."
        canonical="https://yostreamer.com/"
        openGraph={{
          url: 'https://yostreamer.com/',
          title: 'Setups de Streamers: Guías de Equipos de Streaming',
          description: 'Descubre los setups completos de streamers famosos. Guías detalladas con todo su equipo.',
          type: 'website',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'setup streaming, equipo streamer, micrófono streaming, cámara streaming, setup Ibai, setup ElXocas, setup illoJuan, setup TheGrefg, setup Coscu',
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.hero}>
            <h1 className={styles.title}>Setups de Streamers</h1>
            <p className={styles.description}>
              Guías futuristas en español para replicar el equipo de tus creadores favoritos.
            </p>
          </section>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/setup/${post.slug}`} className={styles.navLink}>
                    {post.title.replace(/^Setup de streaming de\s*/i, "").replace(/\s*\(.*\):?.*$/, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.grid}>
            {posts.map((post) => (
              <article key={post.slug} className={styles.card}>
                <Link href={`/setup/${post.slug}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={post.coverImage}
                      alt={`Setup de streaming de ${post.title}`}
                      width={800}
                      height={450}
                      loading="lazy"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <p className={styles.cardDate}>
                      {new Date(post.date).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // This runs on the server for every request
  return {
    props: {
      posts,
    },
  };
};
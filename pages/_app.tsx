import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-VBXNX2FEBM"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VBXNX2FEBM');
          `,
        }}
      />
      
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'es_ES',
          url: 'https://yostreamer.com/',
          siteName: 'Setups de Streamers',
        }}
        twitter={{
          handle: '@yostreamer',
          site: '@yostreamer',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1',
          },
          {
            name: 'language',
            content: 'es',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
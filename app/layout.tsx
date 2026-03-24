import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: {
    default: 'TrendJP - 海外バズを今すぐ日本語で',
    template: '%s | TrendJP',
  },
  description:
    '海外SNS・ニュースのバズを自動検知し、AI が日本語解説記事として自動公開。最新グローバルトレンドを毎時更新。',
  keywords: ['トレンド', '海外ニュース', 'AI', 'テクノロジー', '日本語'],
  openGraph: {
    siteName: 'TrendJP',
    locale: 'ja_JP',
    type: 'website',
    url: 'https://trendjp.vercel.app',
    images: [
      {
        url: 'https://trendjp.vercel.app/api/og',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendJP - 海外バズを今すぐ日本語で',
    description: '海外SNS・ニュースのバズを自動検知し、AI が日本語解説記事として自動公開。',
    images: ['https://trendjp.vercel.app/api/og'],
  },
  alternates: {
    canonical: 'https://trendjp.vercel.app',
    types: {
      'application/rss+xml': 'https://trendjp.vercel.app/feed.xml',
    },
  },
};

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <head>
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TrendJP",
              "url": "https://trendjp.vercel.app",
              "description": "海外SNS・ニュースのバズを自動検知し、AIが日本語解説記事として自動公開。最新グローバルトレンドを毎時更新。",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://trendjp.vercel.app/?category={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif', fontSize: '16px' }}
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

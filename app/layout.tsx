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
  metadataBase: new URL('https://trendjp.vercel.app'),
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
        <Script
          id="faqpage-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "TrendJPとは何ですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hacker News等の海外テックコミュニティのトレンド記事をAIが日本語に翻訳・解説するメディアです。最新のグローバルテクノロジー動向を日本語で素早くキャッチアップできます。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "記事はどのように生成されますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "世界最大のテックコミュニティHacker Newsでスコア150点以上の話題をAIが日本語解説記事に変換しています。Anthropic社のClaude Haikuを使用して、元記事の内容を正確に日本語で解説しています。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "更新頻度はどのくらいですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "10分ごとに最新トレンドを確認し、バズ記事が検出されると自動で日本語記事が生成されます。毎時更新で常に最新のグローバルトレンドをお届けします。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "無料で使えますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、TrendJPは完全無料でご利用いただけます。メール通知はニュースレター登録で受け取れます。登録も無料です。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "どのカテゴリの記事がありますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "テクノロジー・AI・プログラミング・スタートアップ・ビジネス・エンターテインメント等のカテゴリをカバーしています。海外の最新テックトレンドを幅広く取り扱っています。"
                  }
                }
              ]
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

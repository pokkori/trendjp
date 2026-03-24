interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export default function ArticleJsonLd({ title, description, url, publishedAt }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    image: `https://trendjp.vercel.app/api/og?title=${encodeURIComponent(title)}`,
    author: { '@type': 'Organization', name: 'TrendJP' },
    publisher: {
      '@type': 'Organization',
      name: 'TrendJP',
      url: 'https://trendjp.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trendjp.vercel.app/logo.png',
        width: 192,
        height: 192,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

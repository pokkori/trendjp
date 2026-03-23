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
    author: { '@type': 'Organization', name: 'TrendJP' },
    publisher: {
      '@type': 'Organization',
      name: 'TrendJP',
      url: 'https://trendjp.vercel.app',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

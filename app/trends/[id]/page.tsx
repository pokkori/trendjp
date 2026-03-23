import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ArticleContent from '@/components/ArticleContent';
import AffiliateBlock from '@/components/AffiliateBlock';
import ShareButtons from '@/components/ShareButtons';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import { AffiliateLink } from '@/lib/affiliate';

export const revalidate = 86400; // 24時間（記事は変更なし）

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ArticleData {
  id: string;
  slug: string;
  title_ja: string;
  content_ja: string;
  excerpt_ja: string;
  published_at: string;
  keywords: string[];
  affiliate_links: AffiliateLink[];
  trends: { source: string; original_url: string; category: string; original_score: number };
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase
      .from('articles')
      .select('slug')
      .eq('published', true)
      .limit(100);
    return (data || []).map((a: { slug: string }) => ({ id: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { data: article } = await supabase
      .from('articles')
      .select('title_ja, excerpt_ja')
      .eq('slug', id)
      .single();

    if (!article) return { title: 'Not Found' };

    return {
      title: `${article.title_ja} | TrendJP`,
      description: article.excerpt_ja,
      openGraph: {
        title: article.title_ja,
        description: article.excerpt_ja,
        type: 'article',
        images: [`https://trendjp.vercel.app/api/og?title=${encodeURIComponent(article.title_ja)}`],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title_ja,
        description: article.excerpt_ja,
      },
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;

  let article: ArticleData | null = null;
  try {
    const { data } = await supabase
      .from('articles')
      .select(
        'id, slug, title_ja, content_ja, excerpt_ja, published_at, keywords, affiliate_links, trends!inner(source, original_url, category, original_score)'
      )
      .eq('slug', id)
      .eq('published', true)
      .single();
    article = data as ArticleData | null;
  } catch {
    // not found
  }

  if (!article) notFound();

  const articleUrl = `https://trendjp.vercel.app/trends/${article.slug}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <ArticleJsonLd
        title={article.title_ja}
        description={article.excerpt_ja}
        url={articleUrl}
        publishedAt={article.published_at}
      />

      <article className="max-w-2xl mx-auto px-4 py-12" aria-label={article.title_ja}>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{article.title_ja}</h1>
          <p className="text-blue-300 text-sm">
            {new Date(article.published_at).toLocaleDateString('ja-JP')}
          </p>
        </header>

        <ArticleContent content={article.content_ja} />

        {/* 元記事リンク（著作権対策） */}
        <section
          className="mt-8 p-4 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
          aria-label="元記事情報"
        >
          <p className="text-blue-200 text-sm">
            出典:{' '}
            <a
              href={article.trends.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
              aria-label={`元記事を開く: ${article.trends.original_url}`}
            >
              {article.trends.original_url}
            </a>
          </p>
        </section>

        <AffiliateBlock links={article.affiliate_links} />
        <ShareButtons title={article.title_ja} slug={article.slug} />
      </article>
    </main>
  );
}

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ArticleContent from '@/components/ArticleContent';
import AffiliateBlock from '@/components/AffiliateBlock';
import ProgrammingSchoolBlock from '@/components/ProgrammingSchoolBlock';
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

interface RelatedArticle {
  id: string;
  slug: string;
  title_ja: string;
  excerpt_ja: string;
  published_at: string;
  trends: { category: string; original_score: number };
}

const MOCK_RELATED: RelatedArticle[] = [
  {
    id: 'mock-4',
    slug: 'ai-agent-earns-5m-yen-monthly-new-method',
    title_ja: 'AIエージェントが月収500万円を稼ぐ新手法：Anthropic Claude API活用術',
    excerpt_ja: 'Anthropic Claude APIを使った自律エージェントが、受注から納品まで完全自動化したビジネスモデルで月収500万円を達成。',
    published_at: new Date(Date.now() - 14400000).toISOString(),
    trends: { category: 'technology', original_score: 421 },
  },
  {
    id: 'mock-5',
    slug: 'nocode-tools-top10-2025',
    title_ja: '2025年最注目のノーコードツール10選：Lovable・Bolt・v0の実力比較',
    excerpt_ja: 'Lovable・Bolt・v0など新世代ノーコードツールが従来の開発フローを一変させつつある。',
    published_at: new Date(Date.now() - 18000000).toISOString(),
    trends: { category: 'technology', original_score: 356 },
  },
  {
    id: 'mock-9',
    slug: 'quantum-computing-breaks-rsa-encryption',
    title_ja: '量子コンピュータがRSA暗号を突破：セキュリティ業界に激震',
    excerpt_ja: 'Googleの量子コンピュータチームが2048ビットRSA暗号の解読に成功したと発表。',
    published_at: new Date(Date.now() - 32400000).toISOString(),
    trends: { category: 'science', original_score: 634 },
  },
];

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

  // 関連記事（同カテゴリ）を取得
  let relatedArticles: RelatedArticle[] = [];
  try {
    const { data } = await supabase
      .from('articles')
      .select('id, slug, title_ja, excerpt_ja, published_at, trends!inner(category, original_score)')
      .eq('published', true)
      .eq('trends.category', article.trends.category)
      .neq('slug', article.slug)
      .order('published_at', { ascending: false })
      .limit(3);
    relatedArticles = (data as unknown as RelatedArticle[]) || [];
  } catch {
    // Supabase 未設定時はモック使用
  }

  const displayRelated = relatedArticles.length === 0 ? MOCK_RELATED : relatedArticles;

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
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-blue-300 text-sm">
              {new Date(article.published_at).toLocaleDateString('ja-JP')}
            </p>
            {article.content_ja && (
              <span
                className="flex items-center gap-1 text-blue-400 text-sm"
                aria-label={`推定読了時間: 約${Math.ceil(article.content_ja.length / 400)}分`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                約{Math.ceil(article.content_ja.length / 400)}分で読めます
              </span>
            )}
          </div>
        </header>

        <ArticleContent content={article.content_ja} />

        {/* プログラミングスクールアフィリエイト（記事中間） */}
        <ProgrammingSchoolBlock />

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

      {/* 関連記事レコメンド */}
      <section
        className="max-w-2xl mx-auto px-4 pb-16"
        aria-label="関連記事"
      >
        <h2 className="text-xl font-bold text-white mb-4">関連記事</h2>
        <div className="flex flex-col gap-4">
          {displayRelated.map((rel) => (
            <Link
              key={rel.id}
              href={`/trends/${rel.slug}`}
              aria-label={`関連記事: ${rel.title_ja}`}
              className="block rounded-xl p-5 transition-all duration-200 hover:scale-[1.02] hover:bg-white/[0.1]"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span
                className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full text-white mb-2"
                style={{ backgroundColor: '#3b82f6' }}
              >
                {rel.trends.category}
              </span>
              <h3 className="text-white font-semibold leading-snug mb-1 line-clamp-2">
                {rel.title_ja}
              </h3>
              <p className="text-blue-300 text-sm line-clamp-2">{rel.excerpt_ja}</p>
              <p className="text-blue-400 text-xs mt-2">
                {new Date(rel.published_at).toLocaleDateString('ja-JP')}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/"
            aria-label="トップページへ戻る"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              background: 'rgba(59,130,246,0.3)',
              border: '1px solid rgba(59,130,246,0.5)',
              minHeight: '44px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            トップへ戻る
          </Link>
        </div>
      </section>
    </main>
  );
}

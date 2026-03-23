import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import TrendCard from '@/components/TrendCard';
import CategoryFilter from '@/components/CategoryFilter';
import StreakBadge from '@/components/StreakBadge';

export const revalidate = 3600; // ISR: 1時間ごとに再生成

interface ArticleRow {
  id: string;
  slug: string;
  title_ja: string;
  excerpt_ja: string;
  published_at: string;
  keywords: string[];
  trends: { source: string; category: string; original_score: number };
}

const MOCK_ARTICLES: ArticleRow[] = [
  {
    id: 'mock-1',
    slug: 'ai-revolutionizes-software-development-2026',
    title_ja: 'AIがソフトウェア開発を革命的に変える：2026年の最前線',
    excerpt_ja: 'Hacker Newsで話題沸騰中。AIコーディングアシスタントがエンジニアの生産性を3倍に向上させるという調査結果が公開された。特にコードレビューと自動テスト生成の分野で顕著な効果が報告されている。',
    published_at: new Date(Date.now() - 3600000).toISOString(),
    keywords: ['AI', 'ソフトウェア開発', 'プログラミング'],
    trends: { source: 'hackernews', category: 'technology', original_score: 342 },
  },
  {
    id: 'mock-2',
    slug: 'open-source-llm-beats-gpt4-benchmark',
    title_ja: 'オープンソースLLMがGPT-4をベンチマークで超える快挙',
    excerpt_ja: '新たなオープンソース大規模言語モデルが複数の標準ベンチマークでGPT-4を上回るスコアを記録。研究者たちはこの結果に注目しており、AI民主化の加速が期待されている。',
    published_at: new Date(Date.now() - 7200000).toISOString(),
    keywords: ['LLM', 'オープンソース', 'AI'],
    trends: { source: 'hackernews', category: 'science', original_score: 287 },
  },
  {
    id: 'mock-3',
    slug: 'rust-becomes-top-language-systems-2026',
    title_ja: 'Rustがシステムプログラミング言語のトップに：採用企業が急増',
    excerpt_ja: 'MicrosoftやGoogleがRust採用を本格化。C/C++からの移行が加速する中、メモリ安全性とパフォーマンスを両立できるRustへの注目度が世界的に高まっている。',
    published_at: new Date(Date.now() - 10800000).toISOString(),
    keywords: ['Rust', 'プログラミング言語', 'システム開発'],
    trends: { source: 'hackernews', category: 'technology', original_score: 198 },
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category;

  let articles: ArticleRow[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase
      .from('articles')
      .select(
        'id, slug, title_ja, excerpt_ja, published_at, keywords, trends!inner(source, category, original_score)'
      )
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(12);

    if (category) {
      query = query.eq('trends.category', category);
    }

    const { data } = await query;
    articles = (data as ArticleRow[]) || [];
  } catch {
    // Supabase 未設定時は空配列で表示
  }

  // 記事がない場合はモック記事を表示
  const displayArticles = articles.length === 0 ? MOCK_ARTICLES : articles;
  const isMock = articles.length === 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* ヒーローセクション */}
      <section className="px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">TrendJP</h1>
        <p className="text-blue-200 text-lg mb-8">海外バズを、今すぐ日本語で。</p>
        <StreakBadge />
      </section>

      {/* カテゴリフィルター */}
      <Suspense>
        <CategoryFilter />
      </Suspense>

      {/* モック表示バナー */}
      {isMock && (
        <div
          className="max-w-6xl mx-auto px-4 mb-4"
          aria-live="polite"
          aria-label="サンプル記事表示中のお知らせ"
        >
          <div
            className="backdrop-blur-sm bg-blue-900/40 border border-blue-400/30 rounded-xl px-4 py-3 text-blue-200 text-sm text-center shadow-lg"
          >
            現在サンプル記事を表示しています。APIが接続されると最新トレンドが自動表示されます。
          </div>
        </div>
      )}

      {/* トレンド記事グリッド */}
      <section
        className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="トレンド記事一覧"
      >
        {displayArticles.map((article) => (
          <TrendCard key={article.id} article={article} isMock={isMock} />
        ))}
      </section>
    </main>
  );
}

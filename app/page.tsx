import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import TrendCard from '@/components/TrendCard';
import CategoryFilter from '@/components/CategoryFilter';

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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category;

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

  let articles: ArticleRow[] = [];
  try {
    const { data } = await query;
    articles = (data as ArticleRow[]) || [];
  } catch {
    // Supabase 未設定時は空配列で表示
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* ヒーローセクション */}
      <section className="px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">TrendJP</h1>
        <p className="text-blue-200 text-lg mb-8">海外バズを、今すぐ日本語で。</p>
      </section>

      {/* カテゴリフィルター */}
      <Suspense>
        <CategoryFilter />
      </Suspense>

      {/* トレンド記事グリッド */}
      <section
        className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="トレンド記事一覧"
      >
        {articles.length === 0 ? (
          <p className="text-blue-200 col-span-3 text-center py-12">
            まだ記事がありません。しばらくお待ちください。
          </p>
        ) : (
          articles.map((article) => <TrendCard key={article.id} article={article} />)
        )}
      </section>
    </main>
  );
}

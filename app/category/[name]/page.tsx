import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import TrendCard from '@/components/TrendCard';

export const revalidate = 3600;

interface ArticleRow {
  id: string;
  slug: string;
  title_ja: string;
  excerpt_ja: string;
  published_at: string;
  keywords: string[];
  trends: { source: string; category: string; original_score: number };
}

const CATEGORY_NAMES: Record<string, string> = {
  technology: 'テクノロジー',
  gadget: 'ガジェット',
  business: 'ビジネス',
  entertainment: 'エンタメ',
  science: 'サイエンス',
  other: 'その他',
};

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_NAMES).map((name) => ({ name }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const label = CATEGORY_NAMES[name] || name;
  return {
    title: `${label}のトレンド | TrendJP`,
    description: `${label}カテゴリの最新グローバルトレンド記事一覧`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  const label = CATEGORY_NAMES[name] || name;

  let articles: ArticleRow[] = [];
  try {
    const { data } = await supabase
      .from('articles')
      .select(
        'id, slug, title_ja, excerpt_ja, published_at, keywords, trends!inner(source, category, original_score)'
      )
      .eq('published', true)
      .eq('trends.category', name)
      .order('published_at', { ascending: false })
      .limit(24);
    articles = (data as unknown as ArticleRow[]) || [];
  } catch {
    // Supabase 未設定時は空配列
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <section className="px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">{label}のトレンド</h1>
        <p className="text-blue-200">海外バズを、今すぐ日本語で。</p>
      </section>

      <section
        className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label={`${label}カテゴリの記事一覧`}
      >
        {articles.length === 0 ? (
          <p className="text-blue-200 col-span-3 text-center py-12">
            このカテゴリにはまだ記事がありません。
          </p>
        ) : (
          articles.map((article) => <TrendCard key={article.id} article={article} />)
        )}
      </section>
    </main>
  );
}

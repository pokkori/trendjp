'use client';
import Link from 'next/link';

interface TrendCardProps {
  article: {
    id: string;
    slug: string;
    title_ja: string;
    excerpt_ja: string;
    published_at: string;
    keywords: string[];
    trends: { source: string; category: string; original_score: number };
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  technology: '#3b82f6',
  gadget: '#8b5cf6',
  business: '#10b981',
  entertainment: '#f59e0b',
  science: '#06b6d4',
  other: '#6b7280',
};

export default function TrendCard({ article }: TrendCardProps) {
  const categoryColor = CATEGORY_COLORS[article.trends.category] || CATEGORY_COLORS.other;
  const sourceColor = article.trends.source === 'hackernews' ? '#f97316' : '#6b7280';

  return (
    <Link
      href={`/trends/${article.slug}`}
      aria-label={`${article.title_ja}の記事を読む`}
      className="block rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.15)',
        minHeight: '44px',
      }}
    >
      {/* バッジ行 */}
      <div className="flex gap-2 mb-3">
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full text-white"
          style={{ backgroundColor: categoryColor }}
        >
          {article.trends.category}
        </span>
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full text-white"
          style={{ backgroundColor: sourceColor }}
        >
          {article.trends.source === 'hackernews' ? 'HackerNews' : 'RSS'}
        </span>
      </div>

      {/* タイトル */}
      <h2 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2">
        {article.title_ja}
      </h2>

      {/* 抜粋 */}
      <p className="text-blue-200 text-sm leading-relaxed mb-4 line-clamp-3">
        {article.excerpt_ja}
      </p>

      {/* フッター */}
      <div className="flex justify-between items-center">
        <span className="text-blue-400 text-xs">
          {new Date(article.published_at).toLocaleDateString('ja-JP')}
        </span>
        <span className="text-blue-400 text-xs">
          スコア {article.trends.original_score}
        </span>
      </div>
    </Link>
  );
}

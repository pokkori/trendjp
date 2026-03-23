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
  isMock?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  technology: '#3b82f6',
  gadget: '#8b5cf6',
  business: '#10b981',
  entertainment: '#f59e0b',
  science: '#06b6d4',
  other: '#6b7280',
};

export default function TrendCard({ article, isMock }: TrendCardProps) {
  const categoryColor = CATEGORY_COLORS[article.trends.category] || CATEGORY_COLORS.other;
  const sourceColor = article.trends.source === 'hackernews' ? '#f97316' : '#6b7280';

  const articleUrl = `https://trendjp.vercel.app/trends/${article.slug}`;
  const xShareText = encodeURIComponent(`${article.title_ja} #TrendJP #テクノロジー`);
  const xShareUrl = `https://twitter.com/intent/tweet?text=${xShareText}&url=${encodeURIComponent(articleUrl)}`;

  return (
    <article
      className="rounded-2xl backdrop-blur-sm bg-white/[0.07] border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/[0.12]"
      aria-label={`記事: ${article.title_ja}`}
    >
      <Link
        href={isMock ? '#' : `/trends/${article.slug}`}
        aria-label={`${article.title_ja}の記事を読む`}
        className="block p-6"
      >
        {/* バッジ行 */}
        <div className="flex gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: categoryColor }}
            aria-label={`カテゴリ: ${article.trends.category}`}
          >
            {article.trends.category}
          </span>
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: sourceColor }}
            aria-label={`ソース: ${article.trends.source === 'hackernews' ? 'HackerNews' : 'RSS'}`}
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

      {/* Xシェアボタン */}
      <div className="px-6 pb-4">
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`「${article.title_ja}」をXでシェアする`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/80 text-xs font-medium transition-all duration-200 hover:text-white hover:bg-white/10"
          style={{ minHeight: '44px', minWidth: '44px' }}
          onClick={(e) => isMock && e.preventDefault()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          シェア
        </a>
      </div>
    </article>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import BookmarkButton from '@/components/BookmarkButton';

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

const CATEGORY_ICONS: Record<string, string> = {
  technology: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  gadget: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  business: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  science: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  entertainment: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  other: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14',
};

export default function TrendCard({ article, isMock }: TrendCardProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryColor = CATEGORY_COLORS[article.trends.category] || CATEGORY_COLORS.other;
  const sourceColor = article.trends.source === 'hackernews' ? '#f97316' : '#6b7280';
  const categoryIconPath = CATEGORY_ICONS[article.trends.category] || CATEGORY_ICONS.other;

  const articleUrl = `https://trendjp.vercel.app/trends/${article.slug}`;
  const xShareText = encodeURIComponent(`${article.title_ja} #TrendJP #テクノロジー`);
  const xShareUrl = `https://twitter.com/intent/tweet?text=${xShareText}&url=${encodeURIComponent(articleUrl)}`;

  const pubDate = new Date(article.published_at);
  const today = new Date();
  const isNew = pubDate.toDateString() === today.toDateString();

  const badges = (
    <div className="flex gap-2 mb-3 flex-wrap">
      {isNew && (
        <span
          className="text-xs font-bold px-2 py-1 rounded-full text-white animate-pulse"
          style={{ backgroundColor: '#ef4444' }}
          aria-label="今日公開の新着記事"
        >
          NEW
        </span>
      )}
      {article.trends.original_score >= 500 && (
        <span
          className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full text-white"
          style={{
            background: 'rgba(239,68,68,0.2)',
            border: '1px solid rgba(239,68,68,0.5)',
            backdropFilter: 'blur(8px)',
            color: '#fca5a5',
          }}
          aria-label={`ホット記事: スコア ${article.trends.original_score}`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C8.5 7 7 10 9 14c-1.5-1-2-2.5-2-4C4 13 3 16 5 19c1.5 2 4 3 7 3s5.5-1 7-3c2-3 1-6-2-9-1 2-2 3-3 3 2-4 0-7-2-11z" />
          </svg>
          HOT
        </span>
      )}
      {article.trends.original_score >= 200 && article.trends.original_score < 500 && (
        <span
          className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
          style={{
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.4)',
            backdropFilter: 'blur(8px)',
            color: '#fcd34d',
          }}
          aria-label={`急上昇中: スコア ${article.trends.original_score}`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          急上昇
        </span>
      )}
      <span
        className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-white"
        style={{ backgroundColor: categoryColor }}
        aria-label={`カテゴリ: ${article.trends.category}`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d={categoryIconPath} />
        </svg>
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
  );

  const footer = (
    <div className="flex justify-between items-center">
      <span className="text-blue-400 text-xs">
        {new Date(article.published_at).toLocaleDateString('ja-JP')}
      </span>
      <span className="text-blue-400 text-xs">
        スコア {article.trends.original_score}
      </span>
    </div>
  );

  if (isMock) {
    return (
      <article
        className="rounded-2xl backdrop-blur-sm bg-white/[0.07] border border-white/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-white/[0.12]"
        aria-label={`記事: ${article.title_ja}`}
      >
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={expanded ? `${article.title_ja}の詳細を閉じる` : `${article.title_ja}の詳細を開く`}
          className="block w-full text-left p-6"
        >
          {badges}
          <h2 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2">
            {article.title_ja}
          </h2>
          <p className={`text-blue-200 text-sm leading-relaxed mb-4 ${expanded ? '' : 'line-clamp-3'}`}>
            {article.excerpt_ja}
          </p>

          {expanded && (
            <div
              className="mt-2 mb-4 p-4 rounded-xl text-sm text-blue-100 leading-relaxed"
              style={{
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            >
              {article.excerpt_ja}
              <p className="mt-4 text-blue-300 text-xs font-semibold">
                Supabase接続で全記事が読めます
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            {footer}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className={`text-blue-400 transition-transform duration-200 ml-2 ${expanded ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <div className="px-6 pb-4 flex items-center gap-1">
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`「${article.title_ja}」をXでシェアする`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/80 text-xs font-medium transition-all duration-200 hover:text-white hover:bg-white/10"
            style={{ minHeight: '44px', minWidth: '44px' }}
            onClick={(e) => e.preventDefault()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            シェア
          </a>
          <BookmarkButton slug={article.slug} title={article.title_ja} />
        </div>
      </article>
    );
  }

  return (
    <article
      className="rounded-2xl backdrop-blur-sm bg-white/[0.07] border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/[0.12]"
      aria-label={`記事: ${article.title_ja}`}
    >
      <Link
        href={`/trends/${article.slug}`}
        aria-label={`${article.title_ja}の記事を読む`}
        className="block p-6"
      >
        {badges}
        <h2 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2">
          {article.title_ja}
        </h2>
        <p className="text-blue-200 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt_ja}
        </p>
        {footer}
      </Link>

      <div className="px-6 pb-4 flex items-center gap-1">
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`「${article.title_ja}」をXでシェアする`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/80 text-xs font-medium transition-all duration-200 hover:text-white hover:bg-white/10"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          シェア
        </a>
        <BookmarkButton slug={article.slug} title={article.title_ja} />
      </div>
    </article>
  );
}

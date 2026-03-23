'use client';
import { useState, useEffect } from 'react';

interface BookmarkButtonProps {
  slug: string;
  title: string;
}

export default function BookmarkButton({ slug, title }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('trendjp_bookmarks') || '[]');
    setBookmarked(bookmarks.includes(slug));
  }, [slug]);

  const toggle = () => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('trendjp_bookmarks') || '[]');
    const next = bookmarked
      ? bookmarks.filter((s) => s !== slug)
      : [...bookmarks, slug];
    localStorage.setItem('trendjp_bookmarks', JSON.stringify(next));
    setBookmarked(!bookmarked);
  };

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? `「${title}」のブックマークを解除する` : `「${title}」をブックマークする`}
      aria-pressed={bookmarked}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/80 text-xs font-medium transition-all duration-200 hover:text-white hover:bg-white/10"
      style={{ minHeight: '44px', minWidth: '44px' }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? '#fbbf24' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
      </svg>
      {bookmarked ? '保存済' : '保存'}
    </button>
  );
}

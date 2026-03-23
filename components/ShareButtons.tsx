'use client';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://trendjp.vercel.app/trends/${slug}`;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // クリップボードアクセス失敗は無視
    }
  };

  return (
    <section className="mt-8 flex gap-3 flex-wrap" aria-label="シェアボタン">
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Xでこの記事をシェアする"
        className="flex items-center gap-2 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-80"
        style={{
          backgroundColor: '#000000',
          minHeight: '44px',
          fontSize: '14px',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Xでシェア
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINEでこの記事をシェアする"
        className="flex items-center gap-2 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-80"
        style={{ backgroundColor: '#00B900', minHeight: '44px', fontSize: '14px' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
        LINE
      </a>
      <button
        onClick={handleCopy}
        aria-label="この記事のURLをクリップボードにコピーする"
        className="flex items-center gap-2 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-80"
        style={{
          backgroundColor: copied ? '#10b981' : '#334155',
          minHeight: '44px',
          fontSize: '14px',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
        {copied ? 'コピー完了!' : 'URLコピー'}
      </button>
    </section>
  );
}

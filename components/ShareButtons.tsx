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

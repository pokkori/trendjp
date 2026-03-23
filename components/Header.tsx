import Link from 'next/link';

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
      style={{
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-white font-bold text-xl"
        aria-label="TrendJP トップページへ"
      >
        <span
          className="inline-block w-8 h-8 rounded-lg"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          aria-hidden="true"
        />
        TrendJP
      </Link>
      <nav className="flex items-center gap-4" aria-label="グローバルナビゲーション">
        <Link
          href="/about"
          className="text-blue-200 hover:text-white text-sm transition-colors"
          aria-label="TrendJPについて"
        >
          About
        </Link>
      </nav>
    </header>
  );
}

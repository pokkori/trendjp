import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="px-4 py-8 mt-16 text-center"
      style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
    >
      <p className="text-blue-300 text-sm mb-3">
        本サービスはAmazonアソシエイトプログラム参加者です。
      </p>
      <nav className="flex justify-center gap-6 mb-4" aria-label="フッターナビゲーション">
        <Link
          href="/about"
          className="text-blue-400 hover:text-white text-sm transition-colors"
          aria-label="About・免責事項"
        >
          About
        </Link>
      </nav>
      <p className="text-blue-500 text-xs">
        &copy; {new Date().getFullYear()} TrendJP. All rights reserved.
      </p>
    </footer>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-blue-200 text-lg mb-8">ページが見つかりませんでした。</p>
        <Link
          href="/"
          aria-label="トップページに戻る"
          className="inline-block px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-80"
          style={{ backgroundColor: '#3b82f6', minHeight: '44px', fontSize: '16px' }}
        >
          トップページへ戻る
        </Link>
      </div>
    </main>
  );
}

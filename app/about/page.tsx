import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - TrendJP',
  description: 'TrendJPのサービス概要・免責事項・アフィリエイト開示',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-12" aria-label="TrendJPについて">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">TrendJPについて</h1>

        <section
          className="mb-8 p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <h2 className="text-xl font-bold text-white mb-4">サービス概要</h2>
          <p className="text-blue-200 leading-relaxed">
            TrendJPは、HackerNews・海外RSSフィードのバズ記事を自動検知し、
            AI（Claude Haiku）が日本語解説記事として自動公開するサービスです。
            最新のグローバルトレンドを毎時更新でお届けします。
          </p>
        </section>

        <section
          className="mb-8 p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <h2 className="text-xl font-bold text-white mb-4">データ取得元</h2>
          <ul className="text-blue-200 leading-relaxed space-y-2">
            <li>HackerNews（Algolia API経由・無料・認証不要）</li>
            <li>TechCrunch・Wired・The Verge 等のRSSフィード（公開フィード）</li>
          </ul>
          <p className="text-blue-300 text-sm mt-4">
            各記事には元記事URLを明示しており、AIが独自の解説コンテンツを生成しています。
          </p>
        </section>

        <section
          className="mb-8 p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <h2 className="text-xl font-bold text-white mb-4">免責事項</h2>
          <p className="text-blue-200 leading-relaxed">
            本サービスの情報は投資・法律・医療アドバイスではありません。
            掲載情報の正確性・完全性・最新性について保証するものではありません。
            本サービスの利用により生じた損害について、当サービスは一切責任を負いません。
          </p>
        </section>

        <section
          className="mb-8 p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <h2 className="text-xl font-bold text-white mb-4">アフィリエイト開示</h2>
          <p className="text-blue-200 leading-relaxed">
            本サービスはAmazonアソシエイトプログラム参加者です。
            本ページに掲載のリンクを経由して商品をご購入いただいた場合、
            当サービスは紹介料を受け取る場合があります。
            これによりご購入者様の価格は変わりません。
          </p>
        </section>

        <section
          className="mb-8 p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <h2 className="text-xl font-bold text-white mb-4">お問い合わせ</h2>
          <p className="text-blue-200 leading-relaxed">
            サービスに関するお問い合わせは、GitHubリポジトリのIssueよりお願いします。
          </p>
        </section>
      </article>
    </main>
  );
}

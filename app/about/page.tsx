import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'このサイトについて | TrendJP',
  description:
    'TrendJPのサービス概要・運営方針・コンテンツ選定基準・AI生成コンテンツの使用方針について説明します。',
  openGraph: {
    title: 'このサイトについて | TrendJP',
    description: 'TrendJPの運営方針・コンテンツ選定基準・AI生成コンテンツの透明性方針',
  },
};

const glassCard = {
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.15)',
};

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-12"
      aria-label="TrendJPについて"
    >
      <article className="max-w-2xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">このサイトについて</h1>
          <p className="text-blue-300 text-sm">
            TrendJP の運営方針・コンテンツ品質基準・透明性方針
          </p>
        </header>

        {/* サービス概要 */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={glassCard}
          aria-labelledby="section-overview"
        >
          <h2 id="section-overview" className="text-xl font-bold text-white mb-4">
            サービス概要
          </h2>
          <p className="text-blue-200 leading-relaxed mb-3">
            TrendJPは、HackerNews・海外RSSフィードのバズ記事を自動検知し、
            AI（Anthropic Claude Haiku）が日本語解説記事として自動公開するメディアサービスです。
            最新のグローバルトレンドを毎時更新でお届けします。
          </p>
          <p className="text-blue-300 text-sm leading-relaxed">
            開設：2026年 / 運営：個人メディア / 更新頻度：毎時自動更新
          </p>
        </section>

        {/* 運営方針 */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={glassCard}
          aria-labelledby="section-policy"
        >
          <h2 id="section-policy" className="text-xl font-bold text-white mb-4">
            運営方針
          </h2>
          <ul className="text-blue-200 leading-relaxed space-y-3">
            <li className="flex gap-3">
              <span
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: '#3b82f6' }}
                aria-hidden="true"
              >
                1
              </span>
              <span>
                <strong className="text-white">情報の正確性優先:</strong>{' '}
                元記事URLを必ず明示し、AIが独自の解説コンテンツを生成しています。誇大表現・虚偽情報は掲載しません。
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: '#10b981' }}
                aria-hidden="true"
              >
                2
              </span>
              <span>
                <strong className="text-white">透明性の確保:</strong>{' '}
                AI生成コンテンツである旨を全記事末尾に明示しています。読者が情報の出自を判断できるよう努めます。
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: '#8b5cf6' }}
                aria-hidden="true"
              >
                3
              </span>
              <span>
                <strong className="text-white">収益の開示:</strong>{' '}
                Amazonアソシエイト・プログラミングスクールのアフィリエイト広告を掲載しています。「PR / 広告」と明記しています。
              </span>
            </li>
          </ul>
        </section>

        {/* コンテンツ選定基準 */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={glassCard}
          aria-labelledby="section-criteria"
        >
          <h2 id="section-criteria" className="text-xl font-bold text-white mb-4">
            コンテンツ選定基準
          </h2>
          <p className="text-blue-200 leading-relaxed mb-4">
            以下の基準を満たした記事のみを自動選定・掲載しています。
          </p>
          <div className="space-y-3">
            {[
              {
                label: 'スコア基準',
                desc: 'HackerNews スコア 150点以上の記事のみを対象とします。高い注目度を獲得したコンテンツを優先します。',
              },
              {
                label: 'カテゴリ基準',
                desc: 'テクノロジー・ガジェット・ビジネス・サイエンス・エンターテインメントを対象とします。政治・宗教・差別的コンテンツは除外します。',
              },
              {
                label: '品質基準',
                desc: 'URLが有効で、タイトルと本文が存在する記事のみを処理します。スパム・誘導記事は自動除外します。',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-blue-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI生成コンテンツの明示（E-E-A-T対応） */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={{
            ...glassCard,
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.3)',
          }}
          aria-labelledby="section-ai-disclosure"
        >
          <h2 id="section-ai-disclosure" className="text-xl font-bold text-white mb-4">
            AI生成コンテンツについて
          </h2>
          <p className="text-blue-200 leading-relaxed mb-3">
            本サービスの記事本文は、Anthropic社の大規模言語モデル「Claude Haiku」によって自動生成されています。
            Google のE-E-A-T（Experience・Expertise・Authoritativeness・Trustworthiness）ガイドラインに基づき、以下の方針を遵守しています。
          </p>
          <ul className="text-blue-200 text-sm leading-relaxed space-y-2">
            <li>全記事の末尾に「※この記事はAIが生成しています」と明記</li>
            <li>元記事URLを必ず掲載し、一次情報へのアクセスを保証</li>
            <li>事実の捏造・誇大表現を行わないようプロンプトで制御</li>
            <li>医療・法律・金融分野の助言は行わない方針</li>
          </ul>
          <p className="text-blue-400 text-xs mt-4">
            ※ AIの限界により誤情報が含まれる場合があります。重要な判断は必ず元記事・専門家にご確認ください。
          </p>
        </section>

        {/* データ取得元 */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={glassCard}
          aria-labelledby="section-data-sources"
        >
          <h2 id="section-data-sources" className="text-xl font-bold text-white mb-4">
            データ取得元
          </h2>
          <ul className="text-blue-200 leading-relaxed space-y-2">
            <li>HackerNews（Algolia API経由・無料・認証不要）</li>
            <li>TechCrunch・Wired・The Verge 等のRSSフィード（公開フィード）</li>
          </ul>
          <p className="text-blue-300 text-sm mt-4">
            各記事には元記事URLを明示しており、AIが独自の解説コンテンツを生成しています。
            Reddit API は商用利用に高額費用が必要なため、使用していません。
          </p>
        </section>

        {/* 免責事項 */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={glassCard}
          aria-labelledby="section-disclaimer"
        >
          <h2 id="section-disclaimer" className="text-xl font-bold text-white mb-4">
            免責事項
          </h2>
          <p className="text-blue-200 leading-relaxed">
            本サービスの情報は投資・法律・医療アドバイスではありません。
            掲載情報の正確性・完全性・最新性について保証するものではありません。
            本サービスの利用により生じた損害について、当サービスは一切責任を負いません。
          </p>
        </section>

        {/* アフィリエイト開示 */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={glassCard}
          aria-labelledby="section-affiliate"
        >
          <h2 id="section-affiliate" className="text-xl font-bold text-white mb-4">
            アフィリエイト開示
          </h2>
          <p className="text-blue-200 leading-relaxed">
            本サービスはAmazonアソシエイトプログラム参加者です。
            本ページに掲載のリンクを経由して商品をご購入いただいた場合、
            当サービスは紹介料を受け取る場合があります。
            これによりご購入者様の価格は変わりません。
            広告リンクには「PR / 広告」または
            <code className="text-blue-300 text-xs mx-1">rel="sponsored"</code>
            を明記しています。
          </p>
        </section>

        {/* お問い合わせ */}
        <section
          className="mb-6 p-6 rounded-2xl"
          style={glassCard}
          aria-labelledby="section-contact"
        >
          <h2 id="section-contact" className="text-xl font-bold text-white mb-4">
            お問い合わせ
          </h2>
          <p className="text-blue-200 leading-relaxed">
            サービスに関するお問い合わせは、GitHubリポジトリのIssueよりお願いします。
            著作権・コンテンツ削除依頼は迅速に対応します。
          </p>
        </section>
      </article>
    </main>
  );
}

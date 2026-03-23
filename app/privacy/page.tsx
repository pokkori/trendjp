export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 px-4"
      aria-label="プライバシーポリシー"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">プライバシーポリシー</h1>
        <div className="space-y-6">
          <section
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            aria-labelledby="privacy-section-1"
          >
            <h2 id="privacy-section-1" className="text-xl font-semibold text-white mb-3">1. 収集する情報</h2>
            <p className="text-blue-200">本サービスは、Google Analytics等を利用してアクセス情報を収集します。個人を特定する情報は収集しません。</p>
          </section>
          <section
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            aria-labelledby="privacy-section-2"
          >
            <h2 id="privacy-section-2" className="text-xl font-semibold text-white mb-3">2. 利用目的</h2>
            <p className="text-blue-200">収集した情報はサービス改善・統計分析のためのみに使用します。第三者への提供は行いません（法的義務を除く）。</p>
          </section>
          <section
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            aria-labelledby="privacy-section-3"
          >
            <h2 id="privacy-section-3" className="text-xl font-semibold text-white mb-3">3. Cookieについて</h2>
            <p className="text-blue-200">本サービスはCookieを使用します。ブラウザの設定からCookieを無効にできますが、一部機能が利用できなくなる場合があります。</p>
          </section>
          <section
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            aria-labelledby="privacy-section-4"
          >
            <h2 id="privacy-section-4" className="text-xl font-semibold text-white mb-3">4. 広告について</h2>
            <p className="text-blue-200">本サービスはGoogle AdSense等の広告サービスを使用しています。これらのサービスはCookieを使用して関連性の高い広告を表示します。</p>
          </section>
          <section
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            aria-labelledby="privacy-section-5"
          >
            <h2 id="privacy-section-5" className="text-xl font-semibold text-white mb-3">5. お問い合わせ</h2>
            <p className="text-blue-200">プライバシーに関するお問い合わせは、各種SNSのDMよりご連絡ください。</p>
          </section>
          <section
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            aria-labelledby="privacy-section-6"
          >
            <h2 id="privacy-section-6" className="text-xl font-semibold text-white mb-3">6. 改訂</h2>
            <p className="text-blue-200">本ポリシーは予告なく改訂する場合があります。最終更新: 2026年3月</p>
          </section>
        </div>
      </div>
    </main>
  );
}

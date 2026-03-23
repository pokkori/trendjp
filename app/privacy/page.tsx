export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">プライバシーポリシー</h1>
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. 収集する情報</h2>
            <p>本サービスは、Google Analytics等を利用してアクセス情報を収集します。個人を特定する情報は収集しません。</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. 利用目的</h2>
            <p>収集した情報はサービス改善・統計分析のためのみに使用します。第三者への提供は行いません（法的義務を除く）。</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Cookieについて</h2>
            <p>本サービスはCookieを使用します。ブラウザの設定からCookieを無効にできますが、一部機能が利用できなくなる場合があります。</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. 広告について</h2>
            <p>本サービスはGoogle AdSense等の広告サービスを使用しています。これらのサービスはCookieを使用して関連性の高い広告を表示します。</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. お問い合わせ</h2>
            <p>プライバシーに関するお問い合わせは、各種SNSのDMよりご連絡ください。</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. 改訂</h2>
            <p>本ポリシーは予告なく改訂する場合があります。最終更新: 2026年3月</p>
          </section>
        </div>
      </div>
    </div>
  );
}

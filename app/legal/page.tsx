export default function LegalPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 px-4"
      aria-label="特定商取引法に基づく表記"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white" id="legal-title">特定商取引法に基づく表記</h1>
        <section
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          aria-labelledby="legal-title"
        >
          <table className="w-full border-collapse">
            <tbody>
              {[
                ["サービス名", "TrendJP"],
                ["運営者", "個人事業主（個人運営）"],
                ["所在地", "請求があれば開示します"],
                ["電話番号", "請求があれば開示します"],
                ["メールアドレス", "contact@trendjp.vercel.app"],
                ["サービス内容", "AI生成日本語トレンドニュース閲覧サービス"],
                ["提供価格", "無料（広告収益モデル）"],
                ["支払方法", "不要（無料サービス）"],
                ["サービス提供時期", "会員登録不要・即時利用可能"],
                ["返品・キャンセル", "デジタルサービスのため返品不可"],
              ].map(([key, val]) => (
                <tr key={key} className="border-b border-white/10">
                  <td className="py-3 pr-4 font-semibold text-blue-200 w-1/3">{key}</td>
                  <td className="py-3 text-blue-100">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

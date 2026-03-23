export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">特定商取引法に基づく表記</h1>
        <div className="space-y-4 text-gray-300">
          <table className="w-full border-collapse">
            <tbody>
              {[
                ["サービス名", "TrendJP"],
                ["運営者", "個人運営"],
                ["所在地", "請求があれば開示します"],
                ["電話番号", "請求があれば開示します"],
                ["メールアドレス", "各種SNSのDMよりお問い合わせください"],
                ["サービス内容", "AI生成日本語トレンドニュース閲覧サービス"],
                ["提供価格", "無料（広告収益モデル）"],
                ["支払方法", "不要（無料サービス）"],
                ["サービス提供時期", "会員登録不要・即時利用可能"],
                ["返品・キャンセル", "デジタルサービスのため返品不可"],
              ].map(([key, val]) => (
                <tr key={key} className="border-b border-gray-800">
                  <td className="py-3 pr-4 font-semibold text-gray-400 w-1/3">{key}</td>
                  <td className="py-3">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

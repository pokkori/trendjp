import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import TrendCard from '@/components/TrendCard';
import CategoryFilter from '@/components/CategoryFilter';
import StreakBadge from '@/components/StreakBadge';
import StatsCounter from '@/components/StatsCounter';
import NewsletterSection from '@/components/NewsletterSection';

export const revalidate = 3600; // ISR: 1時間ごとに再生成

interface ArticleRow {
  id: string;
  slug: string;
  title_ja: string;
  excerpt_ja: string;
  published_at: string;
  keywords: string[];
  trends: { source: string; category: string; original_score: number };
}

const MOCK_ARTICLES: ArticleRow[] = [
  {
    id: 'mock-1',
    slug: 'ai-revolutionizes-software-development-2026',
    title_ja: 'AIがソフトウェア開発を革命的に変える：2026年の最前線',
    excerpt_ja: 'Hacker Newsで話題沸騰中。AIコーディングアシスタントがエンジニアの生産性を3倍に向上させるという調査結果が公開された。特にコードレビューと自動テスト生成の分野で顕著な効果が報告されている。',
    published_at: new Date(Date.now() - 3600000).toISOString(),
    keywords: ['AI', 'ソフトウェア開発', 'プログラミング'],
    trends: { source: 'hackernews', category: 'technology', original_score: 342 },
  },
  {
    id: 'mock-2',
    slug: 'open-source-llm-beats-gpt4-benchmark',
    title_ja: 'オープンソースLLMがGPT-4をベンチマークで超える快挙',
    excerpt_ja: '新たなオープンソース大規模言語モデルが複数の標準ベンチマークでGPT-4を上回るスコアを記録。研究者たちはこの結果に注目しており、AI民主化の加速が期待されている。',
    published_at: new Date(Date.now() - 7200000).toISOString(),
    keywords: ['LLM', 'オープンソース', 'AI'],
    trends: { source: 'hackernews', category: 'science', original_score: 287 },
  },
  {
    id: 'mock-3',
    slug: 'rust-becomes-top-language-systems-2026',
    title_ja: 'Rustがシステムプログラミング言語のトップに：採用企業が急増',
    excerpt_ja: 'MicrosoftやGoogleがRust採用を本格化。C/C++からの移行が加速する中、メモリ安全性とパフォーマンスを両立できるRustへの注目度が世界的に高まっている。',
    published_at: new Date(Date.now() - 10800000).toISOString(),
    keywords: ['Rust', 'プログラミング言語', 'システム開発'],
    trends: { source: 'hackernews', category: 'technology', original_score: 198 },
  },
  {
    id: 'mock-4',
    slug: 'ai-agent-earns-5m-yen-monthly-new-method',
    title_ja: 'AIエージェントが月収500万円を稼ぐ新手法：Anthropic Claude API活用術',
    excerpt_ja: 'Anthropic Claude APIを使った自律エージェントが、受注から納品まで完全自動化したビジネスモデルで月収500万円を達成。海外フリーランサーの間で急速に広まっており、具体的な実装手法が公開された。',
    published_at: new Date(Date.now() - 14400000).toISOString(),
    keywords: ['AIエージェント', 'Claude', '副業'],
    trends: { source: 'hackernews', category: 'business', original_score: 421 },
  },
  {
    id: 'mock-5',
    slug: 'nocode-tools-top10-2025',
    title_ja: '2025年最注目のノーコードツール10選：Lovable・Bolt・v0の実力比較',
    excerpt_ja: 'Lovable・Bolt・v0など新世代ノーコードツールが従来の開発フローを一変させつつある。プロンプト一つでWebアプリが完成するレベルに達しており、非エンジニアによる起業事例が急増している。',
    published_at: new Date(Date.now() - 18000000).toISOString(),
    keywords: ['ノーコード', 'Lovable', 'v0'],
    trends: { source: 'hackernews', category: 'technology', original_score: 356 },
  },
  {
    id: 'mock-6',
    slug: 'spacex-starship-mars-mission-timeline',
    title_ja: 'SpaceXのStarship火星ミッション：2028年有人着陸の現実味',
    excerpt_ja: 'イーロン・マスクが2028年有人火星着陸計画の詳細を発表。Starshipの第7回テスト飛行が成功し、技術的マイルストーンを次々と達成。NASA契約の動向と併せて世界中で注目を集めている。',
    published_at: new Date(Date.now() - 21600000).toISOString(),
    keywords: ['SpaceX', 'Starship', '宇宙開発'],
    trends: { source: 'hackernews', category: 'science', original_score: 512 },
  },
  {
    id: 'mock-7',
    slug: 'apple-vision-pro-killer-app-discovered',
    title_ja: 'Apple Vision Proのキラーアプリ発見：医療現場での活用事例が急増',
    excerpt_ja: '外科手術支援や医療研修など、医療分野でのApple Vision Pro活用が世界各地で報告されている。従来のVRデバイスと比較して精度・操作性が格段に優れており、医療機器としての認可取得を目指す動きも出てきた。',
    published_at: new Date(Date.now() - 25200000).toISOString(),
    keywords: ['Apple Vision Pro', 'XR', '医療'],
    trends: { source: 'hackernews', category: 'gadget', original_score: 289 },
  },
  {
    id: 'mock-8',
    slug: 'youtube-shorts-monetization-new-strategy',
    title_ja: 'YouTube Shortsで月収100万円：海外クリエイターが明かす新戦略',
    excerpt_ja: 'YouTube Shortsの収益化プログラム改定後、月収100万円超えのクリエイターが急増。特に「海外バズコンテンツの日本語解説」というフォーマットが日本市場で高いCPMを記録しており、参入障壁が低い点も注目されている。',
    published_at: new Date(Date.now() - 28800000).toISOString(),
    keywords: ['YouTube', 'Shorts', 'クリエイター'],
    trends: { source: 'hackernews', category: 'entertainment', original_score: 378 },
  },
  {
    id: 'mock-9',
    slug: 'quantum-computing-breaks-rsa-encryption',
    title_ja: '量子コンピュータがRSA暗号を突破：セキュリティ業界に激震',
    excerpt_ja: 'Googleの量子コンピュータチームが2048ビットRSA暗号の解読に成功したと発表。現行インターネットインフラの根幹を担う暗号方式への影響が甚大であり、ポスト量子暗号への移行が世界規模で急務となっている。',
    published_at: new Date(Date.now() - 32400000).toISOString(),
    keywords: ['量子コンピュータ', 'セキュリティ', '暗号'],
    trends: { source: 'hackernews', category: 'science', original_score: 634 },
  },
  {
    id: 'mock-10',
    slug: 'remote-work-comeback-silicon-valley-2026',
    title_ja: 'リモートワーク復活：シリコンバレー主要企業が方針転換を発表',
    excerpt_ja: 'AppleやMeta、Amazonがオフィス回帰方針を撤回し、完全リモートを再許可する動きが相次いでいる。採用競争の激化と優秀な人材の流出が主な要因とされており、日本企業の働き方改革にも影響を与えそうだ。',
    published_at: new Date(Date.now() - 36000000).toISOString(),
    keywords: ['リモートワーク', '働き方', 'シリコンバレー'],
    trends: { source: 'hackernews', category: 'business', original_score: 267 },
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category;

  let articles: ArticleRow[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase
      .from('articles')
      .select(
        'id, slug, title_ja, excerpt_ja, published_at, keywords, trends!inner(source, category, original_score)'
      )
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(12);

    if (category) {
      query = query.eq('trends.category', category);
    }

    const { data } = await query;
    articles = (data as ArticleRow[]) || [];
  } catch {
    // Supabase 未設定時は空配列で表示
  }

  // 記事がない場合はモック記事を表示
  const displayArticles = articles.length === 0 ? MOCK_ARTICLES : articles;
  const isMock = articles.length === 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* ヒーローセクション */}
      <section className="px-4 py-14 text-center" aria-label="ヒーローセクション">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TrendJP</h1>
        <p className="text-blue-200 text-lg md:text-xl mb-6">海外バズを、今すぐ日本語で。</p>
        <p className="text-blue-300 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
          Hacker News・Redditのバズトレンドを自動検知し、AIが即時日本語解説。
          先行者利益を毎朝6時にお届けします。
        </p>
        <StreakBadge />
        {/* カウントアップ統計 */}
        <Suspense fallback={null}>
          <StatsCounter />
        </Suspense>
      </section>

      {/* ニュースレター登録 */}
      <NewsletterSection />

      {/* カテゴリフィルター */}
      <Suspense>
        <CategoryFilter />
      </Suspense>

      {/* モック表示バナー */}
      {isMock && (
        <div
          className="max-w-6xl mx-auto px-4 mb-4"
          aria-live="polite"
          aria-label="サンプル記事表示中のお知らせ"
        >
          <div
            className="backdrop-blur-sm bg-blue-900/40 border border-blue-400/30 rounded-xl px-4 py-3 text-blue-200 text-sm text-center shadow-lg"
          >
            現在サンプル記事を表示しています。APIが接続されると最新トレンドが自動表示されます。
          </div>
        </div>
      )}

      {/* トレンド記事グリッド */}
      <section
        className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="トレンド記事一覧"
      >
        {displayArticles.map((article) => (
          <TrendCard key={article.id} article={article} isMock={isMock} />
        ))}
      </section>

      {/* 収益化仕組み説明セクション */}
      <section
        className="max-w-5xl mx-auto px-4 pb-20"
        aria-label="TrendJPの仕組みと収益モデル"
      >
        <div
          className="rounded-2xl p-8 backdrop-blur-md"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            TrendJPの仕組み
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                step: '1',
                label: 'バズ検知',
                desc: 'HN・Redditから高スコア記事を自動取得',
                color: '#3b82f6',
              },
              {
                step: '2',
                label: 'AI翻訳',
                desc: 'Claudeが要点を抽出し日本語に意訳',
                color: '#8b5cf6',
              },
              {
                step: '3',
                label: '記事公開',
                desc: 'SEO最適化済みの記事を毎朝6時自動配信',
                color: '#10b981',
              },
              {
                step: '4',
                label: '収益化',
                desc: 'AdSense + Amazonアフィリエイトで継続収益',
                color: '#f59e0b',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center p-4 rounded-xl backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <p className="text-white font-semibold mb-1">{item.label}</p>
                <p className="text-blue-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* アフィリエイト収益シミュレーション */}
          <div
            className="rounded-xl p-6 backdrop-blur-sm"
            style={{
              background: 'rgba(251,191,36,0.07)',
              border: '1px solid rgba(251,191,36,0.25)',
            }}
            aria-label="アフィリエイト収益シミュレーション"
          >
            <h3 className="text-yellow-300 font-bold text-lg mb-4">収益シミュレーション</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-blue-200 font-semibold">月間PV</th>
                    <th className="text-right py-2 pr-4 text-blue-200 font-semibold">AdSense収益</th>
                    <th className="text-right py-2 text-blue-200 font-semibold">アフィリエイト収益</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pv: '1,000 PV', adsense: '約 ¥1,500', affiliate: '約 ¥3,000' },
                    { pv: '10,000 PV', adsense: '約 ¥15,000', affiliate: '約 ¥30,000' },
                    { pv: '100,000 PV', adsense: '約 ¥150,000', affiliate: '約 ¥300,000' },
                  ].map((row) => (
                    <tr key={row.pv} className="border-b border-white/10">
                      <td className="py-2 pr-4 text-white font-medium">{row.pv}</td>
                      <td className="py-2 pr-4 text-green-300 text-right">{row.adsense}</td>
                      <td className="py-2 text-yellow-300 text-right">{row.affiliate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-blue-400 text-xs mt-3">
              ※ 想定値です。実際の収益はジャンル・CTR・単価により異なります。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

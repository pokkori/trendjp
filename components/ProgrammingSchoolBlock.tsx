// PR / 広告 - プログラミングスクールアフィリエイトブロック
export default function ProgrammingSchoolBlock() {
  const schools = [
    {
      name: 'テックキャンプ',
      description: '未経験からエンジニア転職を目指すなら国内最大級のテックキャンプ。転職保証付き。',
      url: 'https://tech-camp.in/?ref=trendjp',
      badge: '転職保証',
      badgeColor: '#10b981',
    },
    {
      name: 'RUNTEQ',
      description: 'Webエンジニア特化のRUNTEQ。実践的なカリキュラムでポートフォリオを構築。',
      url: 'https://runteq.jp/?ref=trendjp',
      badge: '実践特化',
      badgeColor: '#8b5cf6',
    },
  ];

  return (
    <aside
      className="my-10 p-6 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
      aria-label="スポンサー広告"
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.4)' }}
        >
          PR / 広告
        </span>
        <span className="text-blue-300 text-sm">プログラミングスクール</span>
      </div>

      <p className="text-white font-semibold mb-4 text-sm leading-relaxed">
        テクノロジートレンドを追うなら、エンジニアスキルが武器になります。
        未経験からでも始められるプログラミングスクールで、あなたのキャリアを変えましょう。
      </p>

      <div className="flex flex-col gap-3">
        {schools.map((school) => (
          <a
            key={school.name}
            href={school.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={`${school.name}の詳細を確認する（PR）`}
            className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              minHeight: '44px',
            }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold text-sm">{school.name}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: school.badgeColor }}
                >
                  {school.badge}
                </span>
              </div>
              <p className="text-blue-300 text-xs leading-relaxed">{school.description}</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-400 mt-1 flex-shrink-0"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>

      <p className="text-blue-500 text-xs mt-3">
        ※ 本リンクはアフィリエイトリンクです。
      </p>
    </aside>
  );
}

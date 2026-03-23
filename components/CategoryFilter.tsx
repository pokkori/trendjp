'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { key: '', label: 'すべて' },
  { key: 'technology', label: 'テクノロジー' },
  { key: 'gadget', label: 'ガジェット' },
  { key: 'business', label: 'ビジネス' },
  { key: 'entertainment', label: 'エンタメ' },
  { key: 'science', label: 'サイエンス' },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('category') || '';

  const handleClick = (key: string) => {
    if (key) {
      router.push(`/?category=${key}`);
    } else {
      router.push('/');
    }
  };

  return (
    <nav
      className="max-w-6xl mx-auto px-4 pb-6 flex flex-wrap gap-2"
      aria-label="カテゴリフィルター"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => handleClick(cat.key)}
          aria-pressed={current === cat.key}
          aria-label={`${cat.label}カテゴリでフィルタリング`}
          className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
          style={{
            minHeight: '44px',
            backgroundColor: current === cat.key ? '#3b82f6' : 'rgba(255,255,255,0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}

import { AffiliateLink } from '@/lib/affiliate';

interface AffiliateBlockProps {
  links: AffiliateLink[];
}

export default function AffiliateBlock({ links }: AffiliateBlockProps) {
  if (!links || links.length === 0) return null;

  return (
    <section
      className="mt-8 p-6 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
      aria-label="関連商品"
    >
      <h3 className="text-white font-bold text-lg mb-4">関連商品</h3>
      <div className="flex flex-col gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.text}をAmazonで確認する`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: '#f97316',
              minHeight: '44px',
              fontSize: '14px',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11 0zM3 19c0 1.1.9 2 2 2s2-.9 2-2V11c0-1.1-.9-2-2-2s-2 .9-2 2v8z" />
            </svg>
            {link.text}
          </a>
        ))}
      </div>
      <p className="text-blue-300 text-xs mt-3">
        ※ 本サービスはAmazonアソシエイトプログラム参加者です。
      </p>
    </section>
  );
}

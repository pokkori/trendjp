'use client';

export function AdBanner({ slot }: { slot: 'content' | 'sidebar' }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

  if (!clientId || !slotId) {
    return (
      <div
        className="w-full h-24 rounded-xl flex items-center justify-center text-white/30 text-sm"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px dashed rgba(255,255,255,0.1)',
        }}
        aria-label={`広告スペース（${slot}）`}
      >
        広告スペース
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
      aria-label={`広告（${slot}）`}
    />
  );
}

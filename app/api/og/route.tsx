import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'TrendJP';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
          padding: '60px',
        }}
      >
        {/* ロゴ */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              marginRight: '20px',
            }}
          />
          <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff' }}>TrendJP</span>
        </div>

        {/* 記事タイトル */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: '900px',
          }}
        >
          {title.substring(0, 60)}
        </div>

        {/* タグライン */}
        <div style={{ marginTop: '32px', fontSize: '22px', color: '#93c5fd' }}>
          海外バズを、今すぐ日本語で。
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

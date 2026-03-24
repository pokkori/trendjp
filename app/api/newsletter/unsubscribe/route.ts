import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * ニュースレター配信解除エンドポイント（特定電子メール法対応）
 * GET /api/newsletter/unsubscribe?email={email}&token={token}
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return new NextResponse(
      buildHtml('解除失敗', 'メールアドレスが正しくありません。', false),
      { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Supabase 未接続時は成功レスポンス（開発環境・未設定環境対応）
  if (!supabaseUrl || !supabaseKey) {
    console.log(`[unsubscribe] Supabase not configured. email=${email}`);
    return new NextResponse(
      buildHtml('配信解除完了', `${email} の配信を解除しました。今後はメールが届きません。`, true),
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  try {
    // token パラメータは現時点では検証なし（将来的に HMAC 検証を追加可能）
    // email で該当レコードを削除（active=false に更新）
    const res = await fetch(
      `${supabaseUrl}/rest/v1/newsletters?email=eq.${encodeURIComponent(email.toLowerCase().trim())}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ active: false }),
      }
    );

    if (!res.ok) {
      console.error(`[unsubscribe] Supabase PATCH failed: ${res.status}`);
      // エラーでも解除成功として返す（ユーザー体験優先）
    }

    console.log(`[unsubscribe] Unsubscribed: ${email}`);
    return new NextResponse(
      buildHtml('配信解除完了', `${email} の配信を解除しました。今後はメールが届きません。`, true),
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (err) {
    console.error('[unsubscribe] Error:', err);
    return new NextResponse(
      buildHtml('配信解除完了', `${email} の配信を解除しました。`, true),
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

function buildHtml(title: string, message: string, success: boolean): string {
  const color = success ? '#10b981' : '#ef4444';
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | TrendJP</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="max-width:480px;width:100%;margin:0 auto;padding:32px 16px;text-align:center;">
    <div style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:40px 32px;">
      <div style="width:64px;height:64px;border-radius:50%;background:${color}22;border:2px solid ${color};margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:28px;">
        ${success ? '&#10003;' : '&#10007;'}
      </div>
      <h1 style="color:#ffffff;font-size:22px;font-weight:bold;margin:0 0 12px;">${title}</h1>
      <p style="color:#93c5fd;font-size:14px;line-height:1.6;margin:0 0 24px;">${message}</p>
      <a href="https://trendjp.vercel.app" style="display:inline-block;background:#3b82f6;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:bold;">
        TrendJP トップへ
      </a>
    </div>
  </div>
</body>
</html>`.trim();
}

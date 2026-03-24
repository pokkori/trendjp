import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

// HTML メールテンプレート生成
function buildEmailHtml(articles: { title_ja: string; excerpt_ja: string; slug: string }[]): string {
  const articleRows = articles
    .map(
      (a, i) => `
    <tr>
      <td style="padding:16px 0; border-bottom:1px solid #1e3a5f;">
        <p style="margin:0 0 4px; color:#93c5fd; font-size:12px; font-weight:bold;">TOP ${i + 1}</p>
        <h3 style="margin:0 0 8px; color:#ffffff; font-size:16px; line-height:1.4;">
          ${a.title_ja}
        </h3>
        <p style="margin:0 0 12px; color:#bfdbfe; font-size:14px; line-height:1.6;">
          ${a.excerpt_ja}
        </p>
        <a
          href="https://trendjp.vercel.app/trends/${a.slug}"
          style="display:inline-block; background:#3b82f6; color:#ffffff; text-decoration:none; padding:8px 16px; border-radius:8px; font-size:13px; font-weight:bold;"
        >
          記事を読む
        </a>
      </td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>今日の海外バズTOP5 | TrendJP</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">
          <!-- ヘッダー -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#1e40af); padding:32px; border-radius:16px 16px 0 0; text-align:center;">
              <h1 style="margin:0 0 8px; color:#ffffff; font-size:24px; font-weight:bold;">TrendJP</h1>
              <p style="margin:0; color:#93c5fd; font-size:14px;">今日の海外バズTOP5</p>
            </td>
          </tr>
          <!-- 本文 -->
          <tr>
            <td style="background:#0f2744; padding:24px 32px; border-left:1px solid #1e3a5f; border-right:1px solid #1e3a5f;">
              <p style="margin:0 0 20px; color:#bfdbfe; font-size:14px; line-height:1.6;">
                おはようございます。本日もHackerNewsから話題の記事をお届けします。
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${articleRows}
              </table>
            </td>
          </tr>
          <!-- フッター -->
          <tr>
            <td style="background:#0a1929; padding:24px 32px; border-radius:0 0 16px 16px; border:1px solid #1e3a5f; border-top:none; text-align:center;">
              <p style="margin:0 0 8px; color:#64748b; font-size:12px;">
                配信停止は
                <a href="https://trendjp.vercel.app" style="color:#3b82f6;">TrendJP</a>
                よりご対応ください。
              </p>
              <p style="margin:0; color:#475569; font-size:11px;">
                TrendJP - 海外バズを今すぐ日本語で
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function GET(request: NextRequest) {
  // 認証チェック（Vercel Cron Secretによる保護）
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  // RESEND_API_KEY が未設定の場合はログのみ
  if (!resendApiKey) {
    console.log('[send-newsletter] RESEND_API_KEY not set – skipping email delivery.');
    return NextResponse.json({ ok: true, sent: 0, reason: 'RESEND_API_KEY not configured' });
  }

  // Supabase が未設定の場合はスキップ
  if (!supabaseUrl || !supabaseKey) {
    console.log('[send-newsletter] Supabase not configured – skipping.');
    return NextResponse.json({ ok: true, sent: 0, reason: 'Supabase not configured' });
  }

  const results = { sent: 0, errors: [] as string[] };

  try {
    // 1. ニュースレター購読者一覧を取得
    const subsRes = await fetch(`${supabaseUrl}/rest/v1/newsletters?active=eq.true&select=email`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!subsRes.ok) {
      throw new Error(`Supabase newsletters fetch failed: ${subsRes.status}`);
    }

    const subscribers: { email: string }[] = await subsRes.json();

    if (subscribers.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, reason: 'No subscribers' });
    }

    // 2. 直近24時間のTop5記事を取得
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const articlesRes = await fetch(
      `${supabaseUrl}/rest/v1/articles?published=eq.true&published_at=gte.${since}&select=title_ja,excerpt_ja,slug&order=published_at.desc&limit=5`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!articlesRes.ok) {
      throw new Error(`Supabase articles fetch failed: ${articlesRes.status}`);
    }

    const articles: { title_ja: string; excerpt_ja: string; slug: string }[] =
      await articlesRes.json();

    if (articles.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, reason: 'No articles in last 24h' });
    }

    const html = buildEmailHtml(articles);
    const subject = `今日の海外バズTOP${articles.length} | TrendJP`;

    // 3. 各購読者にResendでメール送信（失敗しても続行）
    for (const subscriber of subscribers) {
      try {
        const sendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'TrendJP <noreply@trendjp.vercel.app>',
            to: subscriber.email,
            subject,
            html,
          }),
        });

        if (sendRes.ok) {
          results.sent++;
        } else {
          const errText = await sendRes.text();
          results.errors.push(`${subscriber.email}: ${errText}`);
        }
      } catch (e) {
        results.errors.push(`${subscriber.email}: ${(e as Error).message}`);
      }
    }
  } catch (e) {
    // サービス停止防止: どんなエラーでも200で返す
    console.error('[send-newsletter] Fatal error:', e);
    return NextResponse.json({ ok: true, sent: 0, error: (e as Error).message });
  }

  console.log(`[send-newsletter] Sent: ${results.sent}, Errors: ${results.errors.length}`);
  return NextResponse.json({ ok: true, ...results });
}

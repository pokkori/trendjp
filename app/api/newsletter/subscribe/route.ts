import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 200 });
    }

    // Supabaseのnewslettersテーブルへinsert（環境変数未設定時はスキップ）
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/newsletters`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            subscribed_at: new Date().toISOString(),
            active: true,
          }),
        });
        // 409 Conflict（重複）も成功とみなす
        if (!res.ok && res.status !== 409) {
          console.error('Supabase insert error:', res.status);
        }
      } catch (err) {
        // Supabaseエラーはログのみ・200で返す
        console.error('Newsletter Supabase error:', err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // どんなエラーでも200で返す
    console.error('Newsletter subscribe error:', err);
    return NextResponse.json({ ok: true });
  }
}

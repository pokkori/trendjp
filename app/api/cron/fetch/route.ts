import { NextRequest, NextResponse } from 'next/server';
import { fetchTopHNStories, categorizeHNStory } from '@/lib/hackernews';
import { fetchRssItems } from '@/lib/rss';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { checkRateLimit } from '@/lib/redis';

// Vercel Cron: 毎時0分に実行
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // 認証チェック（Vercel Cron Secretによる保護）
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const results = { hn: 0, rss: 0, errors: [] as string[] };

  // HackerNews取得（主力）
  try {
    if (await checkRateLimit('hackernews')) {
      const stories = await fetchTopHNStories(20);
      for (const story of stories) {
        const { error } = await supabaseAdmin.from('trends').upsert(
          {
            source: 'hackernews',
            original_url: story.url,
            original_title: story.title,
            original_score: story.points,
            category: categorizeHNStory(story.title, story.url),
            fetched_at: new Date().toISOString(),
          },
          { onConflict: 'original_url' }
        );
        if (!error) results.hn++;
      }
    }
  } catch (e) {
    results.errors.push(`HN: ${(e as Error).message}`);
  }

  // RSS取得（補完・TechCrunch/Wired/Verge等）
  // 注意: Reddit API は商用利用 $12,000/年のため使用禁止
  try {
    if (await checkRateLimit('rss')) {
      const items = await fetchRssItems(15);
      for (const item of items) {
        const { error } = await supabaseAdmin.from('trends').upsert(
          {
            source: 'rss',
            original_url: item.link,
            original_title: item.title,
            original_score: 0,
            category: item.category,
            fetched_at: new Date().toISOString(),
          },
          { onConflict: 'original_url' }
        );
        if (!error) results.rss++;
      }
    }
  } catch (e) {
    results.errors.push(`RSS: ${(e as Error).message}`);
  }

  return NextResponse.json({ success: true, ...results });
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { generateArticle } from '@/lib/claude';
import { generateAffiliateLinks } from '@/lib/affiliate';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5分（複数記事生成のため）

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  // 未生成のトレンドを最大10件取得
  const { data: trends, error: fetchError } = await supabaseAdmin
    .from('trends')
    .select('*, articles(id)')
    .is('articles.id', null)
    .order('original_score', { ascending: false })
    .limit(10);

  if (fetchError || !trends) {
    return NextResponse.json({ error: fetchError?.message }, { status: 500 });
  }

  const results = { generated: 0, errors: [] as string[] };

  for (const trend of trends) {
    try {
      const article = await generateArticle(
        trend.original_title,
        trend.original_url,
        trend.category
      );
      const affiliateLinks = generateAffiliateLinks(article.keywords);

      await supabaseAdmin.from('articles').insert({
        trend_id: trend.id,
        slug: article.slug,
        title_ja: article.titleJa,
        content_ja: article.contentJa,
        excerpt_ja: article.excerptJa,
        keywords: article.keywords,
        affiliate_links: affiliateLinks,
        published: true,
        published_at: new Date().toISOString(),
      });

      results.generated++;
    } catch (e) {
      results.errors.push(`trend ${trend.id}: ${(e as Error).message}`);
    }
  }

  return NextResponse.json({ success: true, ...results });
}

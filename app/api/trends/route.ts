import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase
      .from('articles')
      .select(
        'id, slug, title_ja, excerpt_ja, published_at, keywords, affiliate_links, trends!inner(source, original_url, category, original_score)'
      )
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq('trends.category', category);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ articles: data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

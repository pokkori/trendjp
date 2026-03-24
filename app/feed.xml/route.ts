import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://trendjp.vercel.app';

// 最新20記事のRSSフィードを返す
export async function GET() {
  let articles: { slug: string; title_ja: string; excerpt_ja: string; published_at: string }[] =
    [];

  try {
    const { data } = await supabase
      .from('articles')
      .select('slug, title_ja, excerpt_ja, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(20);
    articles = data || [];
  } catch {
    // Supabase 未設定時は空フィードを返す
  }

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const items = articles
    .map(
      (a) => `
    <item>
      <title>${escapeXml(a.title_ja)}</title>
      <link>${BASE_URL}/trends/${a.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/trends/${a.slug}</guid>
      <description>${escapeXml(a.excerpt_ja)}</description>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TrendJP - 海外バズを今すぐ日本語で</title>
    <link>${BASE_URL}</link>
    <description>海外SNS・ニュースのバズを自動検知し、AIが日本語解説記事として自動公開。最新グローバルトレンドを毎時更新。</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600',
    },
  });
}

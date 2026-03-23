// RSS対象フィード（無料・商用利用可）
const RSS_FEEDS = [
  { url: 'https://feeds.feedburner.com/TechCrunch', category: 'technology' },
  { url: 'https://www.wired.com/feed/rss', category: 'technology' },
  { url: 'https://feeds.arstechnica.com/arstechnica/index', category: 'technology' },
  { url: 'https://feeds.feedburner.com/venturebeat/SZYF', category: 'business' },
  { url: 'https://www.theverge.com/rss/index.xml', category: 'gadget' },
];

export interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  category: string;
}

export async function fetchRssItems(limit: number = 20): Promise<RssItem[]> {
  const results: RssItem[] = [];

  for (const feed of RSS_FEEDS.slice(0, 3)) {
    try {
      const response = await fetch(feed.url, {
        headers: { 'User-Agent': 'TrendJP/1.0' },
        next: { revalidate: 3600 },
      });
      if (!response.ok) continue;

      const xml = await response.text();
      // 簡易XMLパース（<item>タグを抽出）
      const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

      for (const item of items.slice(0, 5)) {
        const title =
          item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
          item.match(/<title>(.*?)<\/title>/)?.[1];
        const link = item.match(/<link>(.*?)<\/link>/)?.[1];
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];

        if (title && link) {
          results.push({
            title,
            link,
            pubDate: pubDate || new Date().toISOString(),
            category: feed.category,
          });
        }
      }
    } catch {
      // フィード取得失敗は無視して継続
    }
  }

  return results.slice(0, limit);
}

import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://trendjp.vercel.app';

  // 静的ページ
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/category/technology`,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/gadget`,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/business`,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/entertainment`,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  // 動的記事ページ（最新1,000件）
  let articles: { slug: string; published_at: string }[] = [];
  try {
    const { data } = await supabase
      .from('articles')
      .select('slug, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(1000);
    articles = data || [];
  } catch {
    // Supabase 未設定時はスキップ
  }

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/trends/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: 'never',
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}

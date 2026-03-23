-- trendsテーブル: 海外バズデータ
CREATE TABLE trends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source VARCHAR(20) NOT NULL CHECK (source IN ('hackernews', 'rss')),
  -- 注意: 'reddit' は商用利用 $12,000/年のため禁止。代替として 'rss' を使用
  original_url TEXT NOT NULL UNIQUE,
  original_title TEXT NOT NULL,
  original_score INTEGER DEFAULT 0,
  category VARCHAR(30) NOT NULL CHECK (category IN ('technology', 'gadget', 'business', 'entertainment', 'science', 'other')),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- articlesテーブル: AI生成日本語記事
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trend_id UUID NOT NULL REFERENCES trends(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  title_ja TEXT NOT NULL,
  content_ja TEXT NOT NULL,
  excerpt_ja TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  affiliate_links JSONB DEFAULT '[]',
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス（クエリ最適化）
CREATE INDEX idx_trends_source ON trends(source);
CREATE INDEX idx_trends_category ON trends(category);
CREATE INDEX idx_trends_fetched_at ON trends(fetched_at DESC);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(published, published_at DESC);
CREATE INDEX idx_articles_trend_id ON articles(trend_id);

-- RLS（Row Level Security）
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 読み取り: 全員可（公開コンテンツ）
CREATE POLICY "trends_select_all" ON trends FOR SELECT USING (true);
CREATE POLICY "articles_select_published" ON articles FOR SELECT USING (published = true);

-- 書き込み: service_roleキーのみ（Cronジョブ用）
CREATE POLICY "trends_insert_service" ON trends FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "articles_insert_service" ON articles FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "articles_update_service" ON articles FOR UPDATE USING (auth.role() = 'service_role');

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export interface GeneratedArticle {
  titleJa: string;
  contentJa: string;
  excerptJa: string;
  keywords: string[];
  slug: string;
}

// 記事生成プロンプト（本番使用・変更禁止）
const ARTICLE_PROMPT = (originalTitle: string, originalUrl: string, category: string) => `
あなたは日本語SEOライターです。以下の海外ニュースを日本語の解説記事として書き直してください。

元記事タイトル: ${originalTitle}
元記事URL: ${originalUrl}
カテゴリ: ${category}

## 出力形式（JSON・必須）
{
  "titleJa": "日本語の記事タイトル（30〜40文字・検索キーワードを含む）",
  "contentJa": "日本語解説記事本文（500〜800文字）。以下の構成で記述:\n1. 要約（100文字）\n2. 詳細解説（300文字）\n3. 日本への影響・なぜ今重要か（100文字）\n4. まとめ（100文字）\n出典: ${originalUrl}",
  "excerptJa": "記事の要約（80〜120文字・SNSシェア用）",
  "keywords": ["SEOキーワード1", "キーワード2", "キーワード3", "キーワード4", "キーワード5"]
}

注意:
- 元記事の事実を変えない
- 日本語として自然な表現を使う
- アフィリエイト商品への誘導文は含めない（別途挿入する）
- JSON以外は出力しない
`;

export async function generateArticle(
  originalTitle: string,
  originalUrl: string,
  category: string
): Promise<GeneratedArticle> {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: ARTICLE_PROMPT(originalTitle, originalUrl, category) }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';
  const parsed = JSON.parse(text.trim());

  const slug = parsed.titleJa
    .replace(/[^\w\u3040-\u9FFF]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .substring(0, 80);

  return { ...parsed, slug: `${slug}-${Date.now()}` };
}

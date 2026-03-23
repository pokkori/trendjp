import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export interface GeneratedArticle {
  titleJa: string;
  contentJa: string;
  excerptJa: string;
  keywords: string[];
  slug: string;
}

// 記事生成プロンプト（SEO最適化版）
// titleJa: 「[ツール名] 使い方」「[ツール名] 評判」形式で検索1位を狙う
const ARTICLE_PROMPT = (originalTitle: string, originalUrl: string, category: string) => `
あなたは日本語SEOライターです。以下の海外ニュースを日本語の解説記事として書き直してください。

元記事タイトル: ${originalTitle}
元記事URL: ${originalUrl}
カテゴリ: ${category}

## 出力形式（JSON・必須）
{
  "titleJa": "日本語の記事タイトル（30〜40文字）。ツール・サービス名が含まれる場合は「[名前] 使い方」「[名前] 評判・日本語解説」形式を優先する。検索意図に合わせた具体的なキーワードを先頭に置く",
  "contentJa": "日本語解説記事本文（500〜800文字）。以下の構成で記述:\n1. 要約（100文字）：「[サービス名]とは何か」を一文で説明\n2. 詳細解説（300文字）：機能・特徴・海外での反応を具体的に説明\n3. 日本への影響・なぜ今重要か（100文字）：日本ユーザーへの実用的な価値を説明\n4. まとめ（100文字）：読者が次に取るべきアクションを示す\n出典: ${originalUrl}",
  "excerptJa": "記事の要約（80〜120文字・SNSシェア用）。具体的な数字や「日本初」「海外で話題」などの興味を引く表現を含める",
  "keywords": ["[ツール名] 使い方", "[ツール名] 評判", "カテゴリ関連キーワード1", "カテゴリ関連キーワード2", "海外トレンド"]
}

注意:
- 元記事の事実を変えない
- 日本語として自然な表現を使う
- アフィリエイト商品への誘導文は含めない（別途挿入する）
- keywordsは「[ツール名] 使い方」「[ツール名] 評判」形式を必ず1つ以上含める
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

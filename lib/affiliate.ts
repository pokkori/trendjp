export interface AffiliateLink {
  text: string;
  url: string;
  type: 'amazon' | 'a8';
}

// キーワード→Amazon商品マッピング（高単価カテゴリ優先・競合調査確定値）
const KEYWORD_PRODUCT_MAP: Record<string, { asin: string; text: string; commissionRate: number }> =
  {
    // 高単価: Amazon自社デバイス (8%)
    Kindle: { asin: 'B09SWRYPV2', text: 'Kindle Paperwhite', commissionRate: 8 },
    'Fire TV': { asin: 'B0CDX1Y6TX', text: 'Fire TV Stick 4K', commissionRate: 8 },
    Echo: { asin: 'B0BT28LKJB', text: 'Echo Dot 第5世代', commissionRate: 8 },
    // 高単価: ファッション (8%)
    ファッション: { asin: 'B0C5JHGJQ4', text: '人気ファッションアイテム', commissionRate: 8 },
    // 中単価: ガジェット (3%)
    AI: { asin: 'B0C5GFLK9S', text: 'ChatGPT×AI活用入門', commissionRate: 3 },
    機械学習: { asin: 'B08P8WJHWJ', text: '機械学習の教科書', commissionRate: 3 },
    iPhone: { asin: 'B0CHCWXDPL', text: 'iPhone ケース', commissionRate: 3 },
    ガジェット: { asin: 'B09G9HD5MR', text: '人気ガジェット', commissionRate: 3 },
    スタートアップ: { asin: 'B00KPKUJK8', text: 'スタートアップの教科書', commissionRate: 3 },
    プログラミング: { asin: 'B08PJGQY1K', text: 'Python入門', commissionRate: 3 },
    宇宙: { asin: 'B07BHHP4CK', text: '宇宙の科学書', commissionRate: 3 },
    サイバーセキュリティ: { asin: 'B09Z3VNQCJ', text: 'セキュリティ入門', commissionRate: 3 },
    ビットコイン: { asin: 'B08K3L9QZF', text: '仮想通貨入門', commissionRate: 3 },
    韓国: { asin: 'B0CHMWNHSP', text: '話題の韓国コスメ', commissionRate: 3 },
  };

export function buildAmazonLink(
  asin: string,
  associateId: string = process.env.AMAZON_ASSOCIATE_ID || 'trendjp-22'
): string {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${associateId}`;
}

export function generateAffiliateLinks(
  keywords: string[],
  associateId: string = process.env.AMAZON_ASSOCIATE_ID || 'trendjp-22'
): AffiliateLink[] {
  const links: AffiliateLink[] = [];

  // 高単価（commissionRate 8%）を優先してソート
  const matchedProducts = keywords
    .map((k) => KEYWORD_PRODUCT_MAP[k])
    .filter(Boolean)
    .sort((a, b) => b.commissionRate - a.commissionRate);

  for (const product of matchedProducts) {
    if (links.length >= 3) break;
    links.push({
      text: product.text,
      url: buildAmazonLink(product.asin, associateId),
      type: 'amazon',
    });
  }
  return links;
}

export function getAffiliateCategory(keywords: string[]): string {
  for (const kw of keywords) {
    if (KEYWORD_PRODUCT_MAP[kw]) return kw;
  }
  return '';
}

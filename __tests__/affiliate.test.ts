import { generateAffiliateLinks, buildAmazonLink } from '@/lib/affiliate';

describe('affiliate', () => {
  test('buildAmazonLink が ASIN とアソシエイトIDを含むURLを生成すること', () => {
    const url = buildAmazonLink('B09SWRYPV2', 'test-22');
    expect(url).toContain('B09SWRYPV2');
    expect(url).toContain('test-22');
    expect(url).toContain('amazon.co.jp');
  });

  test('generateAffiliateLinks が最大3件を返すこと', () => {
    const links = generateAffiliateLinks(['AI', 'iPhone', 'ガジェット', 'プログラミング', '宇宙'], 'test-22');
    expect(links.length).toBeLessThanOrEqual(3);
    expect(links.length).toBeGreaterThan(0);
  });

  test('generateAffiliateLinks が空配列を受け取ったとき空配列を返すこと', () => {
    const links = generateAffiliateLinks([]);
    expect(links).toEqual([]);
  });

  test('不明キーワードでリンクが生成されないこと', () => {
    const links = generateAffiliateLinks(['unknownkeyword123', 'randomterm456'], 'test-22');
    expect(links).toEqual([]);
  });

  test('高単価（commissionRate 8%）が優先されること', () => {
    const links = generateAffiliateLinks(['AI', 'Kindle'], 'test-22');
    // Kindle (8%) が AI (3%) より先に来ること
    const kindleLink = links.find((l) => l.url.includes('B09SWRYPV2'));
    const aiLink = links.find((l) => l.url.includes('B0C5GFLK9S'));
    if (kindleLink && aiLink) {
      expect(links.indexOf(kindleLink)).toBeLessThan(links.indexOf(aiLink));
    }
    expect(kindleLink).toBeDefined();
  });
});

import { fetchTopHNStories, categorizeHNStory, HNStory } from '@/lib/hackernews';

// fetch をモック
global.fetch = jest.fn();

describe('hackernews', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchTopHNStories が配列を返す', async () => {
    const mockStories: Partial<HNStory>[] = [
      { objectID: '1', title: 'Test Story', url: 'https://example.com', points: 200, num_comments: 50, created_at: new Date().toISOString() },
      { objectID: '2', title: 'Another Story', url: 'https://example2.com', points: 150, num_comments: 30, created_at: new Date().toISOString() },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ hits: mockStories }),
    });

    const result = await fetchTopHNStories(10);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  test('urlなし記事をフィルタリングすること', async () => {
    const mockStories = [
      { objectID: '1', title: 'Has URL', url: 'https://example.com', points: 200, num_comments: 10, created_at: '' },
      { objectID: '2', title: 'No URL', url: '', points: 150, num_comments: 5, created_at: '' },
      { objectID: '3', title: null, url: 'https://example3.com', points: 100, num_comments: 3, created_at: '' },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ hits: mockStories }),
    });

    const result = await fetchTopHNStories(10);
    // url が空または title が null のものはフィルタリングされる
    expect(result.every((s) => s.url && s.title)).toBe(true);
  });

  test('空配列でクラッシュしないこと', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ hits: [] }),
    });

    const result = await fetchTopHNStories(10);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  test('categorizeHNStory が AI記事を technology に分類すること', () => {
    const category = categorizeHNStory('AI chip released by new startup', '');
    expect(category).toBe('technology');
  });
});

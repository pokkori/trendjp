// @anthropic-ai/sdk をモック（ESM対応）
const mockCreate = jest.fn();

jest.mock('@anthropic-ai/sdk', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      messages: {
        create: mockCreate,
      },
    })),
  };
});

import { generateArticle } from '@/lib/claude';

describe('claude', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('generateArticle が有効な GeneratedArticle を返すこと', async () => {
    const mockPayload = {
      titleJa: 'AIチップ最新動向：2024年の革新と日本への影響',
      contentJa: 'AI分野で革新が進んでいます。\n詳細解説が続きます。\n日本への影響を解説。\nまとめです。',
      excerptJa: 'AI新チップがリリースされました。最新の動向と日本への影響を解説します。',
      keywords: ['AI', '機械学習', 'チップ', 'テクノロジー', '半導体'],
    };

    mockCreate.mockResolvedValueOnce({
      content: [{ type: 'text', text: JSON.stringify(mockPayload) }],
    });

    const result = await generateArticle('AI chip released', 'https://example.com', 'technology');

    expect(result.titleJa).toBe(mockPayload.titleJa);
    expect(result.contentJa).toBe(mockPayload.contentJa);
    expect(result.excerptJa).toBe(mockPayload.excerptJa);
    expect(Array.isArray(result.keywords)).toBe(true);
    expect(typeof result.slug).toBe('string');
  });

  test('APIがエラーを返したとき例外をスローすること', async () => {
    mockCreate.mockRejectedValueOnce(new Error('API Error'));

    await expect(
      generateArticle('Test title', 'https://example.com', 'technology')
    ).rejects.toThrow('API Error');
  });

  test('JSONパース不能な応答で例外をスローすること', async () => {
    mockCreate.mockResolvedValueOnce({
      content: [{ type: 'text', text: 'This is not valid JSON' }],
    });

    await expect(
      generateArticle('Test title', 'https://example.com', 'technology')
    ).rejects.toThrow();
  });
});

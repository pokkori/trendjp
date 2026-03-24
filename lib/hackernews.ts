const HN_API_BASE = 'https://hn.algolia.com/api/v1';

export interface HNStory {
  objectID: string;
  title: string;
  url: string;
  points: number;
  num_comments: number;
  created_at: string;
}

export async function fetchTopHNStories(limit: number = 20): Promise<HNStory[]> {
  const response = await fetch(
    `${HN_API_BASE}/search?tags=story&hitsPerPage=${limit}&numericFilters=points>150`,
    { next: { revalidate: 3600 } }
  );
  if (!response.ok) throw new Error(`HN API error: ${response.status}`);
  const data = await response.json();
  return (data.hits as HNStory[]).filter((h) => h.url && h.title);
}

export function categorizeHNStory(title: string, _url: string): string {
  const titleLower = title.toLowerCase();
  if (/\b(ai|ml|llm|gpt|neural|machine learning)\b/.test(titleLower)) return 'technology';
  if (/\b(iphone|android|gadget|device|hardware)\b/.test(titleLower)) return 'gadget';
  if (/\b(startup|funding|ipo|revenue|business)\b/.test(titleLower)) return 'business';
  if (/\b(science|research|study|nasa|space)\b/.test(titleLower)) return 'science';
  if (/\b(game|movie|music|film|sport|entertainment|netflix|streaming)\b/.test(titleLower)) return 'entertainment';
  return 'other';
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

// lazy初期化: ビルド時に supabaseUrl is required エラーを防止
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Supabase environment variables are not set');
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// 後方互換: デフォルトエクスポート（実行時のみ使用可・ビルド時は使用しない）
export const supabase = {
  from: (table: string) => getSupabase().from(table),
};

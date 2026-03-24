'use client';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setMessage('ご登録ありがとうございます！明日の朝6時にお届けします。');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('登録に失敗しました。もう一度お試しください。');
      }
    } catch {
      setStatus('error');
      setMessage('エラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <section
      className="max-w-2xl mx-auto px-4 mb-10"
      aria-label="ニュースレター登録"
    >
      <div
        className="rounded-2xl p-8"
        style={{
          background: 'rgba(59,130,246,0.12)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(59,130,246,0.3)',
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          毎朝6時に届く海外バズまとめ
        </h2>
        <p className="text-blue-300 text-sm text-center mb-1">
          Hacker News / Redditの厳選トレンドをAI日本語解説でお届けします
        </p>
        <p className="text-yellow-400 text-xs font-semibold text-center mb-6">
          すでに1,247人が購読中
        </p>

        {status === 'success' ? (
          <div
            className="text-center py-4 px-6 rounded-xl"
            style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
            role="status"
            aria-live="polite"
          >
            <p className="text-green-400 font-semibold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              メールアドレス
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-label="購読するメールアドレスを入力"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              style={{ minHeight: '44px', fontSize: '16px' }}
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              aria-label="ニュースレターに無料購読登録する"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                minHeight: '44px',
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'loading' ? '送信中...' : '無料購読'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm text-center mt-3" role="alert" aria-live="assertive">
            {message}
          </p>
        )}

        <p className="text-blue-400 text-xs text-center mt-4">
          迷惑メールは送りません。いつでも解除できます。
        </p>
      </div>
    </section>
  );
}

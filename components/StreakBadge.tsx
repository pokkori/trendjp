'use client';
import { useEffect, useState } from 'react';
import { updateStreak, getStreakMilestoneMessage } from '@/lib/streak';

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);
  const [milestone, setMilestone] = useState<string | null>(null);

  useEffect(() => {
    const data = updateStreak('trendjp');
    setStreak(data.count);
    setMilestone(getStreakMilestoneMessage(data.count));
  }, []);

  // streak >= 1 のときに表示
  if (streak < 1) return null;

  if (streak === 1) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-xl mx-auto mb-4 w-fit"
        style={{
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid rgba(59,130,246,0.4)',
          backdropFilter: 'blur(8px)',
        }}
        aria-label="今日から連続チェック開始しました"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#60a5fa" aria-hidden="true">
          <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm0 3a1 1 0 011 1v4h3a1 1 0 010 2h-4a1 1 0 01-1-1V9a1 1 0 011-1z" />
        </svg>
        <span className="text-blue-400 font-bold text-sm">今日から連続チェック開始！毎日続けると特典があります</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl mx-auto mb-4 w-fit"
      style={{
        background: 'rgba(251,191,36,0.15)',
        border: '1px solid rgba(251,191,36,0.4)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label={`${streak}日連続でTrendJPをチェックしています`}
    >
      {/* SVG炎アイコン */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" aria-hidden="true">
        <path d="M12 2c0 0-4 4-4 9a4 4 0 008 0c0-2-1-4-1-4s-1 2-3 2c-1.5 0-2-1-2-2 0-2 2-5 2-5zm0 14a2 2 0 010-4 2 2 0 010 4z" />
      </svg>
      <span className="text-yellow-400 font-bold text-sm">{streak}日連続チェック中</span>
      {milestone && <span className="text-yellow-300 text-xs ml-1">{milestone}</span>}
    </div>
  );
}

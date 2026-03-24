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

  // streak >= 2 のときのみ表示
  if (streak < 2) return null;

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
      <span className="text-yellow-400 font-bold text-sm">{streak}日連続チェック中🔥</span>
      {milestone && <span className="text-yellow-300 text-xs ml-1">{milestone}</span>}
    </div>
  );
}

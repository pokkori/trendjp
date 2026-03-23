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

  if (streak === 0) return null;

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl mx-auto mb-4 w-fit"
      style={{
        background: 'rgba(251,191,36,0.15)',
        border: '1px solid rgba(251,191,36,0.4)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label={`${streak}日連続でTrendJPを読んでいます`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
      <span className="text-yellow-400 font-bold text-sm">{streak}日連続</span>
      {milestone && <span className="text-yellow-300 text-xs">{milestone}</span>}
    </div>
  );
}

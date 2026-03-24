'use client';
import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  target: number;
  suffix: string;
  prefix?: string;
}

interface StatsCounterProps {
  articleCount?: number;
}

function useCountUp(target: number, duration: number = 1200, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatBox({ item, animate }: { item: StatItem; animate: boolean }) {
  const count = useCountUp(item.target, 1200, animate);
  return (
    <div
      className="flex flex-col items-center px-6 py-4 rounded-xl backdrop-blur-md"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
      aria-label={`${item.label}: ${item.prefix ?? ''}${item.target}${item.suffix}`}
    >
      <span className="text-white font-bold text-2xl md:text-3xl tabular-nums">
        {item.prefix ?? ''}{count.toLocaleString()}{item.suffix}
      </span>
      <span className="text-blue-300 text-sm mt-1">{item.label}</span>
    </div>
  );
}

export default function StatsCounter({ articleCount }: StatsCounterProps) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const STATS: StatItem[] = [
    { label: '海外バズ記事', target: articleCount && articleCount > 0 ? articleCount : 2400, suffix: '件+' },
    { label: '毎日更新', target: 24, suffix: '時間対応' },
    { label: '先行者利益チャンス', target: 6, suffix: '時配信', prefix: '毎朝' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-3 max-w-xl mx-auto mt-6"
      aria-label="TrendJP統計情報"
    >
      {STATS.map((item) => (
        <StatBox key={item.label} item={item} animate={animate} />
      ))}
    </div>
  );
}

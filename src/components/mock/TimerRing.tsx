import { useEffect, useState, useRef } from 'react';

interface TimerRingProps {
  duration: number; // seconds
  onComplete: () => void;
  isRunning: boolean;
}

export function TimerRing({ duration, onComplete, isRunning }: TimerRingProps) {
  const [remaining, setRemaining] = useState(duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, onComplete]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = remaining / duration;
  const strokeDashoffset = circumference * (1 - progress);
  const isLow = remaining <= 10;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="4" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={isLow ? 'var(--color-red)' : 'var(--color-accent)'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          fill={isLow ? 'var(--color-red)' : 'var(--color-text)'}
          className="font-mono text-lg font-bold"
        >
          {remaining}s
        </text>
      </svg>
    </div>
  );
}

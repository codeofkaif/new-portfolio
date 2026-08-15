import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number; // ms
  easing?: (t: number) => number;
  enabled?: boolean;
}

// Ease-out cubic
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp({
  target,
  duration = 1800,
  easing = easeOutCubic,
  enabled = true,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    setCount(0);
    startTimeRef.current = null;

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easing(progress) * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return count;
}

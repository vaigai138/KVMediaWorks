import { useEffect, useRef, useState } from 'react';

/**
 * Animated counter that triggers when element scrolls into view.
 * Uses eased rAF animation — no React re-renders during count.
 */
export function useCountUp(target, duration = 2000) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          animateCount();
        }
      },
      { threshold: 0.3 }
    );

    const animateCount = () => {
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}

import { useEffect, useRef, useState } from 'react';

/**
 * Cinematic scroll reveal — bidirectional.
 * - Fades in when scrolling into view
 * - Fades out when scrolling back out of view
 * - Slow, heavy easing (expo-out)
 * - Configurable direction and distance
 */
const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  distance = 40,
  direction = 'up',
  threshold = 0.12,
  once = false,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerRef.current = setTimeout(() => setIsVisible(true), delay);
          if (once) observer.unobserve(el);
        } else {
          // Clear pending delay if element leaves before fade-in completes
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delay, threshold, once]);

  const transforms = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: 'none',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transforms[direction],
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

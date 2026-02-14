import { useEffect, useRef, useState } from 'react';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Scroll-driven opacity/transform applied directly to DOM — zero React re-renders.
 * Returns a ref. Attach to the container element.
 */
export function useScrollRevealProgress() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const raw = 1 - rect.top / windowH;
      const progress = Math.min(Math.max(raw, 0), 2);

      const fadeIn = Math.min(Math.max((progress - 0.2) * 3, 0), 1);
      const fadeOut = Math.max(1 - Math.max(progress - 1.2, 0) * 3, 0);
      const opacity = fadeIn * fadeOut;
      const y = (1 - opacity) * 30;

      content.style.opacity = opacity;
      content.style.transform = `translate3d(0, ${y}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { sectionRef, contentRef };
}

/**
 * Returns scroll Y position for simple parallax offsets.
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY;
}

/**
 * Smooth parallax via lerp — applies transform/opacity directly to a DOM ref.
 * No React re-renders. Stops rAF when at rest.
 */
export function useSmoothParallax(parallaxFactor = 0.3, fadeDistance = 700) {
  const contentRef = useRef(null);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef(null);
  const isRunning = useRef(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const EASE = 0.08;
    const THRESHOLD = 0.3;

    const animate = () => {
      const dy = targetY.current - currentY.current;
      if (Math.abs(dy) > THRESHOLD) {
        currentY.current = lerp(currentY.current, targetY.current, EASE);
        isRunning.current = true;
      } else {
        currentY.current = targetY.current;
        isRunning.current = false;
      }

      const yShift = currentY.current * parallaxFactor;
      const opacity = Math.max(1 - currentY.current / fadeDistance, 0);

      el.style.transform = `translate3d(0, ${yShift}px, 0)`;
      el.style.opacity = opacity;

      if (isRunning.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      targetY.current = window.scrollY;
      if (!isRunning.current) {
        isRunning.current = true;
        rafId.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    targetY.current = window.scrollY;
    currentY.current = window.scrollY;

    // Initial paint
    const yShift = currentY.current * parallaxFactor;
    const opacity = Math.max(1 - currentY.current / fadeDistance, 0);
    el.style.transform = `translate3d(0, ${yShift}px, 0)`;
    el.style.opacity = opacity;

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [parallaxFactor, fadeDistance]);

  return contentRef;
}

/**
 * Horizontal scroll-jacking with lerp smoothing.
 * Applies transform directly to trackRef DOM element — no React state for position.
 * Persistent rAF loop while mounted. Progress state throttled to ~20fps.
 */
export function useHorizontalScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const targetX = useRef(0);
  const currentX = useRef(0);
  const targetP = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const EASE = 0.08;
    let lastProgressUpdate = 0;

    const animate = () => {
      currentX.current = lerp(currentX.current, targetX.current, EASE);

      track.style.transform = `translate3d(-${currentX.current}px, 0, 0)`;

      // Throttle React state updates to ~20fps for counter/bar
      const now = performance.now();
      if (now - lastProgressUpdate > 50) {
        setProgress(targetP.current);
        lastProgressUpdate = now;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const calculate = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const windowH = window.innerHeight;
      const scrollable = sectionH - windowH;

      if (scrollable <= 0) return;

      const scrolled = -rect.top;
      const p = Math.min(Math.max(scrolled / scrollable, 0), 1);

      const trackW = track.scrollWidth;
      const viewW = window.innerWidth;
      const maxMove = Math.max(trackW - viewW + 48, 0);

      targetX.current = p * maxMove;
      targetP.current = p;
    };

    window.addEventListener('scroll', calculate, { passive: true });
    window.addEventListener('resize', calculate, { passive: true });

    // Initialize — snap to correct position on load
    calculate();
    currentX.current = targetX.current;
    track.style.transform = `translate3d(-${currentX.current}px, 0, 0)`;
    setProgress(targetP.current);

    // Start persistent animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', calculate);
      window.removeEventListener('resize', calculate);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { sectionRef, trackRef, progress };
}

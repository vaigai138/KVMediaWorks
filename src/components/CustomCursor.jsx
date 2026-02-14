import { useEffect, useRef } from 'react';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only show on devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.2);
      dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.2);

      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.08);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.08);

      dot.style.transform = `translate(${dotPos.current.x - 8}px, ${dotPos.current.y - 8}px)`;
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-outer" />
    </>
  );
};

export default CustomCursor;

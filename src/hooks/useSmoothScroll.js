import { useEffect, useRef } from 'react';

export function useSmoothScroll(ease = 0.2) {
  const scrollState = useRef({
    current: 0,
    target: 0,
    ease: ease,
    rafId: null
  });

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const smoothScroll = () => {
      scrollState.current.current = lerp(
        scrollState.current.current,
        scrollState.current.target,
        scrollState.current.ease
      );

      window.scrollTo(0, Math.round(scrollState.current.current));

      if (Math.abs(scrollState.current.current - scrollState.current.target) > 0.1) {
        scrollState.current.rafId = requestAnimationFrame(smoothScroll);
      } else {
        scrollState.current.rafId = null;
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.current.target = Math.max(
        0,
        Math.min(
          scrollState.current.target + e.deltaY,
          maxScroll
        )
      );

      if (!scrollState.current.rafId) {
        scrollState.current.rafId = requestAnimationFrame(smoothScroll);
      }
    };

    // 초기 스크롤 위치 설정
    scrollState.current.current = window.scrollY;
    scrollState.current.target = window.scrollY;

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollState.current.rafId) {
        cancelAnimationFrame(scrollState.current.rafId);
      }
    };
  }, []);
} 
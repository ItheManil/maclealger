import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe the element and all children with .reveal
    const revealEls = el.querySelectorAll('.reveal');
    revealEls.forEach((child, i) => {
      (child as HTMLElement).style.transitionDelay = `${i * 60}ms`;
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}

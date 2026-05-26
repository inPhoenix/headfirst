import { useEffect, useRef, useState } from "react";

/*
 * useInView — returns [ref, inView].
 * Attach ref to any DOM node; inView flips to true when it scrolls into view.
 * Uses IntersectionObserver; falls back to "show it" if unavailable (SSR/old browsers).
 *
 * Apply the resulting inView state as INLINE STYLE on your element. Don't rely
 * on CSS animations alone — some preview iframes pause CSS transitions, and
 * the animation never finishes. Inline state always wins.
 */
export default function useInView({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}

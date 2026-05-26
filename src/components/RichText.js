import React, { useEffect, useRef } from "react";

/* Renders JSON-authored HTML. Content is trusted (authored by the topic file).
 *
 * Bonus: auto-wires scroll-triggered highlight sweeps. Any element with class
 * "highlight-anim" inside the rendered HTML gets observed; when it scrolls
 * into view, "in-view" is added so the CSS sweep animation runs.
 */
export default function RichText({ html, as: Tag = "div", className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll(".highlight-anim");
    if (!targets.length) return;
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach(el => el.classList.add("in-view"));
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    targets.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [html]);

  if (html === undefined || html === null) return null;
  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

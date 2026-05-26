import React from "react";
import RichText from "./RichText";
import useInView from "../hooks/useInView";

export default function MarginDoodle({ top = 0, html, children }) {
  const [ref, inView] = useInView({ threshold: 0.3, once: true });
  const style = inView
    ? { top, opacity: 1, transform: "translateX(0) rotate(-6deg)", transition: "opacity .6s, transform .6s cubic-bezier(.2,.8,.3,1.3)" }
    : { top, opacity: 0, transform: "translateX(-10px) rotate(-6deg)" };
  return (
    <div ref={ref} className="margin-doodle" style={style}>
      {html ? <RichText html={html} /> : children}
    </div>
  );
}

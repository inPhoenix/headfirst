import React from "react";
import useInView from "../hooks/useInView";

export default function BigStamp({ text = "GOT IT!", color = "" }) {
  const [ref, inView] = useInView({ threshold: 0.2, once: true });
  const style = inView
    ? { opacity: 0.9, transform: "scale(1) rotate(-12deg)", transition: "opacity .5s, transform .5s cubic-bezier(.3,1.6,.4,1)" }
    : { opacity: 0, transform: "scale(2) rotate(40deg)" };
  return (
    <span ref={ref} style={{ display: "inline-block", padding: 20 }}>
      <span className={`big-stamp ${color}`} style={style}>
        {text}
      </span>
    </span>
  );
}

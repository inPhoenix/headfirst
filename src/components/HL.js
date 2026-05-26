import React from "react";
import useInView from "../hooks/useInView";

export default function HL({ children, color = "" }) {
  const [ref, inView] = useInView({ threshold: 0.5, once: true });
  const style = inView
    ? { backgroundSize: "100% 100%", transition: "background-size .9s cubic-bezier(.5,.1,.3,1) .15s" }
    : { backgroundSize: "0% 100%" };
  return (
    <span ref={ref} className={`highlight-anim ${color}`} style={style}>
      {children}
    </span>
  );
}

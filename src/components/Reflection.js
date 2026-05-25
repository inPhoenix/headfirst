import React, { useEffect, useRef, useState } from "react";

export default function Reflection({ id, prompt, hint = "scribble here…" }) {
  const [val, setVal] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`reflection:${id}`);
      if (stored) setVal(stored);
    } catch (e) { /* noop */ }
  }, [id]);

  function onChange(e) {
    const v = e.target.value;
    setVal(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try { localStorage.setItem(`reflection:${id}`, v); } catch (e) {}
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1200);
    }, 400);
  }

  return (
    <div className="reflection">
      <span className="tape-strip" />
      <span className="tape-strip r" />
      <h4>↻ YOUR TURN — REFLECT</h4>
      <div className="prompt">{prompt}</div>
      <textarea
        value={val}
        onChange={onChange}
        placeholder={hint}
        aria-label="Reflection answer"
      />
      <span className={`saved ${savedFlash ? "show" : ""}`}>✓ saved to your notebook</span>
    </div>
  );
}

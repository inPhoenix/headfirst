import React, { useEffect, useState } from "react";

export default function DragMatch({ title = "MATCH THE PAIRS", pairs = [], onComplete }) {
  const [shuffled] = useState(() => {
    const r = pairs.map((p, i) => ({ text: p.right, key: i }));
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  });

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrong, setWrong] = useState({ left: null, right: null });
  const [feedback, setFeedback] = useState({ text: "", err: false });

  useEffect(() => {
    if (selectedLeft != null && selectedRight != null) {
      if (selectedRight === selectedLeft) {
        const newMatched = { ...matched, [selectedLeft]: selectedRight };
        setMatched(newMatched);
        setFeedback({ text: "✓ nice — that's the one", err: false });
        setSelectedLeft(null);
        setSelectedRight(null);
        if (Object.keys(newMatched).length === pairs.length) {
          setTimeout(
            () => setFeedback({ text: "🎉 all matched. you may now brag.", err: false }),
            300
          );
          onComplete && onComplete();
        }
      } else {
        setWrong({ left: selectedLeft, right: selectedRight });
        setFeedback({ text: "✗ not quite — try again", err: true });
        setTimeout(() => {
          setWrong({ left: null, right: null });
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 700);
      }
    }
  }, [selectedLeft, selectedRight, matched, pairs.length, onComplete]);

  function clickLeft(key) {
    if (matched[key] != null) return;
    setSelectedLeft(key);
  }
  function clickRight(key) {
    if (Object.values(matched).includes(key)) return;
    if (selectedLeft == null) {
      setFeedback({ text: "← pick a term on the left first", err: true });
      return;
    }
    setSelectedRight(key);
  }

  return (
    <div className="dragmatch">
      <div className="dragmatch-title">↻ {title} · click a term, then its definition</div>
      <div className="dragmatch-col">
        {pairs.map((p, i) => {
          const isMatched = matched[i] != null;
          const isSelected = selectedLeft === i;
          const isWrong = wrong.left === i;
          return (
            <div
              key={i}
              className={`dragmatch-item ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""} ${isWrong ? "wrong" : ""}`}
              onClick={() => clickLeft(i)}
            >
              {p.left}
            </div>
          );
        })}
      </div>
      <div className="dragmatch-lines" aria-hidden="true">
        <svg viewBox="0 0 100 400" preserveAspectRatio="none">
          {Object.entries(matched).map(([l, r]) => {
            const li = parseInt(l, 10);
            const ri = shuffled.findIndex(s => s.key === parseInt(r, 10));
            const y1 = (li + 0.5) * (400 / pairs.length);
            const y2 = (ri + 0.5) * (400 / pairs.length);
            return (
              <path
                key={l}
                d={`M 0 ${y1} Q 50 ${(y1 + y2) / 2 + 10} 100 ${y2}`}
                fill="none"
                stroke="#2e7d4f"
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
      <div className="dragmatch-col">
        {shuffled.map(s => {
          const isMatched = Object.values(matched).includes(s.key);
          const isSelected = selectedRight === s.key;
          const isWrong = wrong.right === s.key;
          return (
            <div
              key={s.key}
              className={`dragmatch-item ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""} ${isWrong ? "wrong" : ""}`}
              onClick={() => clickRight(s.key)}
            >
              {s.text}
            </div>
          );
        })}
      </div>
      <div className={`dragmatch-feedback ${feedback.err ? "err" : ""}`}>
        {feedback.text}
      </div>
    </div>
  );
}

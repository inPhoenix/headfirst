import React, { useState } from "react";
import RichText from "./RichText";

export default function FlipCard({ question, answer, hint = "tap to flip" }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flipcard ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlipped(f => !f); }}
    >
      <div className="flipcard-inner">
        <div className="flipcard-face">
          <RichText className="q" html={question} />
          <div className="corner-hint">{hint} →</div>
        </div>
        <div className="flipcard-face back">
          <RichText className="a" html={answer} />
          <div className="corner-hint">← back</div>
        </div>
      </div>
    </div>
  );
}

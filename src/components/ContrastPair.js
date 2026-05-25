import React from "react";
import RichText from "./RichText";

export default function ContrastPair({ bad, good }) {
  return (
    <div className="contrast">
      <div className="contrast-card bad">
        <div className="verdict">✗ nope</div>
        <div className="label">{bad.label || "WHAT PEOPLE THINK"}</div>
        <RichText html={bad.html} />
      </div>
      <div className="contrast-card good">
        <div className="verdict">✓ yes!</div>
        <div className="label">{good.label || "WHAT IT ACTUALLY IS"}</div>
        <RichText html={good.html} />
      </div>
    </div>
  );
}

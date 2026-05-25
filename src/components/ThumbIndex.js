import React from "react";

export default function ThumbIndex({ levels, active, onClick }) {
  if (!levels || levels.length === 0) return null;
  return (
    <nav className="thumb-index" aria-label="Levels">
      {levels.map((lvl, i) => (
        <button
          key={lvl.id}
          className={`thumb-tab ${lvl.id} ${active === lvl.id ? "active" : ""}`}
          onClick={() => onClick(lvl.id)}
        >
          <span className="num">part {i + 1}</span>
          {lvl.label}
        </button>
      ))}
    </nav>
  );
}

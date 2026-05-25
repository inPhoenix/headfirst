import React from "react";
import Squiggle from "./Squiggle";

export default function TOC({ title = "The table of contents (also a sticky)", levels = [], onJump }) {
  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      <Squiggle />
      <div className="toc">
        {levels.map(lvl => (
          <div
            key={lvl.id}
            className={`toc-card ${lvl.id}`}
            onClick={() => onJump(`level-${lvl.id}`)}
          >
            <div className="lvl">{lvl.label}</div>
            <div className="topics">{lvl.topics}</div>
            <div className="hand" style={{ marginTop: 12, fontSize: 18, color: "var(--ink-soft)" }}>
              {(lvl.lessons || []).length} lesson{(lvl.lessons || []).length > 1 ? "s" : ""} →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

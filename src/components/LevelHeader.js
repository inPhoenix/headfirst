import React from "react";

export default function LevelHeader({ level, index }) {
  return (
    <div className={`level-header ${level.id}`} id={`level-${level.id}`} data-screen-label={`Level ${level.label}`}>
      <span className="badge">PART {index + 1}</span>
      <h2 className="hand" style={{ fontSize: 80 }}>{level.label.toLowerCase()}</h2>
      {level.intro && <span className="meta">{level.intro}</span>}
    </div>
  );
}

import React from "react";

export default function Diagram({ label = "DIAGRAM", children, style }) {
  return (
    <div className="diagram" style={style}>
      <span className="diagram-label">{label}</span>
      {children}
    </div>
  );
}

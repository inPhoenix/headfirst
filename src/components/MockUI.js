import React from "react";
import RichText from "./RichText";

export default function MockUI({ url, html, children, height = 280, annotations = [] }) {
  return (
    <div style={{ position: "relative", margin: "32px 0" }}>
      <div className="mock-ui" style={{ minHeight: height }}>
        <div className="mock-ui-bar">
          <span className="dot" /><span className="dot" /><span className="dot" />
          <span className="url">{url}</span>
        </div>
        <div className="mock-ui-body" style={{ minHeight: height - 38 }}>
          {html ? <RichText html={html} /> : children}
        </div>
      </div>
      {annotations.map((a, i) => (
        <div key={i} className="annotation" style={{ left: a.x, top: a.y, ...(a.style || {}) }}>
          {a.text}
        </div>
      ))}
    </div>
  );
}

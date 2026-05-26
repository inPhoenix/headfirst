import React from "react";
import RichText from "./RichText";

export default function FoldCard({ label, html, children }) {
  return (
    <div className="fold-card">
      {label && <div className="fold-label">{label}</div>}
      {html ? <RichText html={html} /> : children}
    </div>
  );
}

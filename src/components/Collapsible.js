import React, { useState } from "react";
import RichText from "./RichText";

export default function Collapsible({ title = "Under the hood", html, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`collapsible ${open ? "open" : ""}`}>
      <button className="collapsible-head" onClick={() => setOpen(o => !o)}>
        <span>↓ {title}</span>
        <span className="chev">›</span>
      </button>
      <div className="collapsible-body">
        <div className="collapsible-body-inner">
          {html ? <RichText html={html} /> : children}
        </div>
      </div>
    </div>
  );
}

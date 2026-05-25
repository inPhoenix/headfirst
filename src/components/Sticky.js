import React from "react";
import RichText from "./RichText";

export default function Sticky({ color = "yellow", tilt = "", tape = false, html, children, style }) {
  return (
    <div className={`sticky ${color} ${tilt}`} style={style}>
      {tape && <span className="tape" />}
      {html ? <RichText html={html} /> : children}
    </div>
  );
}

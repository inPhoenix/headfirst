import React from "react";

export default function Node({ color = "", style, children }) {
  return <span className={`node ${color}`} style={style}>{children}</span>;
}

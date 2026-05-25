import React from "react";

export default function Placeholder({ label = "image", style }) {
  return (
    <div className="placeholder-img" style={style}>
      [ {label} ]
    </div>
  );
}

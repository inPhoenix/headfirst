import React from "react";

export default function Polaroid({ caption, label = "photo", tilt = "", tape = true, width = 320 }) {
  return (
    <div className={`polaroid ${tilt}`}>
      {tape && <span className="tape-strip" />}
      <div className="photo" style={{ width }}>
        [ {label} ]
      </div>
      {caption && <div className="caption">{caption}</div>}
    </div>
  );
}

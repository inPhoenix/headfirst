import React from "react";

export default function Squiggle({ color = "#1d1812", width = "100%" }) {
  return (
    <svg width={width} height="16" viewBox="0 0 600 16" preserveAspectRatio="none"
         style={{ display: "block", margin: "32px 0", opacity: 0.6 }}>
      <path d="M 4 8 Q 30 0, 60 8 T 120 8 T 180 8 T 240 8 T 300 8 T 360 8 T 420 8 T 480 8 T 540 8 T 596 8"
            fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

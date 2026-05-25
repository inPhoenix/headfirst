import React from "react";

export default function Arrow({
  from = [10, 50],
  to = [200, 50],
  curve = 30,
  color = "black",
  label,
  labelOffset = [0, -14],
  width = 220,
  height = 100,
  dashed = false,
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - curve;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;

  const angle = Math.atan2(y2 - my, x2 - mx);
  const ah = 10;
  const ax1 = x2 - ah * Math.cos(angle - 0.5);
  const ay1 = y2 - ah * Math.sin(angle - 0.5);
  const ax2 = x2 - ah * Math.cos(angle + 0.5);
  const ay2 = y2 - ah * Math.sin(angle + 0.5);

  return (
    <svg
      className={`arrow-svg ${color}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={d} strokeDasharray={dashed ? "5 6" : "none"} />
      <polygon points={`${x2},${y2} ${ax1},${ay1} ${ax2},${ay2}`} className="arrow-head" />
      {label && (
        <text
          x={mx + labelOffset[0]}
          y={my + labelOffset[1]}
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontSize="20"
          fill={color === "red" ? "#c5362b" : color === "blue" ? "#1e5fa8" : "#1d1812"}
        >
          {label}
        </text>
      )}
    </svg>
  );
}

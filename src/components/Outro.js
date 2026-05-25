import React from "react";
import RichText from "./RichText";
import Squiggle from "./Squiggle";
import Sticky from "./Sticky";

export default function Outro({ outro }) {
  if (!outro) return null;
  return (
    <div style={{ margin: "100px 0 40px", textAlign: "center", position: "relative" }}>
      <Squiggle />
      {outro.title && <h3>{outro.title}</h3>}
      {outro.subtitle && (
        <p className="hand" style={{ fontSize: 26, color: "var(--ink-soft)", marginTop: 12 }}>
          {outro.subtitle}
        </p>
      )}
      {outro.stickies && outro.stickies.length > 0 && (
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
          {outro.stickies.map((s, i) => (
            <Sticky
              key={i}
              color={s.color}
              tilt={s.tilt}
              tape={s.tape}
              html={s.html}
              style={{ maxWidth: 260 }}
            />
          ))}
        </div>
      )}
      {outro.stamp && (
        <div className="stamp" style={{ marginTop: 40, display: "inline-flex" }}>
          <RichText as="span" html={outro.stamp} />
        </div>
      )}
    </div>
  );
}

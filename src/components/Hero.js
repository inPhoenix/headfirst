import React from "react";
import RichText from "./RichText";

export default function Hero({ hero }) {
  if (!hero) return null;
  const titleHtml = hero.subtitle
    ? `${hero.title} <span class="hand" style="font-size:36px;color:var(--ink-soft)">${hero.subtitle}</span>`
    : hero.title;
  return (
    <header className="hero">
      {hero.kicker && <div className="kicker">{hero.kicker}</div>}
      <RichText as="h1" html={titleHtml} />
      {hero.lead && <RichText className="sub" as="p" html={hero.lead} />}
      {(hero.pills && hero.pills.length > 0) || hero.note ? (
        <div className="meta-row">
          {(hero.pills || []).map((p, i) => (
            <span
              key={i}
              className="pill"
              style={p.color ? { background: `var(--sticky-${p.color})` } : undefined}
            >
              {p.label}
            </span>
          ))}
          {hero.note && <span>{hero.note}</span>}
        </div>
      ) : null}

      <svg className="doodle" style={{ left: -8, top: -30, width: 96, height: 96, opacity: 0.85 }} viewBox="0 0 140 140">
        <path d="M 30 110 Q 70 70, 100 30"
              fill="none" stroke="#c5362b" strokeWidth="2.6" strokeLinecap="round" />
        <polygon points="100,30 92,38 106,40" fill="#c5362b" />
        <text x="6" y="128" fontFamily="Caveat" fontSize="26" fill="#1d1812"
              transform="rotate(-8 6 128)">
          start here ↗
        </text>
      </svg>
    </header>
  );
}

import React from "react";

export default function Terminal({ title = "~/cron.log", lines = [] }) {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="title">{title}</span>
      </div>
      <div className="terminal-body">
        {lines.map((l, i) => {
          if (l.type === "cmd") {
            return (
              <div key={i}>
                <span className="prompt">$ </span>
                <span className="cmd">{l.text}</span>
              </div>
            );
          }
          if (l.type === "log") {
            return (
              <div key={i}>
                {l.ts && <span className="ts">[{l.ts}] </span>}
                <span className={l.ok ? "ok" : "out"}>{l.text}</span>
              </div>
            );
          }
          return <div key={i} className="out">{l.text}</div>;
        })}
        <span className="cursor" />
      </div>
    </div>
  );
}

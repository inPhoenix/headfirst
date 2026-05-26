import React, { useEffect, useState } from "react";

export default function Checklist({ id, items = [] }) {
  const [done, setDone] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`checklist:${id}`);
      if (stored) setDone(JSON.parse(stored));
    } catch (e) {}
  }, [id]);

  function toggle(i) {
    const next = { ...done, [i]: !done[i] };
    setDone(next);
    try { localStorage.setItem(`checklist:${id}`, JSON.stringify(next)); } catch (e) {}
  }

  return (
    <ul className="checklist">
      {items.map((t, i) => (
        <li key={i} className={done[i] ? "done" : ""} onClick={() => toggle(i)}>
          {t}
        </li>
      ))}
    </ul>
  );
}

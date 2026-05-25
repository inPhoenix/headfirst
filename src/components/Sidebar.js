import React from "react";

export default function Sidebar({ topics, activeId, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        Margin
        <br />
        Notes
        <small>a field guide series</small>
      </div>

      <div className="sidebar-section-label">Topics</div>
      <ul className="topic-list">
        {topics.map(t => (
          <li key={t.id}>
            <button
              className={`topic-item ${activeId === t.id ? "active" : ""}`}
              onClick={() => onSelect(t.id)}
            >
              {t.icon && <span className="icon" aria-hidden="true">{t.icon}</span>}
              <span>
                {t.vol && <span className="meta">{t.vol}</span>}
                {t.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-foot">
        ✎ add a topic by dropping a new JSON into <code>src/topics/</code>.
        <br />
        see <code>KnowledgeBase.md</code>.
      </div>
    </aside>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import TOPICS from "./topics";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Sticky from "./components/Sticky";
import TOC from "./components/TOC";
import ThumbIndex from "./components/ThumbIndex";
import LevelHeader from "./components/LevelHeader";
import Lesson from "./components/Lesson";
import Outro from "./components/Outro";

function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function TopicView({ topic }) {
  const levels = useMemo(() => topic.levels || [], [topic.levels]);
  const [activeLevel, setActiveLevel] = useState(levels[0]?.id || null);

  // observe lessons + headers to auto-update thumb index
  useEffect(() => {
    setActiveLevel(levels[0]?.id || null);
    const sections = document.querySelectorAll(".lesson, .level-header");
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        let cur = visible.target;
        while (cur && cur !== document.body) {
          if (cur.classList && cur.id && cur.id.startsWith("level-")) {
            setActiveLevel(cur.id.replace("level-", ""));
            return;
          }
          cur = cur.previousElementSibling || cur.parentElement;
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.3, 0.7, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [topic.id, levels]);

  function jumpLevel(levelId) {
    jumpTo(`level-${levelId}`);
  }

  // when topic changes, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [topic.id]);

  return (
    <>
      <ThumbIndex levels={levels} active={activeLevel} onClick={jumpLevel} />

      <div className="shell ruled">
        <div className="holes" aria-hidden="true">
          <span className="hole" />
          <span className="hole" />
          <span className="hole" />
          <span className="hole" />
        </div>

        <Hero hero={topic.hero} />

        {topic.welcomeStickies && topic.welcomeStickies.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              margin: "40px 0 30px",
              alignItems: "flex-start",
            }}
          >
            {topic.welcomeStickies.map((s, i) => (
              <Sticky
                key={i}
                color={s.color}
                tilt={s.tilt}
                tape={s.tape}
                html={s.html}
                style={{ maxWidth: 280 }}
              />
            ))}
          </div>
        )}

        <TOC title={topic.tocTitle} levels={levels} onJump={jumpTo} />

        {levels.map((lvl, i) => (
          <React.Fragment key={lvl.id}>
            <LevelHeader level={lvl} index={i} />
            {(lvl.lessons || []).map((lesson) => (
              <Lesson key={lesson.id} lesson={lesson} />
            ))}
          </React.Fragment>
        ))}

        <Outro outro={topic.outro} />
      </div>
    </>
  );
}

export default function App() {
  const [topicId, setTopicId] = useState(TOPICS[0]?.id);
  const topic = TOPICS.find((t) => t.id === topicId) || TOPICS[0];

  return (
    <div className="app">
      <Sidebar topics={TOPICS} activeId={topic.id} onSelect={setTopicId} />
      <main className="app-main">
        <TopicView topic={topic} />
      </main>
    </div>
  );
}

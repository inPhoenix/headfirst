import React from "react";
import RichText from "./RichText";
import Block from "./Block";

export default function Lesson({ lesson }) {
  return (
    <section className="lesson" id={`lesson-${lesson.id}`} data-screen-label={lesson.screenLabel}>
      {lesson.tag && <div className="lesson-tag">{lesson.tag}</div>}
      <div className="lesson-title">
        {lesson.number && <span className="lesson-num">{lesson.number}</span>}
        <RichText as="h2" html={lesson.title} />
      </div>
      {(lesson.blocks || []).map((block, i) => <Block key={i} block={block} />)}
    </section>
  );
}

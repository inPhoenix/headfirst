import React from "react";

/* Renders JSON-authored HTML. Content is trusted (authored by the topic file). */
export default function RichText({ html, as: Tag = "div", className, style }) {
  if (html === undefined || html === null) return null;
  return (
    <Tag
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

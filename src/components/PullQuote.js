import React from "react";
import RichText from "./RichText";

export default function PullQuote({ html, children, by }) {
  return (
    <blockquote className="pull-quote">
      {html ? <RichText as="span" html={html} /> : children}
      {by && <span className="by">— {by}</span>}
    </blockquote>
  );
}

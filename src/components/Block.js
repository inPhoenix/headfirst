import React from "react";
import RichText from "./RichText";
import Sticky from "./Sticky";
import Placeholder from "./Placeholder";
import Diagram from "./Diagram";
import Node from "./Node";
import Arrow from "./Arrow";
import Collapsible from "./Collapsible";
import ContrastPair from "./ContrastPair";
import Reflection from "./Reflection";
import FlipCard from "./FlipCard";
import MockUI from "./MockUI";

/* ---------- Diagram body item dispatch ---------- */
function DiagramItem({ item }) {
  switch (item.kind) {
    case "node":
      return (
        <div style={{ textAlign: "center" }}>
          <Node color={item.color || ""}>
            {item.html ? <RichText as="span" html={item.html} /> : item.label}
          </Node>
          {item.caption && (
            <div className="hand" style={{ marginTop: 8, fontSize: 18, color: "var(--muted)" }}>
              {item.caption}
            </div>
          )}
        </div>
      );
    case "arrow":
      return (
        <Arrow
          from={item.from || [0, 30]}
          to={item.to || [100, 30]}
          curve={item.curve ?? 10}
          width={item.width ?? 100}
          height={item.height ?? 60}
          color={item.color || "black"}
          label={item.label}
          dashed={item.dashed}
        />
      );
    case "text":
      return <RichText html={item.html} className={item.className} style={item.style} />;
    case "html":
    default:
      return <RichText html={item.html} />;
  }
}

function DiagramBody({ block }) {
  if (block.html) return <RichText html={block.html} />;

  const layout = block.layout || "flex-row";
  const styles = {
    "flex-row": {
      display: "flex",
      alignItems: "center",
      justifyContent: block.justify || "space-around",
      flexWrap: "wrap",
      gap: block.gap ?? 24,
      position: "relative",
    },
    "flex-column": {
      display: "flex",
      flexDirection: "column",
      gap: block.gap ?? 14,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: block.gridTemplateColumns || "repeat(3, 1fr)",
      alignItems: "center",
      gap: block.gap ?? 12,
    },
  };

  return (
    <>
      <div style={styles[layout] || styles["flex-row"]}>
        {(block.items || []).map((it, i) => <DiagramItem key={i} item={it} />)}
      </div>
      {block.caption && (
        <p
          className="hand"
          style={{
            fontSize: 22,
            marginTop: 20,
            marginBottom: 0,
            color: "var(--ink-soft)",
            textAlign: "center",
          }}
        >
          <RichText as="span" html={block.caption} />
        </p>
      )}
    </>
  );
}

/* ---------- Metaphor (two-col: sticky+text vs picture) ---------- */
function MetaphorBlock({ block }) {
  const textCol = (
    <div>
      {block.sticky && (
        <Sticky
          color={block.sticky.color}
          tilt={block.sticky.tilt}
          tape={block.sticky.tape}
          html={block.sticky.html}
        />
      )}
      {block.html && <RichText style={{ marginTop: 20 }} html={block.html} />}
    </div>
  );
  const imgCol = block.image
    ? <img src={block.image} alt={block.imageAlt || ""} className="placeholder-img" style={{ aspectRatio: "4/3", objectFit: "cover" }} />
    : <Placeholder label={block.placeholder || "image"} />;

  const imageSide = block.imageSide || "right";
  return (
    <div className="metaphor">
      {imageSide === "left" ? imgCol : textCol}
      {imageSide === "left" ? textCol : imgCol}
    </div>
  );
}

/* ---------- FlipCards (auto-pair into a metaphor-style grid) ---------- */
function FlipCardsBlock({ block }) {
  return (
    <div className="metaphor" style={{ marginTop: 20 }}>
      {(block.items || []).map((c, i) => (
        <FlipCard key={i} question={c.question} answer={c.answer} hint={c.hint} />
      ))}
    </div>
  );
}

/* ---------- Top-level dispatch ---------- */
export default function Block({ block }) {
  switch (block.type) {
    case "metaphor":
      return <MetaphorBlock block={block} />;
    case "diagram":
      return (
        <Diagram label={block.label} style={block.style}>
          <DiagramBody block={block} />
        </Diagram>
      );
    case "contrast":
      return <ContrastPair bad={block.bad} good={block.good} />;
    case "collapsible":
      return <Collapsible title={block.title} defaultOpen={block.open} html={block.html} />;
    case "reflection":
      return <Reflection id={block.id} prompt={block.prompt} hint={block.hint} />;
    case "flipcards":
      return <FlipCardsBlock block={block} />;
    case "mockui":
      return (
        <MockUI
          url={block.url}
          height={block.height}
          html={block.html}
          annotations={block.annotations || []}
        />
      );
    case "sticky":
      return (
        <Sticky
          color={block.color}
          tilt={block.tilt}
          tape={block.tape}
          html={block.html}
          style={block.style}
        />
      );
    case "html":
      return <RichText html={block.html} />;
    default:
      console.warn(`Unknown block type: ${block.type}`);
      return null;
  }
}

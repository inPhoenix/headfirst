# Knowledge Base — How to add a new topic to Margin Notes

This site is a "Margin Notes" field guide. The look & feel (sticky notes, marker
underlines, hand-drawn arrows, flip cards, reflection prompts) is fixed. The
**content** is driven entirely by JSON files in `src/topics/`. One JSON file =
one topic = one sidebar entry.

This document is written so you can hand it to an AI and say:
**"Read KnowledgeBase.md and generate a topic JSON for X."**

---

## 1. The 30-second tour

```
src/
├── topics/
│   ├── ai.json          ← one topic
│   ├── nodejs.json      ← another topic
│   ├── devops.json
│   └── index.js         ← registers topics for the sidebar
├── components/          ← reusable UI primitives
├── App.js               ← shell + sidebar + topic switcher
├── styles.css           ← the design tokens & visual style
└── index.css            ← sidebar layout
```

To add a new topic:

1. Drop `<your-topic>.json` into `src/topics/`.
2. Import it in `src/topics/index.js` and add it to the `TOPICS` array.
3. That's it. The sidebar entry, hero, lessons, level navigation, and outro
   all render from the JSON.

---

## 2. The schema, at a glance

A topic JSON is one object. Top-level keys:

| Key                | Required | What it is |
|--------------------|----------|------------|
| `id`               | yes      | URL-safe slug. Used internally as the topic key. |
| `label`            | yes      | Sidebar text (e.g. `"Node.js"`). |
| `icon`             | no       | Emoji shown in the sidebar (e.g. `"🤖"`). |
| `vol`              | no       | Volume tag for the sidebar (e.g. `"VOL 02"`). |
| `hero`             | yes      | The big title page at the top. |
| `welcomeStickies`  | no       | Sticky notes shown right under the hero. |
| `tocTitle`         | no       | Heading above the table of contents. |
| `levels`           | yes      | Array of levels. Each level contains lessons. |
| `outro`            | no       | The closing section at the bottom. |

All "text" fields support inline HTML — this is how you get bold, italics,
highlights, code, and the marker-underline effect (see §5).

---

## 3. The pieces

### 3.1 `hero`

```json
"hero": {
  "kicker": "★ MARGIN NOTES · VOL 02",
  "title": "What is <span class=\"swap\">Node.js</span>,<br/>really?",
  "subtitle": "(and friends.)",
  "lead": "A scribbled-in field guide to Node.js — the runtime...",
  "pills": [
    { "label": "~10 MIN READ", "color": "yellow" },
    { "label": "3 LESSONS",    "color": "mint"   },
    { "label": "2 LEVELS",     "color": "pink"   }
  ],
  "note": "← drag the thumb tabs on the right →"
}
```

- `title` is HTML. Wrap the *one word* you want in red marker color with
  `<span class="swap">…</span>`.
- `pills` color values: `yellow | mint | pink | sky | lilac`.

### 3.2 `welcomeStickies`

A small set of sticky notes between the hero and the table of contents. 2-3
works best.

```json
"welcomeStickies": [
  { "color": "yellow", "tilt": "tilt2", "tape": true,
    "html": "✎ How to read this:<br/><br/>scroll. scribble. flip cards." },
  { "color": "pink",   "tilt": "tilt3", "tape": true, "html": "..." }
]
```

Sticky options:
- `color`: `yellow | pink | mint | sky | lilac`
- `tilt`: `""` (default, slight CCW) `| right | flat | tilt2 | tilt3`
- `tape`: `true` adds a strip of washi tape at the top.

### 3.3 `levels` & lessons

A `level` is "Basic / Intermediate / Advanced" — a section divider with its own
tab in the right-edge thumb index. Each level contains one or more lessons.

```json
"levels": [
  {
    "id": "basic",
    "label": "BASIC",
    "topics": "AI · Chatbots",
    "intro": "— the parts you'll meet first.",
    "lessons": [ { … }, { … } ]
  }
]
```

Level `id` values are styling hooks — **use `basic`, `intermediate`, or
`advanced`** so the existing color theme picks up (green / orange / red badges,
mint / pink / sky cards). You can have 1, 2, or 3 levels.

### 3.4 A single lesson

```json
{
  "id": 1,
  "tag": "LESSON 01 · BASIC",
  "number": "01",
  "screenLabel": "L1 What is X",
  "title": "So, what <span class=\"marker-underline\">actually</span> is X?",
  "blocks": [ … ]
}
```

- `id` must be unique across the topic; used as the DOM id and as a key.
- `title` is HTML. Use `<span class="marker-underline">word</span>` to draw the
  red squiggly marker line under one or two key words. Add the `blue` or `green`
  modifier (`marker-underline blue`) for variety.
- `blocks` is the lesson body. See §4.

### 3.5 `outro`

```json
"outro": {
  "title": "That's the field guide.",
  "subtitle": "Now go build something weird with it.",
  "stickies": [ { "color": "lilac", "tilt": "tilt2", "tape": true, "html": "..." } ],
  "stamp": "VOL.<br/>02<br/>DONE"
}
```

`stamp` is the red circle in the bottom right. Three lines, separated by
`<br/>`.

---

## 4. Block types — the lesson body

A lesson is a list of `blocks`. Each block has a `type` and a few fields. The
renderer dispatches on `type` (see [src/components/Block.js](src/components/Block.js)).

### 4.1 `metaphor` — sticky note + paragraphs next to a "picture"

```json
{
  "type": "metaphor",
  "imageSide": "right",
  "sticky": {
    "color": "yellow",
    "tape": true,
    "html": "Imagine a parrot that has read every book ever written…"
  },
  "html": "<p>That's most of what we call \"AI\" today. <span class=\"highlight\">Pattern-matching at a planetary scale.</span></p>",
  "placeholder": "metaphor: parrot in a library, reading every book at once"
}
```

- `imageSide`: `"left"` or `"right"`. Where the placeholder image sits.
- `placeholder`: the text that appears inside the dashed-hatched image box.
  This is intentional — the placeholders read like art-direction notes.
- `image` (optional): instead of a placeholder, you can pass an image URL.

### 4.2 `diagram` — labeled box with nodes + arrows

Two ways to author a diagram. Use whichever fits.

**A) Structured items (preferred for simple flows):**

```json
{
  "type": "diagram",
  "label": "THE AGENT LOOP",
  "layout": "flex-row",
  "gap": 32,
  "justify": "center",
  "items": [
    { "kind": "node",  "color": "yellow", "label": "Think", "caption": "what should I do?" },
    { "kind": "arrow", "from": [5, 30], "to": [80, 30], "curve": -15, "width": 90, "height": 60 },
    { "kind": "node",  "color": "pink",  "label": "Act",   "caption": "use a tool" },
    { "kind": "arrow", "color": "red", "label": "loop until done" }
  ],
  "caption": "← bigger, more general | narrower, more specific →"
}
```

- `layout`: `flex-row` (default), `flex-column`, or `grid`.
  - For `grid`, set `gridTemplateColumns: "auto 1fr auto 1fr auto"`.
- `items` is a list of:
  - `{ kind: "node", color, label, caption? }` — color: `yellow | pink | mint | sky | dark` or omit for plain white.
  - `{ kind: "arrow", from?, to?, curve?, width?, height?, color?, label?, dashed? }`
  - `{ kind: "text", html, className?, style? }` — for inline hand-written labels.
  - `{ kind: "html", html }` — for one-off custom markup.
- `caption` is a hand-written line under the diagram body.

**B) Raw HTML body (for unusual layouts):**

```json
{
  "type": "diagram",
  "label": "ANATOMY OF A CRON EXPRESSION",
  "html": "<pre class=\"mono\">…</pre><div>…</div>"
}
```

Use `html` when you need a `<pre>` block, a custom grid of labels, or
anything else the structured form can't express.

### 4.3 `contrast` — "nope" vs. "yes!" pair

```json
{
  "type": "contrast",
  "bad":  { "label": "COMMON MISCONCEPTION", "html": "<p>\"AI is a robot brain…\"</p>" },
  "good": { "label": "MORE ACCURATE",        "html": "<p>\"AI is statistics with a really good vocabulary.\"</p>" }
}
```

Renders as two cards side-by-side with a red ✗ and a green ✓ verdict stamp.

### 4.4 `collapsible` — "Under the hood" expand

```json
{
  "type": "collapsible",
  "title": "Under the hood — why does it work at all?",
  "open": false,
  "html": "<p>A modern AI model is a giant function. …</p><p>…</p>"
}
```

Use this for the technical-depth digression that not every reader needs.

### 4.5 `reflection` — a textarea that saves to localStorage

```json
{
  "type": "reflection",
  "id": "ai-l1-reflect",
  "prompt": "In your own words: if AI is 'pattern matching,' where would that fail?",
  "hint": "e.g. brand new situations, math, anything requiring lived experience…"
}
```

The `id` is used as the localStorage key. Use `<topic>-<lesson>-<purpose>` so
two topics don't collide.

### 4.6 `flipcards` — paired Q/A cards

```json
{
  "type": "flipcards",
  "items": [
    { "question": "Why does <code>while(true){}</code> freeze Node?",
      "answer":   "Because the event loop is one thread…" }
  ]
}
```

Both `question` and `answer` support inline HTML. Use 2 items for the typical
side-by-side layout.

### 4.7 `mockui` — annotated fake-browser screenshot

```json
{
  "type": "mockui",
  "url": "agent.example.com/skills",
  "height": 220,
  "annotations": [
    { "x": -160, "y": 50, "text": "↗ the skill list, like apps on a phone" },
    { "x": "100%", "y": 130, "text": "↖ each one has a hint", "style": { "marginLeft": 12 } }
  ],
  "html": "<div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\">…</div>"
}
```

- `annotations` are positioned absolutely outside or over the mock. Negative
  `x` puts the note in the left margin; `"100%"` puts it in the right margin.
- `html` is the body of the mock. Use inline styles freely — the mock area is
  a small island.

### 4.8 `sticky` — a free-standing sticky note

```json
{ "type": "sticky", "color": "lilac", "tilt": "tilt2", "tape": true,
  "html": "✎ tiny aside that doesn't fit anywhere else." }
```

### 4.9 `html` — escape hatch

```json
{ "type": "html", "html": "<div>arbitrary HTML</div>" }
```

Use sparingly. Prefer the structured blocks above.

---

## 5. Inline markup cheat sheet

These CSS classes are baked into the design. Use them inside any `html` field.

| Class                          | Effect |
|--------------------------------|--------|
| `class="marker-underline"`     | red squiggly marker line under a word |
| `class="marker-underline blue"` | same, in blue |
| `class="marker-underline green"` | same, in green |
| `class="highlight"`            | yellow highlighter behind the text |
| `class="circle-it"`            | red hand-drawn circle around the phrase |
| `class="hand"`                 | hand-lettered Caveat font |
| `class="mono"`                 | JetBrains Mono font |
| `class="joke"`                 | greyed-out "aside" paragraph (hidden when humor=dry) |
| `class="joke-spicy"`           | extra-spicy aside (hidden when humor≠full) |
| `class="swap"`                 | red marker color (use inside the hero title) |

Available inline tags: `<i>`, `<b>`, `<code>`, `<span>`, `<p>`, `<br/>`, `<pre>`.

Available CSS variables (use as `color: var(--marker-red)` etc.):
`--ink`, `--ink-soft`, `--muted`, `--marker-red`, `--marker-blue`,
`--marker-green`, `--sticky-yellow`, `--sticky-pink`, `--sticky-mint`,
`--sticky-sky`, `--sticky-lilac`, `--paper`, `--paper-deep`.

---

## 6. A complete minimal topic

```json
{
  "id": "rust",
  "label": "Rust",
  "icon": "🦀",
  "vol": "VOL 04",
  "hero": {
    "kicker": "★ MARGIN NOTES · VOL 04",
    "title": "What is <span class=\"swap\">Rust</span>, really?",
    "subtitle": "(and the borrow checker.)",
    "lead": "A scribbled-in field guide to ownership, lifetimes, and why your code won't compile.",
    "pills": [
      { "label": "~12 MIN READ", "color": "yellow" },
      { "label": "2 LESSONS",    "color": "mint"   },
      { "label": "1 LEVEL",      "color": "pink"   }
    ]
  },
  "tocTitle": "What's inside",
  "levels": [
    {
      "id": "basic",
      "label": "BASIC",
      "topics": "Ownership · Borrows",
      "intro": "— the part that scares people away. it shouldn't.",
      "lessons": [
        {
          "id": 1,
          "tag": "LESSON 01 · BASIC",
          "number": "01",
          "screenLabel": "L1 Ownership",
          "title": "Ownership is a <span class=\"marker-underline\">library card</span>",
          "blocks": [
            {
              "type": "metaphor",
              "imageSide": "right",
              "sticky": { "color": "yellow", "tape": true,
                "html": "Only one person can hold a library book at a time. To lend it to a friend, you either give it up — or you let them <i>borrow</i> it." },
              "html": "<p>That's ownership. <span class=\"highlight\">Every value has exactly one owner.</span> When the owner goes out of scope, the value is freed.</p>",
              "placeholder": "metaphor: a library card with a single name on it"
            },
            {
              "type": "reflection",
              "id": "rust-l1-reflect",
              "prompt": "Pick a language you know well. What does <i>it</i> do when an owner goes out of scope?"
            }
          ]
        }
      ]
    }
  ],
  "outro": {
    "title": "That's the Rust field guide.",
    "subtitle": "Now go fight the borrow checker, and win.",
    "stamp": "VOL.<br/>04<br/>DONE"
  }
}
```

Drop that into `src/topics/rust.json`, register it in `src/topics/index.js`, and
the topic shows up in the sidebar.

---

## 7. Prompt template for asking an AI to generate a topic

> Read `KnowledgeBase.md`. Then generate a topic JSON for **"<your topic>"**.
>
> Requirements:
> - 3 levels (`basic`, `intermediate`, `advanced`) with 1-3 lessons each.
> - Each lesson opens with a `metaphor` block using a vivid everyday image.
> - Each lesson has at least one of: `diagram`, `contrast`, `flipcards`, or
>   `mockui`.
> - Every lesson ends with a `reflection` prompt.
> - Use the snarky, plain-spoken voice from the AI topic (`src/topics/ai.json`).
>   Include one `class="joke"` paragraph per lesson and one `class="joke-spicy"`
>   if it fits.
> - Output only valid JSON. No prose outside the JSON.

The AI should produce a file ready to drop into `src/topics/`.

---

## 8. Things to remember

- **Inline HTML inside JSON strings.** Don't forget to escape `"` as `\"`.
- **Unique `reflection.id` across topics.** Otherwise localStorage collides.
- **Use `basic/intermediate/advanced` for level IDs** if you want the existing
  color theme. Other ids work but render as plain.
- **The thumb index** on the right edge is generated from `levels`. With 1
  level you get 1 tab; that's fine.
- **Test locally:** `npm start`. The site reloads on JSON save.
- **No build step for content.** The JSON files are imported directly by
  Webpack and bundled.

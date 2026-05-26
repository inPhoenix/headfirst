# Knowledge Base — How to add a new topic to Margin Notes

This site is a "Margin Notes" field guide. The look & feel (sticky notes, marker
underlines, hand-drawn arrows, flip cards, reflection prompts) is fixed. The
**content** is driven entirely by JSON files in `src/topics/`. One JSON file =
one topic = one sidebar entry.

This document is written so you can hand it to an AI and say:
**"Read KnowledgeBase.md and generate a topic JSON for X."**

The schema is the easy part. Writing a topic that *teaches* is the harder part
— so §4 below is dedicated to the Head First-style techniques the design is
built to serve. Skim it before you write a lesson; you'll skip a redraft.

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
highlights, code, and the marker-underline effect (see §6).

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
- `blocks` is the lesson body. See §5.

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

## 4. Writing in the Head First voice

The schema is the skeleton. This section is the muscle. Every block type in §5
exists because *Head First*-style books proved that one specific technique
helps learners retain a concept. The list below maps each technique to the
blocks that carry it — so when you're writing a lesson, you know which tool
serves which goal.

If you remember only one thing: **a Head First lesson is not a textbook page
made friendly. It's a different shape entirely.** Story before theory. Picture
before sentence. Question before answer. Bad example before good one. The
reader should never feel like they've been handed a definition cold.

### 4.1 Visual learning — show before you tell

**Carriers:** `metaphor` (sticky + placeholder image), `diagram` (nodes +
arrows), the `placeholder` text itself.

- Open every lesson with a `metaphor` block. The `placeholder` is not a
  loading state — it's an *art-direction note* read by a human, e.g.
  *"chef hat above a pot, with tools (knife, timer, spoon) flying in."*
  Treat it like a caption to a missing illustration.
- Use `diagram` blocks for any process, comparison, or hierarchy. Three nodes
  with arrows beats a paragraph that says "first X happens, then Y, then Z."
- Pair every key concept with both a sticky note (emotion) and a diagram
  (structure). The reader's brain encodes the same idea twice, two different
  ways.

### 4.2 Conversational tone — one friend at a bar

**Carriers:** every `html` field, especially metaphors and stickies. The
`class="joke"` and `class="joke-spicy"` classes for tone control.

- Write as if explaining the idea to one curious friend over a drink. Use
  "you." Use contractions. Use asides.
- Read every sentence out loud. If it sounds like a textbook, rewrite it.
  *"Half the internet runs on it anyway"* beats *"It remains widely used in
  production environments."*
- Reach for "imagine," "picture this," "you've probably noticed." Avoid "as
  one can observe," "it is often the case that," and any sentence containing
  the word "synergy."

### 4.3 Active learning — make the reader do something

**Carriers:** `reflection` (mandatory), `flipcards`, `contrast` (the reader
chooses sides).

- **Every lesson ends with a `reflection` block.** No exceptions. Even a
  one-question reflection beats none.
- Use `flipcards` for recall checks — "you should already know this, but do
  you?" The answer goes on the back, never the front.
- Phrase prompts so the reader has to take a *position*, not parrot a
  definition. "Name a task you'd trust an agent with, and one you wouldn't"
  beats "list three properties of an agent."

### 4.4 Repetition with variation — three shapes, one idea

**Carriers:** the whole block library, used together.

- The same concept should appear at least **three times in a lesson, in three
  different shapes**: metaphor → diagram → contrast → flipcard. Each shape
  rewrites the idea, doesn't restate it.
- A lesson on "agent" might appear as: a chef (metaphor), a think/act/observe
  loop (diagram), chatbot-vs-agent (contrast), "name a task" (reflection).
  Same idea, four angles.
- **Reapply, don't restate.** Three paragraphs that say the same thing in
  slightly different words is *not* repetition — it's filler.

### 4.5 Story before theory — metaphor first, definition optional

**Carriers:** `metaphor` opens the lesson. `collapsible` hides the depth.

- A `metaphor` block is the first body block of every lesson. Period. If the
  lesson opens with a definition, the format is broken.
- Theory and formal definitions live inside `collapsible` ("Under the hood").
  That box is opt-in — the curious reader opens it, the busy reader doesn't.
- The metaphor is not an ornament. It's the *primary teaching artifact*. The
  rest of the lesson hangs off it.

### 4.6 Humor and emotion — earned, not sprinkled

**Carriers:** `sticky` notes (free-standing), `class="joke"`, `class="joke-spicy"`.

- Stickies are *emotional* asides — the margin scribble, the warning, the
  small dread. Don't put facts in them; put feelings.
- `class="joke"` pays for the paragraph that follows it. It's bait — earn the
  attention, then use it.
- `class="joke-spicy"` is the line you'd whisper to a peer. It's optional
  (hidden when humor=friendly or dry), so authors can be braver than they'd
  be in print.
- One good joke per lesson. Two is fine. Three is a podcast.

### 4.7 Cognitive load — one idea per lesson, deferred depth

**Carriers:** small lessons, `collapsible` blocks, `welcomeStickies` for tone.

- **One lesson, one idea.** If a lesson sprouts a second concept, split it
  into two lessons. Two short lessons beats one ambitious one, every time.
- Use `collapsible` to *defer* depth — never to hide it. The reader who
  doesn't need it skips; the reader who does opens it without losing place.
- Use `welcomeStickies` (at the top of the topic) to tell the reader's
  nervous system to stand down: "no equations. no ten-syllable words. no
  synergy." Lowering expectations *raises* retention.

### 4.8 Metacognition — help the reader notice their own learning

**Carriers:** `reflection` prompts, the `hint` field, framing of
`flipcards`.

- A great reflection prompt asks the reader to **predict, doubt, or project
  onto their own work**, not to recite.
  - Worst: "What is X?"
  - Better: "Where would X fail?"
  - Best: "Has X ever surprised you in your own work? How?"
- The `hint` field on a reflection is *not* the answer. It's a suggested
  direction — "e.g. brand new situations, math, anything requiring lived
  experience…" — to help a stuck reader unstick.
- Flipcard fronts should pose a question the reader can answer before
  flipping. The card is calibration: "did I actually understand that, or was
  I nodding along?"

### 4.9 Teach by contrast — wrong way first, right way next

**Carriers:** `contrast` blocks (always paired, always bad-then-good).

- People remember the wrong way longer than they remember the right way. Use
  that. Lead with the misconception, then correct it.
- Every lesson that addresses a common confusion gets a `contrast` block.
  Quote the kind of sentence a peer would *actually* say on the bad side.
  Don't strawman.
- The `bad.label` should name the *category* of error ("COMMON
  MISCONCEPTION", "TRADITIONAL UI", "RISKY"), not just say "WRONG."

### 4.10 Practical application — leave a fingerprint, not a fact sheet

**Carriers:** `reflection` prompts (bias toward use), the `outro` subtitle,
the `mockui` block (concrete UI, not abstract diagram).

- Reflection prompts should bias toward *use*: "where in your work could this
  show up?" not "what did you learn?"
- The `outro.subtitle` is the closing call to action: *"Now go build
  something weird with it"* — point the reader at their day job.
- Use `mockui` to show the idea *in a real interface*, not just as a
  diagram. The reader's brain remembers shapes that look like apps it has
  already used.

### 4.11 Voice calibration — before/after

> ❌ *"Artificial intelligence is a class of computer programs that exhibit
> behaviors associated with intelligence, such as pattern recognition,
> prediction, and natural language processing."*
>
> ✅ *"Imagine a parrot that has read every book ever written. It can't fly,
> it can't make coffee — but ask it anything, and it'll squawk back something
> that sounds weirdly smart. That's most of what we call 'AI' today —
> pattern-matching at a planetary scale."*

Same fact. Different format. The second is a Head First lesson. The first is
homework. The difference is not vocabulary; it's that the second one *starts
in the reader's life*, not in the textbook's.

### 4.12 Recommended lesson skeleton

The block library composes naturally into a Head First lesson. This is the
recipe — not a law, but a strong default:

```txt
1.  metaphor       — a sticky note + a vivid picture     (story before theory)
2.  diagram        — structure the metaphor              (visual learning)
3.  contrast       — common wrong way vs. right way      (learn through error)
4.  collapsible    — "Under the hood" for the curious    (deferred depth)
5.  flipcards      — quick recall calibration            (active + repetition)
6.  reflection     — apply it to your own world          (metacognition + use)
```

You can drop or reorder pieces — a fact-heavy lesson might skip the contrast;
a hands-on lesson might add a second `mockui` between steps 3 and 4. But every
lesson should hit at least one block from each of these three categories:

- **Encounter**: `metaphor` (always).
- **Make it stick**: at least one of `diagram`, `contrast`, `flipcards`,
  `mockui`.
- **Apply**: `reflection` (always).

If a lesson has only a metaphor and a reflection, it's a stub — not done.

### 4.13 Beyond the basics — visual components for specific techniques

The block library has a second tier of richer visual components. Each one
exists because it carries a specific technique better than a plain block can.
Reach for them when the basic block would be too generic.

| Component                       | Technique it serves                              | Use when…                                              |
|---------------------------------|--------------------------------------------------|--------------------------------------------------------|
| `polaroid` (or `metaphor.polaroid`) | Visual learning (§4.1) — concrete > abstract     | the metaphor needs to feel like an *actual photo*      |
| `phone`                         | Visual learning + practical app (§4.1, §4.10)    | the example is a chat / mobile interaction             |
| `terminal`                      | Visual learning + practical app (§4.1, §4.10)    | the example is CLI output, cron, logs                  |
| `foldcard`                      | Cognitive load (§4.7) — sidebar fact, not lesson | dropping a quick fact, tip, or warning inline          |
| `pullquote`                     | Repetition + emotion (§4.4, §4.6)                | a sentence is good enough to land twice                |
| `bigstamp`                      | Emotion + reward (§4.6)                          | the lesson ends and you want the reader to feel it     |
| `checklist`                     | Active learning (§4.3) — do-something            | turning advice into a checkable list the reader keeps  |
| `margindoodle`                  | Emotion (§4.6) — a margin scribble               | a side comment the author wanted to add later          |
| `dragmatch`                     | Active learning + repetition (§4.3, §4.4)        | the concept has clean term/definition pairs            |
| `animated-arrow` (diagram item) | Visual learning (§4.1) — motion = attention      | an important flow you want the eye to actually follow  |
| `class="highlight-anim"` (inline) | Visual learning + emphasis (§4.1)              | one phrase per lesson you want to land like a punch    |

Rule of thumb: **one richer component per lesson, not five.** They're seasoning.
A lesson that opens with a polaroid, contains a phone, ends with a bigstamp,
sprinkles three margindoodles, and includes a dragmatch is showing off —
not teaching.

---

## 5. Block types — the lesson body

A lesson is a list of `blocks`. Each block has a `type` and a few fields. The
renderer dispatches on `type` (see [src/components/Block.js](src/components/Block.js)).

### 5.1 `metaphor` — sticky note + paragraphs next to a "picture"

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
- `polaroid` (optional): set to `true` (or an object of polaroid options) to
  render the image side as a Polaroid — masking-tape photo frame with the
  `placeholder` text as the handwritten caption. See §5.10 for full options.

```json
{
  "type": "metaphor",
  "imageSide": "right",
  "sticky": { "color": "yellow", "html": "…" },
  "html": "<p>…</p>",
  "placeholder": "the parrot, mid-squawk",
  "polaroid": true
}
```

### 5.2 `diagram` — labeled box with nodes + arrows

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
  - `{ kind: "animated-arrow", … }` — same fields as `arrow`, but fades in
    when scrolled into view. Use for "the one important flow" — don't animate
    every arrow on the page.
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

### 5.3 `contrast` — "nope" vs. "yes!" pair

```json
{
  "type": "contrast",
  "bad":  { "label": "COMMON MISCONCEPTION", "html": "<p>\"AI is a robot brain…\"</p>" },
  "good": { "label": "MORE ACCURATE",        "html": "<p>\"AI is statistics with a really good vocabulary.\"</p>" }
}
```

Renders as two cards side-by-side with a red ✗ and a green ✓ verdict stamp.

### 5.4 `collapsible` — "Under the hood" expand

```json
{
  "type": "collapsible",
  "title": "Under the hood — why does it work at all?",
  "open": false,
  "html": "<p>A modern AI model is a giant function. …</p><p>…</p>"
}
```

Use this for the technical-depth digression that not every reader needs.

### 5.5 `reflection` — a textarea that saves to localStorage

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

### 5.6 `flipcards` — paired Q/A cards

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

### 5.7 `mockui` — annotated fake-browser screenshot

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

### 5.8 `sticky` — a free-standing sticky note

```json
{ "type": "sticky", "color": "lilac", "tilt": "tilt2", "tape": true,
  "html": "✎ tiny aside that doesn't fit anywhere else." }
```

### 5.9 `html` — escape hatch

```json
{ "type": "html", "html": "<div>arbitrary HTML</div>" }
```

Use sparingly. Prefer the structured blocks above.

### 5.10 `polaroid` — masking-tape photo frame with handwritten caption

```json
{
  "type": "polaroid",
  "label": "photo: chef, mid-chop",
  "caption": "the chef's mise en place",
  "tilt": "right",
  "tape": true,
  "width": 320
}
```

- `label`: the placeholder text shown inside the photo area (an
  art-direction note — same convention as `metaphor.placeholder`).
- `caption`: the handwritten line under the photo. Keep it short.
- `tilt`: `""` (default, slight CCW), `"right"`, or `"flat"`.
- `tape`: `true` (default) adds a strip of washi tape at the top.
- `width`: photo width in px. Default `320`.

**When to use:** standalone, when the picture *is* the point — a portrait,
an artifact, an "exhibit A." For a metaphor's image-side polaroid, prefer
adding `"polaroid": true` to a `metaphor` block (§5.1).

### 5.11 `phone` — mobile chat mockup

```json
{
  "type": "phone",
  "headerName": "Haiku Bot",
  "messages": [
    { "from": "you",  "text": "Write me a haiku about Mondays." },
    { "typing": true },
    { "from": "them", "text": "Alarm clock screams\nCoffee's not strong enough yet —\nMug judges my soul." }
  ]
}
```

- `headerName`: name shown at the top of the chat. First letter becomes
  the avatar.
- `messages`: array of `{ from: "you" | "them", text }` or `{ typing: true }`.
  Use `text` containing `\n` for line breaks.

**When to use:** chatbot lessons (this is the L2 example), any "user says X,
app says Y" interaction. More memorable than a generic `mockui`.

### 5.12 `terminal` — dark terminal window with traffic lights & blinking cursor

```json
{
  "type": "terminal",
  "title": "~/agent/cron.log — live",
  "lines": [
    { "type": "cmd", "text": "crontab -l" },
    { "type": "log", "ts": "07:00:01", "text": "morning-brief: queued", "ok": false },
    { "type": "log", "ts": "07:00:09", "text": "morning-brief: OK (8s)", "ok": true },
    { "type": "out", "text": "(waiting for next tick…)" }
  ]
}
```

- `title`: text in the title bar.
- `lines`: each line is one of:
  - `{ type: "cmd", text }` — green `$ ` prompt + command in white.
  - `{ type: "log", ts?, text, ok? }` — optional timestamp; `ok: true`
    colors the line green, otherwise muted.
  - `{ type: "out", text }` — plain output.

**When to use:** cron, build output, log streams. Pairs well with
`class="mono"` text elsewhere in the lesson.

### 5.13 `foldcard` — paper card with a folded top-right corner

```json
{
  "type": "foldcard",
  "label": "QUICK FACT",
  "html": "<p>The first cron daemon shipped in <b>1975</b>. The syntax hasn't really changed since.</p>"
}
```

- `label`: small uppercase tag at the top.
- `html`: card body.

**When to use:** a one-paragraph aside that's too important to bury inside a
`collapsible` but too small to deserve its own section. Sidebar facts,
"pro tips," "watch out for…" notes.

### 5.14 `pullquote` — oversized handwritten quote with a serif quotation mark

```json
{
  "type": "pullquote",
  "html": "It's not magic. It's <span class=\"highlight-anim pink\">linear algebra at scale</span>, and it's still very impressive.",
  "by": "every honest AI researcher, eventually"
}
```

- `html`: the quote body (inline HTML supported).
- `by` (optional): attribution line.

**When to use:** when a sentence from the lesson is good enough to slow the
reader down and let it land. Don't overuse — one per lesson, two for the
whole topic.

### 5.15 `bigstamp` — circular stamp seal that pops in on scroll

```json
{
  "type": "bigstamp",
  "text": "GOT IT!",
  "color": "green",
  "align": "center"
}
```

- `text`: 1–3 short words. Renders uppercase.
- `color`: `""` (red, default) or `"green"`.
- `align`: text alignment of the wrapper — `"center"` (default), `"left"`,
  `"right"`.

**When to use:** the *end* of a lesson, a level, or the whole topic. A
reward. Don't put one halfway through.

### 5.16 `checklist` — hand-drawn checkboxes that strikethrough on click

```json
{
  "type": "checklist",
  "id": "l4-skills",
  "items": [
    "pick a real task you do weekly",
    "write the 'when to use it' hint first, code second",
    "test with a wrong prompt — does the agent still pick it?"
  ]
}
```

- `id`: localStorage key. Use `<topic>-<lesson>-<purpose>` to avoid collisions.
- `items`: array of strings. Each line renders as a checkbox + handwritten text.

The reader's ticks persist across reloads.

**When to use:** turning a lesson's advice into something the reader can
*do* later. Works especially well wrapped in a `foldcard` labeled
`"YOUR TURN — TICK THE SKILLS YOU'D ADD"`.

### 5.17 `margindoodle` — a sketched note that pops in from the left margin

```json
{
  "type": "margindoodle",
  "top": 40,
  "html": "← reread this part later"
}
```

- `top`: vertical offset from the parent's top, in px.
- `html`: very short text. Long content gets clipped.

**When to use:** a tiny annotation that should feel like the author added it
in pen after the lesson was written. Doesn't render on screens narrower
than 1100px — by design.

### 5.18 `dragmatch` — click-to-pair matching exercise

```json
{
  "type": "dragmatch",
  "title": "MATCH THE TERMS",
  "pairs": [
    { "left": "chatbot", "right": "one turn in, one turn out" },
    { "left": "agent",   "right": "decides what to do, then does it" },
    { "left": "skill",   "right": "a named ability the agent can call" },
    { "left": "cron",    "right": "an alarm clock for software" }
  ]
}
```

- `title`: small uppercase prompt above the exercise.
- `pairs`: array of `{ left, right }`. The right column is auto-shuffled.
  Click a left term, then click its definition on the right. Wrong matches
  shake; correct matches snap green and draw a dashed connector.

**When to use:** the lesson is dense with named concepts (skills, cron
fields, agent terminology). Use *after* the concepts have been introduced,
as a recall check.

---

## 6. Inline markup cheat sheet

These CSS classes are baked into the design. Use them inside any `html` field.

| Class                              | Effect |
|------------------------------------|--------|
| `class="marker-underline"`         | red squiggly marker line under a word |
| `class="marker-underline blue"`    | same, in blue |
| `class="marker-underline green"`   | same, in green |
| `class="highlight"`                | yellow highlighter behind the text (always visible) |
| `class="highlight-anim"`           | yellow highlighter that **sweeps in** when scrolled into view |
| `class="highlight-anim blue"`      | same, blue |
| `class="highlight-anim pink"`      | same, pink |
| `class="highlight-anim green"`     | same, green |
| `class="circle-it"`                | red hand-drawn circle around the phrase |
| `class="hand"`                     | hand-lettered Caveat font |
| `class="mono"`                     | JetBrains Mono font |
| `class="joke"`                     | greyed-out "aside" paragraph (hidden when humor=dry) |
| `class="joke-spicy"`               | extra-spicy aside (hidden when humor≠full) |
| `class="swap"`                     | red marker color (use inside the hero title) |
| `class="hd-btn"`                   | hand-drawn button with offset shadow on press (for inline call-to-action links) |
| `class="hd-btn ghost"`             | button variant: transparent background |
| `class="hd-btn red"`               | button variant: red border, alarm tone |

**Note on `highlight-anim` vs `highlight`:** `highlight-anim` is the
scroll-triggered sweep — use it on the *one* phrase per lesson you really
want to land. `highlight` is the static, always-painted version — use it
for routine emphasis. Don't put more than one `highlight-anim` per visible
viewport; the effect dilutes when overused.

**Example — putting an animated highlight inline:**

```json
"html": "<p>That's an agent. A chatbot talks. An agent <span class=\"highlight-anim\">decides what to do, then does it.</span> It picks tools…</p>"
```

Available inline tags: `<i>`, `<b>`, `<code>`, `<span>`, `<p>`, `<br/>`, `<pre>`.

Available CSS variables (use as `color: var(--marker-red)` etc.):
`--ink`, `--ink-soft`, `--muted`, `--marker-red`, `--marker-blue`,
`--marker-green`, `--sticky-yellow`, `--sticky-pink`, `--sticky-mint`,
`--sticky-sky`, `--sticky-lilac`, `--paper`, `--paper-deep`.

---

## 7. A complete minimal topic

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

## 8. Prompt template for asking an AI to generate a topic

Use this verbatim. The AI should produce a single JSON file, ready to drop
into `src/topics/`.

> Read `KnowledgeBase.md`. Then generate a topic JSON for **"<your topic>"**.
> Output **only** valid JSON. No prose outside the JSON.
>
> **Structure**
> - 2–3 levels (`basic`, `intermediate`, `advanced`), 1–3 lessons per level.
> - Every lesson must follow the skeleton in §4.12: a `metaphor` block first,
>   at least one of `diagram` / `contrast` / `flipcards` / `mockui` in the
>   middle, and a `reflection` block last.
> - Every lesson must do *one* idea. If two ideas, split into two lessons.
>
> **Voice (§4.1–§4.6, §4.11)**
> - Conversational. Speaking to one curious friend at a bar, not a class.
>   Use "you," contractions, asides.
> - Open every lesson with a vivid everyday metaphor — story before theory.
> - Use `class="highlight"` for one key phrase per paragraph (not more).
> - Use `class="marker-underline"` in the lesson `title` to mark the
>   keyword. Vary `blue` / `green` modifiers across lessons.
> - One `class="joke"` aside per lesson (always-visible humor). Optional
>   `class="joke-spicy"` line — the kind you'd whisper to a peer.
> - Avoid "synergy," "leverage," "robust," "in summary," "as we can see,"
>   and any sentence beginning with "It is important to note that."
>
> **Learning techniques (§4.7–§4.10)**
> - **One idea per lesson.** Use `collapsible` to defer depth, not to hide a
>   second topic.
> - **Repetition with variation:** the same idea should appear in 3 different
>   shapes (e.g. metaphor → diagram → contrast).
> - **Contrast bad before good** in every `contrast` block. Quote a real
>   misconception, don't strawman.
> - **Reflection prompts** must ask the reader to predict, doubt, or project
>   onto their own work — never "what is X?"
> - **Placeholder text** is an art-direction note, e.g. *"metaphor: chef hat
>   above a pot, with tools flying in."* Write it like a real instruction to
>   an illustrator.
>
> **Mechanics**
> - Reflection `id` values must be globally unique: `"<topic>-l<n>-reflect"`.
> - Checklist `id` values follow the same rule.
> - Level `id` must be `basic` / `intermediate` / `advanced`.
> - Use `tilt` values (`""`, `right`, `tilt2`, `tilt3`) to vary sticky-note
>   rotation across the page. Don't tilt them all the same way.
> - Include welcome stickies that lower the reader's defenses ("no equations,
>   no synergy") and an `outro` with a `stamp` like `"VOL.<br/>0X<br/>DONE"`.
>
> **Visual variety (use sparingly — see §4.13)**
> Across the *whole topic*, sprinkle in at most a handful of richer
> components — never all in one lesson:
> - Use `metaphor` with `polaroid: true` for 1–2 lessons where the image
>   should feel like an actual photo. The placeholder text becomes the
>   handwritten caption.
> - Use `phone` for any lesson about chat / messaging / mobile UX.
> - Use `terminal` for any lesson about CLI, cron, logs, build output.
> - Use one `pullquote` per topic on the line you're proudest of. Pair it
>   with `class="highlight-anim"` on a key phrase inside.
> - Use one `dragmatch` somewhere in the middle of the topic if there are
>   4+ named concepts that pair cleanly with definitions.
> - Use one `checklist` (inside a `foldcard`) for the practical-application
>   lesson — turn the advice into ticks the reader keeps.
> - Use one `bigstamp` at the topic outro.
> - Use `class="highlight-anim"` on ONE punchy phrase per lesson, no more.
> - Add `kind: "animated-arrow"` inside one diagram per lesson (or one per
>   topic) on the flow you most want the eye to follow.
> - Add 1–2 `margindoodle` blocks per topic for hand-feel; they only render
>   on wide screens, so treat them as bonus.
>
> **Final check before output**
> Walk the JSON and ask:
> 1. Could a sleepy reader on the train follow this? If a paragraph requires
>    re-reading, simplify.
> 2. Does each lesson have a metaphor, an active block, and a reflection?
> 3. Is there a wrong-way example somewhere (contrast or joke)?
> 4. If you removed the humor, is the lesson still complete? (It should be —
>    humor is *bait*, not load-bearing.)

---

## 9. Things to remember

- **Inline HTML inside JSON strings.** Don't forget to escape `"` as `\"`.
- **Unique `reflection.id` across topics.** Otherwise localStorage collides.
- **Use `basic/intermediate/advanced` for level IDs** if you want the existing
  color theme. Other ids work but render as plain.
- **The thumb index** on the right edge is generated from `levels`. With 1
  level you get 1 tab; that's fine.
- **Test locally:** `npm start`. The site reloads on JSON save.
- **No build step for content.** The JSON files are imported directly by
  Webpack and bundled.
- **The voice is load-bearing.** A clean schema with a textbook tone is not a
  Head First topic — it's just JSON. §4 is the part that matters most.

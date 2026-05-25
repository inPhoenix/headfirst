# `headfirst // margin.notes 0x01`

<div align="right">

`PAPER: warm` · `STICKIES: holding` · `MARGINS: still legible`

<a href="https://inphoenix.github.io/headfirst/"><strong>ENTER THE NOTEBOOK →</strong></a>

</div>

<br />

<table>
<tr>
<td width="43%" valign="top">

```txt
╭────────────────────────────────────╮
│  THE LESSON ARRIVES UNCOMBED       │
│  caveat / lowercase / coffee ring  │
│                                    │
│  a metaphor appears                │
│  parrot / chef / walkie-talkie     │
│                                    │
│  the reader scribbles in the box   │
│  the box remembers, even tomorrow  │
╰────────────────────────────────────╯
```

</td>
<td width="57%" valign="top">

<a href="https://inphoenix.github.io/headfirst/">
  <img src="https://placehold.co/640x420/f3ecd8/1d1812?text=margin+notes+%2F%2F+vol+01" alt="Margin Notes interface preview" />
</a>

</td>
</tr>
</table>

---

## `00 // the cover is not labelled`

This is not a documentation site.
It is a notebook where field guides are filed by topic and read in the margins.

Some lessons arrive as a parrot in a library.
Some arrive as a chef in a kitchen.
Some arrive as a walkie-talkie pressed against a model's ear.
Some are ordinary, but they keep returning across topics.

The notebook does not ask whether the reader is correct.
It asks whether the explanation will survive contact with a friend at a bar.

```txt
HERO         → the first page, marker-red on warm paper
STICKY       → the aside that won't sit straight
DIAGRAM      → hand-drawn nodes, hand-drawn arrows, no powerpoint
CONTRAST     → "nope" on the left, "yes!" on the right
COLLAPSIBLE  → opened only when the reader is curious
REFLECTION   → the box that listens and remembers
FLIPCARD     → question on the front, kindness on the back
```

---

<div align="center">

### `CLICK SEQUENCE // PREVIEW FIRST, INDEX LATER`

<a href="https://inphoenix.github.io/headfirst/">
  <img src="https://img.shields.io/badge/open-the_notebook-f5b461?style=for-the-badge&labelColor=1d1812&color=f5b461" alt="Open the Notebook" />
</a>
<a href="./KnowledgeBase.md">
  <img src="https://img.shields.io/badge/read-knowledge_base-ffe066?style=for-the-badge&labelColor=1d1812&color=ffe066" alt="Read Knowledge Base" />
</a>
<a href="./src/topics/ai.json">
  <img src="https://img.shields.io/badge/vol_01-AI-b4e1ce?style=for-the-badge&labelColor=1d1812&color=b4e1ce" alt="Vol 01 AI" />
</a>
<a href="./src/topics/nodejs.json">
  <img src="https://img.shields.io/badge/vol_02-node.js-aac8e5?style=for-the-badge&labelColor=1d1812&color=aac8e5" alt="Vol 02 Node.js" />
</a>
<a href="./src/topics/devops.json">
  <img src="https://img.shields.io/badge/vol_03-devops-f7b7c2?style=for-the-badge&labelColor=1d1812&color=f7b7c2" alt="Vol 03 DevOps" />
</a>

</div>

---

## `01 // anatomy of the notebook`

```txt
src/App.js                  :: the binder, the spine, the topic switcher
src/index.css               :: the sidebar, the room around the page
src/styles.css              :: paper, ink, marker, washi tape, dot grid
src/components/             :: sticky, arrow, flipcard, reflection, mockui …
src/components/Block.js     :: the dispatch — JSON `type` becomes a component
src/topics/*.json           :: one topic, one volume, one sidebar entry
src/topics/index.js         :: the registry; the sidebar reads this and nothing else
KnowledgeBase.md            :: how a person (or an AI) writes the next volume
localStorage                :: the unreliable witness that keeps your reflections
React 19                    :: the pulse that re-renders the page on each topic flip
```

No build step for content.
No CMS.
Just JSON, imported by Webpack and bundled into a notebook you can scroll.

---

<details>
<summary><code>02 // open card: VOL 01 — what is AI, really?</code></summary>

```txt
metaphor:   a parrot that has read every book ever written
diagram:    AI → Machine Learning → LLMs   (umbrella → narrow)
contrast:   "robot brain that thinks"      vs   "statistics with a vocabulary"
reflection: where would pattern-matching fail?
```

Six lessons. Three levels. One marker-red squiggle under the word `actually`.
The volume that started the series.

Filed at [src/topics/ai.json](./src/topics/ai.json).

</details>

<details>
<summary><code>03 // open card: VOL 02 — node is just javascript with superpowers</code></summary>

```txt
metaphor:   v8 quit its day job in the browser and got hired as a server
diagram:    V8 + libuv + stdlib = node
flipcard:   why does while(true){} freeze a node server?
reflection: have you ever written code that froze node? what was the slow thing?
```

Three lessons. Two levels. One waiter zigzagging between tables.

Filed at [src/topics/nodejs.json](./src/topics/nodejs.json).

</details>

<details>
<summary><code>04 // open card: VOL 03 — devops is mostly a conveyor belt</code></summary>

```txt
metaphor:   a factory line — code in, deployed thing out, every time the same
diagram:    commit → build → test → deploy
contrast:   "friday afternoon deploy"      vs   "it's in main? it's in prod."
reflection: last outage — could a pipeline step have caught it?
```

Two lessons. One level. One glass wall instead of a smoke alarm.

Filed at [src/topics/devops.json](./src/topics/devops.json).

</details>

<details>
<summary><code>05 // open card: how to add VOL 04, 05, 06 …</code></summary>

```txt
1.  draft <topic>.json following the schema in KnowledgeBase.md
2.  drop it into src/topics/
3.  import it in src/topics/index.js and add it to the TOPICS array
4.  refresh — the sidebar grew a tab; the lamp reads the new volume
```

Or hand `KnowledgeBase.md` to an AI and say:
*"Read this. Generate a topic JSON for **Rust**."*
The AI returns a file ready to drop in. The prompt template is in §7 of the KB.

</details>

---

## `06 // boot ritual found in the basement`

```bash
npm install
npm start
```

When the local notebook wakes, the browser shows the refinery at
[http://localhost:3000](http://localhost:3000).
The hosted edition lives at
[https://inphoenix.github.io/headfirst/](https://inphoenix.github.io/headfirst/).
The sidebar lists the topics. The thumb tabs on the right edge are the level
navigation. The reflections save themselves as you type.

When the build must be sealed:

```bash
npm run build
```

No further ceremony is required.
The ceremony will happen in the lessons.

---

## `07 // drift map fragment`

```txt
                 ┌──────────────┐    ┌─────────────────────────────────┐    ┌──────┐
                 │  sidebar     │    │  notebook                       │    │ thumb│
                 │              │    │                                 │    │ tabs │
                 │  · vol 01 AI │    │   hero · stickies · TOC         │    │ basic│
                 │  · vol 02 JS │    │   ── basic ──                   │    │ inter│
                 │  · vol 03 DO │    │     lesson 01                   │    │ adv  │
                 │              │    │     lesson 02                   │    │      │
                 │  + add JSON  │    │   ── intermediate ──            │    │      │
                 │              │    │     lesson 03                   │    │      │
                 └──────────────┘    └─────────────────────────────────┘    └──────┘
                       ●                          ●                            ●
                  TOPICS array              one .json file              IntersectionObserver
                  src/topics/index.js       per topic, hot-loaded       updates the active tab
```

The tabs are not navigation.
They are the recurrence of attention made visible.

A red tab means you are reading the hard part.
An amber sticky means the author thought about it before you did.
A green checkmark in the reflection box means the notebook is listening.

---

## `08 // what the interface is doing while pretending to be still`

```txt
[sidebar]            lists topics from src/topics/index.js, one tab per volume
[thumb-index]        observes which lesson is on screen, paints the level tab
[hero]               renders title + subtitle + pills from topic.hero
[sticky note]        rotated paper square, optional washi tape, five colors
[diagram]            hand-drawn nodes + curved arrows, structured or raw HTML
[contrast pair]      red ✗ card, green ✓ card, side by side
[collapsible]        the "under the hood" digression, opened on click
[reflection]         textarea wrapped in lilac sticky; saves to localStorage
[flipcard]           tap to flip — question on yellow, answer on mint
[mockui]             fake browser pane with annotated margins
[outro stamp]        red circle, three lines, slightly rotated, satisfied
```

Everything is a loop.
Nothing is only a lesson.
The page is a notebook the reader is allowed to write in.

---

<div align="right">

### `09 // final coordinate`

The preview is not documentation.
The preview is the first room.

<a href="https://inphoenix.github.io/headfirst/"><strong>https://inphoenix.github.io/headfirst/</strong></a>
<br />
<a href="./KnowledgeBase.md"><code>./KnowledgeBase.md</code></a> · the schema
<br />
<a href="./src/topics/"><code>./src/topics/</code></a> · the volumes

</div>

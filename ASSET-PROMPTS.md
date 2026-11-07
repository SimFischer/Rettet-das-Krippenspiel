# Bildvorgaben für ChatGPT – „Rettet das Krippenspiel!“

Das Spiel läuft schon jetzt vollständig mit gezeichneten Platzhaltern. Jedes Bild, das unter dem angegebenen **Dateinamen** im Repo liegt, ersetzt automatisch seinen Platzhalter. Ihr könnt also Block für Block vorgehen.

## So geht ihr vor

1. **Neuer Chat in ChatGPT, zuerst den Stil-Anker (Block 0) erzeugen.** Dieses Bild ist die Stilreferenz für alles Weitere. Ladet es bei jedem späteren Bild wieder mit hoch und schreibt dazu: *„Same style as the attached reference image.“*
2. **Pro Datei ein eigener Prompt.** Keine Varianten mischen. Den Prompt-Text (englisch) unverändert kopieren, darüber den **Gemeinsamen Stil** (unten) einfügen.
3. **Format:** ChatGPT liefert PNG. Einfach als PNG speichern, Dateiname wie angegeben, nur mit `.png`. Ich wandle danach in `.webp` um, schneide Bögen zu, stelle Transparenz frei und passe die Laufwege an die gemalten Karten an.
4. **Bögen (Sprite-Sheets)** dürfen ungenau sein: Schickt sie mir. Ich schneide die Einzelbilder aus und richte die Füße auf eine Linie aus.
5. **Kein Text in Bildern.** Beschriftungen setzt das Spiel selbst darüber.

## Gemeinsamer Stil (vor jeden Prompt setzen)

> Warm hand-painted 2D illustration for a children's educational game (age 11–12), cosy and calm, not cartoonish-silly. Setting: a small red-brick Lutheran village church in Schleswig-Holstein, northern Germany, on Christmas Eve, snow outside, evening. Light comes from candles and warm lamps: golden highlights, deep blue-violet night shadows. Palette: midnight blue #131a2c, candle gold #f2bd62, brick red #6b382d, Advent violet #6c4b94, pine green #2f5a46, parchment #f1e5c9, dark walnut wood. Soft painterly brush texture with clean readable shapes and gentle outlines. No photorealism, no 3D render, no anime, no glossy plastic look, no text, no letters, no logos, no watermark.

Für **Draufsicht-Bilder** (Block C und E) zusätzlich:

> Strict top-down orthographic view (camera straight above, 90°), like a board game map. Flat simplified forms, slightly reduced detail, clear walkable floor areas, no perspective tilt, no vanishing point.

---

## Block 0 – Stil-Anker (nur Referenz, wird nicht eingebaut)

**`assets/sheets/style-anchor.png`** – 1536 × 1024
> Key art: interior of a small red-brick village church in northern Germany on Christmas Eve, seen from the side aisle. A big old wooden chest with iron bands stands in the sacristy doorway, candlelight spilling over it. Violet Advent cloth on the pulpit, an Advent wreath with four red candles, a Herrnhut paper star (many-pointed white star) hanging from the ceiling, snowy night visible through arched windows. Calm, warm, inviting mood.

---

## Block A – Kiste und Sakristei (Akt 1)

**`assets/scene/sakristei-bg.png`** – 1920 × 1080, Hintergrund des ganzen Spiels
> Wide background of a church sacristy at night: whitewashed brick walls with exposed red brick in places, an arched window with snowy night and stars on the upper right, a wooden coat rack with a black pastor's gown, a shelf with hymn books and candles, warm candle glow from the lower left. The centre and right half must stay calm and fairly dark, because game panels are placed on top. Slightly blurred depth, low contrast.

**`assets/scene/chest-closed.png`** – 1600 × 1120, **transparenter Hintergrund**
> One large old wooden chest, front view (straight on), on a transparent background. Domed lid, dark walnut planks with grain, two vertical black iron bands on the left and right, brass corner fittings at the bottom. Position exactly: chest body from 14% to 86% of the width and from 38% to 90% of the height; the domed lid from 21% to 40% of the height. On the lid, centred at about 31% height, a small blank paper label (no writing). IMPORTANT: the front panel between the iron bands is plain wood with NO locks, NO keyholes and NO decorations (locks are added separately by the game). Soft shadow underneath.

**`assets/scene/chest-open.png`** – 1600 × 1120, **transparent**, gleiche Lage wie oben
> The same chest as in the reference, now with the lid open and tilted back (lid visible as a darker inner surface above the chest, from 7% to 38% of the height). Warm golden light glows out of the chest. Peeking out: white angel wings costume, a shepherd's crook, a blue cloth, a small golden crown with a star. Front panel unchanged, plain wood, no locks.

**`assets/sheets/locks-sheet.png`** – 3072 × 1024, **transparent**, Bogen mit 6 Spalten × 2 Reihen (je 512 × 512)
> Sprite sheet of six antique brass padlocks for a game, 6 columns × 2 rows, each lock centred in its cell, same size and same baseline, transparent background. Row 1: closed padlocks. Row 2: the same six padlocks opened (shackle swung up and to the left, a small warm glow). Each lock body has one engraved symbol, left to right: 1 calendar page, 2 candle, 3 scroll, 4 round wax seal, 5 music note, 6 five-pointed star. Polished brass with dark patina, steel shackle.
→ wird zu `assets/ui/lock-kalender.webp`, `lock-lichterrad`, `lock-lukas`, `lock-evangelien`, `lock-evangelisch`, `lock-epiphanias` (+ jeweils `-open`).

**`assets/paper/parchment.png`** – 1600 × 1200
> Seamless soft parchment paper texture, warm cream #f1e5c9, very subtle fibres and slightly darker edges, no stains in the centre, very low contrast so dark text stays readable.

**`assets/paper/letter.png`** – 1200 × 1400
> A handwritten-letter sheet of slightly yellowed paper with a faint fold in the middle and a small red wax seal mark in the top right corner. Paper only, no writing, very calm in the centre.

### Infobilder zu den sechs Schlössern (je 1200 × 900)

**`assets/scene/info-kalender.png`**
> Church altar in Advent: violet altar cloth and violet pulpit hanging, an Advent wreath with the first candle burning, a wall calendar with the 1st of Advent circled (no readable text). Calm and solemn.

**`assets/scene/info-lichterrad.png`**
> Hamburg 1839, a simple children's home room: a large wooden cartwheel hangs from the ceiling with many small red candles and four large white candles on it; a few candles are lit. Children in 19th-century clothes look up at it with a young theologian in a dark coat. Warm, hopeful.

**`assets/scene/info-lukas.png`**
> Shepherds at night in the fields near Bethlehem, sheep around a small fire, a bright angel appears in the sky and the shepherds shield their eyes in awe. Simple, child-friendly, no halos with text.

**`assets/scene/info-evangelien.png`**
> Two old book scrolls on a wooden desk, side by side: from the left scroll rise small painted vignettes of shepherds, a manger and angels; from the right scroll rise vignettes of a star, wise men with gifts and a king's palace. Symbolic, clearly two different stories.

**`assets/scene/info-evangelisch.png`**
> 16th-century family Christmas in Wittenberg style: a father with a lute and children singing around a table with candles; in a modern corner of the same picture a white many-pointed Herrnhut star glows and a red-candle Advent wreath stands. No portraits of real people, generic figures.

**`assets/scene/info-epiphanias.png`**
> Three travelling wise men from the East with camels on a night road, following one bright star towards a small town on a hill. Gifts in their hands: a golden box, an incense burner, a small jar. Diverse, respectful, no caricature.

---

## Block C – Akt 2: Die Kirche von oben

**`assets/walk/church-topdown.png`** – 1600 × 1000, Draufsicht. **Lage bitte genau so** (Prozent der Bildbreite/-höhe), weil die Laufwege darauf abgestimmt sind:
> Top-down map of a small red-brick village church interior at night, Christmas Eve, warm candlelight, snowy churchyard outside the walls. Layout:
> – Outside: snowy ground with a few footprints along all edges (outer 14% left and right, 8% top and bottom).
> – Brick outer walls enclosing the floor area from x 15% to 85% and y 10% to 90%.
> – Raised altar area (chancel) at the top centre: x 30%–70%, y 10%–34%, lighter stone floor; altar table with white cloth and violet front at x 45%–55%, y 14%–20%; a small wooden manger with straw at x 48.5%–51.5%, y 25%–28%.
> – Solid wall block in the top left corner: x 15%–30%, y 10%–34%.
> – Sacristy room in the top right corner: x 71%–85%, y 10%–32%, wooden floor; its doorway is in its left wall at y 22%–30%; inside: the big wooden chest at x 73%–80%, y 11%–18%, and a small shelf on the top wall at x 81%–85%, y 10%–13%.
> – Round wooden pulpit at x 29%–34%, y 33%–40%.
> – Stone baptismal font with water at x 63.5%–67%, y 35.5%–41.5%.
> – Two blocks of 7 wooden pews each: left block x 19%–45.5%, right block x 54.5%–81%; first pew at y 47%, every pew 2.4% deep, one pew every 5.2% (last pew ends at y 81%).
> – Central aisle x 45.5%–54.5% with a long dark-red runner; narrow side aisles along the outer walls.
> – At the bottom: tower base walls x 15%–44.5% and x 55.5%–85%, y 84%–90%; the big closed main door centred at x 44.5%–55.5% in the bottom wall.
> – Arched windows as dark blue niches in the side walls. No people, no text.

**`assets/sheets/player-sheet.png`** – 768 × 1024, **transparent**, 3 Spalten × 4 Reihen (je 256 × 256)
> Top-down game character sprite sheet (seen from above at a slight 3/4 angle so the face is visible), a 12-year-old helper with a green scarf, warm winter jacket and brown hair. 4 rows = facing down, left, right, up. 3 columns = standing, left foot forward, right foot forward. Same size, centred, feet on the same line in every cell, transparent background.
→ wird zu `assets/walk/player-sheet.webp`

**`assets/sheets/actors-sheet.png`** – 512 × 1536, **transparent**, 2 Spalten × 6 Reihen (je 256 × 256)
> Sprite sheet of six children for a nativity play, seen from above at a slight 3/4 angle, all facing the viewer. Column 1: the child in normal winter clothes. Column 2: the same child in costume. Rows: 1 girl with brown hair → costume Mary (blue headscarf, light dress); 2 boy with black hair → Joseph (brown cloak, walking staff); 3 girl with blond hair → angel (white robe, wings); 4 boy with red-brown hair → shepherd (sheepskin vest, crook); 5 boy with dark hair → innkeeper (apron, lantern); 6 girl with light blond hair → Emperor Augustus (laurel wreath, purple-red cloak). Same scale, centred, transparent background.
→ wird zu `assets/walk/actor-maria.webp`, `-josef`, `-engel`, `-hirte`, `-wirt`, `-kaiser` (je 2 Bilder nebeneinander)

---

## Block D – Akt 3: Schlüssel und Kirchentür

**`assets/act3/turmkammer.png`** – 1600 × 1000. **Lage der Gegenstände genau so**, weil das Spiel dort die Fundstellen setzt:
> Side view of a small tower chamber in a brick church, very dusty and cluttered, night, lit only by moonlight (the game darkens it further and adds a torch effect). Objects, clearly separated and recognisable:
> – a folded violet altar cloth draped over an old wooden trunk at x 10%–30%, y 48%–86%;
> – a white altar cloth with an embroidered golden star hanging on the wall at x 35%–59%, y 20%–50%;
> – a small table with a piece of chalk and a slip of paper at x 66%–82%, y 60%–80% (no readable writing);
> – a very tall white Easter candle with a red cross on a brass stand at x 82%–86%, y 9%–44%;
> – a grey metal key box with a brass handle mounted low on the wall at x 45%–57.5%, y 70%–89%.
> Everything else: shelves, old hymn books, bell ropes, cobwebs, but keep these five objects free and clearly visible.

**`assets/act3/kirchentuer.png`** – 800 × 1040
> Front view of a heavy old arched wooden church door set in a red-brick wall, three black iron bands, a big brass ring handle; next to the handle a brass lock plate with three small rotating cylinders. Evening light, snow on the doorstep, warm light shining through the keyhole.

**`assets/act3/kirchentuer-offen.png`** – 800 × 1040
> The same church door, now wide open from inside: warm golden light floods out onto the snow, silhouettes of families with children in winter coats walk in, small lanterns, a few snowflakes. Joyful, peaceful.

---

## Block E – Bonusspiel „Der andere Heimweg“

**`assets/bonus/bethlehem-topdown.png`** – 1600 × 1000, Draufsicht, Nacht
> Top-down map of a small ancient town (Bethlehem, around year 0) at night: flat-roofed clay houses, dusty lanes, a few palm trees, oil lamps glowing at doors. Sandy lanes wind between the houses from the left edge to the right edge. On the far right edge (x 95%–100%) a road leaves the town into the desert. Houses (flat roofs) exactly at: [14–26% x, 11–31% y], [14–27.5%, 69–91%], [32.5–43%, 30–47%], [32.5–42.5%, 62–85%], [50–60.5%, 9–32%], [49.5–59%, 47–64%], [67.5–80%, 29–44%], [67.5–80%, 64–86%], [83–93%, 10–28%], [84.5–94.5%, 76–92%]. Palm trees at about [78–80.5%, 50–55%], [22–24.5%, 48–52%], [60–64%, 88–94%]. Everything else is open walkable ground. No people, no text.

**`assets/sheets/weise-sheet.png`** – 768 × 1024, **transparent**, 3 × 4 wie der Spielerbogen
> Top-down sprite sheet of one wise man from the East in a travelling cloak (deep violet and gold), small crown, carrying a little golden box. 4 rows: facing down, left, right, up; 3 columns: standing, step left, step right. Transparent background, same size and baseline.
→ `assets/bonus/weise-sheet.webp`

**`assets/sheets/soldier-sheet.png`** – 768 × 1024, **transparent**, 3 × 4
> Top-down sprite sheet of a guard of King Herod: simple tunic in dark red, leather armour, a short spear held upright, a lantern on the belt. Not scary, child-friendly. 4 rows: facing down, left, right, up; 3 columns: standing, step left, step right. Transparent background, same size and baseline.
→ `assets/bonus/soldier-sheet.webp`

---

## Übersicht: Datei → Verwendung im Spiel

| Datei im Repo | Wo im Spiel | Ersetzt |
|---|---|---|
| `assets/scene/sakristei-bg.webp` | Hintergrund aller Bildschirme | Farbverlauf |
| `assets/scene/chest-closed.webp` / `chest-open.webp` | Kiste (Start, Hub, Akt 2) | Vektorkiste |
| `assets/ui/lock-*.webp` (12) | Schlösser an der Kiste | Vektorschlösser |
| `assets/paper/parchment.webp`, `letter.webp` | Aufgabenkarten, Brief | Papierfarbe |
| `assets/scene/info-*.webp` (6) | erste Karte jedes Schlosses | Fenster/Symbol |
| `assets/walk/church-topdown.webp` | Akt 2 | gezeichneter Grundriss |
| `assets/walk/player-sheet.webp` | Spielfigur Akt 2 | Kreisfigur |
| `assets/walk/actor-*.webp` (6) | Kinder vom Krippenspiel | Kreisfiguren |
| `assets/act3/turmkammer.webp` | Akt 3, Lampensuche | gezeichnete Kammer |
| `assets/act3/kirchentuer.webp`, `-offen.webp` | Akt 3, Tür | Vektortür |
| `assets/bonus/bethlehem-topdown.webp` | Bonus Heimweg | gezeichnete Stadt |
| `assets/bonus/weise-sheet.webp`, `soldier-sheet.webp` | Bonus Heimweg | Kreisfiguren |

Insgesamt **24 Generierungen** (ohne Stil-Anker). Empfohlene Reihenfolge: Block A → C → D → E.

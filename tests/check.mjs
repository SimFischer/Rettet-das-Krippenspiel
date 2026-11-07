// Prüft Inhalte und Karten ohne Browser: node tests/check.mjs
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const ctx = { console, window: {}, document: { readyState: 'loading', addEventListener() {} }, localStorage: { getItem() { return null; }, setItem() {} } };
vm.createContext(ctx);
for (const f of ['art', 'content', 'content-acts', 'walk', 'library-content']) vm.runInContext(readFileSync(new URL(`../js/${f}.js`, import.meta.url), 'utf8') + `\n;globalThis.__${f.replace('-', '_')} = true;`, ctx);
const get = n => vm.runInContext(n, ctx);
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.error('✗', msg); } };

const STATIONS = get('STATIONS'), ACTORS = get('ACTORS'), COSTUMES = get('COSTUMES'), DARK = get('DARK'), SONGS = get('SONGS'), RINGS = get('RINGS');
const CHURCH = get('CHURCH_MAP'), BETH = get('BETHLEHEM_MAP'), ICONS = get('ICONS');

ok(STATIONS.length === 6, 'sechs Schlösser');
STATIONS.forEach(st => st.steps.forEach((s, i) => {
  const where = `${st.id} Schritt ${i + 1}`;
  if (s.type === 'mc') ok(s.correct >= 0 && s.correct < s.options.length, where + ': richtige Antwort vorhanden');
  if (s.type === 'dial') { const a = s.kind === 'letters' ? (s.alphabet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') : '0123456789'; ok([...s.answer].every(c => a.includes(c)), where + ': Code einstellbar'); }
  if (s.type === 'sort') ok(s.items.every(it => s.buckets.some(b => b.id === it.b)), where + ': Körbe passen');
  if (s.type === 'fill') ok(s.gaps.every(g => g.choices.includes(g.answer)), where + ': Lücke lösbar');
  if (s.type === 'order') ok(s.items.every(it => ICONS[it.icon]), where + ': Icons vorhanden');
  if (s.type === 'tf') ok(s.items.every(it => typeof it.ok === 'boolean'), where + ': Wahr/Falsch gesetzt');
}));
ok(ACTORS.every(a => COSTUMES.some(c => c.id === a.id)), 'jedes Kind hat ein Kostüm');
ok(COSTUMES.every(c => ICONS[c.icon]), 'Kostüm-Icons vorhanden');
ok(DARK.spots.every(s => s.answer < DARK.drawers.length), 'Turmkammer: Kästen passen');
ok(SONGS.clues.every(c => SONGS.book.some(b => b.eg === c.eg)), 'Liedtafel: Lieder im Gesangbuch');
ok(RINGS.rings.every(r => r.answer < r.options.length), 'Walzen lösbar');

// Bücherregal: alle Verweise lösen auf
const BIBLE = get('BIBLE'), TEXTS = get('TEXTS');
const resolves = r => { const [k, id] = r.split(':'); return k === 'bibel' ? BIBLE.some(b => b.id === id) : k === 'text' ? TEXTS.some(t => t.id === id) : false; };
const allSrc = ['content', 'content-acts', 'acts', 'engine'].map(f => readFileSync(new URL(`../js/${f}.js`, import.meta.url), 'utf8')).join('\n');
const refs = [...allSrc.matchAll(/'((?:bibel|text):[a-z0-9]+)'/g)].map(m => m[1]).concat([...allSrc.matchAll(/\{\{((?:bibel|text):[a-z0-9]+)\}\}/g)].map(m => m[1])).concat([...allSrc.matchAll(/ref: '((?:bibel|text):[a-z0-9]+)'/g)].map(m => m[1]), [...allSrc.matchAll(/wireHeader\(el, '([^']+)'\)/g)].map(m => m[1]));
ok(refs.length > 30, 'genug Verweise gefunden: ' + refs.length);
refs.forEach(r => ok(resolves(r), 'Verweis löst auf: ' + r));
STATIONS.forEach(st => ok(st.ref && resolves(st.ref), st.id + ': Bücherregal-Verweis'));
STATIONS.forEach(st => st.steps.forEach((s, i) => { if (s.hints) ok(s.hints.some(h => /\{\{/.test(h)) || s.type === 'calendar' || s.type === 'dial', `${st.id} Schritt ${i + 1}: Hinweis verweist ins Regal`); }));
ACTORS.forEach(a => ok(a.ref && resolves(a.ref), a.id + ': Verweis'));

// Karten: alle Ziele erreichbar (Breitensuche auf dem gleichen Raster wie die Engine)
function reachable(m, from, targets, R = 16, CELL = 20) {
  const cols = Math.ceil(m.w / CELL), rows = Math.ceil(m.h / CELL);
  const hit = (x, y) => m.obstacles.some(([ox, oy, ow, oh]) => x + R > ox && x - R < ox + ow && y + R > oy && y - R < oy + oh);
  const free = (cx, cy) => cx >= 0 && cy >= 0 && cx < cols && cy < rows && !hit(cx * CELL + CELL / 2, cy * CELL + CELL / 2);
  const seen = new Set(), q = [[Math.floor(from.x / CELL), Math.floor(from.y / CELL)]];
  ok(free(...q[0]), `${m.bg}: Start ist frei`);
  seen.add(q[0].join());
  while (q.length) { const [x, y] = q.shift(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = [x + dx, y + dy]; if (!seen.has(n.join()) && free(...n)) { seen.add(n.join()); q.push(n); } } }
  return targets.map(t => { for (let dx = -3; dx <= 3; dx++) for (let dy = -3; dy <= 3; dy++) if (seen.has([Math.floor(t.x / CELL) + dx, Math.floor(t.y / CELL) + dy].join())) return true; return false; });
}
const church = reachable(CHURCH, CHURCH.start, [...ACTORS, get('ACT2_SHELF')]);
church.forEach((r, i) => ok(r, `Kirche: Ziel ${i + 1} erreichbar`));
const beth = reachable(BETH, BETH.start, [{ x: 1560, y: 500 }, ...BETH.checkpoints]);
beth.forEach((r, i) => ok(r, `Bethlehem: Ziel ${i + 1} erreichbar`));

console.log(fails ? `${fails} Fehler` : 'Alle Prüfungen bestanden.');
process.exit(fails ? 1 : 0);

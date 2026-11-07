/* ===== Frau Petersens Bücherregal: Oberfläche =====
   openShelf('bibel:lk2') oder openShelf('text:wichern') öffnet das Regal über dem aktuellen Bildschirm. */

let SHELF_CTX = null;          // Verweis passend zur aktuellen Aufgabe
let SHELF_LAST = 'text:advent';

function shelfEntry(ref) {
  const [kind, id] = (ref || '').split(':');
  if (kind === 'bibel') { const b = BIBLE.find(x => x.id === id); if (b) return { kind, b }; }
  if (kind === 'text') { const t = TEXTS.find(x => x.id === id); if (t) return { kind, t }; }
  return null;
}
function shelfLabel(ref) {
  const e = shelfEntry(ref); if (!e) return ref;
  return e.kind === 'bibel' ? `Bibel: ${e.b.ref}` : `Sachtext: ${e.t.title}`;
}
/* Verweise in Hinweistexten: {{bibel:lk2}} → Knopf */
function linkify(t) {
  return String(t).replace(/\{\{((?:bibel|text):[a-z0-9]+)\}\}/g, (_, r) => `<button class="reflink" data-ref="${r}">${icon(r.startsWith('bibel') ? 'scroll' : 'book')} ${shelfLabel(r)}</button>`);
}
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('.reflink');
  if (b) { e.preventDefault(); openShelf(b.dataset.ref); }
});
/* ----- Freischalten: Einträge erscheinen erst, wenn eine Aufgabe sie braucht ----- */
function shelfState() { S.shelf = S.shelf || { ctx: {}, done: [], seen: [], all: false }; return S.shelf; }
function shelfRefsOf(obj) {
  const found = JSON.stringify(obj).match(/(?:bibel|text):[a-z0-9]+/g) || [];
  return [...new Set(found)].filter(r => shelfEntry(r));
}
function shelfUnlock(ctx, refs) {
  const st = shelfState(), fresh = [];
  refs.forEach(r => { const c = st.ctx[r] || (st.ctx[r] = []); if (!c.length) fresh.push(r); if (!c.includes(ctx)) c.push(ctx); });
  SHELF_CUR = ctx; save(); updateShelfBadges();
  if (fresh.length) toast(`${icon('book')} Neu im Bücherregal: ${fresh.length === 1 ? shelfTitle(fresh[0]) : fresh.length + ' Einträge'}`);
}
function shelfDone(ctx) { const st = shelfState(); if (!st.done.includes(ctx)) st.done.push(ctx); save(); updateShelfBadges(); }
function shelfStatus(ref) {
  const st = shelfState(), c = st.ctx[ref] || [];
  if (!c.length) return st.all ? (st.seen.includes(ref) ? 'offen' : 'neu') : 'zu';
  if (c.every(x => st.done.includes(x))) return 'erledigt';
  return st.seen.includes(ref) ? 'offen' : 'neu';
}
function shelfTitle(ref) { const e = shelfEntry(ref); return e ? (e.kind === 'bibel' ? e.b.ref : e.t.title) : ref; }
function allShelfRefs() { return [...BIBLE.map(b => 'bibel:' + b.id), ...TEXTS.map(t => 'text:' + t.id)]; }
function updateShelfBadges() {
  const n = allShelfRefs().filter(r => shelfStatus(r) === 'neu').length;
  document.querySelectorAll('.shelfbtn').forEach(b => {
    let bd = b.querySelector('.badge'); if (!n) { if (bd) bd.remove(); return; }
    if (!bd) { bd = document.createElement('span'); bd.className = 'badge'; b.appendChild(bd); }
    bd.textContent = n;
  });
}
let SHELF_CUR = null;
/* Zu welchem Rätsel gehört ein Kontext? Symbol und Name wie auf der Kiste */
function ctxInfo(ctx) {
  if (!ctx) return null;
  if (ctx.startsWith('st:')) { const st = STATIONS.find(x => x.id === ctx.slice(3)); return st ? { icon: st.icon, name: st.name } : null; }
  return { 'act2': { icon: 'people', name: 'Die Kostüme' }, 'act3-dark': { icon: 'lantern', name: 'Die Turmkammer' }, 'act3-songs': { icon: 'bell', name: 'Die Liedtafel' }, 'act3-rings': { icon: 'key', name: 'Die Kirchentür' } }[ctx] || null;
}
function ctxChips(ref) {
  const c = (shelfState().ctx[ref] || []).map(ctxInfo).filter(Boolean);
  return c.length ? `<span class="ctxchips">${c.map(i => `<i title="${i.name}">${icon(i.icon)}</i>`).join('')}</span>` : '';
}
function shelfButton(extraClass = '') { return `<button class="iconbtn shelfbtn ${extraClass}" type="button">${icon('book')} Bücherregal</button>`; }
function wireShelfButtons(root) { root.querySelectorAll('.shelfbtn').forEach(b => b.onclick = () => openShelf(SHELF_CTX)); setTimeout(updateShelfBadges, 0); }

function openShelf(ref) {
  closeShelf();
  if (ref && shelfEntry(ref) && shelfStatus(ref) === 'zu') shelfUnlock(SHELF_CUR, [ref]);
  const open = r => shelfStatus(r) !== 'zu';
  let cur = shelfEntry(ref) && open(ref) ? ref : (shelfEntry(SHELF_LAST) && open(SHELF_LAST) ? SHELF_LAST : allShelfRefs().find(open));
  const ov = h(`<div class="shelf" role="dialog" aria-modal="true" aria-label="Frau Petersens Bücherregal">
    <div class="shelf-card">
      <header class="shelf-head">
        <div class="shelf-title">${icon('book')}<div><b>Frau Petersens Bücherregal</b><small>Hier findest du alles, was du für die Rätsel brauchst.</small></div></div>
        <button class="iconbtn shelf-close" aria-label="Bücherregal schließen">${icon('cross')}</button>
      </header>
      <div class="shelf-body">
        <nav class="shelf-list" aria-label="Inhalt"></nav>
        <article class="shelf-read" tabindex="-1"></article>
      </div>
    </div>
  </div>`);
  document.body.appendChild(ov);
  document.body.classList.add('shelf-open');
  const list = ov.querySelector('.shelf-list'), read = ov.querySelector('.shelf-read');
  function renderList() {
    const st = shelfState(), ci = ctxInfo(SHELF_CUR);
    const mine = ci ? allShelfRefs().filter(r => (st.ctx[r] || []).includes(SHELF_CUR)) : [];
    if (SHELF_CTX && mine.includes(SHELF_CTX)) { mine.splice(mine.indexOf(SHELF_CTX), 1); mine.unshift(SHELF_CTX); }
    const lbl = { neu: '<em class="st neu">neu</em>', offen: '<em class="st offen">zu lesen</em>', erledigt: `<em class="st done">${icon('check')} erledigt</em>` };
    const spine = r => {
      const e = shelfEntry(r), stt = shelfStatus(r), bib = e.kind === 'bibel';
      return `<button class="spine${r === cur ? ' on' : ''} ${stt} ${bib ? 'bib' : 'txt'}" data-ref="${r}">${icon(bib ? 'scroll' : 'book')}<span><small class="kind">${bib ? 'Bibel · ' + e.b.ref : 'Sachtext'}</small><b>${bib ? e.b.title : e.t.title}</b>${ctxChips(r)}${lbl[stt] || ''}</span></button>`;
    };
    const rest = allShelfRefs().filter(r => open(r) && !mine.includes(r));
    const locked = allShelfRefs().filter(r => !open(r)).length;
    let html = '';
    if (ci && mine.length) html += `<div class="shelf-group now"><h3>${icon(ci.icon)} Für ${ci.name.replace(/^Das /, "das ").replace(/^Die /, "die ")}</h3><p>Diese Texte brauchst du jetzt:</p>${mine.map(spine).join('')}</div>`;
    const bib = rest.filter(r => r.startsWith('bibel')), txt = rest.filter(r => r.startsWith('text'));
    if (bib.length) html += `<div class="shelf-group"><h3>${icon('scroll')} ${mine.length ? 'Weitere Bibelstellen' : 'Bibel'}</h3>${bib.map(spine).join('')}</div>`;
    if (txt.length) html += `<div class="shelf-group"><h3>${icon('book')} ${mine.length ? 'Weitere Sachtexte' : 'Sachtexte'}</h3>${txt.map(spine).join('')}</div>`;
    if (!html) html = '<p class="shelf-empty">Hier ist noch nichts. Öffne ein Rätsel – dann kommen die passenden Einträge dazu.</p>';
    if (locked) html += `<p class="shelf-locked">${icon('key')} Noch ${locked} ${locked === 1 ? 'Eintrag' : 'Einträge'} verschlossen. Sie erscheinen, sobald ein Rätsel sie braucht.</p>`;
    list.innerHTML = html;
    list.querySelectorAll('.spine').forEach(b => b.onclick = () => { cur = b.dataset.ref; renderRead(); renderList(); });
  }
  function renderRead() {
    const e = shelfEntry(cur); if (!e) { read.innerHTML = '<p class="shelf-empty">Wähle links einen Eintrag.</p>'; return; }
    SHELF_LAST = cur;
    const st = shelfState(); if (!st.seen.includes(cur)) { st.seen.push(cur); save(); }
    if (e.kind === 'bibel') {
      const b = e.b;
      const words = Object.entries(b.words || {});
      read.innerHTML = `<div class="kicker">Lutherbibel 1912 · ${b.ref}</div><h2>${b.title}</h2>${forLine(cur)}
        <div class="bible">${b.verses.map(([n, t]) => t ? `<p><sup>${n}</sup> ${t}</p>` : `<p class="gap-v">${n}</p>`).join('')}</div>
        ${words.length ? `<div class="words"><b>Schwierige Wörter</b><dl>${words.map(([w, d]) => `<dt>${w}</dt><dd>${d}</dd>`).join('')}</dl></div>` : ''}`;
    } else {
      read.innerHTML = `<div class="kicker">Sachtext</div><h2>${e.t.title}</h2>${forLine(cur)}<div class="text">${e.t.html}</div>`;
    }
    read.scrollTop = 0;
    if (window.innerWidth < 760) read.scrollIntoView({ block: 'start' });
  }
  ov.querySelector('.shelf-close').onclick = closeShelf;
  ov.addEventListener('click', e => { if (e.target === ov) closeShelf(); });
  ov._key = e => { if (e.key === 'Escape') closeShelf(); };
  document.addEventListener('keydown', ov._key);
  renderRead(); renderList();
  ov.querySelector('.shelf-close').focus();
}
function forLine(ref) {
  const c = (shelfState().ctx[ref] || []).map(ctxInfo).filter(Boolean);
  return c.length ? `<p class="forline">Gehört zu: ${c.map(i => `<span>${icon(i.icon)} ${i.name}</span>`).join('')}</p>` : '';
}
/* Leiste „Zum Nachlesen“ unter einer Aufgabe */
function lookupBar(refs) {
  refs = (refs || []).filter(r => shelfEntry(r));
  if (!refs.length) return null;
  return h(`<div class="lookup-bar">${icon('book')}<span>Zum Nachlesen:</span>${refs.map(r => linkify('{{' + r + '}}')).join('')}</div>`);
}
function closeShelf() {
  const ov = document.querySelector('.shelf');
  if (!ov) return;
  document.removeEventListener('keydown', ov._key);
  ov.remove(); document.body.classList.remove('shelf-open'); updateShelfBadges();
}

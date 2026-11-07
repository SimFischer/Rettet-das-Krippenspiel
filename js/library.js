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
let SHELF_CUR = 'extra';
function shelfButton(extraClass = '') { return `<button class="iconbtn shelfbtn ${extraClass}" type="button">${icon('book')} Bücherregal</button>`; }
function wireShelfButtons(root) { root.querySelectorAll('.shelfbtn').forEach(b => b.onclick = () => openShelf(SHELF_CTX)); setTimeout(updateShelfBadges, 0); }

function openShelf(ref) {
  closeShelf();
  if (ref && shelfEntry(ref) && shelfStatus(ref) === 'zu') shelfUnlock(SHELF_CUR, [ref]);
  const open = r => shelfStatus(r) !== 'zu';
  let cur = shelfEntry(ref) && open(ref) ? ref : (shelfEntry(SHELF_LAST) && open(SHELF_LAST) ? SHELF_LAST : allShelfRefs().find(open));
  let tab = cur ? cur.split(':')[0] : 'text';
  const ov = h(`<div class="shelf" role="dialog" aria-modal="true" aria-label="Frau Petersens Bücherregal">
    <div class="shelf-card">
      <header class="shelf-head">
        <div class="shelf-title">${icon('book')}<div><b>Frau Petersens Bücherregal</b><small>Hier findest du alles, was du für die Rätsel brauchst.</small></div></div>
        <div class="shelf-tabs" role="tablist">
          <button role="tab" data-tab="text">${icon('book')} Sachtexte</button>
          <button role="tab" data-tab="bibel">${icon('scroll')} Bibel</button>
        </div>
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
    ov.querySelectorAll('.shelf-tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === tab));
    const all = tab === 'bibel' ? BIBLE.map(b => ({ ref: 'bibel:' + b.id, t: b.title, s: b.ref, ic: 'scroll' })) : TEXTS.map(t => ({ ref: 'text:' + t.id, t: t.title, s: '', ic: 'book' }));
    const items = all.filter(i => open(i.ref)), locked = all.length - items.length;
    const lbl = { neu: '<em class="st neu">neu</em>', offen: '<em class="st offen">zu lesen</em>', erledigt: `<em class="st done">${icon('check')} erledigt</em>` };
    list.innerHTML = (items.length ? items.map(i => { const stt = shelfStatus(i.ref); return `<button class="spine${i.ref === cur ? ' on' : ''} ${stt}" data-ref="${i.ref}">${icon(i.ic)}<span><b>${i.t}</b>${i.s ? `<small>${i.s}</small>` : ''}${lbl[stt] || ''}</span></button>`; }).join('') : '<p class="shelf-empty">Hier ist noch nichts. Öffne ein Rätsel – dann kommen die passenden Einträge dazu.</p>')
      + (locked ? `<p class="shelf-locked">${icon('key')} Noch ${locked} ${locked === 1 ? 'Eintrag' : 'Einträge'} verschlossen. Sie erscheinen, sobald ein Rätsel sie braucht.</p>` : '');
    list.querySelectorAll('.spine').forEach(b => b.onclick = () => { cur = b.dataset.ref; renderRead(); renderList(); });
  }
  function renderRead() {
    const e = shelfEntry(cur); if (!e) { read.innerHTML = '<p class="shelf-empty">Wähle links einen Eintrag.</p>'; return; }
    SHELF_LAST = cur;
    const st = shelfState(); if (!st.seen.includes(cur)) { st.seen.push(cur); save(); }
    if (e.kind === 'bibel') {
      const b = e.b;
      const words = Object.entries(b.words || {});
      read.innerHTML = `<div class="kicker">Lutherbibel 1912 · ${b.ref}</div><h2>${b.title}</h2>
        <div class="bible">${b.verses.map(([n, t]) => t ? `<p><sup>${n}</sup> ${t}</p>` : `<p class="gap-v">${n}</p>`).join('')}</div>
        ${words.length ? `<div class="words"><b>Schwierige Wörter</b><dl>${words.map(([w, d]) => `<dt>${w}</dt><dd>${d}</dd>`).join('')}</dl></div>` : ''}`;
    } else {
      read.innerHTML = `<div class="kicker">Sachtext</div><h2>${e.t.title}</h2><div class="text">${e.t.html}</div>`;
    }
    read.scrollTop = 0;
    if (window.innerWidth < 760) read.scrollIntoView({ block: 'start' });
  }
  ov.querySelectorAll('.shelf-tabs button').forEach(b => b.onclick = () => {
    tab = b.dataset.tab;
    if (!cur || !cur.startsWith(tab)) cur = allShelfRefs().find(r => r.startsWith(tab) && open(r)) || null;
    renderRead(); renderList();
  });
  ov.querySelector('.shelf-close').onclick = closeShelf;
  ov.addEventListener('click', e => { if (e.target === ov) closeShelf(); });
  ov._key = e => { if (e.key === 'Escape') closeShelf(); };
  document.addEventListener('keydown', ov._key);
  renderRead(); renderList();
  ov.querySelector('.shelf-close').focus();
}
function closeShelf() {
  const ov = document.querySelector('.shelf');
  if (!ov) return;
  document.removeEventListener('keydown', ov._key);
  ov.remove(); document.body.classList.remove('shelf-open'); updateShelfBadges();
}

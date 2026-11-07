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
  return String(t).replace(/\{\{((?:bibel|text):[a-z0-9]+)\}\}/g, (_, r) => `<button class="reflink" data-ref="${r}">${icon(r.startsWith('bibel') ? 'scroll' : 'note')} ${shelfLabel(r)}</button>`);
}
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('.reflink');
  if (b) { e.preventDefault(); openShelf(b.dataset.ref); }
});
function shelfButton(extraClass = '') { return `<button class="iconbtn shelfbtn ${extraClass}" type="button">${icon('book')} Bücherregal</button>`; }
function wireShelfButtons(root) { root.querySelectorAll('.shelfbtn').forEach(b => b.onclick = () => openShelf(SHELF_CTX)); }

function openShelf(ref) {
  closeShelf();
  let cur = shelfEntry(ref) ? ref : (shelfEntry(SHELF_LAST) ? SHELF_LAST : 'text:advent');
  let tab = cur.split(':')[0];
  const ov = h(`<div class="shelf" role="dialog" aria-modal="true" aria-label="Frau Petersens Bücherregal">
    <div class="shelf-card">
      <header class="shelf-head">
        <div class="shelf-title">${icon('book')}<div><b>Frau Petersens Bücherregal</b><small>Hier findet ihr alles, was ihr für die Rätsel braucht.</small></div></div>
        <div class="shelf-tabs" role="tablist">
          <button role="tab" data-tab="text">${icon('note')} Sachtexte</button>
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
    const items = tab === 'bibel' ? BIBLE.map(b => ({ ref: 'bibel:' + b.id, t: b.title, s: b.ref, ic: 'scroll' })) : TEXTS.map(t => ({ ref: 'text:' + t.id, t: t.title, s: '', ic: t.icon }));
    list.innerHTML = items.map(i => `<button class="spine${i.ref === cur ? ' on' : ''}" data-ref="${i.ref}">${icon(i.ic)}<span><b>${i.t}</b>${i.s ? `<small>${i.s}</small>` : ''}</span></button>`).join('');
    list.querySelectorAll('.spine').forEach(b => b.onclick = () => { cur = b.dataset.ref; renderList(); renderRead(); });
  }
  function renderRead() {
    const e = shelfEntry(cur); if (!e) return;
    SHELF_LAST = cur;
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
    if (!cur.startsWith(tab)) cur = tab === 'bibel' ? 'bibel:lk2' : 'text:advent';
    renderList(); renderRead();
  });
  ov.querySelector('.shelf-close').onclick = closeShelf;
  ov.addEventListener('click', e => { if (e.target === ov) closeShelf(); });
  ov._key = e => { if (e.key === 'Escape') closeShelf(); };
  document.addEventListener('keydown', ov._key);
  renderList(); renderRead();
  ov.querySelector('.shelf-close').focus();
}
function closeShelf() {
  const ov = document.querySelector('.shelf');
  if (!ov) return;
  document.removeEventListener('keydown', ov._key);
  ov.remove(); document.body.classList.remove('shelf-open');
}

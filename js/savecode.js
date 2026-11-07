/* ===== Speicher-Code: 6 Zeichen, ohne Server =====
   Im Code steckt der Spielstand (21 Bit) und eine Prüfsumme (9 Bit), beides mit dem Vornamen verrechnet.
   Bits: 6 Schlösser · 6 Kostüme · Krone im Regal · Akt-3-Stufe (0–5, 5 = fertig) · 4 Funde Turmkammer · Figur */

const CODE_ABC = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // ohne 0, 1, I, O
function nameKey(n) { return String(n || '').trim().toLowerCase().normalize('NFC').replace(/\s+/g, ' '); }
function fnv(str) { let x = 0x811c9dc5; for (const ch of str) { x ^= ch.codePointAt(0); x = Math.imul(x, 0x01000193) >>> 0; } return x >>> 0; }

function packState(st) {
  let d = 0, b = 0;
  const put = (v, n) => { d += (v & ((1 << n) - 1)) * 2 ** b; b += n; };
  STATIONS.forEach(s => put(st.solved.includes(s.id) ? 1 : 0, 1));
  ACTORS.forEach(a => put(st.act2.delivered.includes(a.id) ? 1 : 0, 1));
  put(st.act2.shelf ? 1 : 0, 1);
  put(st.phase === 'fertig' ? 5 : (st.phase === 'schluessel' ? Math.min(4, st.act3.stage || 0) : 0), 3);
  DARK.spots.forEach(sp => put((st.act3.dark || []).includes(sp.id) ? 1 : 0, 1));
  put(st.figure === 'maedchen' ? 1 : 0, 1);
  return d; // 21 Bit
}
function makeCode(st) {
  const name = nameKey(st.team), d = packState(st);
  const mask = fnv('mask|' + name) & 0x1fffff;
  const x = (d ^ mask) >>> 0;
  const chk = fnv('chk|' + name + '|' + d) & 0x1ff;
  let v = chk * 2 ** 21 + x; // 30 Bit
  let out = '';
  for (let i = 0; i < 6; i++) { out = CODE_ABC[v % 32] + out; v = Math.floor(v / 32); }
  return out;
}
function readCode(code, name) {
  const c = String(code || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (c.length !== 6) return null;
  let v = 0;
  for (const ch of c) { const i = CODE_ABC.indexOf(ch); if (i < 0) return null; v = v * 32 + i; }
  const x = v % 2 ** 21, chk = Math.floor(v / 2 ** 21);
  const key = nameKey(name), d = (x ^ (fnv('mask|' + key) & 0x1fffff)) >>> 0;
  if ((fnv('chk|' + key + '|' + d) & 0x1ff) !== chk) return null;
  return decodeBits(d);
}
function decodeBits(d) {
  let b = 0; const get = n => { const r = Math.floor(d / 2 ** b) % 2 ** n; b += n; return r; };
  const solved = [], delivered = [], dark = [];
  STATIONS.forEach(s => { if (get(1)) solved.push(s.id); });
  ACTORS.forEach(a => { if (get(1)) delivered.push(a.id); });
  const shelf = !!get(1), stage = get(3);
  DARK.spots.forEach(sp => { if (get(1)) dark.push(sp.id); });
  const figure = get(1) ? 'maedchen' : 'junge';
  if (stage > 5) return null;
  return { solved, delivered, shelf, stage, dark, figure };
}
function restoreFrom(info, name) {
  const st = fresh();
  const nm = String(name).trim(); st.team = nm === nm.toLowerCase() ? nm.charAt(0).toUpperCase() + nm.slice(1) : nm; st.figure = info.figure; st.started = Date.now();
  st.solved = info.solved;
  st.seenInterlude = Object.keys(INTERLUDES).map(Number).filter(n => info.solved.length >= n);
  st.act2 = { delivered: info.delivered, shelf: info.shelf };
  if (info.stage === 5) { st.phase = 'fertig'; st.finaleDone = true; st.bonusOpen = true; st.act3 = { stage: 4, dark: info.dark }; }
  else if (info.shelf) { st.phase = 'schluessel'; st.act3 = { stage: info.stage, dark: info.dark }; }
  else if (info.delivered.length) st.phase = 'kostueme';
  else st.phase = 'kiste';
  // Bücherregal: Einträge erledigter Teile wieder freischalten
  const sh = st.shelf, mark = (ctx, refs, done) => { refs.forEach(r => { (sh.ctx[r] = sh.ctx[r] || []).includes(ctx) || sh.ctx[r].push(ctx); }); if (done) sh.done.push(ctx); };
  STATIONS.filter(s => info.solved.includes(s.id)).forEach(s => mark('st:' + s.id, shelfRefsOf(s), true));
  if (info.delivered.length || info.shelf || info.stage === 5) mark('act2', ['bibel:lk2', 'text:zwei', ...ACTORS.map(a => a.ref), ACT2_SHELF.ref], info.shelf);
  return st;
}

/* ----- Oberfläche ----- */
function saveButton() { return `<button class="iconbtn savebtn" title="Spiel speichern">${icon('key')} Speichern</button>`; }
function wireSave(el) { el.querySelectorAll('.savebtn').forEach(b => b.onclick = showSaveCode); }

function modal(html) {
  const ov = h(`<div class="modal" role="dialog" aria-modal="true"><div class="modal-card paper">${html}</div></div>`);
  ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
  document.body.appendChild(ov);
  return ov;
}
function showSaveCode() {
  const code = makeCode(S);
  const ov = modal(`<div class="kicker">Spiel speichern</div>
    <h2>Dein Speicher-Code</h2>
    <p>Schreib dir diesen Code auf. In der nächsten Stunde gibst du auf dem Startbildschirm deinen Namen und den Code ein – dann geht es genau hier weiter.</p>
    <div class="code-show" aria-label="Code ${code.split('').join(' ')}">${code.slice(0, 3)}<span>-</span>${code.slice(3)}</div>
    <p class="code-name">gehört zu: <b>${esc(S.team)}</b> · Spielfigur: ${S.figure === 'maedchen' ? 'Mädchen' : 'Junge'}</p>
    <p class="small-note" style="color:var(--ink-soft)">Gespeichert werden geöffnete Schlösser, verteilte Kostüme und der Stand in Akt 3. Ein angefangenes Schloss beginnt beim nächsten Mal von vorn. Zeit, Hinweise und Bestwerte werden nicht gespeichert.</p>
    <div class="step-actions"><button class="btn ink" id="ok">Aufgeschrieben ${icon('check')}</button></div>`);
  ov.querySelector('#ok').onclick = () => ov.remove();
}
function showLoadCode() {
  const ov = modal(`<div class="kicker">Weiterspielen</div>
    <h2>Ich habe einen Speicher-Code</h2>
    <form id="loadform" class="loadform">
      <label for="lname">Dein Vorname (genau wie beim letzten Mal)</label>
      <input id="lname" autocomplete="off" maxlength="28" required>
      <label for="lcode">Dein Code (6 Zeichen)</label>
      <input id="lcode" autocomplete="off" maxlength="8" required placeholder="z. B. K7M-Q3X" style="text-transform:uppercase;letter-spacing:.2em">
      <div class="lmsg"></div>
      <div class="step-actions"><button type="button" class="btn ghost small" id="cancel" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">Abbrechen</button><button class="btn ink" type="submit">${icon('next')} Weiterspielen</button></div>
    </form>`);
  ov.querySelector('#cancel').onclick = () => ov.remove();
  ov.querySelector('#loadform').onsubmit = e => {
    e.preventDefault();
    const name = ov.querySelector('#lname').value, code = ov.querySelector('#lcode').value;
    const info = readCode(code, name);
    const msg = ov.querySelector('.lmsg'); msg.innerHTML = '';
    if (!info || !name.trim()) { shake(ov.querySelector('.modal-card')); msg.appendChild(feedback('no', 'Das passt nicht.', ' Prüfe den Code und ob dein Name genau so geschrieben ist wie beim letzten Mal.')); return; }
    S = restoreFrom(info, name); save(); ov.remove();
    toast(`Willkommen zurück, ${esc(S.team)}!`);
    route();
  };
  ov.querySelector('#lname').focus();
}

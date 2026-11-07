/* ===== Akt 2 (Kostüme) und Akt 3 (Kirchenschlüssel) ===== */

function actHeader(nr, title, sub) {
  return `<div class="topbar">
    <span class="chip">${icon(S.teamIcon)} ${esc(S.team)}</span>
    <span class="chip act-chip"><b>Akt ${nr}</b> · ${title}</span>
    <span class="spacer"></span>
    ${shelfButton()}
    ${treasureButton()}
    ${teacherButton()}
    <button class="iconbtn" id="letter">${icon('scroll')} Brief</button>
  </div>${sub ? `<p class="act-sub">${sub}</p>` : ''}`;
}
function wireHeader(el, ref) { const l = el.querySelector('#letter'); if (l) l.onclick = () => showLetter(false); wireTreasure(el); wireTeacher(el); SHELF_CTX = ref || null; wireShelfButtons(el); }

/* ---------- Kiste öffnet sich ---------- */
function showChestOpen() {
  const el = h(`<section class="screen">
    <div class="topbar"><span class="chip">${icon(S.teamIcon)} ${esc(S.team)}</span><span class="chip">${icon('key')} ${keysHTML()}</span></div>
    <div style="width:min(560px,92%);margin:0 auto">${chestSVG({ interactive: false, stations: STATIONS, solved: S.solved })}</div>
    <div class="paper"><div class="kicker">Akt 2 · Die Kostüme</div><h2>Die Kiste ist offen!</h2><div class="act-intro">${ACT2_INTRO}</div>
      <div class="step-actions"><button class="btn" id="go">${icon('people')} In die Kirche</button></div></div>
  </section>`);
  el.querySelector('#go').onclick = () => { S.phase = 'kostueme'; save(); showAct2(); };
  mount(el);
}

/* ---------- Akt 2 ---------- */
function showAct2() {
  const A = S.act2;
  const done = () => A.delivered.length === ACTORS.length && A.shelf;
  const el = h(`<section class="screen">
    ${actHeader(2, 'Die Kostüme', 'Tippe auf den Boden, um zu laufen, oder auf ein Kind, um hinzugehen. Am Computer gehen auch die Pfeiltasten.')}
    <div class="walk-wrap">
      <div class="walk-slot"></div>
      <aside class="basket" aria-label="Kostümkorb"><h3>${icon('treasure')} Kostümkorb</h3><ul></ul><p class="small-note prog"></p></aside>
    </div>
    <div class="dlg" hidden></div>
  </section>`);
  wireHeader(el, 'text:zwei');
  const dlg = el.querySelector('.dlg');
  function renderBasket() {
    const left = COSTUMES.filter(c => !(A.delivered.includes(c.id) || (c.id === 'weise' && A.shelf)));
    el.querySelector('.basket ul').innerHTML = left.map(c => `<li><span class="cdot" style="background:${c.color}">${icon(c.icon)}</span><span><b>${c.role}:</b> ${c.t}</span></li>`).join('') || '<li>Der Korb ist leer!</li>';
    el.querySelector('.prog').textContent = `${A.delivered.length} von ${ACTORS.length} Kindern eingekleidet`;
  }
  renderBasket();
  const spots = () => [
    ...ACTORS.map(a => ({ ...a, kind: 'actor', done: A.delivered.includes(a.id), r: 70 })),
    { ...ACT2_SHELF, kind: 'shelf', done: A.shelf, r: 80, hidden: A.delivered.length < ACTORS.length },
  ].filter(s => !s.hidden);
  const walk = Walk.create({
    map: CHURCH_MAP, drawBg: drawChurchPlaceholder, spots,
    playerSprite: playerFigure().sheet,
    playerLook: playerFigure().look,
    drawSpot(ctx, s) {
      if (s.kind === 'shelf') {
        if (!s.done) bubble(ctx, s.x, s.y - 40, '!');
        return;
      }
      const cos = COSTUMES.find(c => c.id === s.id);
      const src = `assets/walk/actor-${s.id}.webp`;
      const im = img(src);
      if (im) { const fw = im.width / 2, sz = 108, sc = sz / im.height; ctx.drawImage(im, s.done ? fw : 0, 0, fw, im.height, s.x - fw * sc / 2, s.y - sz + 14, fw * sc, sz); }
      else drawPerson(ctx, s.x, s.y, { dir: 'down', body: s.shirt, hair: s.hair, cape: s.done ? cos.color : null, crown: s.done && s.id === 'kaiser' });
      ctx.fillStyle = 'rgba(19,26,44,.75)'; ctx.font = '700 20px Atkinson Hyperlegible, sans-serif'; ctx.textAlign = 'center';
      const w = ctx.measureText(s.name).width + 16; ctx.fillRect(s.x - w / 2, s.y + 20, w, 26);
      ctx.fillStyle = '#f3ead8'; ctx.fillText(s.name, s.x, s.y + 40);
      if (!s.done) bubble(ctx, s.x, s.y - 104, '?'); else bubble(ctx, s.x, s.y - 104, '✓', '#3f7d52');
    },
    onReach(s) {
      if (s.done) return;
      walk.pause();
      if (s.kind === 'shelf') shelfDialog(); else actorDialog(s);
    },
  });
  el.querySelector('.walk-slot').appendChild(walk.el);
  setTimeout(() => shelfUnlock('act2', ['bibel:lk2', 'text:zwei', ...ACTORS.map(a => a.ref), ACT2_SHELF.ref]), 400);

  function closeDlg() { dlg.hidden = true; dlg.innerHTML = ''; SHELF_CTX = 'text:zwei'; walk.resume(); }
  function dlgShell(name, sub, body, ref) {
    SHELF_CTX = ref || SHELF_CTX;
    dlg.innerHTML = `<div class="dlg-card paper"><div class="dlg-head"><div class="avatar">${icon('people')}</div><div><b>${name}</b><small>${sub}</small></div><button class="iconbtn close" aria-label="Später">${icon('cross')}</button></div>${body}${ref ? `<p class="lookup">Unsicher? Schlag nach: ${linkify('{{' + ref + '}}')}</p>` : ''}<div class="fb"></div><div class="step-actions"></div></div>`;
    dlg.hidden = false;
    dlg.querySelector('.close').onclick = closeDlg;
    return dlg.querySelector('.dlg-card');
  }
  function actorDialog(a) {
    const left = COSTUMES.filter(c => c.id !== 'weise' || true).filter(c => !A.delivered.includes(c.id));
    const card = dlgShell(a.name, 'wartet auf ein Kostüm', `<p class="say">„${a.riddle}“</p><p><b>Welches Kostüm braucht ${a.name}?</b></p>
      <div class="costumes">${shuffle(left).map(c => `<button class="opt" data-c="${c.id}"><span class="cdot" style="background:${c.color}">${icon(c.icon)}</span><span><b>${c.role}:</b> ${c.t}</span></button>`).join('')}</div>`, 'bibel:lk2');
    const fb = card.querySelector('.fb');
    card.querySelectorAll('.costumes .opt').forEach(b => b.onclick = () => {
      fb.innerHTML = '';
      if (b.dataset.c === a.id) {
        b.classList.add('right');
        fb.appendChild(feedback('ok', 'Passt!', ` ${a.name} spielt: <b>${roleName(a.id)}</b>. Aber vorher hat ${a.name} noch eine Frage …`));
        const n = h(`<button class="btn ink">Zur Frage ${icon('next')}</button>`); n.onclick = () => askQuestion(a); card.querySelector('.step-actions').appendChild(n);
        card.querySelectorAll('.costumes .opt').forEach(x => x.disabled = true);
      } else {
        b.classList.add('wrong'); shake(b);
        const why = b.dataset.c === 'weise' ? ' Die Krone gehört zu den Weisen aus dem Morgenland – die kommen in der Lukas-Geschichte gar nicht vor.' : ' Lies noch einmal genau, was das Kind erlebt hat.';
        fb.appendChild(feedback('no', 'Das passt nicht.', why));
        const all = card.querySelectorAll('.costumes .opt'); all.forEach(x => x.disabled = true);
        setTimeout(() => { if (!card.isConnected) return; b.classList.remove('wrong'); const box = card.querySelector('.costumes'); shuffle([...box.children]).forEach(c => box.appendChild(c)); all.forEach(x => x.disabled = false); }, 1800);
      }
    });
  }
  function askQuestion(a) {
    const card = dlgShell(a.name, roleName(a.id), '<div class="qslot"></div>', a.ref);
    const step = { ...a.q };
    const node = STEP.mc(step, () => {
      A.delivered.push(a.id); save(); renderBasket();
      if (A.delivered.length === ACTORS.length) toast('Alle Kinder sind eingekleidet! Ein Kostüm ist noch übrig …');
      else toast(`${a.name} ist eingekleidet!`);
      closeDlg();
      if (A.delivered.length === ACTORS.length && !A.shelf) setTimeout(() => toast('Bring die Krone in die Sakristei zum Regal.'), 2300);
    });
    node.classList.remove('paper'); node.classList.add('inner');
    card.querySelector('.qslot').appendChild(node);
  }
  function shelfDialog() {
    const card = dlgShell('Regal in der Sakristei', 'Schild: „Für den 6. Januar“', `<p class="say">${ACT2_SHELF.text}</p><div class="qslot"></div>`, ACT2_SHELF.ref);
    const node = STEP.mc({ ...ACT2_SHELF.q }, () => {
      A.shelf = true; S.times.kostueme = Date.now(); S.phase = 'schluessel'; shelfDone('act2'); save(); renderBasket(); closeDlg();
      walk.destroy(); showAct3();
    });
    node.classList.remove('paper'); node.classList.add('inner');
    card.querySelector('.qslot').appendChild(node);
  }
  mount(el);
}
function roleName(id) { return { maria: 'Maria', josef: 'Josef', engel: 'den Engel', hirte: 'einen Hirten', wirt: 'den Wirt', kaiser: 'Kaiser Augustus' }[id]; }
function bubble(ctx, x, y, t, col = '#f2bd62') {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 17, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 6, y + 14); ctx.lineTo(x, y + 24); ctx.lineTo(x + 6, y + 14); ctx.fill();
  ctx.fillStyle = col === '#f2bd62' ? '#2a1b06' : '#fff'; ctx.font = '800 22px Atkinson Hyperlegible, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(t, x, y + 8);
}

/* ---------- Akt 3 ---------- */
function showAct3() {
  const st = S.act3.stage;
  if (st === 0) return act3Message();
  act3Unlock();
  if (st === 1) return act3Dark();
  if (st === 2) return act3Songs();
  if (st === 3) return act3Rings();
  return act3Door();
}
const ACT3_CTX = { 1: ['act3-dark', () => ['text:farben', ...shelfRefsOf(DARK)]], 2: ['act3-songs', () => ['text:lieder']], 3: ['act3-rings', () => ['text:menschwerdung']] };
function nextAct3() { const c = ACT3_CTX[S.act3.stage]; if (c) shelfDone(c[0]); S.act3.stage++; save(); showAct3(); }
function act3Unlock() { const c = ACT3_CTX[S.act3.stage]; if (c) setTimeout(() => shelfUnlock(c[0], c[1]()), 300); }

function act3Message() {
  const el = h(`<section class="screen">
    ${actHeader(3, 'Der Kirchenschlüssel')}
    <div class="paper msg-paper">
      <div class="kicker">Akt 3 · Der Kirchenschlüssel</div>
      <div class="pastor"><div class="avatar">${icon('bell')}</div><p><b>Pastorin Ahrens:</b> „${ACT3_INTRO.pastor}“</p></div>
      <div class="phone"><div class="phone-top">Nachricht von <b>Hanne Petersen</b></div><div class="bubble-msg">${ACT3_INTRO.sms}</div></div>
      <div class="step-actions"><button class="btn" id="go">${icon('lantern')} Taschenlampe an, ab in die Turmkammer</button></div>
    </div>
  </section>`);
  wireHeader(el, 'text:farben');
  { const lb = lookupBar(['text:farben']); const sub = el.querySelector('.act-sub'); if (lb && sub) sub.insertAdjacentElement('afterend', lb); }
  el.querySelector('#go').onclick = nextAct3;
  mount(el);
}

function darkRoomArt() {
  const sp = DARK.spots.map(s => `<g transform="translate(${(s.x) * 16} ${(s.y) * 10})" color="#3a2a12">${icon(s.icon === 'cloth' ? 'scroll' : s.icon).replace('<svg', `<svg x="-60" y="-60" width="120" height="120"`)}</g>`).join('');
  return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" class="dark-art" aria-hidden="true">
    <rect width="1600" height="1000" fill="#7a5a3a"/>
    ${Array.from({ length: 25 }, (_, r) => Array.from({ length: 21 }, (_, c) => `<rect x="${c * 80 - (r % 2 ? 40 : 0)}" y="${r * 40}" width="78" height="38" fill="${(r * 5 + c * 3) % 7 ? '#8a4a3a' : '#7d4234'}"/>`).join('')).join('')}
    <rect y="760" width="1600" height="240" fill="#5a4630"/>
    <rect x="160" y="480" width="320" height="380" fill="#4b2b14"/><rect x="190" y="520" width="260" height="300" fill="#6c4b94"/>
    <rect x="560" y="200" width="380" height="300" fill="#4b2b14"/><rect x="600" y="230" width="300" height="240" fill="#f2ece0"/><path d="M750 290 l12 28 30 3 -23 20 7 30 -26 -16 -26 16 7 -30 -23 -20 30 -3z" fill="#c9a14c"/>
    <rect x="1060" y="600" width="260" height="200" fill="#4b2b14"/><rect x="1090" y="630" width="200" height="140" fill="#ece6d6"/>
    <rect x="1310" y="120" width="60" height="320" fill="#f6efdc"/><rect x="1336" y="90" width="8" height="34" fill="#2a2420"/>
    <rect x="720" y="700" width="200" height="190" rx="10" fill="#3b3b42" stroke="#c9a14c" stroke-width="8"/><circle cx="820" cy="795" r="26" fill="#c9a14c"/>
    ${sp}
  </svg>`;
}

function act3Dark() {
  const found = new Set(S.act3.dark || []);
  const el = h(`<section class="screen">
    ${actHeader(3, 'Die dunkle Turmkammer', 'Im Dunkeln liegen vier Dinge aus dem Kirchenjahr – und irgendwo der Schlüsselkasten.')}
    <div class="dark-wrap">
      <div class="dark-room">${darkRoomArt()}<img class="dark-img" src="assets/act3/turmkammer.webp" alt="" onerror="this.remove()"><canvas></canvas><div class="dark-spots"></div>
        <div class="dark-card" hidden></div>
      </div>
      <aside class="finds"><h3>${icon('lantern')} Deine Funde</h3>
        <ol class="find-list">${DARK.spots.map(sp => `<li data-id="${sp.id}"><span class="fi">?</span><span class="ft">Noch nicht gefunden</span></li>`).join('')}
          <li class="keybox"><span class="fi">${icon('key')}</span><span class="ft">Schlüsselkasten – erst wenn alle vier gefunden sind</span></li></ol>
      </aside>
    </div>
    <div class="fb wide"></div>
    <div class="st-foot"><span></span><button class="btn ghost small lantern" id="hint">${icon('lantern')} Laterne: Hinweis</button></div>
  </section>`);
  wireHeader(el, 'text:farben');
  { const lb = lookupBar(['text:farben']); const sub = el.querySelector('.act-sub'); if (lb && sub) sub.insertAdjacentElement('afterend', lb); }
  const room = el.querySelector('.dark-room'), cv = room.querySelector('canvas'), ctx = cv.getContext('2d'), layer = room.querySelector('.dark-spots');
  const card = room.querySelector('.dark-card'), fb = el.querySelector('.fb');
  let lx = .5, ly = .45, W = 0, H = 0, busy = false;
  const all = [...DARK.spots, { ...DARK.box, id: 'box' }];
  const thumb = sp => `<div class="thumb" style="background-position:${sp.x}% ${sp.y}%;background-size:${Math.round(100 / sp.w * 100 * .9)}% auto">${icon(sp.icon === 'cloth' ? 'scroll' : sp.icon)}</div>`;
  all.forEach((sp, i) => {
    const b = h(`<button class="dark-spot" style="left:${sp.x - sp.w / 2}%;top:${sp.y - sp.h / 2}%;width:${sp.w}%;height:${sp.h}%" aria-label="${sp.name}"><em>Antippen</em></button>`);
    b.onclick = e => { e.stopPropagation(); pick(i); };
    layer.appendChild(b);
  });
  function renderFinds() {
    DARK.spots.forEach(sp => {
      const li = el.querySelector(`.find-list li[data-id="${sp.id}"]`);
      if (found.has(sp.id)) { li.classList.add('got'); li.innerHTML = `<span class="fi">${icon('check')}</span><span class="ft"><b>${sp.name}</b><small>${DARK.drawers[sp.answer]}</small></span>`; }
    });
    const kb = el.querySelector('.keybox');
    kb.classList.toggle('ready', found.size === DARK.spots.length);
    if (found.size === DARK.spots.length) kb.querySelector('.ft').innerHTML = '<b>Schlüsselkasten</b><small>Er leuchtet jetzt unten in der Mitte – tippe ihn an!</small>';
  }
  function paint() {
    const r = room.getBoundingClientRect(); if (!r.width) return;
    const d = Math.min(2, devicePixelRatio || 1);
    if (W !== r.width || H !== r.height) { W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
    ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, W, H); ctx.fillStyle = 'rgba(6,5,10,.95)'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'destination-out';
    const R = Math.min(W, H) * .24, x = lx * W, y = ly * H;
    const g = ctx.createRadialGradient(x, y, R * .2, x, y, R); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(.7, 'rgba(0,0,0,.85)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill();
    ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,200,110,.08)'; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill();
    layer.querySelectorAll('.dark-spot').forEach((b, i) => {
      const sp = all[i], dist = Math.hypot((sp.x / 100 - lx) * W, (sp.y / 100 - ly) * H);
      const isBox = sp.id === 'box', ready = found.size === DARK.spots.length;
      b.hidden = (isBox && !ready) || (!isBox && found.has(sp.id));
      b.classList.toggle('lit', dist < R * .8 || (isBox && ready));
    });
  }
  const move = e => { if (busy) return; const r = room.getBoundingClientRect(); lx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); ly = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)); paint(); };
  room.addEventListener('pointermove', move);
  room.addEventListener('pointerdown', move);
  const ro = new ResizeObserver(() => { if (!room.isConnected) return ro.disconnect(); paint(); }); ro.observe(room);
  function pick(i) {
    if (busy) return;
    const sp = all[i]; fb.innerHTML = '';
    if (sp.id === 'box') { if (found.size === DARK.spots.length) { ro.disconnect(); nextAct3(); } return; }
    if (found.has(sp.id)) return;
    lx = sp.x / 100; ly = sp.y / 100; paint();
    ask(sp);
  }
  function ask(sp) {
    busy = true;
    card.innerHTML = `<div class="dc-in paper">
      <div class="dc-head">${thumb(sp)}<div><div class="kicker">Gefunden!</div><h2>${sp.name}</h2></div></div>
      <p class="dc-q"><b>Zu welcher Zeit im Kirchenjahr gehört das?</b> Tippe die richtige Antwort an.</p>
      <div class="options dc-opts">${shuffle(DARK.drawers.map((d, k) => k)).map(k => `<button class="opt" data-k="${k}">${DARK.drawers[k]}</button>`).join('')}</div>
      <p class="lookup">Unsicher? Lies nach: ${linkify('{{text:farben}}')}</p>
      <div class="dc-fb"></div><div class="step-actions"></div></div>`;
    card.hidden = false;
    const dfb = card.querySelector('.dc-fb');
    card.querySelectorAll('.dc-opts .opt').forEach(b => b.onclick = () => {
      dfb.innerHTML = '';
      const k = +b.dataset.k;
      if (k === sp.answer) {
        b.classList.add('right'); card.querySelectorAll('.dc-opts .opt').forEach(x => x.disabled = true);
        found.add(sp.id); S.act3.dark = [...found]; save();
        dfb.appendChild(feedback('ok', 'Richtig!', ' ' + sp.why));
        const left = DARK.spots.length - found.size;
        const n = h(`<button class="btn ink">${left ? `${icon('lantern')} Weiter suchen (noch ${left})` : `${icon('key')} Zum Schlüsselkasten`}</button>`);
        n.onclick = () => { card.hidden = true; busy = false; renderFinds(); paint(); };
        card.querySelector('.step-actions').appendChild(n);
      } else {
        b.classList.add('wrong'); shake(b);
        const opts = card.querySelectorAll('.dc-opts .opt'); opts.forEach(x => x.disabled = true);
        dfb.appendChild(feedback('no', 'Das passt nicht.', ' ' + sp.hint));
        setTimeout(() => { if (!card.isConnected) return; b.classList.remove('wrong'); const box = card.querySelector('.dc-opts'); shuffle([...box.children]).forEach(c => box.appendChild(c)); opts.forEach(x => x.disabled = false); }, 1800);
      }
    });
  }
  // Anleitung beim ersten Betreten
  if (!found.size) {
    busy = true;
    card.innerHTML = `<div class="dc-in paper intro">
      <div class="kicker">So funktioniert’s</div><h2>Mit der Taschenlampe suchen</h2>
      <ol class="dc-steps">
        <li>${icon('lantern')}<span><b>Leuchten:</b> Fahre mit dem Finger über die dunkle Kammer. Wo dein Finger ist, scheint die Taschenlampe.</span></li>
        <li>${icon('star')}<span><b>Finden:</b> Wenn ein Gegenstand <span class="gold">golden umrandet</span> aufleuchtet, tippe ihn an.</span></li>
        <li>${icon('cal')}<span><b>Zuordnen:</b> Dann erscheint hier eine Frage: Zu welcher Zeit im Kirchenjahr gehört der Gegenstand?</span></li>
        <li>${icon('key')}<span><b>Schlüssel:</b> Hast du alle vier gefunden, leuchtet der Schlüsselkasten auf.</span></li>
      </ol>
      <div class="step-actions"><button class="btn">${icon('lantern')} Taschenlampe an!</button></div></div>`;
    card.hidden = false;
    card.querySelector('.step-actions button').onclick = () => { card.hidden = true; busy = false; paint(); };
  }
  let hl = 0;
  el.querySelector('#hint').onclick = () => {
    fb.innerHTML = '';
    const t = found.size === DARK.spots.length ? 'Der Schlüsselkasten leuchtet unten in der Mitte. Tippe ihn an.' : ['Leuchte die Ecken ab: links unten, oben in der Mitte, rechts oben und rechts.', 'Vier Dinge sind versteckt: zwei Tücher, etwas auf einem Tisch und eine sehr große Kerze. Welche Zeit im Kirchenjahr dazu gehört, steht in {{text:farben}}'][hl++ % 2];
    fb.appendChild(feedback('tip', '', t)); S.hints++; save();
  };
  renderFinds();
  mount(el); requestAnimationFrame(paint);
}

function act3Songs() {
  const placed = Array(SONGS.clues.length).fill(null);
  let sel = 0, hl = 0, page = 0;
  const el = h(`<section class="screen">
    ${actHeader(3, 'Die Liedtafel', SONGS.intro)}
    <div class="songs">
      <div class="liedtafel" aria-label="Liedtafel">${SONGS.clues.map((_, i) => `<button class="lt-row" data-i="${i}"><span class="lt-num">–</span></button>`).join('')}<div class="lt-safe">${icon('key')} Schlüsselkasten: <b class="code">_ _ _ _</b></div></div>
      <div class="clues"><ol class="howto">${SONGS.steps.map(t => `<li>${t}</li>`).join('')}</ol>${SONGS.clues.map((c, i) => `<button class="clue" data-i="${i}"><b>Zettel ${i + 1}</b><span>${c.t}</span></button>`).join('')}</div>
      <div class="songbook">
        <div class="sb-head">${icon('book')} Evangelisches Gesangbuch</div>
        <div class="sb-page paper"></div>
        <div class="sb-nav">
          <button class="iconbtn sb-prev" aria-label="Vorige Seite">${icon('back')}</button>
          <span class="sb-count"></span>
          <button class="iconbtn sb-next" aria-label="Nächste Seite">${icon('next')}</button>
        </div>
      </div>
    </div>
    <div class="fb wide"></div>
    <div class="st-foot"><span></span><button class="btn ghost small lantern" id="hint">${icon('lantern')} Laterne: Hinweis</button></div>
  </section>`);
  wireHeader(el, 'text:lieder');
  { const lb = lookupBar(['text:lieder']); const sub = el.querySelector('.act-sub'); if (lb && sub) sub.insertAdjacentElement('afterend', lb); }
  const fb = el.querySelector('.fb'), pg = el.querySelector('.sb-page');
  function renderPage(dir) {
    const b = SONGS.book[page];
    pg.innerHTML = `<div class="sb-top"><span class="sb-eg">${b.eg}</span><span class="sb-kind">${b.kind}</span></div>
      <h3 class="sb-title">${b.t}</h3>
      <p class="sb-who">${b.who}</p>
      <div class="sb-verse"><small>${b.part}</small>${b.verse.map(l => `<span>${l}</span>`).join('')}</div>
      <div class="sb-act"><button class="btn ink sb-pick">${icon('check')} Auf die Liedtafel${sel != null ? ` (Zettel ${sel + 1})` : ''}</button></div>`;
    pg.classList.remove('flip-l', 'flip-r'); void pg.offsetWidth; if (dir) pg.classList.add(dir > 0 ? 'flip-r' : 'flip-l');
    el.querySelector('.sb-count').textContent = `Seite ${page + 1} von ${SONGS.book.length}`;
    el.querySelector('.sb-prev').disabled = page === 0;
    el.querySelector('.sb-next').disabled = page === SONGS.book.length - 1;
    pg.querySelector('.sb-pick').onclick = () => pick(b.eg);
  }
  el.querySelector('.sb-prev').onclick = () => { if (page > 0) { page--; renderPage(-1); } };
  el.querySelector('.sb-next').onclick = () => { if (page < SONGS.book.length - 1) { page++; renderPage(1); } };
  let sx = null;
  pg.addEventListener('pointerdown', e => { sx = e.clientX; });
  pg.addEventListener('pointerup', e => { if (sx == null) return; const d = e.clientX - sx; sx = null; if (Math.abs(d) > 60) el.querySelector(d < 0 ? '.sb-next' : '.sb-prev').click(); });
  function render() {
    el.querySelectorAll('.clue').forEach((c, i) => { c.classList.toggle('sel', i === sel); c.classList.toggle('done', placed[i] != null); });
    el.querySelectorAll('.lt-row').forEach((r, i) => { r.querySelector('.lt-num').textContent = placed[i] ?? '–'; r.classList.toggle('sel', i === sel); });
    el.querySelector('.code').textContent = placed.map(p => p ?? '_').join(' ');
    const pk = pg.querySelector('.sb-pick'); if (pk) pk.innerHTML = `${icon('check')} Auf die Liedtafel${sel != null ? ` (Zettel ${sel + 1})` : ''}`;
  }
  el.querySelectorAll('.clue, .lt-row').forEach(c => c.onclick = () => { if (placed[+c.dataset.i] != null) return; sel = +c.dataset.i; render(); });
  function pick(eg) {
    fb.innerHTML = '';
    if (sel == null || placed[sel] != null) { fb.appendChild(feedback('tip', '', 'Tippe zuerst einen Zettel an, der noch keine Nummer hat.')); return; }
    if (eg === SONGS.clues[sel].eg) {
      placed[sel] = eg; fb.appendChild(feedback('ok', `EG ${eg} passt zu Zettel ${sel + 1}!`, ' ' + SONGS.why[eg]));
      const nxt = placed.findIndex(p => p == null); sel = nxt < 0 ? null : nxt; render();
      if (nxt < 0) {
        el.querySelector('.lt-safe').classList.add('open');
        const n = h(`<div class="step-actions wide"><button class="btn">${icon('key')} Der Kasten springt auf – Ersatzschlüssel nehmen!</button></div>`);
        n.querySelector('button').onclick = nextAct3; fb.after(n);
      }
    } else {
      shake(pg); fb.appendChild(feedback('no', 'Dieses Lied passt nicht zu dem Zettel.', ' Lies den Zettel noch einmal genau und blättere weiter.'));
    }
  }
  el.querySelector('#hint').onclick = () => { fb.innerHTML = ''; fb.appendChild(feedback('tip', '', SONGS.hints[hl++ % SONGS.hints.length])); S.hints++; save(); };
  renderPage(0); render();
  mount(el);
}

function act3Rings() {
  const pos = RINGS.rings.map((r, i) => (r.answer + 1 + i) % r.options.length);
  let hl = 0;
  const el = h(`<section class="screen">
    ${actHeader(3, 'Die Kirchentür', RINGS.intro)}
    <div class="door-wrap">
      <div class="door-art"><img src="assets/act3/kirchentuer.webp" alt="" onerror="this.remove()">${doorSVG(false)}</div>
      <div class="paper rings">
        <div class="kicker">Walzenschloss</div>
        <p class="lead">${RINGS.lead}</p>
        ${RINGS.rings.map((r, i) => `<div class="ring" data-i="${i}"><small>${r.q}</small><div class="ring-row"><button class="iconbtn prev" aria-label="zurück">${icon('back')}</button><div class="ring-val" aria-live="polite"></div><button class="iconbtn nextb" aria-label="weiter">${icon('next')}</button></div></div>`).join('')}
        <div class="fb"></div>
        <div class="step-actions"><button class="btn ghost small" id="hint" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">${icon('lantern')} Hinweis</button><button class="btn ink" id="pull">${icon('key')} Schlüssel drehen</button></div>
      </div>
    </div>
  </section>`);
  wireHeader(el, 'text:menschwerdung');
  { const lb = lookupBar(['text:menschwerdung']); const sub = el.querySelector('.act-sub'); if (lb && sub) sub.insertAdjacentElement('afterend', lb); }
  const fb = el.querySelector('.fb');
  const render = () => el.querySelectorAll('.ring').forEach((rg, i) => rg.querySelector('.ring-val').textContent = RINGS.rings[i].options[pos[i]]);
  el.querySelectorAll('.ring').forEach((rg, i) => {
    const n = RINGS.rings[i].options.length;
    rg.querySelector('.prev').onclick = () => { pos[i] = (pos[i] - 1 + n) % n; render(); };
    rg.querySelector('.nextb').onclick = () => { pos[i] = (pos[i] + 1) % n; render(); };
  });
  el.querySelector('#pull').onclick = () => {
    fb.innerHTML = '';
    const wrong = RINGS.rings.findIndex((r, i) => pos[i] !== r.answer);
    if (wrong < 0) { S.times.schluessel = Date.now(); nextAct3(); return; }
    const rg = el.querySelectorAll('.ring')[wrong]; shake(rg);
    fb.appendChild(feedback('no', 'Der Schlüssel dreht sich nicht.', ` Mindestens eine Walze stimmt noch nicht. ${RINGS.rings[wrong].hint}`));
  };
  el.querySelector('#hint').onclick = () => { fb.innerHTML = ''; const r = RINGS.rings[hl++ % RINGS.rings.length]; fb.appendChild(feedback('tip', '', r.hint)); S.hints++; save(); };
  render();
  mount(el);
}

function doorSVG(open) {
  return `<svg viewBox="0 0 400 520" class="door-svg${open ? ' open' : ''}" aria-hidden="true">
    <rect width="400" height="520" fill="#6b382d"/>
    ${Array.from({ length: 26 }, (_, r) => Array.from({ length: 6 }, (_, c) => `<rect x="${c * 80 - (r % 2 ? 40 : 0)}" y="${r * 20}" width="78" height="18" fill="${(r + c) % 4 ? '#733f31' : '#6a372b'}"/>`).join('')).join('')}
    <path d="M60 520 V200 a140 140 0 0 1 280 0 V520 Z" fill="#2a170a"/>
    ${open ? `<path d="M80 520 V205 a120 120 0 0 1 240 0 V520 Z" fill="#f8dca2"/><g fill="#3a2a1d">${[110, 160, 220, 270].map((x, i) => `<circle cx="${x}" cy="${400 - i % 2 * 12}" r="16"/><rect x="${x - 18}" y="${414 - i % 2 * 12}" width="36" height="90" rx="14"/>`).join('')}</g>`
      : `<path d="M80 520 V205 a120 120 0 0 1 120 -118 V520 Z" fill="#5c3519"/><path d="M200 87 a120 120 0 0 1 120 118 V520 H200 Z" fill="#53301a"/>
      ${[260, 330, 400].map(y => `<rect x="80" y="${y}" width="240" height="12" fill="#2b2b30"/>`).join('')}<circle cx="215" cy="330" r="14" fill="#c9a14c"/>`}
  </svg>`;
}

function act3Door() {
  const el = h(`<section class="screen">
    ${actHeader(3, 'Die Tür ist offen!')}
    <div class="door-wrap">
      <div class="door-art">${doorSVG(true)}<img src="assets/act3/kirchentuer-offen.webp" alt="" onerror="this.remove()"></div>
      <div class="paper"><div class="kicker">Geschafft</div><h2>Die Gemeinde kommt herein</h2><p>${RINGS.win}</p>
        <p class="note">„Du hast das Krippenspiel gerettet!“ – Pastorin Ahrens</p>
        <div class="step-actions"><button class="btn" id="go">${icon('scroll')} Zum Drehbuch</button></div></div>
    </div>
  </section>`);
  wireHeader(el);
  el.querySelector('#go').onclick = showScript;
  mount(el);
}

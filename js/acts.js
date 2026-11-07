/* ===== Akt 2 (Kostüme) und Akt 3 (Kirchenschlüssel) ===== */

function actHeader(nr, title, sub) {
  return `<div class="topbar">
    <span class="chip">${icon(S.teamIcon)} ${esc(S.team)}</span>
    <span class="chip act-chip"><b>Akt ${nr}</b> · ${title}</span>
    <span class="spacer"></span>
    <button class="iconbtn" id="letter">${icon('scroll')} Brief</button>
  </div>${sub ? `<p class="act-sub">${sub}</p>` : ''}`;
}
function wireHeader(el) { const l = el.querySelector('#letter'); if (l) l.onclick = () => showLetter(false); }

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
    ${actHeader(2, 'Die Kostüme', 'Tippt auf den Boden, um zu laufen, oder auf ein Kind, um hinzugehen. Am Computer gehen auch die Pfeiltasten.')}
    <div class="walk-wrap">
      <div class="walk-slot"></div>
      <aside class="basket" aria-label="Kostümkorb"><h3>${icon('treasure')} Kostümkorb</h3><ul></ul><p class="small-note prog"></p></aside>
    </div>
    <div class="dlg" hidden></div>
  </section>`);
  wireHeader(el);
  const dlg = el.querySelector('.dlg');
  function renderBasket() {
    const left = COSTUMES.filter(c => !(A.delivered.includes(c.id) || (c.id === 'weise' && A.shelf)));
    el.querySelector('.basket ul').innerHTML = left.map(c => `<li><span class="cdot" style="background:${c.color}">${icon(c.icon)}</span>${c.t}</li>`).join('') || '<li>Der Korb ist leer!</li>';
    el.querySelector('.prog').textContent = `${A.delivered.length} von ${ACTORS.length} Kindern eingekleidet`;
  }
  renderBasket();
  const spots = () => [
    ...ACTORS.map(a => ({ ...a, kind: 'actor', done: A.delivered.includes(a.id), r: 70 })),
    { ...ACT2_SHELF, kind: 'shelf', done: A.shelf, r: 80, hidden: A.delivered.length < ACTORS.length },
  ].filter(s => !s.hidden);
  const walk = Walk.create({
    map: CHURCH_MAP, drawBg: drawChurchPlaceholder, spots,
    playerSprite: 'assets/walk/player-sheet.webp',
    playerLook: { body: '#2f5a46', hair: '#7a4a26', cape: '#1f3d2f' },
    drawSpot(ctx, s) {
      if (s.kind === 'shelf') {
        if (!s.done) bubble(ctx, s.x, s.y - 40, '!');
        return;
      }
      const cos = COSTUMES.find(c => c.id === s.id);
      const src = `assets/walk/actor-${s.id}.webp`;
      const im = img(src);
      if (im) { const fw = im.width / 2, sc = 92 / im.height; ctx.drawImage(im, s.done ? fw : 0, 0, fw, im.height, s.x - fw * sc / 2, s.y - 92 + 14, fw * sc, 92); }
      else drawPerson(ctx, s.x, s.y, { dir: 'down', body: s.shirt, hair: s.hair, cape: s.done ? cos.color : null, crown: s.done && s.id === 'kaiser' });
      ctx.fillStyle = 'rgba(19,26,44,.75)'; ctx.font = '700 20px Atkinson Hyperlegible, sans-serif'; ctx.textAlign = 'center';
      const w = ctx.measureText(s.name).width + 16; ctx.fillRect(s.x - w / 2, s.y + 20, w, 26);
      ctx.fillStyle = '#f3ead8'; ctx.fillText(s.name, s.x, s.y + 40);
      if (!s.done) bubble(ctx, s.x, s.y - 48, '?'); else bubble(ctx, s.x, s.y - 48, '✓', '#3f7d52');
    },
    onReach(s) {
      if (s.done) return;
      walk.pause();
      if (s.kind === 'shelf') shelfDialog(); else actorDialog(s);
    },
  });
  el.querySelector('.walk-slot').appendChild(walk.el);

  function closeDlg() { dlg.hidden = true; dlg.innerHTML = ''; walk.resume(); }
  function dlgShell(name, sub, body) {
    dlg.innerHTML = `<div class="dlg-card paper"><div class="dlg-head"><div class="avatar">${icon('people')}</div><div><b>${name}</b><small>${sub}</small></div><button class="iconbtn close" aria-label="Später">${icon('cross')}</button></div>${body}<div class="fb"></div><div class="step-actions"></div></div>`;
    dlg.hidden = false;
    dlg.querySelector('.close').onclick = closeDlg;
    return dlg.querySelector('.dlg-card');
  }
  function actorDialog(a) {
    const left = COSTUMES.filter(c => c.id !== 'weise' || true).filter(c => !A.delivered.includes(c.id));
    const card = dlgShell(a.name, 'wartet auf ein Kostüm', `<p class="say">„${a.riddle}“</p><p><b>Welches Kostüm braucht ${a.name}?</b></p>
      <div class="costumes">${shuffle(left).map(c => `<button class="opt" data-c="${c.id}"><span class="cdot" style="background:${c.color}">${icon(c.icon)}</span><span>${c.t}</span></button>`).join('')}</div>`);
    const fb = card.querySelector('.fb');
    card.querySelectorAll('.costumes .opt').forEach(b => b.onclick = () => {
      fb.innerHTML = '';
      if (b.dataset.c === a.id) {
        b.classList.add('right');
        fb.appendChild(feedback('ok', 'Passt!', ` ${a.name} spielt: <b>${roleName(a.id)}</b>. Aber vorher hat ${a.name} noch eine Frage …`));
        const n = h(`<button class="btn ink">Zur Frage ${icon('next')}</button>`); n.onclick = () => askQuestion(a); card.querySelector('.step-actions').appendChild(n);
        card.querySelectorAll('.costumes .opt').forEach(x => x.disabled = true);
      } else {
        b.classList.add('wrong'); b.disabled = true; shake(b);
        const why = b.dataset.c === 'weise' ? ' Die Krone gehört zu den Weisen aus dem Morgenland – die kommen in der Lukas-Geschichte gar nicht vor.' : ' Lies noch einmal genau, was das Kind erlebt hat.';
        fb.appendChild(feedback('no', 'Das passt nicht.', why));
      }
    });
  }
  function askQuestion(a) {
    const card = dlgShell(a.name, roleName(a.id), '<div class="qslot"></div>');
    const step = { ...a.q };
    const node = STEP.mc(step, () => {
      A.delivered.push(a.id); save(); renderBasket();
      if (A.delivered.length === ACTORS.length) toast('Alle Kinder sind eingekleidet! Ein Kostüm ist noch übrig …');
      else toast(`${a.name} ist eingekleidet!`);
      closeDlg();
      if (A.delivered.length === ACTORS.length && !A.shelf) setTimeout(() => toast('Bringt die Krone in die Sakristei zum Regal.'), 2300);
    });
    node.classList.remove('paper'); node.classList.add('inner');
    card.querySelector('.qslot').appendChild(node);
  }
  function shelfDialog() {
    const card = dlgShell('Regal in der Sakristei', 'Schild: „Für den 6. Januar“', `<p class="say">${ACT2_SHELF.text}</p><div class="qslot"></div>`);
    const node = STEP.mc({ ...ACT2_SHELF.q }, () => {
      A.shelf = true; S.times.kostueme = Date.now(); S.phase = 'schluessel'; save(); renderBasket(); closeDlg();
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
  if (st === 1) return act3Dark();
  if (st === 2) return act3Songs();
  if (st === 3) return act3Rings();
  return act3Door();
}
function nextAct3() { S.act3.stage++; save(); showAct3(); }

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
  wireHeader(el);
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
    ${actHeader(3, 'Die dunkle Turmkammer', 'Bewegt die Taschenlampe mit dem Finger. Leuchtet etwas auf? Tippt darauf und legt es in den richtigen Kasten.')}
    <div class="dark-wrap">
      <div class="dark-room">${darkRoomArt()}<img class="dark-img" src="assets/act3/turmkammer.webp" alt="" onerror="this.remove()"><canvas></canvas><div class="dark-spots"></div></div>
      <aside class="drawers"><h3>Kästen im Kirchenschrank</h3>${DARK.drawers.map((d, k) => `<button class="drawer" data-k="${k}" disabled><span>${d}</span><small></small></button>`).join('')}<div class="hand small-note">Noch nichts gefunden.</div></aside>
    </div>
    <div class="fb wide"></div>
    <div class="st-foot"><span></span><button class="btn ghost small lantern" id="hint">${icon('lantern')} Laterne: Hinweis</button></div>
  </section>`);
  wireHeader(el);
  const room = el.querySelector('.dark-room'), cv = room.querySelector('canvas'), ctx = cv.getContext('2d'), layer = room.querySelector('.dark-spots');
  const hand = el.querySelector('.hand'), fb = el.querySelector('.fb');
  let lx = .5, ly = .45, holding = null, W = 0, H = 0;
  const all = [...DARK.spots, { ...DARK.box, id: 'box' }];
  all.forEach((sp, i) => {
    const b = h(`<button class="dark-spot" style="left:${sp.x - sp.w / 2}%;top:${sp.y - sp.h / 2}%;width:${sp.w}%;height:${sp.h}%" aria-label="${sp.name}"></button>`);
    b.onclick = e => { e.stopPropagation(); pick(i); };
    layer.appendChild(b);
  });
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
      const isBox = sp.id === 'box';
      b.hidden = isBox && found.size < DARK.spots.length;
      b.classList.toggle('lit', dist < R * .8 || (isBox && found.size === DARK.spots.length));
      b.classList.toggle('found', !isBox && found.has(sp.id));
    });
  }
  const move = e => { const r = room.getBoundingClientRect(); lx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); ly = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)); paint(); };
  room.addEventListener('pointermove', move);
  room.addEventListener('pointerdown', move);
  const ro = new ResizeObserver(() => { if (!room.isConnected) return ro.disconnect(); paint(); }); ro.observe(room);
  function pick(i) {
    const sp = all[i]; fb.innerHTML = '';
    if (sp.id === 'box') { if (found.size === DARK.spots.length) { ro.disconnect(); nextAct3(); } return; }
    if (found.has(sp.id)) { fb.appendChild(feedback('tip', '', `Das liegt schon im Kasten: ${sp.name}.`)); return; }
    lx = sp.x / 100; ly = sp.y / 100; paint();
    holding = sp;
    hand.innerHTML = `<b>${sp.name}</b><br>Zu welcher Zeit im Kirchenjahr gehört das? Tippt den passenden Kasten an.`;
    el.querySelectorAll('.drawer').forEach(d => d.disabled = false);
  }
  el.querySelectorAll('.drawer').forEach(d => d.onclick = () => {
    if (!holding) return;
    const k = +d.dataset.k; fb.innerHTML = '';
    if (k === holding.answer) {
      found.add(holding.id); S.act3.dark = [...found]; save();
      d.classList.add('filled'); d.querySelector('small').textContent = [...found].map(id => DARK.spots.find(s => s.id === id)).filter(s => s.answer === k).map(s => s.name).join(', ');
      fb.appendChild(feedback('ok', 'Passt!', ' ' + holding.why));
      holding = null; el.querySelectorAll('.drawer').forEach(x => x.disabled = true);
      hand.innerHTML = found.size === DARK.spots.length ? '<b>Alles einsortiert!</b> Da unten glänzt etwas: der Schlüsselkasten. Tippt ihn an.' : `${found.size} von ${DARK.spots.length} gefunden. Leuchtet weiter herum.`;
      paint();
    } else { shake(d); fb.appendChild(feedback('no', 'Der Kasten klemmt.', ' ' + holding.hint)); }
  });
  // vorhandenen Fortschritt anzeigen
  DARK.drawers.forEach((_, k) => { const names = DARK.spots.filter(s => s.answer === k && found.has(s.id)).map(s => s.name); if (names.length) { const d = el.querySelector(`.drawer[data-k="${k}"]`); d.classList.add('filled'); d.querySelector('small').textContent = names.join(', '); } });
  let hl = 0;
  el.querySelector('#hint').onclick = () => {
    fb.innerHTML = '';
    const t = holding ? holding.hint : found.size === DARK.spots.length ? 'Der Schlüsselkasten leuchtet unten in der Mitte.' : ['Leuchtet die Ecken ab: links unten, oben in der Mitte, rechts oben und rechts unten.', 'Vier Dinge sind versteckt. Jedes gehört zu einer anderen Zeit im Kirchenjahr.'][hl++ % 2];
    fb.appendChild(feedback('tip', '', t)); S.hints++; save();
  };
  mount(el); requestAnimationFrame(paint);
}

function act3Songs() {
  const placed = Array(SONGS.clues.length).fill(null);
  let sel = 0, hl = 0;
  const el = h(`<section class="screen">
    ${actHeader(3, 'Die Liedtafel', SONGS.intro)}
    <div class="songs">
      <div class="liedtafel" aria-label="Liedtafel">${SONGS.clues.map((_, i) => `<button class="lt-row" data-i="${i}"><span class="lt-num">–</span></button>`).join('')}<div class="lt-safe">${icon('key')} Schlüsselkasten: <b class="code">_ _ _ _</b></div></div>
      <div class="clues">${SONGS.clues.map((c, i) => `<button class="clue" data-i="${i}"><b>Zettel ${i + 1}</b><span>${c.t}</span></button>`).join('')}</div>
      <div class="hymnal paper"><div class="kicker">Evangelisches Gesangbuch · Advent und Weihnachten</div><ul>${SONGS.book.map(b => `<li><button class="song" data-eg="${b.eg}"><span class="eg">${b.eg}</span>${b.t}</button></li>`).join('')}</ul></div>
    </div>
    <div class="fb wide"></div>
    <div class="st-foot"><span></span><button class="btn ghost small lantern" id="hint">${icon('lantern')} Laterne: Hinweis</button></div>
  </section>`);
  wireHeader(el);
  const fb = el.querySelector('.fb');
  function render() {
    el.querySelectorAll('.clue').forEach((c, i) => { c.classList.toggle('sel', i === sel); c.classList.toggle('done', placed[i] != null); });
    el.querySelectorAll('.lt-row').forEach((r, i) => { r.querySelector('.lt-num').textContent = placed[i] ?? '–'; r.classList.toggle('sel', i === sel); });
    el.querySelector('.code').textContent = placed.map(p => p ?? '_').join(' ');
  }
  el.querySelectorAll('.clue, .lt-row').forEach(c => c.onclick = () => { sel = +c.dataset.i; render(); });
  el.querySelectorAll('.song').forEach(b => b.onclick = () => {
    fb.innerHTML = '';
    if (sel == null || placed[sel] != null) { fb.appendChild(feedback('tip', '', 'Tippt zuerst einen Zettel an, der noch keine Nummer hat.')); return; }
    const eg = +b.dataset.eg;
    if (eg === SONGS.clues[sel].eg) {
      placed[sel] = eg; fb.appendChild(feedback('ok', `EG ${eg}!`, ' ' + SONGS.why[eg]));
      const nxt = placed.findIndex(p => p == null); sel = nxt < 0 ? null : nxt; render();
      if (nxt < 0) {
        el.querySelector('.lt-safe').classList.add('open');
        const n = h(`<div class="step-actions wide"><button class="btn">${icon('key')} Der Kasten springt auf – Ersatzschlüssel nehmen!</button></div>`);
        n.querySelector('button').onclick = nextAct3; fb.after(n);
      }
    } else { shake(b); fb.appendChild(feedback('no', 'Das ist ein anderes Lied.', ' Lest den Zettel noch einmal genau.')); }
  });
  el.querySelector('#hint').onclick = () => { fb.innerHTML = ''; fb.appendChild(feedback('tip', '', SONGS.hints[hl++ % SONGS.hints.length])); S.hints++; save(); };
  render();
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
  wireHeader(el);
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
        <p class="note">„Ihr habt das Krippenspiel gerettet!“ – Pastorin Ahrens</p>
        <div class="step-actions"><button class="btn" id="go">${icon('scroll')} Zum Drehbuch</button></div></div>
    </div>
  </section>`);
  wireHeader(el);
  el.querySelector('#go').onclick = showScript;
  mount(el);
}

/* ===== Zustand ===== */
const KEY = 'rettet-das-krippenspiel-v1';
const TEACHER_PIN = '2412';
const TEAM_ICONS = ['sheep', 'star', 'angel', 'candle', 'bell', 'lantern'];
const FIGURE_CHOICES = [
  { id: 'maedchen', label: 'Mädchen', sheet: 'assets/walk/player-girl-sheet.webp', look: { body: '#8a3f5c', hair: '#c98a3a', cape: '#5a2440' } },
  { id: 'junge', label: 'Junge', sheet: 'assets/walk/player-sheet.webp', look: { body: '#2f5a46', hair: '#7a4a26', cape: '#1f3d2f' } },
];
const playerFigure = () => FIGURE_CHOICES.find(f => f.id === S.figure) || FIGURE_CHOICES[1];

const fresh = () => ({ team: '', teamIcon: 'sheep', started: null, finished: null, phase: 'kiste', solved: [], progress: {}, hints: 0, seenInterlude: [], bonusOpen: false, reflection: '', finaleDone: false, figure: null, best: {}, shelf: { ctx: {}, done: [], seen: [], all: false }, act2: { delivered: [], shelf: false }, act3: { stage: 0, dark: [] }, times: {} });
let S = load();
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return Object.assign(fresh(), JSON.parse(raw)); } catch (e) { /* ohne Speicher weiterspielen */ }
  return fresh();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignorieren */ } }

/* ===== Helfer ===== */
const app = () => document.getElementById('app');
function nb(t) { return String(t).replace(/(^|[\s>(„])(\d{1,2}\.) (?=[A-ZÄÖÜ])/g, '$1$2\u00a0').replace(/z\. B\./g, 'z.\u00a0B.'); }
function h(html) { const t = document.createElement('template'); t.innerHTML = nb(html.trim()); return t.content.firstElementChild; }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
function toast(msg) { const t = h(`<div class="toast" role="status">${msg}</div>`); document.body.appendChild(t); setTimeout(() => t.remove(), 2200); }
function mount(el) { const a = app(); a.innerHTML = ''; a.appendChild(el); window.scrollTo(0, 0); }
function fmtTime(ms) { const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60; return `${m}:${String(s).padStart(2, '0')}`; }
function keysHTML() { return `<span class="keys" aria-label="${S.solved.length} von 6 Schlössern offen">${STATIONS.map(s => `<i class="${S.solved.includes(s.id) ? 'on' : ''}"></i>`).join('')}</span>`; }
function feedback(kind, title, text) {
  const ic = kind === 'ok' ? 'check' : kind === 'no' ? 'cross' : 'lantern';
  return h(`<div class="feedback ${kind}" role="status">${icon(ic)}<div>${title ? `<b>${title}</b>` : ''}${text ? linkify(text) : ''}</div></div>`);
}

/* ===== Weiche nach Spielphase ===== */
function route() {
  if (S.phase === 'kostueme') return showAct2();
  if (S.phase === 'schluessel') return showAct3();
  if (S.phase === 'fertig') return showCertificate();
  return showHub();
}

/* ===== Start ===== */
function showStart() {
  if (S.team && S.started) return route();
  const el = h(`<section class="screen start">
    <div class="eyebrow">Ein Escape-Abenteuer zur Weihnachtszeit</div>
    <h1>Rettet das Krippenspiel!</h1>
    <div class="chestmini">${chestSVG({ interactive: false, stations: STATIONS, solved: [] })}</div>
    <form class="teamform" id="teamform">
      <label for="teamname">Wie heißt du?</label>
      <input id="teamname" maxlength="28" autocomplete="off" placeholder="Dein Vorname" required>
      <p class="small-note" style="margin:0">Mit welcher Figur möchtest du spielen?</p>
      <div class="figures" role="group" aria-label="Spielfigur">${FIGURE_CHOICES.map(f => `<button type="button" data-f="${f.id}" aria-pressed="${f.id === S.figure}"><span class="fig-prev" style="background-image:url(${f.sheet})">${icon('people')}</span><span>${f.label}</span></button>`).join('')}</div>
      <button class="btn" type="submit">Los geht's ${icon('next')}</button>
    </form>
    <button class="linkbtn" id="teacherlink">Für Lehrkräfte</button>
  </section>`);
  el.querySelectorAll('.figures button').forEach(b => b.onclick = () => {
    S.figure = b.dataset.f; el.querySelectorAll('.figures button').forEach(x => x.setAttribute('aria-pressed', x === b));
  });
  el.querySelectorAll('.fig-prev').forEach(p => { const im = new Image(); im.onload = () => p.classList.add('art'); im.src = p.style.backgroundImage.slice(5, -2); });
  el.querySelector('#teamform').onsubmit = e => {
    e.preventDefault();
    const v = el.querySelector('#teamname').value.trim();
    if (!v) return;
    if (!S.figure) { shake(el.querySelector('.figures')); toast('Wähle noch deine Spielfigur.'); return; }
    S.team = v; save(); showLetter(true);
  };
  el.querySelector('#teacherlink').onclick = showPin;
  mount(el);
}

function showLetter(first) {
  const el = h(`<section class="screen">
    <div class="topbar"><span class="chip">${icon(S.teamIcon)} ${esc(S.team)}</span><span class="spacer"></span></div>
    <div class="letter"><div class="hand">${LETTER(esc(S.team))}</div></div>
    <div class="center-actions"><button class="btn" id="go">${first ? 'Zur Kiste in der Sakristei' : 'Zurück'} ${icon('next')}</button></div>
  </section>`);
  el.querySelector('#go').onclick = () => { if (!S.started) { S.started = Date.now(); save(); } route(); };
  mount(el);
}

/* ===== Kiste (Hub) ===== */
function showHub() {
  const all = S.solved.length === STATIONS.length;
  const el = h(`<section class="screen">
    <div class="topbar">
      <span class="chip">${icon(S.teamIcon)} ${esc(S.team)}</span>
      <span class="chip">${icon('key')} ${keysHTML()}</span>
      <span class="spacer"></span>
      ${shelfButton()}
      <button class="iconbtn" id="letter">${icon('scroll')} Brief</button>
      ${treasureButton()}
      ${teacherButton()}
    </div>
    <div class="hub-main">
      <div class="chest-wrap">${chestSVG({ stations: STATIONS, solved: S.solved })}</div>
      <aside class="side">
        <div class="card">
          <h2>${all ? 'Alle Schlösser sind offen!' : 'Welches Schloss knackst du?'}</h2>
          <p class="small-note" style="margin:.4em 0 .8em">${all ? 'Hebt den Deckel an!' : 'Du kannst in jeder Reihenfolge spielen. Tippe auf ein Schloss.'}</p>
          <ul class="locklist">${STATIONS.map(s => `<li><button data-id="${s.id}" class="${S.solved.includes(s.id) ? 'done' : ''}">${icon(s.icon)}<span class="t">${s.name}<small>${s.sub}</small></span></button></li>`).join('')}</ul>
        </div>
        ${all ? `<button class="btn" id="finale">${icon('chest')} Kiste öffnen</button>` : ''}
      </aside>
    </div>
    <p class="hub-hint">${all ? 'Gleich läuten die Glocken …' : `Noch ${STATIONS.length - S.solved.length} ${STATIONS.length - S.solved.length === 1 ? 'Schloss' : 'Schlösser'} bis zum Krippenspiel`}</p>
  </section>`);
  const open = id => showStation(id);
  el.querySelectorAll('.lock').forEach(g => {
    g.onclick = () => open(g.dataset.id);
    g.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(g.dataset.id); } };
  });
  el.querySelectorAll('.locklist button').forEach(b => b.onclick = () => open(b.dataset.id));
  el.querySelector('#letter').onclick = () => showLetter(false);
  wireTreasure(el); wireTeacher(el);
  SHELF_CTX = null; SHELF_CUR = null; wireShelfButtons(el);
  const fin = el.querySelector('#finale'); if (fin) fin.onclick = showChestOpen;
  mount(el);
}

/* ===== Station ===== */
function showStation(id) {
  const st = STATIONS.find(s => s.id === id);
  const solved = S.solved.includes(id);
  let idx = solved ? 0 : (S.progress[id] || 0);
  let hintLevel = 0;
  const el = h(`<section class="screen">
    <div class="st-head">
      <div class="ic">${icon(st.icon)}</div>
      <div class="tt"><h1>${st.name}</h1><div class="sub">${st.sub}${solved ? ' · schon geöffnet – du kannst alles noch einmal ansehen' : ''}</div></div>
      <div class="dots" aria-hidden="true"></div>
    </div>
    <div class="hintbox" hidden></div>
    <div class="stage-slot"></div>
    <div class="st-foot">
      <button class="btn ghost small" id="back">${icon('back')} Zur Kiste</button>
      <span class="foot-right">${shelfButton('btn ghost small')}<button class="btn ghost small lantern" id="hint">${icon('lantern')} Laterne: Hinweis</button></span>
    </div>
  </section>`);
  const slot = el.querySelector('.stage-slot');
  wireShelfButtons(el);
  const dots = el.querySelector('.dots');
  const hintBtn = el.querySelector('#hint');
  const hintBox = el.querySelector('.hintbox');
  el.querySelector('#back').onclick = showHub;

  function renderDots() {
    dots.innerHTML = st.steps.map((_, i) => `<i class="${i < idx ? 'on' : i === idx ? 'cur' : ''}"></i>`).join('');
  }
  function renderStep() {
    renderDots();
    hintLevel = 0; hintBox.hidden = true;
    const step = st.steps[idx];
    SHELF_CTX = step.ref || st.ref;
    hintBtn.hidden = !(step.hints && step.hints.length);
    slot.innerHTML = '';
    const node = STEP[step.type](step, next, st);
    if (step.type !== 'info') {
      const bar = lookupBar(step.links || [step.ref || st.ref]);
      const h2 = node.querySelector('h2');
      if (bar && h2) h2.insertAdjacentElement('afterend', bar);
    }
    slot.appendChild(node);
  }
  function next() {
    idx++;
    if (!solved) { S.progress[id] = idx; save(); }
    if (idx >= st.steps.length) return complete();
    renderStep();
  }
  hintBtn.onclick = () => {
    const step = st.steps[idx];
    if (!step.hints) return;
    const n = Math.min(hintLevel, step.hints.length - 1);
    hintBox.innerHTML = step.hints.slice(0, n + 1).map(t => `<div>${linkify(t)}</div>`).join('');
    hintBox.hidden = false;
    if (hintLevel < step.hints.length) { hintLevel++; if (!solved) { S.hints++; save(); } }
    hintBtn.innerHTML = `${icon('lantern')} ${hintLevel < step.hints.length ? 'Noch ein Hinweis' : 'Hinweise'}`;
  };
  function complete() {
    if (solved) return showHub();
    S.solved.push(id); delete S.progress[id]; shelfDone('st:' + id);
    if (S.solved.length === STATIONS.length) S.times.kiste = Date.now();
    save();
    showUnlocked(st);
  }
  renderStep();
  mount(el);
  if (!solved) shelfUnlock('st:' + id, shelfRefsOf(st)); else SHELF_CUR = 'st:' + id;
}

function showUnlocked(st) {
  const n = S.solved.length;
  const game = INTERLUDES[n] && !S.seenInterlude.includes(n) ? INTERLUDES[n] : null;
  const el = h(`<section class="screen">
    <div class="topbar"><span class="chip">${icon('key')} ${keysHTML()}</span></div>
    <div class="paper" style="text-align:center;align-items:center">
      <div class="kicker">Klick!</div>
      <h2>${st.name} ist offen!</h2>
      <div style="width:min(420px,80vw)">${chestSVG({ interactive: false, stations: STATIONS, solved: S.solved })}</div>
      <p>${n < STATIONS.length ? `Noch ${STATIONS.length - n} ${STATIONS.length - n === 1 ? 'Schloss' : 'Schlösser'}.` : 'Das war das letzte Schloss!'}${game ? ' Aber zuerst braucht jemand deine Hilfe …' : ''}</p>
      <div class="center-actions">${game ? `<button class="btn" id="game">${icon(game === 'sheep' ? 'sheep' : 'star')} Zwischenspiel</button><button class="btn ghost small" id="skip">Überspringen</button>` : `<button class="btn" id="hub">${icon('chest')} Zur Kiste</button>`}</div>
    </div>
  </section>`);
  const mark = () => { S.seenInterlude.push(n); save(); };
  const back = () => { showHub(); toast(`${icon('treasure')} Das Spiel liegt jetzt in der Schatzkammer – du kannst es jederzeit nochmal spielen.`); };
  const g = el.querySelector('#game'); if (g) g.onclick = () => { mark(); GAMES[game](back); };
  const sk = el.querySelector('#skip'); if (sk) sk.onclick = () => { mark(); back(); };
  const hb = el.querySelector('#hub'); if (hb) hb.onclick = showHub;
  mount(el);
}

/* ===== Aufgabentypen ===== */
const STEP = {
  info(step, next, st) {
    const art = step.art === 'wheel' ? lightWheelSVG(adventDays()).replace('class="lightwheel"', 'class="lightwheel" data-static="1"')
      : step.art === 'window' ? windowArt()
      : `<div style="display:grid;place-items:center;padding:30px;color:var(--candle-soft)">${icon(step.art === 'books' ? 'scroll' : step.art === 'note' ? 'note' : 'star', 'width="140" height="140"')}</div>`;
    const el = h(`<div class="paper">
      <div class="kicker">${step.kicker || ''}</div>
      <div class="info-grid"><div style="display:grid;gap:14px;min-width:0"><h2>${step.title}</h2>${linkify(step.html)}</div><div class="art">${art}${st ? `<img class="info-img" src="assets/scene/info-${st.id}.webp" alt="" onerror="this.remove()">` : ''}</div></div>
      <div class="step-actions"><button class="btn ink">Los geht’s ${icon('next')}</button></div>
    </div>`);
    if (step.art === 'wheel') el.querySelectorAll('.fl').forEach(f => f.classList.add('on'));
    el.querySelector('.step-actions button').onclick = next;
    return el;
  },

  mc(step, next) {
    const order = shuffle(step.options.map((t, i) => i));
    const el = h(`<div class="paper">
      <h2>${step.q}</h2>
      <div class="options">${order.map(i => `<button class="opt" data-i="${i}">${step.swatches ? `<span class="sw" style="background:${step.swatches[i]}"></span>` : ''}<span>${step.options[i]}</span></button>`).join('')}</div>
      <div class="fb"></div>
      <div class="step-actions"></div>
    </div>`);
    const fb = el.querySelector('.fb');
    el.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      fb.innerHTML = '';
      if (i === step.correct) {
        b.classList.add('right');
        el.querySelectorAll('.opt').forEach(x => x.disabled = true);
        fb.appendChild(feedback('ok', 'Richtig!', step.explain ? ' ' + step.explain : ''));
        const n = h(`<button class="btn ink">Weiter ${icon('next')}</button>`); n.onclick = next;
        el.querySelector('.step-actions').appendChild(n); n.focus();
      } else {
        b.classList.add('wrong'); shake(b);
        const all = el.querySelectorAll('.opt'); all.forEach(x => x.disabled = true);
        const tip = step.hints && step.hints[0] ? ' Tipp: ' + step.hints[0] : ' Lies noch einmal nach und versuch es dann erneut.';
        fb.appendChild(feedback('no', 'Das stimmt nicht.', tip));
        setTimeout(() => {
          if (!el.isConnected) return;
          b.classList.remove('wrong');
          const box = el.querySelector('.options');
          shuffle([...box.children]).forEach(c => box.appendChild(c));
          all.forEach(x => x.disabled = false);
        }, 1800);
      }
    });
    return el;
  },

  calendar(step, next) {
    const months = [[2026, 10], [2026, 11]];
    const grid = ym => calGridHTML(ym, true);
    const el = h(`<div class="paper">
      <h2>${step.q}</h2>
      <div class="cal-wrap">${months.map(grid).join('')}</div>
      <div class="fb"></div><div class="step-actions"></div>
    </div>`);
    const fb = el.querySelector('.fb');
    const special = {
      '2026-12-20': 'Das ist der 4. Advent. Geh drei Wochen zurück.',
      '2026-12-13': 'Das ist der 3. Advent. Noch zwei Wochen zurück.',
      '2026-12-06': 'Das ist der 2. Advent – und Nikolaustag! Noch eine Woche zurück.',
      '2026-11-22': 'Zu früh. Das ist der Ewigkeitssonntag, der letzte Sonntag des alten Kirchenjahres.',
      '2026-12-27': 'Das ist schon nach Weihnachten.',
    };
    el.querySelectorAll('.cal-grid button').forEach(b => b.onclick = () => {
      fb.innerHTML = '';
      if (b.dataset.d === step.target) {
        b.classList.add('hit');
        el.querySelectorAll('.cal-grid button').forEach(x => x.disabled = true);
        fb.appendChild(feedback('ok', 'Gefunden!', ' Der 1. Advent 2026 ist Sonntag, der 29. November. An diesem Tag beginnt das neue Kirchenjahr.'));
        const n = h(`<button class="btn ink">Weiter ${icon('next')}</button>`); n.onclick = next; el.querySelector('.step-actions').appendChild(n);
      } else {
        b.classList.add('miss'); shake(b);
        const dt = new Date(b.dataset.d);
        fb.appendChild(feedback('no', 'Noch nicht.', ' ' + (special[b.dataset.d] || (dt.getDay() !== 0 ? 'Der Advent beginnt immer an einem Sonntag.' : 'Das ist ein Sonntag, aber nicht der richtige.'))));
      }
    });
    return el;
  },

  dial(step, next) {
    const letters = step.kind === 'letters';
    const len = step.answer.length;
    const vals = Array(len).fill(0);
    const alpha = letters ? (step.alphabet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') : '0123456789';
    let groups;
    if (step.format && step.format.length > 1) groups = step.format.map(() => 2); else groups = [len];
    let k = 0;
    const wheelsHTML = groups.map((g, gi) => {
      let s = '';
      for (let j = 0; j < g; j++, k++) s += `<div class="wheel" data-k="${k}"><button class="u" aria-label="hoch">${icon('up')}</button><div class="val" aria-live="polite">${alpha[0]}</div><button class="d" aria-label="runter">${icon('down')}</button></div>`;
      return s + (gi < groups.length - 1 ? '<span class="sep">.</span>' : '');
    }).join('');
    const el = h(`<div class="paper">
      <h2 style="font-size:clamp(1.15rem,2.2vw,1.45rem)">${step.q}</h2>
      ${step.calendar ? `<div class="cal-wrap small">${step.calendar.map(ym => calGridHTML(ym, false)).join('')}</div>` : ''}
      ${step.showDays ? `<div class="dayline">${adventDays().map(d => `<span style="${d.sun ? 'background:#f7f1e3;box-shadow:inset 0 0 0 2px #c9a14c' : ''}"><b>${d.d}.${d.m}.</b>${d.wd}</span>`).join('')}</div>` : ''}
      <div class="dial">
        <div class="lockpic" style="color:var(--brass-dark)">${icon(step.lockIcon || 'key', 'width="120" height="120" stroke-width="1.2"')}</div>
        <div class="dial-row">${wheelsHTML}</div>
        ${step.format && step.format.length === 1 ? `<div class="small-note" style="color:var(--ink-soft)">${step.format[0]}</div>` : step.format ? `<div class="small-note" style="color:var(--ink-soft)">${step.format.join(' · ')}</div>` : ''}
        <button class="btn ink" id="try">${icon('key')} Schloss öffnen</button>
      </div>
      <div class="fb"></div>
      <div class="extra"></div>
      <div class="step-actions"></div>
    </div>`);
    const upd = () => el.querySelectorAll('.wheel').forEach(w => w.querySelector('.val').textContent = alpha[vals[+w.dataset.k]]);
    el.querySelectorAll('.wheel').forEach(w => {
      const i = +w.dataset.k;
      w.querySelector('.u').onclick = () => { vals[i] = (vals[i] + 1) % alpha.length; upd(); };
      w.querySelector('.d').onclick = () => { vals[i] = (vals[i] - 1 + alpha.length) % alpha.length; upd(); };
    });
    const fb = el.querySelector('.fb');
    el.querySelector('#try').onclick = () => {
      const code = vals.map(v => alpha[v]).join('');
      fb.innerHTML = '';
      if (code === step.answer) {
        el.querySelectorAll('.wheel button, #try').forEach(b => b.disabled = true);
        fb.appendChild(feedback('ok', 'Klick – das Schloss springt auf!', ''));
        if (step.wheelAfter) {
          const days = adventDays();
          const wrap = h(`<div style="display:grid;gap:8px;justify-items:center"><p style="text-align:center">So hätte Wicherns Lichterrad 2026 ausgesehen: <b>4 weiße</b> und <b>22 rote</b> Kerzen.</p>${lightWheelSVG(days)}</div>`);
          el.querySelector('.extra').appendChild(wrap);
          const fl = wrap.querySelectorAll('.fl');
          fl.forEach((f, i) => setTimeout(() => f.classList.add('on'), 120 * i));
          setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
        }
        const n = h(`<button class="btn">${icon('key')} Weiter</button>`); n.onclick = next; el.querySelector('.step-actions').appendChild(n);
      } else {
        shake(el.querySelector('.dial-row'));
        fb.appendChild(feedback('no', 'Das Schloss klemmt.', ' Der Code stimmt noch nicht. Prüfe deine Lösung oder nimm die Laterne.'));
      }
    };
    return el;
  },

  order(step, next) {
    const items = shuffle(step.items.map((it, i) => ({ ...it, i })));
    let pos = 0;
    const el = h(`<div class="paper">
      <h2>${step.q}</h2>
      <div class="cards">${items.map(it => `<button class="scard" data-i="${it.i}">${icon(it.icon)}<span>${it.text}</span></button>`).join('')}</div>
      <div class="fb"></div><div class="step-actions"></div>
    </div>`);
    const fb = el.querySelector('.fb');
    el.querySelectorAll('.scard').forEach(b => b.onclick = () => {
      if (b.classList.contains('placed')) return;
      fb.innerHTML = '';
      const i = +b.dataset.i;
      if (i === pos) {
        b.classList.add('placed'); b.insertAdjacentHTML('beforeend', `<span class="num">${pos + 1}</span>`);
        pos++;
        if (pos === step.items.length) {
          fb.appendChild(feedback('ok', step.success || 'Richtig geordnet!', ' Die Geschichte ist wieder in der richtigen Reihenfolge.'));
          const n = h(`<button class="btn ink">Weiter ${icon('next')}</button>`); n.onclick = next; el.querySelector('.step-actions').appendChild(n);
        }
      } else {
        shake(b);
        const back = pos > 0;
        pos = 0;
        el.querySelectorAll('.scard').forEach(x => { x.classList.remove('placed'); const n = x.querySelector('.num'); if (n) n.remove(); });
        const box = el.querySelector('.cards'); shuffle([...box.children]).forEach(c => box.appendChild(c));
        fb.appendChild(feedback('no', back ? 'Falsche Reihenfolge – die Schriftrolle rollt sich wieder zu.' : 'Damit geht die Geschichte nicht los.', ' Fang noch einmal von vorne an. ' + (step.hints ? 'Tipp: ' + step.hints[0] : '')));
      }
    });
    return el;
  },

  sort(step, next) {
    const items = shuffle(step.items.map((it, i) => ({ ...it, i })));
    let sel = null, left = items.length;
    const el = h(`<div class="paper">
      <h2>${step.q}</h2>
      ${step.intro ? `<p class="task-intro">${step.intro}</p>` : ''}
      <div class="pool">${items.map(it => `<button class="pill" data-i="${it.i}">${it.t}</button>`).join('')}</div>
      <div class="buckets" style="grid-template-columns:repeat(${step.buckets.length},minmax(0,1fr))">${step.buckets.map(b => `<button class="bucket" data-b="${b.id}"><h3>${icon(b.icon)} ${b.title}</h3><div class="in"></div></button>`).join('')}</div>
      <div class="fb"></div><div class="step-actions"></div>
    </div>`);
    if (window.innerWidth < 560) el.querySelector('.buckets').style.gridTemplateColumns = '1fr';
    const fb = el.querySelector('.fb');
    const pills = el.querySelectorAll('.pill');
    pills.forEach(p => p.onclick = () => {
      pills.forEach(x => x.classList.remove('sel'));
      sel = p; p.classList.add('sel');
      el.querySelectorAll('.bucket').forEach(b => b.classList.add('ready'));
    });
    el.querySelectorAll('.bucket').forEach(bk => bk.onclick = () => {
      if (!sel) { fb.innerHTML = ''; fb.appendChild(feedback('tip', '', 'Tippe zuerst eine Karte oben an.')); return; }
      const it = step.items[+sel.dataset.i];
      fb.innerHTML = '';
      if (it.b === bk.dataset.b) {
        bk.querySelector('.in').insertAdjacentHTML('beforeend', `<span>${it.t}</span>`);
        sel.remove(); sel = null; left--;
        el.querySelectorAll('.bucket').forEach(b => b.classList.remove('ready'));
        fb.appendChild(feedback('ok', 'Passt!', ' ' + it.why));
        if (!left) {
          fb.innerHTML = '';
          fb.appendChild(feedback('ok', 'Alles richtig sortiert – das Siegel bricht!', ''));
          const n = h(`<button class="btn">${icon('key')} Weiter</button>`); n.onclick = next; el.querySelector('.step-actions').appendChild(n);
        }
      } else {
        shake(sel); shake(bk);
        fb.appendChild(feedback('no', 'Gehört woanders hin.', ' ' + it.why));
      }
    });
    return el;
  },

  match(step, next) {
    const rights = shuffle(step.pairs.map((p, i) => ({ ...p, i })));
    let selA = null, done = 0;
    const el = h(`<div class="paper">
      <h2>${step.q}</h2>
      <div class="match">
        <div class="col">${step.pairs.map((p, i) => `<button class="scard a" data-i="${i}">${icon(p.ai)}<span><b>${p.a}</b></span></button>`).join('')}</div>
        <div class="col">${rights.map(p => `<button class="scard b" data-i="${p.i}"><span>${p.b}</span></button>`).join('')}</div>
      </div>
      <div class="fb"></div><div class="step-actions"></div>
    </div>`);
    const fb = el.querySelector('.fb');
    el.querySelectorAll('.scard.a').forEach(a => a.onclick = () => {
      if (a.disabled) return;
      el.querySelectorAll('.scard.a').forEach(x => x.classList.remove('sel'));
      selA = a; a.classList.add('sel');
    });
    el.querySelectorAll('.scard.b').forEach(b => b.onclick = () => {
      if (!selA) { fb.innerHTML = ''; fb.appendChild(feedback('tip', '', 'Tippe zuerst links ein Geschenk an.')); return; }
      fb.innerHTML = '';
      if (selA.dataset.i === b.dataset.i) {
        const c = 'p' + done;
        selA.classList.remove('sel'); selA.classList.add(c); b.classList.add(c);
        selA.disabled = true; b.disabled = true; selA = null; done++;
        if (done === step.pairs.length) {
          fb.appendChild(feedback('ok', 'Richtig zugeordnet!', ' ' + step.explain));
          const n = h(`<button class="btn ink">Weiter ${icon('next')}</button>`); n.onclick = next; el.querySelector('.step-actions').appendChild(n);
        }
      } else { shake(b); fb.appendChild(feedback('no', 'Passt noch nicht.', '')); }
    });
    return el;
  },

  tf(step, next) {
    const ans = step.items.map(() => null);
    let tries = 0;
    const el = h(`<div class="paper">
      <h2>${step.q}</h2>
      <p class="small-note" style="color:var(--ink-soft)">Entscheide bei jeder Aussage. Erst danach wird geprüft.</p>
      <div class="tf-list">${step.items.map((it, i) => `<div class="tf-row" data-i="${i}"><p>${it.t}</p><div class="tf-toggle"><button data-v="1">${icon('check')} Stimmt</button><button data-v="0">${icon('cross')} Stimmt nicht</button></div><div class="tf-why" hidden></div></div>`).join('')}</div>
      <div class="fb"></div>
      <div class="step-actions"><button class="btn ink" id="check" disabled>${icon('check')} Prüfen</button></div>
    </div>`);
    const fb = el.querySelector('.fb'), chk = el.querySelector('#check');
    el.querySelectorAll('.tf-row').forEach(r => r.querySelectorAll('button').forEach(b => b.onclick = () => {
      const i = +r.dataset.i; ans[i] = b.dataset.v === '1';
      r.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      r.classList.remove('bad');
      chk.disabled = ans.some(v => v === null);
    }));
    chk.onclick = () => {
      fb.innerHTML = '';
      const wrong = step.items.map((it, i) => ans[i] !== it.ok);
      const n = wrong.filter(Boolean).length;
      if (!n) {
        el.querySelectorAll('.tf-row').forEach((r, i) => { r.classList.add('good'); const w = r.querySelector('.tf-why'); w.textContent = step.items[i].why; w.hidden = false; r.querySelectorAll('button').forEach(x => x.disabled = true); });
        fb.appendChild(feedback('ok', 'Alle Aussagen richtig beurteilt!', ''));
        chk.remove();
        const nx = h(`<button class="btn ink">Weiter ${icon('next')}</button>`); nx.onclick = next; el.querySelector('.step-actions').appendChild(nx);
        return;
      }
      tries++;
      shake(el.querySelector('.tf-list'));
      if (tries >= 3) {
        el.querySelectorAll('.tf-row').forEach((r, i) => r.classList.toggle('bad', wrong[i]));
        fb.appendChild(feedback('no', `${n === 1 ? 'Eine Aussage ist' : n + ' Aussagen sind'} noch falsch beurteilt – sie sind jetzt markiert.`, step.hints ? ' ' + step.hints[0] : ''));
      } else {
        fb.appendChild(feedback('no', `${n === 1 ? 'Eine Aussage ist' : n + ' Aussagen sind'} noch falsch beurteilt.`, ' Welche? Prüfe noch einmal mit dem Text im Bücherregal. ' + (step.hints ? step.hints[0] : '')));
      }
    };
    return el;
  },

  fill(step, next) {
    let cur = 0;
    const textHTML = step.parts.map(p => typeof p === 'number' ? `<span class="gap" data-g="${p}">&nbsp;?&nbsp;</span>` : p).join('');
    const el = h(`<div class="paper">
      <h2>${step.q}</h2>
      <div class="fill-text">${textHTML}</div>
      <div class="chips"></div>
      <div class="fb"></div><div class="step-actions"></div>
    </div>`);
    const fb = el.querySelector('.fb'), chips = el.querySelector('.chips');
    function render() {
      el.querySelectorAll('.gap').forEach(g => g.classList.toggle('cur', +g.dataset.g === cur));
      chips.innerHTML = '';
      if (cur >= step.gaps.length) {
        fb.innerHTML = ''; fb.appendChild(feedback('ok', 'Vollständig!', step.explain ? ' ' + step.explain : ''));
        const n = h(`<button class="btn ink">Weiter ${icon('next')}</button>`); n.onclick = next; el.querySelector('.step-actions').appendChild(n);
        return;
      }
      shuffle(step.gaps[cur].choices).forEach(c => {
        const b = h(`<button class="pill">${c}</button>`);
        b.onclick = () => {
          fb.innerHTML = '';
          if (c === step.gaps[cur].answer) {
            const g = el.querySelector(`.gap[data-g="${cur}"]`); g.textContent = c; g.classList.add('done'); g.classList.remove('cur');
            cur++; render();
          } else {
            shake(b); b.classList.add('wrong'); chips.querySelectorAll('button').forEach(x => x.disabled = true);
            fb.appendChild(feedback('no', 'Das passt nicht.', step.hints ? ' Tipp: ' + step.hints[0] : ''));
            setTimeout(() => { if (el.isConnected) render(); }, 1500);
          }
        };
        chips.appendChild(b);
      });
    }
    render();
    return el;
  },
};

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
function calGridHTML([y, m], interactive) {
  const wd = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate();
  const off = (first.getDay() + 6) % 7;
  let cells = wd.map((d, i) => `<div class="wd ${i === 6 ? 'sun' : ''}">${d}</div>`).join('');
  for (let i = 0; i < off; i++) cells += '<div></div>';
  for (let d = 1; d <= days; d++) {
    const sun = new Date(y, m, d).getDay() === 0;
    const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const cls = `${sun ? 'sun' : ''} ${m === 11 && (d === 24 || d === 25) ? 'xmas' : ''}`;
    cells += interactive ? `<button data-d="${iso}" class="${cls}" aria-label="${d}. ${MONTHS[m]}">${d}</button>` : `<span class="${cls}">${d}</span>`;
  }
  return `<div class="cal"><h3>${MONTHS[m]} ${y}</h3><div class="cal-grid">${cells}</div></div>`;
}

function adventDays() {
  const out = [], wd = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  for (let d = new Date(2026, 10, 29); d <= new Date(2026, 11, 24); d.setDate(d.getDate() + 1)) out.push({ d: d.getDate(), m: d.getMonth() + 1, wd: wd[d.getDay()], sun: d.getDay() === 0 });
  return out;
}

/* ===== Finale ===== */
function showScript() {
  const el = h(`<section class="screen">
    <div class="letter" style="transform:rotate(.4deg)">
      <div class="kicker" style="color:var(--ink-soft);text-transform:uppercase;letter-spacing:.1em;font-size:.8rem;font-weight:700">Drehbuch, letzte Seite</div>
      <h2 style="color:var(--ink);margin:.3em 0 .6em">Der Engel spricht zu den Hirten</h2>
      <blockquote style="margin:0;padding:10px 16px;border-left:4px solid var(--brass);font-family:var(--f-display);font-size:1.3rem">„Fürchtet euch nicht! Siehe, ich verkündige euch große Freude, die allem Volk widerfahren wird; denn euch ist heute der Heiland geboren, welcher ist Christus, der Herr, in der Stadt Davids.“</blockquote>
      <p class="small-note" style="color:var(--ink-soft)">Lukas 2,10–11</p>
      <label for="reflect" style="display:block;font-weight:700;margin:1em 0 .4em">Die Pastorin fragt dich: Was ist für dich die wichtigste Botschaft von Weihnachten? Schreib einen Satz.</label>
      <textarea id="reflect" class="reflect" maxlength="240" placeholder="Für mich ist an Weihnachten wichtig, dass …">${esc(S.reflection || '')}</textarea>
      <div class="step-actions" style="margin-top:12px"><button class="btn" id="done">${icon('bell')} Die Glocken läuten!</button></div>
    </div>
  </section>`);
  el.querySelector('#done').onclick = () => {
    S.reflection = el.querySelector('#reflect').value.trim();
    S.finaleDone = true; S.bonusOpen = true; S.phase = 'fertig'; if (!S.finished) S.finished = Date.now(); save(); showCertificate();
  };
  mount(el);
}

function showCertificate() {
  const t = S.finished && S.started ? fmtTime(S.finished - S.started) : '–';
  const el = h(`<section class="screen">
    <div class="paper cert">
      <svg class="seal" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" fill="#a8452f"/><circle cx="60" cy="60" r="44" fill="none" stroke="#f1e5c9" stroke-width="2" stroke-dasharray="4 5"/><g transform="translate(30 30) scale(2.5)" color="#f1e5c9">${icon('star').replace('<svg', '<svg width="24" height="24"')}</g></svg>
      <div class="kicker">Urkunde</div>
      <h1>Das Krippenspiel ist gerettet!</h1>
      <div class="team">${esc(S.team)}</div>
      <p>hat die Krippenspiel-Kiste geknackt, alle Kostüme richtig verteilt und die Kirchentür geöffnet. Und kennt sich jetzt richtig gut aus mit Advent, Weihnachten und Epiphanias.</p>
      <div class="stats"><div><b>6 / 6</b>Schlösser</div><div><b>6 / 6</b>Kostüme</div><div><b>1</b>Kirchentür</div><div><b>${t}</b>Minuten</div><div><b>${S.hints}</b>Hinweise</div></div>
      ${S.reflection ? `<p class="quote">„${esc(S.reflection)}“</p>` : ''}
      <p class="small-note" style="color:var(--ink-soft)">Zeig diese Urkunde deiner Lehrkraft. Danke! – Hanne Petersen, Diakonin</p>
      <div class="center-actions"><button class="btn" id="treasure">${icon('treasure')} Zur Schatzkammer</button><button class="btn ghost small" id="hub" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">Zur Kiste</button></div>
    </div>
  </section>`);
  el.querySelector('#treasure').onclick = showTreasury;
  el.querySelector('#hub').onclick = showHub;
  mount(el);
}

/* ===== Schatzkammer ===== */
const TREASURE = [
  { g: 'sheep', icon: 'sheep', t: 'Die Hirten suchen ihre Schafe', d: 'Finde alle Schafe auf dem nächtlichen Feld – mit der Laterne.', best: v => `${v} Schafe`, open: () => S.seenInterlude.includes(2), lock: 'Wird frei, sobald du zwei Schlösser geknackt hast.' },
  { g: 'memory', icon: 'star', t: 'Sternen-Memory', d: 'Finde die Paare der Weihnachtszeichen.', best: v => `${v} Züge`, open: () => S.seenInterlude.includes(4), lock: 'Wird frei, sobald du vier Schlösser geknackt hast.' },
  { g: 'heimweg', icon: 'star', t: 'Der andere Heimweg', d: 'Die Weisen schleichen an den Wachen von König Herodes vorbei (Matthäus 2,12).', best: v => `${v}. Versuch`, open: () => false, lock: 'Wird frei, wenn du das Krippenspiel gerettet hast.' },
  { g: 'candles', icon: 'wreath', t: 'Kerzenwächter', d: 'Der Wind pustet durch die Kirche. Halte die Adventskerzen am Brennen!', best: v => `${v} Kerzen`, open: () => false, lock: 'Wird frei, wenn du das Krippenspiel gerettet hast.' },
];
const gameOpen = x => S.bonusOpen || S.finaleDone || x.open();
function treasureButton() {
  const n = TREASURE.filter(gameOpen).length;
  return `<button class="iconbtn" id="bonus" ${n ? '' : 'disabled style="opacity:.4"'} title="${n ? n + ' Spiele' : 'Noch keine Spiele frei'}">${icon('treasure')} Schatzkammer${n ? ` <span class="tcount">${n}</span>` : ''}</button>`;
}
function wireTreasure(el) { const b = el.querySelector('#bonus'); if (b) b.onclick = showTreasury; }

function showTreasury() {
  const best = S.best || {};
  const el = h(`<section class="screen">
    <div class="topbar"><button class="btn ghost small" id="back">${icon('back')} Zurück</button><span class="spacer"></span></div>
    <div class="paper">
      <div class="kicker">Schatzkammer</div>
      <h2>Spiele zum Nochmal-Spielen</h2>
      <p>Jedes Spiel, das du schon kennengelernt hast, liegt hier. Versuch doch, deinen Bestwert zu schlagen!</p>
      <div class="cards">${TREASURE.map(x => gameOpen(x)
        ? `<button class="scard" data-g="${x.g}">${icon(x.icon)}<span><b>${x.t}</b><br>${x.d}${best[x.g] != null ? `<br><small>Bester Wert: ${x.best(best[x.g])}</small>` : ''}</span></button>`
        : `<div class="scard locked">${icon('key')}<span><b>${x.t}</b><br><small>${x.lock}</small></span></div>`).join('')}</div>
    </div>
  </section>`);
  el.querySelector('#back').onclick = route;
  el.querySelectorAll('button.scard').forEach(b => b.onclick = () => GAMES[b.dataset.g](showTreasury));
  mount(el);
}

/* ===== Lehrkraft ===== */
function teacherButton() { return `<button class="iconbtn teacherbtn" aria-label="Lehrkraft-Bereich" title="Lehrkraft-Bereich">${icon('teacher')}</button>`; }
function wireTeacher(el) { el.querySelectorAll('.teacherbtn').forEach(b => b.onclick = showPin); }
window.addEventListener('hashchange', () => { if (location.hash === '#lehrkraft') showPin(); });

function showPin() {
  let pin = '';
  const el = h(`<section class="screen" style="align-items:center;justify-content:center;gap:18px">
    <h1 style="font-size:1.8rem">Lehrkraft-Bereich</h1>
    <div class="pindots">${'<i></i>'.repeat(4)}</div>
    <div class="pinpad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(k => k === '' ? '<span></span>' : `<button data-k="${k}">${k}</button>`).join('')}</div>
    <button class="btn ghost small" id="back">${icon('back')} Zurück</button>
  </section>`);
  const dots = el.querySelectorAll('.pindots i');
  el.querySelectorAll('.pinpad button').forEach(b => b.onclick = () => {
    const k = b.dataset.k;
    if (k === '⌫') pin = pin.slice(0, -1); else if (pin.length < 4) pin += k;
    dots.forEach((d, i) => d.classList.toggle('on', i < pin.length));
    if (pin.length === 4) {
      if (pin === TEACHER_PIN) showTeacher(); else { shake(el.querySelector('.pindots')); pin = ''; setTimeout(() => dots.forEach(d => d.classList.remove('on')), 300); }
    }
  });
  el.querySelector('#back').onclick = () => { if (location.hash === '#lehrkraft') history.replaceState(null, '', location.pathname); S.started ? route() : showStart(); };
  mount(el);
}

function solutionText(st) {
  return st.steps.filter(s => s.type !== 'info').map(s => {
    if (s.type === 'mc') return `${s.options[s.correct]}`;
    if (s.type === 'calendar') return '29.11.2026';
    if (s.type === 'dial') return `<b>Code ${s.answer}</b>`;
    if (s.type === 'order') return 'Augustus → Reise → Geburt → Hirten → Engel → Hirten erzählen';
    if (s.type === 'sort') return s.buckets.map(b => `${b.title}: ${s.items.filter(i => i.b === b.id).map(i => i.t).join(', ')}`).join('<br>');
    if (s.type === 'match') return s.pairs.map(p => `${p.a} = ${p.b.split(' – ')[0]}`).join('; ');
    if (s.type === 'fill') return s.gaps.map(g => g.answer).join(', ');
    return '';
  }).map(t => `<li>${t}</li>`).join('');
}

function showTeacher() {
  const el = h(`<section class="screen teacher">
    <div class="topbar"><button class="btn ghost small" id="back">${icon('back')} Zurück</button><span class="spacer"></span><span class="chip">PIN ${TEACHER_PIN}</span></div>
    <div class="paper">
      <div class="kicker">Für Lehrkräfte · Ev. Religion Klasse 6</div>
      <h2>Rettet das Krippenspiel – Ablauf für 45 Minuten</h2>
      <div class="tablewrap"><table>
        <tr><th>Zeit</th><th>Phase</th><th>Was passiert</th></tr>
        <tr><td>0–4</td><td>Einstieg</td><td>Kistenbild an die Tafel, Brief von Diakonin Petersen vorlesen. Ziel: Krippenspiel retten. Einzelarbeit, jedes Kind an seinem iPad, Laterne (Hinweise) erlaubt, keine Zeitstrafe.</td></tr>
        <tr><td>4–22</td><td>Akt 1 · Die Kiste</td><td>Sechs Schlösser in freier Reihenfolge (Advent, Wichern, Lukas 2, Lukas/Matthäus, evangelische Wurzeln, Epiphanias). Nach dem 2. und 4. Schloss je ein kurzes Zwischenspiel (überspringbar).</td></tr>
        <tr><td>22–31</td><td>Akt 2 · Die Kostüme</td><td>Mit der Spielfigur durch die Kirche laufen. Sechs Kinder beschreiben ihre Rolle; das Kind wählt das passende Kostüm und beantwortet eine Frage zur Rolle. Die übrige Krone kommt ins Regal für Epiphanias.</td></tr>
        <tr><td>31–38</td><td>Akt 3 · Der Schlüssel</td><td>Turmkammer mit Taschenlampe absuchen und Dinge dem Kirchenjahr zuordnen, Liedtafel mit EG-Nummern als Code, Walzenschloss an der Kirchentür (Kernsatz Menschwerdung). Reflexionssatz und Urkunde.</td></tr>
        <tr><td>38–45</td><td>Sicherung</td><td>Tafelbild Lukas | Matthäus | nicht in der Bibel (Wirt, Ochs und Esel, drei Könige). Kernsatz von der Kirchentür vorlesen. Einige Reflexionssätze. Ausblick Epiphanias. Wer schnell ist: Schatzkammer.</td></tr>
      </table></div>
      <h2 style="font-size:1.3rem">Lösungen</h2>
      <div class="tablewrap"><table>
        <tr><th>Schloss</th><th>Lösungen der Reihe nach</th></tr>
        ${STATIONS.map(st => `<tr><td><b>${st.name}</b><br><small>${st.sub}</small></td><td><ul style="margin:0;padding-left:1.1em">${solutionText(st)}</ul></td></tr>`).join('')}
        <tr><td><b>Akt 2 · Kostüme</b></td><td><ul style="margin:0;padding-left:1.1em">${ACTORS.map(a => `<li>${a.name}: ${COSTUMES.find(c => c.id === a.costume || c.id === a.id).t} – ${a.q.options[a.q.correct]}</li>`).join('')}<li>Regal 6. Januar: Krone (Weise, Matthäus, Epiphanias)</li></ul></td></tr>
        <tr><td><b>Akt 3 · Schlüssel</b></td><td><ul style="margin:0;padding-left:1.1em"><li>Turmkammer: ${DARK.spots.map(sp => `${sp.name} → ${DARK.drawers[sp.answer]}`).join('; ')}</li><li>Liedtafel/Code: EG ${SONGS.clues.map(c => c.eg).join(' – ')}</li><li>Walzenschloss: ${RINGS.lead} ${RINGS.rings.map(r => r.options[r.answer]).join(' – ')}</li></ul></td></tr>
      </table></div>
      <h2 style="font-size:1.3rem">Fachliche Hinweise</h2>
      <ul style="margin:0;padding-left:1.2em;display:grid;gap:6px;max-width:80ch">
        <li>Evangelisches Profil: Gottesdienst am Heiligen Abend (Christvesper) mit Krippenspiel, Wichern (Rauhes Haus, Innere Mission/Diakonie), Luther („Heiliger Christ“, „Vom Himmel hoch“), Herrnhuter Stern, Epiphanias als evangelische Bezeichnung des 6. Januar. Barbarazweige und Heiligenbräuche sind bewusst nicht als eigene Station enthalten.</li>
        <li>Katholische Wurzeln werden nur zur Unterscheidung genannt (Krippe nach Franz von Assisi, Sternsinger, Nikolausbescherung, Christmette). Vieles wird heute ökumenisch gefeiert; die Sortierung fragt deshalb nach der Herkunft, nicht danach, wer etwas „darf“.</li>
        <li>Wicherns Lichterrad hatte eine kleine rote Kerze pro Werktag und eine weiße pro Sonntag. Die Zahl schwankt je nach Jahr; die Aufgabe rechnet für 2026 (29.11.–24.12.: 4 weiße, 22 rote).</li>
        <li>Die Kindheitsgeschichten sind Glaubenserzählungen: Lukas betont Gottes Hinwendung zu Armen (Hirten, Krippe), Matthäus Jesu Königtum und seine Bedeutung für die Völker (Weise). Ochs und Esel stammen aus Jes 1,3, die Zahl drei und die Königsnamen aus späterer Tradition.</li>
        <li>Die Deutung der Gaben (König – Gott – Mensch) ist eine spätere christliche Auslegung und wird so gekennzeichnet.</li>
        <li>Bibelzitate nach der Lutherbibel 1912 (gemeinfrei).</li>
      </ul>
      <h2 style="font-size:1.3rem">Steuerung</h2>
      <div class="toggles">
        <button class="btn small ink" id="openall">Alle Schlösser öffnen (Vorführung)</button>
        <button class="btn small ink" id="shelfall">${S.shelf && S.shelf.all ? 'Bücherregal ist ganz offen' : 'Bücherregal ganz freischalten'}</button>
        <button class="btn small ink" id="toact2">Direkt zu Akt 2</button>
        <button class="btn small ink" id="figswap">Spielfigur: ${playerFigure().label} (wechseln)</button>
        <button class="btn small ink" id="toact3">Direkt zu Akt 3</button>
        <button class="btn small ink" id="bonus">${S.bonusOpen ? 'Schatzkammer ist frei' : 'Schatzkammer sofort freigeben'}</button>
        <button class="btn small" id="reset" style="background:var(--no);color:#fff;box-shadow:none">Spielstand auf diesem iPad löschen</button>
      </div>
      <p class="small-note" style="color:var(--ink-soft)">Der Spielstand wird nur auf diesem Gerät gespeichert. Es werden keine Daten verschickt.</p>
    </div>
  </section>`);
  el.querySelector('#back').onclick = () => { if (location.hash === '#lehrkraft') history.replaceState(null, '', location.pathname); S.started ? route() : showStart(); };
  el.querySelector('#openall').onclick = () => { S.solved = STATIONS.map(s => s.id); S.seenInterlude = [2, 4]; if (!S.started) { S.started = Date.now(); S.team = S.team || 'Lehrkraft'; } save(); toast('Alle Schlösser offen'); showHub(); };
  const demo = () => { S.solved = STATIONS.map(s => s.id); S.seenInterlude = [2, 4]; if (!S.started) { S.started = Date.now(); S.team = S.team || 'Lehrkraft'; } };
  el.querySelector('#shelfall').onclick = e => { shelfState().all = true; save(); e.currentTarget.textContent = 'Bücherregal ist ganz offen'; toast('Alle Einträge im Bücherregal sind sichtbar'); };
  el.querySelector('#figswap').onclick = e => { S.figure = S.figure === 'maedchen' ? 'junge' : 'maedchen'; save(); e.currentTarget.textContent = `Spielfigur: ${playerFigure().label} (wechseln)`; };
  el.querySelector('#toact2').onclick = () => { demo(); S.phase = 'kostueme'; save(); showAct2(); };
  el.querySelector('#toact3').onclick = () => { demo(); S.act2 = { delivered: ACTORS.map(a => a.id), shelf: true }; S.phase = 'schluessel'; S.act3 = { stage: 0, dark: [] }; save(); showAct3(); };
  el.querySelector('#bonus').onclick = e => { S.bonusOpen = true; save(); e.currentTarget.textContent = 'Schatzkammer ist frei'; toast('Schatzkammer freigegeben'); };
  const rb = el.querySelector('#reset');
  rb.onclick = () => {
    if (rb.dataset.sure) { S = fresh(); save(); toast('Spielstand gelöscht'); showStart(); }
    else { rb.dataset.sure = '1'; rb.textContent = 'Wirklich löschen? Nochmal tippen'; }
  };
  mount(el);
}

const boot = () => (location.hash === '#lehrkraft' ? showPin() : showStart());
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

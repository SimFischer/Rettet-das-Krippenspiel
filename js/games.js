/* ===== Zwischen- und Bonusspiele ===== */
const GAMES = {};

function gameShell(title, sub, onBack) {
  const el = h(`<section class="screen">
    <div class="topbar"><button class="btn ghost small" id="gback">${icon('back')} Zurück</button><span class="spacer"></span></div>
    <div style="text-align:center;display:grid;gap:4px"><h1 style="font-size:clamp(1.5rem,3vw,2.1rem)">${title}</h1><p class="small-note" style="margin:0">${sub}</p></div>
    <div class="gslot"></div>
  </section>`);
  el.querySelector('#gback').onclick = () => { el._stop && el._stop(); onBack(); };
  return el;
}
function saveBest(key, val, lowerIsBetter) {
  S.best = S.best || {};
  const old = S.best[key];
  if (old == null || (lowerIsBetter ? val < old : val > old)) { S.best[key] = val; save(); return true; }
  return false;
}

/* --- Die Hirten suchen ihre Schafe --- */
GAMES.sheep = function (done) {
  const el = gameShell('Die Hirten suchen ihre Schafe', 'Bevor die Hirten zum Stall laufen, müssen alle Schafe beisammen sein. Tippt jedes Schaf an!', done);
  const area = h(`<div class="game-area">${fieldSVG()}<div class="hud"><span class="cnt">0 / 10 Schafe</span><span class="tm">45 s</span></div>
    <div class="overlay"><div><h2>Bereit?</h2><p>Zehn Schafe haben sich auf dem Feld verteilt. Manche verstecken sich hinter Büschen. Ihr habt 45 Sekunden.</p><button class="btn" id="go">${icon('sheep')} Los!</button></div></div></div>`);
  el.querySelector('.gslot').appendChild(area);
  const N = 10, bushes = [[18, 70, 15], [44, 76, 13], [70, 66, 16], [86, 82, 12], [30, 88, 14], [58, 90, 15]];
  bushes.forEach(([x, y, w]) => { const b = h(`<div class="bush" style="left:${x - w / 2}%;top:${y - w * .3}%;width:${w}%">${BUSH_SVG}</div>`); area.appendChild(b); });
  let sheep = [], found = 0, t = 45, timer, raf, running = false;
  function spawn() {
    for (let i = 0; i < N; i++) {
      const s = { x: 8 + Math.random() * 84, y: 58 + Math.random() * 34, vx: (Math.random() - .5) * .05, vy: (Math.random() - .5) * .02, el: null };
      if (i < 4) { const b = bushes[i]; s.x = b[0] + (Math.random() - .5) * 4; s.y = b[1] + 2; s.vx *= .3; }
      const btn = h(`<button class="sheep" aria-label="Schaf">${SHEEP_SVG}</button>`);
      if (s.vx < 0) btn.querySelector('svg').style.transform = 'scaleX(-1)';
      btn.onclick = () => {
        if (!running || btn.classList.contains('gone')) return;
        btn.classList.add('gone'); found++;
        area.querySelector('.cnt').textContent = `${found} / ${N} Schafe`;
        if (found === N) end();
      };
      s.el = btn; area.appendChild(btn); sheep.push(s);
    }
  }
  function loop() {
    sheep.forEach(s => {
      if (s.el.classList.contains('gone')) return;
      s.x += s.vx; s.y += s.vy;
      if (s.x < 5 || s.x > 95) { s.vx *= -1; s.el.querySelector('svg').style.transform = s.vx < 0 ? 'scaleX(-1)' : ''; }
      if (s.y < 56 || s.y > 93) s.vy *= -1;
      if (Math.random() < .004) s.vx = (Math.random() - .5) * .06;
      s.el.style.left = s.x + '%'; s.el.style.top = s.y + '%';
    });
    raf = requestAnimationFrame(loop);
  }
  function end() {
    running = false; clearInterval(timer); cancelAnimationFrame(raf);
    const rec = saveBest('sheep', found, false);
    const ov = h(`<div class="overlay"><div><h2>${found === N ? 'Alle Schafe gefunden!' : `${found} von ${N} Schafen`}</h2>
      <p>${found === N ? 'Jetzt können die Hirten beruhigt nach Bethlehem laufen – so wie in Lukas 2,15–16.' : 'Den Rest finden die Hirten morgen früh. Weiter geht’s!'}${rec && found ? ' Neuer Bestwert!' : ''}</p>
      <div class="center-actions"><button class="btn" id="cont">Weiter ${icon('next')}</button><button class="btn ghost small" id="again">Nochmal</button></div></div></div>`);
    area.appendChild(ov);
    ov.querySelector('#cont').onclick = done;
    ov.querySelector('#again').onclick = () => GAMES.sheep(done);
  }
  area.querySelector('#go').onclick = e => {
    e.currentTarget.closest('.overlay').remove();
    spawn(); running = true; loop();
    timer = setInterval(() => { t--; area.querySelector('.tm').textContent = t + ' s'; if (t <= 0) end(); }, 1000);
  };
  el._stop = () => { running = false; clearInterval(timer); cancelAnimationFrame(raf); };
  mount(el);
};

/* --- Sternen-Memory --- */
GAMES.memory = function (done) {
  const el = gameShell('Sternen-Memory', 'Die Engel haben die Zeichen der Weihnachtszeit gemischt. Findet alle sechs Paare.', done);
  const deck = shuffle(MEMORY_PAIRS.flatMap((p, i) => [{ ...p, k: i }, { ...p, k: i }]));
  let open = [], lock = false, moves = 0, pairs = 0;
  const wrap = h(`<div style="display:grid;gap:12px"><div class="memory">${deck.map((c, i) => `<button class="mcard" data-i="${i}" aria-label="Karte ${i + 1}"><span class="face back">${icon('star')}</span><span class="face front">${icon(c.icon)}<small>${c.t}</small></span></button>`).join('')}</div>
    <p class="small-note moves" style="text-align:center;margin:0">Züge: 0</p><div class="end"></div></div>`);
  el.querySelector('.gslot').appendChild(wrap);
  wrap.querySelectorAll('.mcard').forEach(b => b.onclick = () => {
    if (lock || b.classList.contains('up')) return;
    b.classList.add('up'); b.setAttribute('aria-label', deck[+b.dataset.i].t); open.push(b);
    if (open.length === 2) {
      moves++; wrap.querySelector('.moves').textContent = 'Züge: ' + moves;
      const [a, c] = open;
      if (deck[+a.dataset.i].k === deck[+c.dataset.i].k) {
        a.classList.add('found'); c.classList.add('found'); open = []; pairs++;
        if (pairs === MEMORY_PAIRS.length) {
          const rec = saveBest('memory', moves, true);
          const e = h(`<div class="paper" style="text-align:center;align-items:center;max-width:620px"><h2>Alle Paare gefunden – in ${moves} Zügen!</h2><p>${rec ? 'Neuer Bestwert! ' : ''}Adventskranz, Engel, Krippe, Stern, Schaf und Geschenk: Was hat jedes Zeichen mit der Weihnachtszeit zu tun? Erzählt es euch gegenseitig.</p><div class="center-actions"><button class="btn" id="cont">Weiter ${icon('next')}</button><button class="btn ghost small" id="again" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">Nochmal</button></div></div>`);
          wrap.querySelector('.end').appendChild(e);
          e.querySelector('#cont').onclick = done;
          e.querySelector('#again').onclick = () => GAMES.memory(done);
        }
      } else {
        lock = true;
        setTimeout(() => { a.classList.remove('up'); c.classList.remove('up'); a.setAttribute('aria-label', 'Karte'); c.setAttribute('aria-label', 'Karte'); open = []; lock = false; }, 900);
      }
    }
  });
  mount(el);
};

/* --- Kerzenwächter (Bonus) --- */
GAMES.candles = function (done) {
  const el = gameShell('Kerzenwächter', 'Ein Windstoß weht durch die Kirchentür! Flackert eine Kerze, tippt sie schnell an, damit sie nicht ausgeht.', done);
  const wrap = h(`<div style="display:grid;gap:10px;justify-items:center">
    <div class="chip"><span class="sc">0 Punkte</span> · <span class="tm">40 s</span></div>
    <div class="wreath-game">${wreathSVG()}</div>
    <div class="msg"><button class="btn" id="go">${icon('candle')} Los!</button></div>
  </div>`);
  el.querySelector('.gslot').appendChild(wrap);
  const cands = [...wrap.querySelectorAll('.cnd')];
  let score = 0, t = 40, running = false, timers = [], tick;
  const st = cands.map(() => ({ state: 'lit', to: null }));
  function setState(i, s) { st[i].state = s; cands[i].classList.toggle('flick', s === 'flick'); cands[i].classList.toggle('out', s === 'out'); }
  function gust() {
    if (!running) return;
    const lit = st.map((s, i) => s.state === 'lit' ? i : -1).filter(i => i >= 0);
    if (lit.length) {
      const i = lit[Math.floor(Math.random() * lit.length)];
      setState(i, 'flick');
      st[i].to = setTimeout(() => { if (st[i].state === 'flick') setState(i, 'out'); }, Math.max(650, 1300 - score * 15));
    }
    timers.push(setTimeout(gust, Math.max(380, 1000 - score * 18) * (0.6 + Math.random() * 0.6)));
  }
  cands.forEach((c, i) => {
    const act = () => {
      if (!running) return;
      if (st[i].state === 'flick') { clearTimeout(st[i].to); setState(i, 'lit'); score++; wrap.querySelector('.sc').textContent = score + ' Punkte'; }
      else if (st[i].state === 'out') setState(i, 'lit');
    };
    c.addEventListener('pointerdown', act);
    c.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } };
  });
  function stop() { running = false; clearInterval(tick); timers.forEach(clearTimeout); st.forEach(s => clearTimeout(s.to)); }
  function end() {
    stop(); cands.forEach((_, i) => setState(i, 'lit'));
    const rec = saveBest('candles', score, false);
    const m = wrap.querySelector('.msg');
    m.innerHTML = `<div class="paper" style="text-align:center;align-items:center;max-width:620px"><h2>${score} Kerzen gerettet!</h2><p>${rec ? 'Neuer Bestwert! ' : ''}Im Advent wird es jede Woche ein bisschen heller: Christen sehen darin ein Zeichen für Jesus, der in die Welt kommt. Er sagt von sich: „Ich bin das Licht der Welt“ (Johannes 8,12).</p><div class="center-actions"><button class="btn" id="cont">Weiter ${icon('next')}</button><button class="btn ghost small" id="again" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">Nochmal</button></div></div>`;
    m.querySelector('#cont').onclick = done;
    m.querySelector('#again').onclick = () => GAMES.candles(done);
  }
  wrap.querySelector('#go').onclick = () => {
    wrap.querySelector('.msg').innerHTML = '';
    running = true; gust();
    tick = setInterval(() => { t--; wrap.querySelector('.tm').textContent = t + ' s'; if (t <= 0) end(); }, 1000);
  };
  el._stop = stop;
  mount(el);
};

/* --- Der andere Heimweg (Bonus, Matthäus 2,12) --- */
GAMES.heimweg = function (done) {
  const el = gameShell('Der andere Heimweg', '„Gott befahl ihnen im Traum, nicht wieder zu Herodes zu gehen. Und sie zogen auf einem andern Weg wieder in ihr Land.“ (Matthäus 2,12) – Schleicht an den Wachen vorbei nach Osten.', done);
  const m = BETHLEHEM_MAP;
  let cp = 0, caught = 0, flash = 0, finished = false, t0 = performance.now();
  const hud = h(`<div class="walk-hud"><span class="chip">${icon('star')} Ziel: rechts der Weg ins Morgenland</span><span class="chip cnt">0 × entdeckt</span></div>`);
  const walk = Walk.create({
    map: m, drawBg: drawBethlehemPlaceholder, speed: 230,
    playerSprite: 'assets/bonus/weise-sheet.webp',
    playerLook: { body: '#6c4b94', hair: '#2a2420', cape: '#c9a14c', crown: true },
    spots: () => [],
    viewRange: 220, viewAngle: 0.55,
    onTick(P) {
      if (finished) return;
      m.checkpoints.forEach((c, i) => { if (i > cp && P.x > c.x) { cp = i; toast('Zwischenstation erreicht'); } });
      if (flash <= 0 && walk && walk.guards.some(g => walk.sees(g))) {
        caught++; flash = 0.6; hud.querySelector('.cnt').textContent = `${caught} × entdeckt`;
        const c = m.checkpoints[cp]; walk.teleport(c.x, c.y);
      }
      if (P.x > m.goalX) { finished = true; win(); }
    },
    onDraw(ctx) {
      if (flash > 0) { ctx.fillStyle = `rgba(168,69,47,${flash * .6})`; ctx.fillRect(0, 0, m.w, m.h); flash -= 0.02; }
      m.checkpoints.forEach((c, i) => { if (i) { ctx.strokeStyle = i <= cp ? 'rgba(242,189,98,.8)' : 'rgba(242,189,98,.3)'; ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(c.x, 40); ctx.lineTo(c.x, 960); ctx.stroke(); ctx.setLineDash([]); } });
    },
  });
  const slot = el.querySelector('.gslot'); slot.classList.add('walk-game');
  slot.appendChild(hud); slot.appendChild(walk.el);
  function win() {
    walk.pause();
    const secs = Math.round((performance.now() - t0) / 1000);
    const rec = saveBest('heimweg', caught, true);
    const ov = h(`<div class="paper" style="text-align:center;align-items:center;max-width:680px;margin:0 auto"><h2>Die Weisen sind auf dem Heimweg!</h2>
      <p>${caught ? `${caught}-mal entdeckt` : 'Kein einziges Mal entdeckt'} · ${secs} Sekunden${rec ? ' · neuer Bestwert!' : ''}</p>
      <p>Die Weisen verraten Herodes nicht, wo das Kind ist. Matthäus erzählt: Gott beschützt das Kind – und Fremde aus fernen Ländern werden zu seinen ersten Verehrern.</p>
      <div class="center-actions"><button class="btn" id="cont">Weiter ${icon('next')}</button><button class="btn ghost small" id="again" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">Nochmal</button></div></div>`);
    slot.appendChild(ov); ov.scrollIntoView({ behavior: 'smooth', block: 'center' });
    ov.querySelector('#cont').onclick = () => { walk.destroy(); done(); };
    ov.querySelector('#again').onclick = () => { walk.destroy(); GAMES.heimweg(done); };
  }
  el._stop = () => walk.destroy();
  mount(el);
};

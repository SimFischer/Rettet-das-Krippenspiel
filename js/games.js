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

/* --- Die Hirten suchen ihre Schafe ---
   Dunkles Feld, nur der Lichtkegel der Laterne zeigt etwas. Ein Schaf zählt erst,
   wenn es kurz im Licht war. Weiße Steine sehen im Dunkeln aus wie Schafe. */
GAMES.sheep = function (done) {
  const el = gameShell('Die Hirten suchen ihre Schafe', 'Es ist stockdunkel auf dem Feld. Leuchte mit der Laterne und tippe die Schafe an. Aber Vorsicht: Manche weißen Flecken sind nur Steine!', done);
  const area = h(`<div class="game-area sheep-game">
    <img class="field-img" src="assets/games/hirtenfeld.webp" alt="" onerror="this.remove()">
    <div class="field-fallback">${fieldSVG()}</div>
    <div class="things"></div>
    <canvas class="night"></canvas>
    <div class="hud"><span class="cnt">0 / 10 Schafe</span><span class="tm">60 s</span></div>
    <div class="overlay"><div><h2>Bereit?</h2><p>Zehn Schafe haben sich im Dunkeln verlaufen – manche hinter Büschen. Halte die Laterne über ein Schaf und tippe es dann an. Wer einen Stein antippt, verliert 3 Sekunden.</p><button class="btn" id="go">${icon('lantern')} Laterne an!</button></div></div></div>`);
  el.querySelector('.gslot').appendChild(area);
  const things = area.querySelector('.things'), cv = area.querySelector('.night'), ctx = cv.getContext('2d');
  const N = 10, STONES = 7, NEED = 0.35;
  const bushes = [[14, 66, 15], [33, 82, 13], [52, 63, 16], [71, 78, 15], [88, 64, 13], [24, 93, 14], [62, 94, 15]];
  bushes.forEach(([x, y, w]) => things.insertAdjacentHTML('beforeend', `<div class="bush" style="left:${x - w / 2}%;top:${y - w * .32}%;width:${w}%"><img src="assets/games/bush.webp" alt="" onerror="this.replaceWith(document.createRange().createContextualFragment(BUSH_SVG))"></div>`));
  const objs = [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  function mk(kind, x, y) {
    const v = Math.floor(Math.random() * 4);
    const node = h(`<div class="thing ${kind}" style="left:${x}%;top:${y}%"><div class="spr v${v}"></div></div>`);
    const spr = node.querySelector('.spr');
    const src = kind === 'sheep' ? 'assets/games/sheep.webp' : 'assets/games/stone.webp';
    const probe = new Image(); probe.onload = () => spr.classList.add('art'); probe.onerror = () => { spr.innerHTML = kind === 'sheep' ? SHEEP_SVG : STONE_SVG; }; probe.src = src;
    spr.style.backgroundImage = `url(${src})`;
    things.appendChild(node);
    const o = { kind, x, y, vx: kind === 'sheep' ? rnd(-.6, .6) : 0, node, lit: 0, gone: false, flip: false };
    objs.push(o); return o;
  }
  for (let i = 0; i < N; i++) {
    if (i < 5) { const b = bushes[i]; mk('sheep', b[0] + rnd(-3, 3), b[1] + 1.5); } else mk('sheep', rnd(8, 92), rnd(58, 94));
  }
  for (let i = 0; i < STONES; i++) mk('stone', rnd(6, 94), rnd(56, 95));
  let L = { x: .5, y: .7 }, T = { x: .5, y: .7 }, found = 0, t = 60, running = false, raf = 0, last = 0, timer;
  const R = () => area.clientWidth * .11;
  function pos(e) { const r = area.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }; }
  area.addEventListener('pointermove', e => { if (running) T = pos(e); });
  area.addEventListener('pointerdown', e => {
    if (!running) return;
    T = pos(e);
    const r = area.getBoundingClientRect();
    const hit = objs.filter(o => !o.gone).map(o => ({ o, d: Math.hypot((o.x / 100 - T.x) * r.width, (o.y / 100 - T.y) * r.height) })).filter(z => z.d < r.width * .05).sort((a, b) => a.d - b.d)[0];
    if (!hit || hit.o.lit < NEED) return;
    const o = hit.o;
    if (o.kind === 'sheep') {
      o.gone = true; o.node.classList.add('gone'); found++;
      area.querySelector('.cnt').textContent = `${found} / ${N} Schafe`;
      if (found === N) end();
    } else {
      t = Math.max(0, t - 3); o.node.classList.add('oops'); setTimeout(() => o.node.classList.remove('oops'), 700);
      toast('Das ist nur ein Stein! –3 Sekunden');
    }
  });
  function frame(ts) {
    if (!area.isConnected) return stop();
    const dt = last ? Math.min(.05, (ts - last) / 1000) : 0; last = ts;
    L.x += (T.x - L.x) * Math.min(1, dt * 5); L.y += (T.y - L.y) * Math.min(1, dt * 5);
    const W = area.clientWidth, H = area.clientHeight, d = Math.min(2, devicePixelRatio || 1);
    if (cv.width !== Math.round(W * d)) { cv.width = Math.round(W * d); cv.height = Math.round(H * d); }
    ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, W, H); ctx.fillStyle = 'rgba(4,6,14,.96)'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'destination-out';
    const rr = R(), lx = L.x * W, ly = L.y * H;
    const g = ctx.createRadialGradient(lx, ly, rr * .15, lx, ly, rr); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(.75, 'rgba(0,0,0,.8)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(lx, ly, rr, 0, 7); ctx.fill();
    ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,200,110,.10)'; ctx.beginPath(); ctx.arc(lx, ly, rr, 0, 7); ctx.fill();
    objs.forEach(o => {
      if (o.gone) return;
      if (o.kind === 'sheep' && running) {
        o.x += o.vx * dt; if (o.x < 5 || o.x > 95) o.vx *= -1;
        if (Math.random() < dt * .3) o.vx = rnd(-.8, .8);
        o.node.style.left = o.x + '%'; o.node.classList.toggle('flip', o.vx < 0);
      }
      const inLight = Math.hypot((o.x / 100 - L.x) * W, (o.y / 100 - L.y) * H) < rr * .7;
      o.lit = inLight ? o.lit + dt : 0;
      o.node.classList.toggle('ready', o.lit >= NEED);
    });
    raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; cancelAnimationFrame(raf); clearInterval(timer); }
  function end() {
    stop();
    const rec = saveBest('sheep', found, false);
    const ov = h(`<div class="overlay"><div><h2>${found === N ? 'Alle Schafe gefunden!' : `${found} von ${N} Schafen`}</h2>
      <p>${found === N ? 'Jetzt können die Hirten beruhigt nach Bethlehem laufen – so wie in Lukas 2,15–16.' : 'Den Rest finden die Hirten morgen früh. Weiter geht’s!'}${rec && found ? ' Neuer Bestwert!' : ''}</p>
      <div class="center-actions"><button class="btn" id="cont">Weiter ${icon('next')}</button><button class="btn ghost small" id="again">Nochmal</button></div></div></div>`);
    area.appendChild(ov);
    ov.querySelector('#cont').onclick = done;
    ov.querySelector('#again').onclick = () => GAMES.sheep(done);
  }
  area.querySelector('#go').onclick = e => {
    e.stopPropagation(); e.currentTarget.closest('.overlay').remove();
    running = true; raf = requestAnimationFrame(frame);
    timer = setInterval(() => { t--; area.querySelector('.tm').textContent = Math.max(0, t) + ' s'; if (t <= 0) end(); }, 1000);
  };
  raf = requestAnimationFrame(frame);
  el._stop = stop;
  mount(el);
};

/* --- Sternen-Memory --- */
GAMES.memory = function (done) {
  const el = gameShell('Sternen-Memory', 'Die Engel haben die Zeichen der Weihnachtszeit gemischt. Finde alle sechs Paare.', done);
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
          const e = h(`<div class="paper" style="text-align:center;align-items:center;max-width:620px"><h2>Alle Paare gefunden – in ${moves} Zügen!</h2><p>${rec ? 'Neuer Bestwert! ' : ''}Adventskranz, Engel, Krippe, Stern, Schaf und Geschenk: Was hat jedes Zeichen mit der Weihnachtszeit zu tun? Überleg es dir kurz.</p><div class="center-actions"><button class="btn" id="cont">Weiter ${icon('next')}</button><button class="btn ghost small" id="again" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">Nochmal</button></div></div>`);
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

/* --- Der andere Heimweg (Bonus, Matthäus 2,12) ---
   Wer entdeckt wird, muss ganz von vorne anfangen. Posten an den Rändern schwenken ihren Blick. */
GAMES.heimweg = function (done) {
  const el = gameShell('Der andere Heimweg', '„Und Gott befahl ihnen im Traum, dass sie sich nicht sollten wieder zu Herodes lenken; und zogen durch einen andern Weg wieder in ihr Land.“ (Matthäus 2,12)', done);
  const m = BETHLEHEM_MAP;
  let tries = 1, flash = 0, finished = false, t0 = performance.now(), started = false;
  const hud = h(`<div class="walk-hud"><span class="chip">${icon('star')} Ziel: ganz rechts der Weg ins Morgenland</span><span class="chip cnt">Versuch 1</span></div>`);
  const walk = Walk.create({
    map: m, drawBg: drawBethlehemPlaceholder, speed: 220,
    playerSprite: 'assets/bonus/weise-sheet.webp',
    playerLook: { body: '#6c4b94', hair: '#2a2420', cape: '#c9a14c', crown: true },
    spots: () => [],
    viewRange: 230, viewAngle: 0.5,
    onTick(P) {
      if (finished || !started) return;
      if (flash <= 0 && walk && walk.guards.some(g => walk.sees(g))) {
        tries++; flash = 0.9; hud.querySelector('.cnt').textContent = `Versuch ${tries}`;
        walk.teleport(m.start.x, m.start.y); toast('Entdeckt! Zurück zum Anfang.');
      }
      if (P.x > m.goalX) { finished = true; win(); }
    },
    onDraw(ctx) {
      if (flash > 0) { ctx.fillStyle = `rgba(168,69,47,${flash * .55})`; ctx.fillRect(0, 0, m.w, m.h); flash -= 0.02; }
      ctx.fillStyle = 'rgba(242,189,98,.18)'; ctx.fillRect(m.goalX, 40, m.w - m.goalX, 920);
    },
  });
  const slot = el.querySelector('.gslot'); slot.classList.add('walk-game');
  slot.appendChild(hud); slot.appendChild(walk.el);
  const intro = h(`<div class="paper heim-intro"><div class="kicker">So geht’s</div><h2>Schleich dich an den Wachen vorbei</h2>
    <p>Tippe dorthin, wo der Weise hinlaufen soll. Die hellen Kegel zeigen, wohin die Soldaten von König Herodes schauen. Einige laufen Streife, andere stehen still und drehen den Kopf hin und her. Warte im Schatten der Häuser auf den richtigen Moment.</p>
    <p><b>Wirst du gesehen, beginnst du wieder ganz am Anfang.</b></p>
    <div class="step-actions"><button class="btn">${icon('star')} Los geht’s</button></div></div>`);
  slot.insertBefore(intro, walk.el);
  walk.pause();
  intro.querySelector('button').onclick = () => { intro.remove(); started = true; t0 = performance.now(); walk.resume(); };
  function win() {
    walk.pause();
    const secs = Math.round((performance.now() - t0) / 1000);
    const rec = saveBest('heimweg', tries, true);
    const ov = h(`<div class="paper" style="text-align:center;align-items:center;max-width:680px;margin:0 auto"><h2>Die Weisen sind auf dem Heimweg!</h2>
      <p>${tries === 1 ? 'Gleich im ersten Versuch geschafft!' : `Geschafft im ${tries}. Versuch`} · ${secs} Sekunden${rec ? ' · neuer Bestwert!' : ''}</p>
      <p>Die Weisen verraten Herodes nicht, wo das Kind ist. Matthäus erzählt: Gott beschützt das Kind – und Fremde aus fernen Ländern werden zu seinen ersten Verehrern.</p>
      <div class="center-actions"><button class="btn" id="cont">Weiter ${icon('next')}</button><button class="btn ghost small" id="again" style="color:var(--ink);box-shadow:inset 0 0 0 2px rgba(42,32,23,.3)">Nochmal</button></div></div>`);
    slot.appendChild(ov); ov.scrollIntoView({ behavior: 'smooth', block: 'center' });
    ov.querySelector('#cont').onclick = () => { walk.destroy(); done(); };
    ov.querySelector('#again').onclick = () => { walk.destroy(); GAMES.heimweg(done); };
  }
  el._stop = () => walk.destroy();
  mount(el);
};

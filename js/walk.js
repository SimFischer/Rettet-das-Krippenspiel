/* ===== Top-down-Laufen: Engine, Karten, Platzhaltergrafik =====
   Welt-Koordinaten: 1600 × 1000. Bilder aus assets/ werden genutzt, sobald sie existieren;
   sonst zeichnet der Platzhalter. Hindernisse sind Rechtecke [x, y, w, h] in Welt-Koordinaten. */

const IMG = {};
function loadImg(src) {
  if (IMG[src] !== undefined) return IMG[src];
  IMG[src] = null;
  const im = new Image();
  im.onload = () => { IMG[src] = im; };
  im.onerror = () => { IMG[src] = false; };
  im.src = src;
  return null;
}
function img(src) { const v = IMG[src]; if (v === undefined) loadImg(src); return v || null; }

/* ---------- Karten ---------- */
const CHURCH_MAP = {
  w: 1600, h: 1000, bg: 'assets/walk/church-topdown.webp',
  start: { x: 1250, y: 260 },
  obstacles: [
    [0, 0, 1600, 112], [0, 905, 1600, 95], [0, 0, 240, 1000], [1360, 0, 240, 1000],           // Außenmauern
    [240, 100, 260, 262],                                                                       // Mauerblock links vom Altarraum
    [1088, 100, 20, 125], [1088, 290, 20, 70], [1088, 340, 272, 20],                            // Sakristei-Wände mit Tür
    [690, 150, 220, 90],                                                                        // Altar
    [765, 268, 70, 45],                                                                         // Krippe
    [450, 345, 85, 95],                                                                         // Kanzel
    [1000, 375, 75, 70],                                                                        // Taufbecken
    [1140, 130, 110, 72],                                                                       // Kiste in der Sakristei
    [1265, 100, 95, 60],                                                                        // Bücherregal Sakristei
    ...[0, 1, 2, 3, 4, 5, 6].flatMap(i => [[320, 462 + i * 50, 400, 28], [880, 462 + i * 50, 398, 28]]), // Bänke
    [240, 838, 470, 70], [890, 838, 470, 70],                                                   // Turmfuß links/rechts vom Portal
  ],
  door: { x: 800, y: 900 },
};

const BETHLEHEM_MAP = {
  w: 1600, h: 1000, bg: 'assets/bonus/bethlehem-topdown.webp',
  start: { x: 110, y: 500 },
  goalX: 1530,
  checkpoints: [{ x: 110, y: 500 }, { x: 640, y: 560 }, { x: 1010, y: 560 }],
  obstacles: [
    [0, 0, 1600, 40], [0, 960, 1600, 40],
    [225, 110, 195, 220], [518, 303, 172, 165], [800, 90, 168, 240], [1060, 290, 220, 150], [1330, 100, 148, 195],
    [775, 462, 145, 175], [222, 655, 206, 230], [520, 592, 147, 222], [1062, 620, 195, 215], [1350, 732, 155, 165],
    [345, 478, 40, 40], [1240, 505, 45, 45], [955, 865, 45, 45],
  ],
  guards: [
    // Streifen, die durch die Gassen laufen
    { path: [[470, 120], [470, 880]], speed: 75 },
    { path: [[740, 140], [740, 860]], speed: 85 },
    { path: [[1010, 120], [1010, 840]], speed: 70 },
    { path: [[1090, 590], [1450, 590]], speed: 80 },
    { path: [[1320, 330], [1320, 700]], speed: 65 },
    { path: [[300, 360], [300, 610], [700, 560], [700, 520], [440, 520]], speed: 70 },
    // Posten, die stehen bleiben und den Blick schwenken (Winkel: 0 = Osten, π/2 = Süden)
    { pos: [600, 62], sweep: [0.15, Math.PI - 0.15], turn: 0.75 },
    { pos: [1180, 62], sweep: [0.15, Math.PI - 0.15], turn: 0.65 },
    { pos: [470, 932], sweep: [-Math.PI + 0.15, -0.15], turn: 0.7 },
    { pos: [1180, 932], sweep: [-Math.PI + 0.15, -0.15], turn: 0.8 },
    { pos: [1515, 450], sweep: [Math.PI / 2 - 0.2, Math.PI + 0.9], turn: 0.6 },
  ],
};

/* ---------- Platzhalter-Hintergründe ---------- */
function drawChurchPlaceholder(ctx, m) {
  ctx.fillStyle = '#1f2740'; ctx.fillRect(0, 0, m.w, m.h);
  ctx.fillStyle = 'rgba(232,238,246,.5)'; for (let i = 0; i < 160; i++) ctx.fillRect((i * 137) % 1600, (i * 211) % 1000, 4, 4);
  ctx.fillStyle = '#6b382d'; ctx.fillRect(216, 76, 1168, 848);
  // Boden
  ctx.fillStyle = '#b9a98c'; ctx.fillRect(240, 100, 1120, 800);
  ctx.strokeStyle = 'rgba(80,60,40,.18)'; ctx.lineWidth = 2;
  for (let x = 240; x < 1360; x += 80) { ctx.beginPath(); ctx.moveTo(x, 100); ctx.lineTo(x, 900); ctx.stroke(); }
  for (let y = 100; y < 900; y += 80) { ctx.beginPath(); ctx.moveTo(240, y); ctx.lineTo(1360, y); ctx.stroke(); }
  // Mittelgang-Läufer
  ctx.fillStyle = '#8c2f2a'; ctx.fillRect(760, 340, 80, 560);
  // Altarraum
  ctx.fillStyle = '#cdbd9c'; ctx.fillRect(480, 100, 640, 240);
  ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(480, 330, 640, 10);
  // Mauern (Backstein)
  ctx.fillStyle = '#6b382d';
  m.obstacles.slice(4, 8).forEach(([x, y, w, h]) => ctx.fillRect(x, y, w, h));
  ctx.fillRect(240, 840, 470, 60); ctx.fillRect(890, 840, 470, 60);
  // Sakristei-Boden
  ctx.fillStyle = '#a89577'; ctx.fillRect(1140, 100, 220, 220);
  // Altar
  ctx.fillStyle = '#f2ece0'; ctx.fillRect(720, 140, 160, 60);
  ctx.fillStyle = '#6c4b94'; ctx.fillRect(720, 185, 160, 15);
  ctx.fillStyle = '#c9a14c'; ctx.fillRect(795, 150, 10, 30); ctx.fillRect(785, 160, 30, 8);
  // Krippe
  ctx.fillStyle = '#8a5a2b'; ctx.fillRect(775, 255, 50, 26); ctx.fillStyle = '#e6c46a'; ctx.fillRect(780, 250, 40, 10);
  // Kanzel, Taufbecken
  ctx.fillStyle = '#5a3418'; ctx.beginPath(); ctx.arc(505, 365, 36, 0, 7); ctx.fill();
  ctx.fillStyle = '#d8d3c8'; ctx.beginPath(); ctx.arc(1045, 385, 30, 0, 7); ctx.fill();
  ctx.fillStyle = '#7fa6c4'; ctx.beginPath(); ctx.arc(1045, 385, 18, 0, 7); ctx.fill();
  // Kiste
  ctx.fillStyle = '#5c3519'; ctx.fillRect(1170, 110, 110, 70); ctx.fillStyle = '#c9a14c'; ctx.fillRect(1170, 140, 110, 6);
  // Regal
  ctx.fillStyle = '#4b2b14'; ctx.fillRect(1290, 104, 64, 30);
  // Bänke
  ctx.fillStyle = '#6b4321';
  for (let i = 0; i < 7; i++) { ctx.fillRect(300, 470 + i * 52, 430, 24); ctx.fillRect(870, 470 + i * 52, 430, 24); }
  // Portal
  ctx.fillStyle = '#3b2412'; ctx.fillRect(710, 880, 180, 20);
  ctx.fillStyle = '#e8dcc4'; ctx.font = '600 22px Atkinson Hyperlegible, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Hauptportal (verschlossen)', 800, 940);
  ctx.fillText('Altar', 800, 128); ctx.fillText('Sakristei', 1250, 300); ctx.fillText('Kanzel', 505, 430); ctx.fillText('Taufbecken', 1045, 440);
  // Fenster
  ctx.fillStyle = '#26314f';
  [300, 500, 700].forEach(y => { ctx.fillRect(228, y, 12, 70); ctx.fillRect(1360, y, 12, 70); });
}

function drawBethlehemPlaceholder(ctx, m) {
  ctx.fillStyle = '#2b2a3a'; ctx.fillRect(0, 0, m.w, m.h);
  ctx.fillStyle = '#3a3646';
  for (let i = 0; i < 120; i++) { const x = (i * 137) % 1600, y = (i * 271) % 1000; ctx.fillRect(x, y, 30, 18); }
  ctx.fillStyle = '#4a4458'; ctx.fillRect(0, 470, 1600, 60);
  m.obstacles.forEach(([x, y, w, h], i) => {
    if (i < 2) { ctx.fillStyle = '#1c1a24'; ctx.fillRect(x, y, w, h); return; }
    if (w <= 60) { ctx.fillStyle = '#1f3a2e'; ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, w / 2 + 6, 0, 7); ctx.fill(); return; }
    ctx.fillStyle = '#8b7a5e'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#a69476'; ctx.fillRect(x + 8, y + 8, w - 16, h - 16);
    ctx.fillStyle = 'rgba(242,189,98,.55)'; ctx.fillRect(x + w / 2 - 8, y + h - 14, 16, 10);
  });
  ctx.fillStyle = 'rgba(242,189,98,.25)'; ctx.fillRect(1520, 40, 80, 920);
  ctx.fillStyle = '#e8dcc4'; ctx.font = '600 24px Atkinson Hyperlegible, sans-serif'; ctx.textAlign = 'center';
  ctx.save(); ctx.translate(1565, 500); ctx.rotate(-Math.PI / 2); ctx.fillText('Weg ins Morgenland', 0, 0); ctx.restore();
  ctx.fillText('Bethlehem', 110, 430);
}

/* ---------- Figuren (Platzhalter von oben) ---------- */
function drawPerson(ctx, x, y, o) {
  const { dir = 'down', frame = 0, body = '#3f6fa0', hair = '#5a3a22', skin = '#e9c5a0', cape = null, scale = 1, crown = false } = o;
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 10, 24, 12, 0, 0, 7); ctx.fill();
  const step = frame === 1 ? 4 : frame === 2 ? -4 : 0;
  ctx.fillStyle = '#2a2420';
  if (dir === 'left' || dir === 'right') { ctx.fillRect(-10 + step, 4, 8, 10); ctx.fillRect(2 - step, 4, 8, 10); }
  else { ctx.fillRect(-11, 2 + step, 8, 12); ctx.fillRect(3, 2 - step, 8, 12); }
  ctx.fillStyle = cape || body; ctx.beginPath(); ctx.ellipse(0, -2, 20, 15, 0, 0, 7); ctx.fill();
  if (cape) { ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, -4, 12, 9, 0, 0, 7); ctx.fill(); }
  const hx = dir === 'left' ? -4 : dir === 'right' ? 4 : 0, hy = dir === 'up' ? -16 : -12;
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(hx, hy, 11, 0, 7); ctx.fill();
  ctx.fillStyle = hair; ctx.beginPath();
  if (dir === 'up') ctx.arc(hx, hy, 11, 0, 7);
  else if (dir === 'down') ctx.arc(hx, hy - 4, 10, Math.PI, 0);
  else ctx.arc(hx + (dir === 'left' ? 4 : -4), hy - 2, 10, 0, 7);
  ctx.fill();
  if (crown) { ctx.fillStyle = '#e8c04f'; ctx.fillRect(hx - 9, hy - 16, 18, 6); }
  ctx.restore();
}
function drawSprite(ctx, src, x, y, dir, frame, size) {
  const im = img(src); if (!im) return false;
  const row = { down: 0, left: 1, right: 2, up: 3 }[dir] || 0;
  const fw = im.width / 3, fh = im.height / 4;
  const s = size / fh;
  ctx.drawImage(im, frame * fw, row * fh, fw, fh, x - fw * s / 2, y - fh * s + 14, fw * s, fh * s);
  return true;
}

/* ---------- Engine ---------- */
const Walk = (() => {
  function create(o) {
    const m = o.map, CELL = 20, R = 16;
    const box = document.createElement('div'); box.className = 'walk';
    const cv = document.createElement('canvas'); box.appendChild(cv);
    const ctx = cv.getContext('2d');
    const P = { x: m.start.x, y: m.start.y, dir: 'down', dist: 0, moving: false };
    let route = null, goal = null, paused = false, raf = 0, last = 0, inside = null, alive = true;
    const keys = new Set();
    const guards = (m.guards || []).map(g => g.sweep
      ? { ...g, x: g.pos[0], y: g.pos[1], ang: g.sweep[0], dir: 1, hold: 0 }
      : { ...g, i: 0, t: 0, x: g.path[0][0], y: g.path[0][1], ang: 0 });

    // Raster der begehbaren Zellen
    const cols = Math.ceil(m.w / CELL), rows = Math.ceil(m.h / CELL);
    const free = new Uint8Array(cols * rows);
    const hit = (x, y, r) => m.obstacles.some(([ox, oy, ow, oh]) => x + r > ox && x - r < ox + ow && y + r > oy && y - r < oy + oh);
    for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) free[cy * cols + cx] = hit(cx * CELL + CELL / 2, cy * CELL + CELL / 2, R) ? 0 : 1;
    const cellOk = (cx, cy) => cx >= 0 && cy >= 0 && cx < cols && cy < rows && free[cy * cols + cx] === 1;
    function nearestCell(x, y) {
      const sx = Math.floor(x / CELL), sy = Math.floor(y / CELL);
      for (let r = 0; r < 30; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        if (cellOk(sx + dx, sy + dy)) return [sx + dx, sy + dy];
      }
      return null;
    }
    function lineFree(a, b) {
      const d = Math.hypot(b.x - a.x, b.y - a.y), n = Math.ceil(d / 6);
      for (let i = 1; i <= n; i++) { const t = i / n; if (hit(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, R - 2)) return false; }
      return true;
    }
    function path(tx, ty) {
      const s = nearestCell(P.x, P.y), g = nearestCell(tx, ty); if (!s || !g) return null;
      const key = (x, y) => y * cols + x, prev = new Int32Array(cols * rows).fill(-2);
      const q = [s]; prev[key(...s)] = -1; let found = false;
      for (let k = 0; k < q.length; k++) {
        const [x, y] = q[k]; if (x === g[0] && y === g[1]) { found = true; break; }
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
          const nx = x + dx, ny = y + dy; if (!cellOk(nx, ny) || prev[key(nx, ny)] !== -2) continue;
          if (dx && dy && (!cellOk(x + dx, y) || !cellOk(x, y + dy))) continue;
          prev[key(nx, ny)] = key(x, y); q.push([nx, ny]);
        }
      }
      if (!found) return null;
      const pts = []; for (let k = key(...g); k !== -1; k = prev[k]) pts.unshift({ x: (k % cols) * CELL + CELL / 2, y: Math.floor(k / cols) * CELL + CELL / 2 });
      const out = []; let a = { x: P.x, y: P.y };
      for (let i = 1; i < pts.length; i++) if (!lineFree(a, pts[i])) { out.push(pts[i - 1]); a = pts[i - 1]; }
      out.push(pts[pts.length - 1]);
      return out;
    }

    // Größe
    let scale = 1;
    function resize() {
      const r = box.getBoundingClientRect(); if (!r.width) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.width * m.h / m.w * dpr);
      cv.style.height = (r.width * m.h / m.w) + 'px';
      scale = cv.width / m.w;
    }
    const ro = new ResizeObserver(resize); ro.observe(box);

    // Eingabe
    function toWorld(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * m.w, y: (e.clientY - r.top) / r.height * m.h }; }
    cv.addEventListener('pointerdown', e => {
      if (paused) return; e.preventDefault();
      const w = toWorld(e);
      const spot = (o.spots ? o.spots() : []).find(s => Math.hypot(s.x - w.x, s.y - w.y) < 60);
      const t = spot ? { x: spot.x, y: spot.y } : w;
      route = path(t.x, t.y); goal = spot ? spot.id : null;
      tapMark = { x: w.x, y: w.y, t: 0.6 };
    });
    let tapMark = null;
    const kd = e => { const k = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' }[e.key]; if (k && !paused) { keys.add(k); route = null; e.preventDefault(); } };
    const ku = e => { const k = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' }[e.key]; if (k) keys.delete(k); };
    window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);

    function moveBy(dx, dy) {
      if (!hit(P.x + dx, P.y, R)) P.x += dx;
      if (!hit(P.x, P.y + dy, R)) P.y += dy;
    }
    function update(dt) {
      const speed = o.speed || 260;
      let dx = (keys.has('right') ? 1 : 0) - (keys.has('left') ? 1 : 0), dy = (keys.has('down') ? 1 : 0) - (keys.has('up') ? 1 : 0);
      P.moving = false;
      if (dx || dy) {
        const l = Math.hypot(dx, dy); dx /= l; dy /= l;
        const bx = P.x, by = P.y; moveBy(dx * speed * dt, dy * speed * dt);
        P.dist += Math.hypot(P.x - bx, P.y - by); P.moving = true;
        P.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
      } else if (route && route.length) {
        const t = route[0], ex = t.x - P.x, ey = t.y - P.y, d = Math.hypot(ex, ey), st = speed * dt;
        if (d <= st) { P.x = t.x; P.y = t.y; route.shift(); } else { P.x += ex / d * st; P.y += ey / d * st; }
        P.dist += Math.min(d, st); P.moving = true;
        P.dir = Math.abs(ex) > Math.abs(ey) ? (ex > 0 ? 'right' : 'left') : (ey > 0 ? 'down' : 'up');
      }
      // Ziele erreichen
      const spots = o.spots ? o.spots() : [];
      const near = spots.find(s => Math.hypot(s.x - P.x, s.y - P.y) < (s.r || 70));
      const arrived = goal ? (near && near.id === goal) : !(route && route.length);
      if (near && inside !== near.id && arrived) { inside = near.id; route = null; goal = null; keys.clear(); o.onReach && o.onReach(near); }
      else if (!near) inside = null;
      // Wachen
      guards.forEach(g => {
        if (g.sweep) {
          if (g.hold > 0) { g.hold -= dt; return; }
          g.ang += g.dir * g.turn * dt;
          if (g.ang > g.sweep[1]) { g.ang = g.sweep[1]; g.dir = -1; g.hold = 0.9; }
          if (g.ang < g.sweep[0]) { g.ang = g.sweep[0]; g.dir = 1; g.hold = 0.9; }
          return;
        }
        const [a, b] = [g.path[g.i], g.path[(g.i + 1) % g.path.length]];
        const ex = b[0] - g.x, ey = b[1] - g.y, d = Math.hypot(ex, ey), st = g.speed * dt;
        if (d <= st) { g.x = b[0]; g.y = b[1]; g.i = (g.i + 1) % g.path.length; }
        else { g.x += ex / d * st; g.y += ey / d * st; }
        const want = Math.atan2(ey, ex); let da = want - g.ang; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
        g.ang += Math.max(-3 * dt, Math.min(3 * dt, da));
      });
      if (o.onTick) o.onTick(P, guards, dt);
      if (tapMark) { tapMark.t -= dt; if (tapMark.t <= 0) tapMark = null; }
    }
    function sees(g) {
      const dx = P.x - g.x, dy = P.y - g.y, d = Math.hypot(dx, dy);
      if (d > (o.viewRange || 210)) return false;
      let da = Math.atan2(dy, dx) - g.ang; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
      if (Math.abs(da) > (o.viewAngle || 0.6)) return false;
      const n = Math.ceil(d / 8);
      for (let i = 1; i < n; i++) { const t = i / n; if (hit(g.x + dx * t, g.y + dy * t, 0)) return false; }
      return true;
    }
    function draw() {
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      const bg = img(m.bg);
      if (bg) ctx.drawImage(bg, 0, 0, m.w, m.h); else (o.drawBg || (() => {}))(ctx, m);
      // Wachen-Sichtkegel
      guards.forEach(g => {
        const rg = o.viewRange || 210, an = o.viewAngle || 0.6;
        ctx.fillStyle = 'rgba(255,214,107,.18)'; ctx.beginPath(); ctx.moveTo(g.x, g.y);
        for (let i = 0; i <= 16; i++) {
          const a = g.ang - an + (2 * an * i / 16); let len = rg;
          for (let s = 8; s <= rg; s += 8) if (hit(g.x + Math.cos(a) * s, g.y + Math.sin(a) * s, 0)) { len = s; break; }
          ctx.lineTo(g.x + Math.cos(a) * len, g.y + Math.sin(a) * len);
        }
        ctx.closePath(); ctx.fill();
      });
      if (tapMark) { ctx.strokeStyle = `rgba(242,189,98,${tapMark.t})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(tapMark.x, tapMark.y, 26 - tapMark.t * 20, 0, 7); ctx.stroke(); }
      const items = [];
      (o.spots ? o.spots() : []).forEach(s => items.push({ y: s.y, draw: () => o.drawSpot(ctx, s) }));
      guards.forEach(g => items.push({ y: g.y, draw: () => {
        const dir = Math.abs(Math.cos(g.ang)) > Math.abs(Math.sin(g.ang)) ? (Math.cos(g.ang) > 0 ? 'right' : 'left') : (Math.sin(g.ang) > 0 ? 'down' : 'up');
        const fr = Math.floor(performance.now() / 180) % 4; const frame = g.sweep ? 0 : [0, 1, 0, 2][fr];
        if (!drawSprite(ctx, 'assets/bonus/soldier-sheet.webp', g.x, g.y, dir, frame, 108)) drawPerson(ctx, g.x, g.y, { dir, frame, body: '#8c2f2a', hair: '#3a3a40', cape: '#5a1712', scale: 1.15 });
      } }));
      items.push({ y: P.y, draw: () => {
        const frame = P.moving ? [0, 1, 0, 2][Math.floor(P.dist / 22) % 4] : 0;
        if (!drawSprite(ctx, o.playerSprite, P.x, P.y, P.dir, frame, 108)) drawPerson(ctx, P.x, P.y, { dir: P.dir, frame, ...(o.playerLook || {}) });
      } });
      items.sort((a, b) => a.y - b.y).forEach(i => i.draw());
      if (o.onDraw) o.onDraw(ctx);
    }
    function loop(t) {
      if (!alive) return;
      if (!box.isConnected) { destroy(); return; }
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
      if (!paused) update(dt);
      draw();
      raf = requestAnimationFrame(loop);
    }
    function destroy() { alive = false; cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); }
    raf = requestAnimationFrame(loop);
    return {
      el: box, player: P, guards, sees,
      pause() { paused = true; route = null; keys.clear(); },
      resume() { paused = false; last = 0; },
      teleport(x, y) { P.x = x; P.y = y; route = null; inside = null; },
      walkTo(x, y) { route = path(x, y); },
      destroy,
    };
  }
  return { create };
})();

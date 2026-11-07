/* ===== Icons (24×24, Strich, currentColor) ===== */
const ICONS = {
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><circle cx="8" cy="13.5" r="1" fill="currentColor"/><circle cx="12" cy="13.5" r="1" fill="currentColor"/><circle cx="16" cy="16.5" r="1.4" fill="currentColor"/>',
  candle: '<path d="M9 10h6v10.5H9z"/><path d="M12 10V8"/><path d="M12 2.5c1.6 1.8 2.2 3 2.2 4a2.2 2.2 0 0 1-4.4 0c0-1 .6-2.2 2.2-4z" fill="currentColor"/><path d="M7 20.5h10"/>',
  scroll: '<path d="M6 4h11a2 2 0 0 1 2 2v12"/><path d="M6 4a2 2 0 0 0-2 2v1h4V6a2 2 0 0 0-2-2z"/><path d="M8 6v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2h-9"/><path d="M11 9h5M11 12h5M11 15h3"/>',
  seal: '<circle cx="12" cy="11" r="6.5"/><path d="M12 7.5v7M8.5 11h7"/><path d="M8 16.5 6.5 21l3-1.2L12 21l2.5-1.2 3 1.2-1.5-4.5"/>',
  note: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  star: '<path d="M12 2.5l2.4 5.6 6 .6-4.6 4 1.4 5.9L12 15.5l-5.2 3.1 1.4-5.9-4.6-4 6-.6z"/>',
  angel: '<circle cx="12" cy="6" r="2.4"/><path d="M8.5 3.2c1-.8 2.2-1.2 3.5-1.2s2.5.4 3.5 1.2" /><path d="M12 9l-4 12h8z"/><path d="M10 11C6 9 3.5 10 2.5 13c2.6.2 5 0 7-1M14 11c4-2 6.5-1 7.5 2-2.6.2-5 0-7-1"/>',
  manger: '<path d="M4 11h16l-2 5H6z"/><path d="M6 16l-2 5M18 16l2 5M9 16l-1 5M15 16l1 5"/><ellipse cx="12" cy="9.5" rx="4" ry="2"/><circle cx="14.5" cy="8.2" r="1.3"/>',
  sheep: '<path d="M6 15c-2 0-3-1.6-2.4-3 .1-1.6 1.6-2.3 2.6-2 .6-1.6 2.3-2.2 3.5-1.5 .9-1.3 3-1.3 3.9 0 1.3-.6 3 .1 3.4 1.6 1.3.1 2.2 1.3 1.8 2.6.4 1.3-.6 2.5-2 2.4-.6 1-2 1.4-3 .9-1 .8-2.6.8-3.6 0-1 .4-2.3.2-2.9-1z"/><path d="M8 16v4M15 16v4"/><ellipse cx="19.5" cy="10.5" rx="2" ry="2.6"/>',
  wreath: '<ellipse cx="12" cy="16" rx="9" ry="3.5"/><path d="M6.5 15V9.5M10 16V8.5M14 16V8.5M17.5 15V9.5"/><path d="M6.5 7.5v.5M10 6.5v.5M14 6.5v.5M17.5 7.5v.5"/>',
  crown: '<path d="M3.5 18h17l1-10-5.5 4L12 5l-4 7-5.5-4z"/><path d="M4 21h16"/>',
  staff: '<path d="M10 22V8a4 4 0 1 1 8 0v1"/>',
  speech: '<path d="M4 5h16v10H10l-5 4v-4H4z"/><path d="M8 9h8M8 12h5"/>',
  lantern: '<path d="M9 4h6M12 2v2"/><path d="M8 7h8l-1 11H9z"/><path d="M7 7h10M7 18h10"/><path d="M12 10.5c1 1.1 1.3 1.8 1.3 2.5a1.3 1.3 0 0 1-2.6 0c0-.7.3-1.4 1.3-2.5z" fill="currentColor"/>',
  key: '<circle cx="8" cy="8" r="4.5"/><path d="M11.2 11.2 20 20M16 16l2.5-2.5M18 18l2-2"/>',
  gift: '<rect x="3.5" y="9" width="17" height="11.5" rx="1.5"/><path d="M2.5 9h19V6.5h-19zM12 6.5v14"/><path d="M12 6.5C10 2.5 6.5 3.5 7.5 6M12 6.5c2-4 5.5-3 4.5-.5"/>',
  house: '<path d="M3 11 12 3.5 21 11"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
  people: '<circle cx="8" cy="6" r="2.5"/><circle cx="16" cy="6" r="2.5"/><path d="M3.5 20c.5-6 3-8 4.5-8s4 2 4.5 8M11.5 20c.5-6 3-8 4.5-8s4 2 4.5 8"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  incense: '<path d="M7 13h10l-1.5 7h-7z"/><path d="M12 13V10"/><path d="M12 9c-2-1.5 1-3 0-5M15 9c-1.4-1.3 1-2.6 0-4.3M9 9c-1.4-1.3 1-2.6 0-4.3"/>',
  jar: '<path d="M9 3h6v3l2 2v12H7V8l2-2z"/><path d="M7 12h10"/>',
  gold: '<path d="M4 18l2-6h5l2 6z"/><path d="M11 18l2-6h5l2 6z"/><path d="M7.5 12l2-6h5l2 6"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  cross: '<path d="M6 6l12 12M18 6 6 18"/>',
  up: '<path d="M6 15l6-6 6 6"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  chest: '<path d="M3.5 10h17v10h-17z"/><path d="M3.5 10a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3"/><path d="M10 12h4v3h-4z"/>',
  treasure: '<path d="M4 11h16v9H4z"/><path d="M4 11c0-3 2-5 8-5s8 2 8 5"/><path d="M12 6v14M4 15h16"/>',
  teacher: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/>',
  santa: '<path d="M5 13c1-6 4-9 9-9 2 0 4 1.5 5 4l-3 1"/><circle cx="19.5" cy="9.5" r="1.4"/><path d="M5 13h12"/><path d="M6 13c0 4 2.5 7 5.5 7s5.5-3 5.5-7"/>',
  ox: '<path d="M5 6c-1 0-2 1-1.5 2.5L6 9M19 6c1 0 2 1 1.5 2.5L18 9"/><path d="M6 9c0 6 2 10 6 10s6-4 6-10c-2-1.5-4-2-6-2S8 7.5 6 9z"/><circle cx="10" cy="16" r=".8" fill="currentColor"/><circle cx="14" cy="16" r=".8" fill="currentColor"/>',
  veil: '<path d="M12 3c-4 0-6.5 3-6.5 7.5V21h13V10.5C18.5 6 16 3 12 3z"/><circle cx="12" cy="10" r="3"/><path d="M8.5 21v-5c0-2 1.5-3 3.5-3s3.5 1 3.5 3v5"/>',
  laurel: '<path d="M5 18c-1-5 1-10 7-12M19 18c1-5-1-10-7-12"/><path d="M6 14c-2 0-3-1-3-3 2 0 3 1 3 3zM6.5 10c-1.6-.6-2.2-1.8-1.8-3.4 1.6.5 2.2 1.8 1.8 3.4zM18 14c2 0 3-1 3-3-2 0-3 1-3 3zM17.5 10c1.6-.6 2.2-1.8 1.8-3.4-1.6.5-2.2 1.8-1.8 3.4z"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3"/><path d="M8 7h7M8 10h5"/>',
  baby: '<circle cx="12" cy="8" r="3"/><path d="M6 20c0-5 2.5-8 6-8s6 3 6 8z"/>',
};
function icon(name, extra = '') {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${ICONS[name] || ''}</svg>`;
}

/* ===== Die Kiste (große Szene) ===== */
const LOCK_POS = [
  { x: 250, y: 294 }, { x: 400, y: 294 }, { x: 550, y: 294 },
  { x: 250, y: 428 }, { x: 400, y: 428 }, { x: 550, y: 428 },
];
function chestSVG(opts = {}) {
  const { interactive = true, solved = [], stations = [] } = opts;
  const locks = stations.map((s, i) => {
    const p = LOCK_POS[i];
    const open = solved.includes(s.id);
    return `
    <g class="lock${open ? ' open' : ''}" data-id="${s.id}" transform="translate(${p.x} ${p.y})" ${interactive ? `role="button" tabindex="0" aria-label="${s.name}${open ? ' (offen)' : ''}"` : ''}>
      <circle class="halo" r="58" fill="url(#halo)"/>
      <circle class="pulse" r="50" fill="none" stroke="#f2bd62" stroke-width="3"/>
      <path class="shackle" d="M-20 -20 v-16 a20 20 0 0 1 40 0 v16" fill="none" stroke="url(#steel)" stroke-width="9" stroke-linecap="round"/>
      <g class="lockbody">
        <rect class="lockplate" x="-34" y="-24" width="68" height="62" rx="12" fill="url(#brass)" stroke="#5a4114" stroke-width="2.5"/>
        <rect x="-28" y="-18" width="56" height="50" rx="9" fill="none" stroke="rgba(255,240,200,.35)" stroke-width="1.5"/>
        <g transform="translate(-17 -14) scale(1.42)" color="#3a2a0c">${icon(s.icon).replace('<svg', '<svg width="24" height="24"')}</g>
      </g>
      <image class="lockart" href="assets/ui/lock-${s.id}${open ? '-open' : ''}.webp" x="-60" y="-78" width="120" height="132" onload="this.parentNode.classList.add('has-lockart')"/>
      <text y="54" text-anchor="middle" font-family="Alegreya, Georgia, serif" font-size="15" font-weight="700" fill="${open ? '#f8dca2' : '#e9d8b6'}">${s.short}</text>
    </g>`;
  }).join('');
  const allOpen = stations.length && stations.every(s => solved.includes(s.id));
  return `
<svg class="chest-svg${allOpen ? ' opened' : ''}" viewBox="0 0 800 560" role="img" aria-label="Die verschlossene Krippenspiel-Kiste mit sechs Schlössern">
  <defs>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a4a26"/><stop offset=".5" stop-color="#5c3519"/><stop offset="1" stop-color="#3d220f"/>
    </linearGradient>
    <linearGradient id="woodlid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8d5a30"/><stop offset="1" stop-color="#5a3418"/>
    </linearGradient>
    <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f0d07a"/><stop offset=".45" stop-color="#c9a14c"/><stop offset="1" stop-color="#7d5e22"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6f7480"/><stop offset=".5" stop-color="#d3d6dc"/><stop offset="1" stop-color="#5d616b"/>
    </linearGradient>
    <linearGradient id="iron" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2b2b30"/><stop offset=".5" stop-color="#4a4a52"/><stop offset="1" stop-color="#26262b"/>
    </linearGradient>
    <radialGradient id="halo"><stop offset="0" stop-color="#f8dca2" stop-opacity=".75"/><stop offset="1" stop-color="#f2bd62" stop-opacity="0"/></radialGradient>
    <radialGradient id="glow" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="#fff2c4"/><stop offset=".5" stop-color="#f2bd62" stop-opacity=".55"/><stop offset="1" stop-color="#f2bd62" stop-opacity="0"/></radialGradient>
    <pattern id="grain" width="120" height="18" patternUnits="userSpaceOnUse">
      <path d="M0 9 C30 5 50 13 80 8 S110 10 120 9" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.2"/>
      <path d="M0 15 C40 12 70 17 120 14" fill="none" stroke="rgba(255,220,170,.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <g class="vec">
  <!-- Boden & Schatten -->
  <ellipse cx="400" cy="512" rx="330" ry="26" fill="rgba(0,0,0,.45)"/>
  <!-- Licht von innen (offen) -->
  <g class="inside">
    <path d="M150 210 L650 210 L760 -10 L40 -10 Z" fill="url(#glow)" opacity=".8"/>
  </g>
  <!-- Korpus -->
  <rect x="110" y="215" width="580" height="290" rx="16" fill="url(#wood)" stroke="#24130a" stroke-width="4"/>
  <rect x="110" y="215" width="580" height="290" rx="16" fill="url(#grain)"/>
  <path d="M112 362h576" stroke="rgba(0,0,0,.35)" stroke-width="3"/>
  <!-- Eisenbänder -->
  <rect x="160" y="215" width="22" height="290" fill="url(#iron)"/>
  <rect x="618" y="215" width="22" height="290" fill="url(#iron)"/>
  ${[240, 290, 340, 390, 440, 480].map(y => `<circle cx="171" cy="${y}" r="3.5" fill="#8d8d96"/><circle cx="629" cy="${y}" r="3.5" fill="#8d8d96"/>`).join('')}
  <!-- Ecken -->
  <path d="M110 470v19a16 16 0 0 0 16 16h30v-14h-32v-21z" fill="url(#brass)" stroke="#5a4114" stroke-width="2"/>
  <path d="M690 470v19a16 16 0 0 1-16 16h-30v-14h32v-21z" fill="url(#brass)" stroke="#5a4114" stroke-width="2"/>
  <!-- Deckel geschlossen -->
  <g class="lid-closed">
    <path d="M100 222 C100 120 700 120 700 222 Z" fill="url(#woodlid)" stroke="#24130a" stroke-width="4"/>
    <path d="M100 222 C100 120 700 120 700 222 Z" fill="url(#grain)"/>
    <path d="M160 222 C164 160 182 146 182 146" stroke="url(#iron)" stroke-width="22" fill="none"/>
    <path d="M640 222 C636 160 618 146 618 146" stroke="url(#iron)" stroke-width="22" fill="none"/>
    <rect x="96" y="212" width="608" height="16" rx="6" fill="#3a200d" stroke="#1e1007" stroke-width="2"/>

  </g>
  <!-- Deckel offen -->
  <g class="lid-open">
    <path d="M118 214 L150 40 L650 40 L682 214 Z" fill="#2a170a" stroke="#1e1007" stroke-width="4"/>
    <path d="M140 200 L166 58 L634 58 L660 200 Z" fill="#4b2b14"/>
    <rect x="104" y="206" width="592" height="16" rx="6" fill="#3a200d"/>
    <!-- Inhalt: Engelsflügel, Krone, Stern, Hirtenstab -->
    <g transform="translate(250 150)" color="#f8dca2" opacity=".95">${icon('angel').replace('<svg', '<svg width="80" height="80" x="-40" y="-40"')}</g>
    <g transform="translate(400 120)" color="#fff2c4">${icon('star').replace('<svg', '<svg width="90" height="90" x="-45" y="-45"')}</g>
    <g transform="translate(550 150)" color="#f8dca2">${icon('manger').replace('<svg', '<svg width="80" height="80" x="-40" y="-40"')}</g>
  </g>
  </g>
  <image class="art closed-art" href="assets/scene/chest-closed.webp" x="0" y="0" width="800" height="560" onload="this.ownerSVGElement.classList.add('has-art')"/>
  <image class="art open-art" href="assets/scene/chest-open.webp" x="0" y="0" width="800" height="560"/>
  <g class="label" transform="translate(400 176)">
    <rect x="-150" y="-23" width="300" height="46" rx="8" fill="#f1e5c9" stroke="#8a6a2c" stroke-width="3"/>
    <text y="7" text-anchor="middle" font-family="Caveat, cursive" font-size="26" fill="#2a2017">Krippenspiel – Nicht öffnen!</text>
  </g>
  ${locks}
</svg>`;
}

/* ===== Szene: Sakristei-Fenster (Deko auf Infokarten) ===== */
function windowArt() {
  return `<svg viewBox="0 0 300 200" aria-hidden="true">
    <rect width="300" height="200" fill="#5a2f27"/>
    ${Array.from({ length: 10 }, (_, r) => Array.from({ length: 8 }, (_, c) => `<rect x="${c * 40 - (r % 2 ? 20 : 0)}" y="${r * 20}" width="38" height="18" fill="${(r * 7 + c * 3) % 5 ? '#6b382d' : '#733f31'}"/>`).join('')).join('')}
    <path d="M100 190 V80 a50 50 0 0 1 100 0 V190 Z" fill="#0d1326" stroke="#e8dcc4" stroke-width="6"/>
    <path d="M150 34 V190 M100 120 H200" stroke="#e8dcc4" stroke-width="4"/>
    <g fill="#fff2c4">${[[120, 70], [178, 60], [132, 150], [182, 140], [165, 95], [118, 105]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 1 ? 3.4 : 1.6}"/>`).join('')}</g>
  </svg>`;
}

/* ===== Lichterrad nach Wichern ===== */
function lightWheelSVG(days) {
  const n = days.length, R = 130, cx = 160, cy = 160;
  const items = days.map((d, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    const sun = d.sun;
    const h = sun ? 26 : 16, w = sun ? 12 : 7;
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
      <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${sun ? '#f7f1e3' : '#b8322a'}" stroke="rgba(0,0,0,.35)"/>
      <path class="fl" data-i="${i}" d="M0 ${-h - 13} c3.5 4 4.5 6.5 4.5 8.5a4.5 4.5 0 0 1-9 0c0-2 1-4.5 4.5-8.5z" fill="#ffd36b"/>
    </g>`;
  }).join('');
  return `<svg class="lightwheel" viewBox="0 0 320 330" aria-label="Wicherns Lichterrad">
    <circle cx="160" cy="160" r="${R + 6}" fill="none" stroke="#6b4321" stroke-width="16"/>
    <circle cx="160" cy="160" r="${R + 6}" fill="none" stroke="#8d5a30" stroke-width="6"/>
    ${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<line x1="160" y1="160" x2="${160 + Math.cos(a) * R}" y2="${160 + Math.sin(a) * R}" stroke="#6b4321" stroke-width="7"/>`; }).join('')}
    <circle cx="160" cy="160" r="20" fill="#6b4321"/>
    ${items}
  </svg>`;
}

/* ===== Hügel, Büsche, Schaf für das Hirten-Spiel ===== */
function fieldSVG() {
  return `<svg class="bg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="#fff2c4">${Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 263) % 1600}" cy="${(i * 97) % 380}" r="${i % 9 === 0 ? 3 : 1.4}" opacity="${.4 + (i % 5) / 10}"/>`).join('')}</g>
    <path d="M1240 120 l10 26 28 3 -21 18 6 28 -23 -15 -23 15 6 -28 -21 -18 28 -3z" fill="#fff2c4" opacity=".95"/>
    <path d="M0 520 C300 420 600 470 900 430 S1400 400 1600 450 V900 H0z" fill="#1d3a33"/>
    <path d="M0 640 C400 560 800 620 1100 580 S1500 560 1600 600 V900 H0z" fill="#234538"/>
    <path d="M0 760 C300 720 900 760 1600 720 V900 H0z" fill="#2a5242"/>
    <g transform="translate(120 590)"><path d="M0 0 L40 -70 L80 0 Z" fill="#3b2a1d"/><rect x="34" y="-6" width="12" height="16" fill="#e9b44c" opacity=".6"/></g>
  </svg>`;
}
const SHEEP_SVG = `<svg viewBox="0 0 130 100" aria-hidden="true"><g>
  <path d="M30 58 v28 M48 62 v26 M82 62 v26 M98 58 v28" stroke="#1d1a17" stroke-width="7" stroke-linecap="round"/>
  <path d="M22 60c-14-2-16-20-4-26 0-14 18-20 28-12 8-12 28-12 36 0 12-6 28 2 28 16 12 4 12 22 0 26-2 12-18 16-28 10-8 8-26 8-34 0-10 6-26 2-26-14z" fill="#f4efe6"/>
  <ellipse cx="112" cy="40" rx="15" ry="19" fill="#2a2420"/>
  <ellipse cx="104" cy="28" rx="9" ry="4" fill="#2a2420" transform="rotate(-30 104 28)"/>
  <circle cx="116" cy="37" r="2.6" fill="#fff"/>
</g></svg>`;
const BUSH_SVG = `<svg viewBox="0 0 200 110" aria-hidden="true"><path d="M10 110c-10-30 10-50 35-45 5-30 45-40 60-15 20-20 60-10 60 20 25 0 35 25 25 40z" fill="#173229"/><path d="M40 110c0-20 20-30 35-25M120 110c5-25 30-30 45-15" stroke="#22463a" stroke-width="6" fill="none"/></svg>`;

/* ===== Adventskranz für das Bonusspiel ===== */
function wreathSVG() {
  const pos = [[150, 300], [250, 250], [350, 250], [450, 300]];
  return `<svg viewBox="0 0 600 600" aria-label="Adventskranz mit vier Kerzen">
    <ellipse cx="300" cy="400" rx="250" ry="95" fill="#1f3d2f"/>
    ${Array.from({ length: 40 }, (_, i) => { const a = i / 40 * Math.PI * 2; return `<ellipse cx="${300 + Math.cos(a) * 230}" cy="${400 + Math.sin(a) * 80}" rx="38" ry="16" fill="${i % 2 ? '#2f5a46' : '#3b6b52'}" transform="rotate(${a * 57 + 90} ${300 + Math.cos(a) * 230} ${400 + Math.sin(a) * 80})"/>`; }).join('')}
    <ellipse cx="300" cy="400" rx="160" ry="48" fill="#131a2c"/>
    ${[[110, 380], [490, 380], [300, 470], [200, 450], [400, 450]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#a8452f"/>`).join('')}
    ${pos.map(([x, y], i) => `<g class="cnd" data-i="${i}" role="button" tabindex="0" aria-label="Kerze ${i + 1}">
      <rect x="${x - 70}" y="${y - 160}" width="140" height="${560 - y + 100}" fill="transparent"/>
      <rect x="${x - 26}" y="${y}" width="52" height="${400 - y + 40}" rx="6" fill="#b8322a" stroke="#5a1712" stroke-width="3"/>
      <rect x="${x - 18}" y="${y + 6}" width="10" height="${400 - y + 20}" rx="4" fill="rgba(255,255,255,.18)"/>
      <path d="M${x} ${y} v-14" stroke="#1d1a17" stroke-width="4"/>
      <g class="flame"><path d="M${x} ${y - 70} c18 20 24 32 24 42 a24 24 0 0 1 -48 0 c0 -10 6 -22 24 -42z" fill="#ffd36b"/><path d="M${x} ${y - 44} c8 9 10 14 10 19 a10 10 0 0 1 -20 0 c0 -5 2 -10 10 -19z" fill="#fff6d6"/></g>
    </g>`).join('')}
  </svg>`;
}

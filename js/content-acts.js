/* ===== Inhalte Akt 2 und Akt 3 ===== */

/* ---------- Akt 2: Die Kostüme ---------- */
const ACT2_INTRO = `
<p>Geschafft, die Kiste ist offen! Ganz oben liegt noch ein Zettel:</p>
<p class="hand">„Die Kostüme gehören den Kindern vom Krippenspiel. Sie warten schon in der Kirche. Aber Vorsicht: Jedes Kind sagt euch nur, <b>was es in der Geschichte erlebt</b> – nicht, wen es spielt. Gebt jedem das richtige Kostüm. Und die Kinder sind aufgeregt: Sie wollen vorher noch etwas über ihre Rolle wissen. – H. P.“</p>
<p>Tippt in der Kirche dorthin, wo ihr hinlaufen wollt. Wenn ihr ein Kind erreicht, beginnt das Gespräch.</p>`;

const COSTUMES = [
  { id: 'maria', t: 'Blaues Tuch und helles Kleid', icon: 'veil', color: '#3d6fb5' },
  { id: 'josef', t: 'Brauner Umhang und Wanderstab', icon: 'staff', color: '#7a5230' },
  { id: 'engel', t: 'Weißes Gewand mit Flügeln', icon: 'angel', color: '#f4f1ea' },
  { id: 'hirte', t: 'Schaffell und Hirtenstab', icon: 'sheep', color: '#cbb89a' },
  { id: 'wirt', t: 'Schürze und Laterne', icon: 'lantern', color: '#a8452f' },
  { id: 'kaiser', t: 'Lorbeerkranz und purpurroter Mantel', icon: 'laurel', color: '#7b2d5b' },
  { id: 'weise', t: 'Krone mit Stern und Geschenkkästchen', icon: 'crown', color: '#c9a14c' },
];

const ACTORS = [
  {
    id: 'maria', ref: 'text:mariajosef', name: 'Lena', x: 745, y: 300, shirt: '#d98b5f', hair: '#5a3a22',
    riddle: 'Ein Engel hat mich in Nazareth besucht. Er hat gesagt, dass ich ein Kind bekommen werde. Und jetzt liegt es in einer Futterkrippe!',
    q: {
      q: 'Lena fragt: „Nach dem Besuch der Hirten steht etwas über mich in der Bibel. Was mache ich?“',
      options: ['Maria behielt alle diese Worte und bewegte sie in ihrem Herzen.', 'Maria schickte die Hirten wieder weg.', 'Maria lud alle zu einem Fest ein.', 'Maria schrieb einen Brief an den Kaiser.'],
      correct: 0, explain: 'So steht es in Lukas 2,19. Maria denkt still über alles nach, was sie erlebt.',
    },
  },
  {
    id: 'josef', ref: 'text:mariajosef', name: 'Ole', x: 865, y: 300, shirt: '#5e8a6b', hair: '#2a2420',
    riddle: 'Ich stamme aus dem Haus und Geschlecht Davids. Darum musste ich mit meiner Verlobten zur Zählung nach Bethlehem.',
    q: {
      q: 'Ole fragt: „Bei Matthäus erfahre ich auf besondere Weise, was Gott von mir will. Wie?“',
      options: ['Ein Engel spricht im Traum zu ihm.', 'Er liest es in einem Brief.', 'Ein Hirte erzählt es ihm.', 'König Herodes sagt es ihm.'],
      correct: 0, explain: 'Genau. Mehrmals spricht ein Engel im Traum zu Josef (Matthäus 1 und 2) – und Josef tut, was der Engel sagt.',
    },
  },
  {
    id: 'engel', ref: 'text:engel', name: 'Mia', x: 600, y: 395, shirt: '#8a6ab5', hair: '#c99a5b',
    riddle: 'Ich bin ein Bote Gottes. Mitten in der Nacht bringe ich Menschen auf dem Feld eine wunderbare Nachricht.',
    q: {
      q: 'Mia fragt: „Das griechische Wort angelos, von dem Engel kommt, bedeutet …?“',
      options: ['Bote', 'Flügel', 'Himmel', 'Licht'], correct: 0,
      explain: 'Richtig. Engel sind Boten: Sie bringen Gottes Nachricht zu den Menschen. Ihre ersten Worte sind oft: „Fürchtet euch nicht!“',
    },
  },
  {
    id: 'hirte', ref: 'text:hirten', name: 'Jannik', x: 270, y: 620, shirt: '#3f6fa0', hair: '#7a4a26',
    riddle: 'Ich war nachts mit meiner Herde draußen. Viele Leute in der Stadt haben auf Leute wie mich herabgesehen. Dann wurde es plötzlich hell!',
    q: {
      q: 'Jannik fragt: „Was tun wir, nachdem wir das Kind gefunden haben?“',
      options: ['Sie erzählen allen davon und loben Gott.', 'Sie bleiben für immer im Stall.', 'Sie gehen zu König Herodes.', 'Sie verkaufen ihre Schafe.'],
      correct: 0, explain: 'Genau. Die Hirten werden die ersten, die die gute Nachricht weitererzählen (Lukas 2,17–20).',
    },
  },
  {
    id: 'wirt', ref: 'text:nichtbibel', name: 'Finn', x: 1110, y: 420, shirt: '#b5803a', hair: '#1f1a17',
    riddle: 'In fast jedem Krippenspiel schicke ich Maria und Josef weg, weil bei mir alles voll ist.',
    q: {
      q: 'Finn fragt: „Was sagt eigentlich die Bibel über mich?“',
      options: [
        'Gar nichts. Lukas schreibt nur: In der Herberge war kein Raum für sie. Den Wirt haben sich Krippenspiele ausgedacht.',
        'Er war ein reicher Mann, der Maria und Josef ausgelacht hat.',
        'Er hat Maria und Josef den Stall vermietet.',
        'Er wird bei Matthäus mit Namen genannt.',
      ], correct: 0,
      explain: 'Richtig! Den Wirt gibt es in der Bibel nicht. Krippenspiele erfinden ihn, um zu zeigen: Für Jesus war kein Platz.',
    },
  },
  {
    id: 'kaiser', ref: 'text:augustus', name: 'Emma', x: 770, y: 865, shirt: '#a8452f', hair: '#e0b56b',
    riddle: 'Ich bin der mächtigste Mann der Welt und sitze in Rom. Mit meinem Befehl beginnt die ganze Geschichte.',
    q: {
      q: 'Emma fragt: „Mich haben die Menschen damals als Retter und Friedensbringer gefeiert. Was will Lukas wohl zeigen, wenn er mich neben das Kind in der Krippe stellt?“',
      options: [
        'Der wahre Retter (Heiland) ist nicht der mächtige Kaiser, sondern das arme Kind im Stall.',
        'Der Kaiser war der Vater von Jesus.',
        'Der Kaiser hat die Krippe bezahlt.',
        'Lukas wollte nur eine Jahreszahl nennen.',
      ], correct: 0,
      explain: 'Genau. Der Engel nennt das Kind „Heiland“ – also Retter. Gott zeigt sich nicht im Palast, sondern bei den Kleinen.',
    },
  },
];

const ACT2_SHELF = {
  id: 'regal', ref: 'text:epiphanias', name: 'Regal „6. Januar“', x: 1300, y: 150,
  text: 'Ein Kostüm ist übrig geblieben: die Krone mit Stern. Auf dem Regal steht ein Schild: „Für den Gottesdienst am 6. Januar“.',
  q: {
    q: 'Warum hat im Krippenspiel nach Lukas niemand dieses Kostüm bekommen?',
    options: [
      'Die Weisen kommen nur bei Matthäus vor. Ihr Fest ist Epiphanias am 6. Januar.',
      'Das Kostüm ist kaputt.',
      'Die Weisen kamen zu spät, weil sie sich verlaufen hatten.',
      'Könige durften nicht in die Kirche.',
    ], correct: 0,
    explain: 'Richtig. Die Krone kommt ins Regal – im Januar-Gottesdienst zu Epiphanias ist sie dran.',
  },
};

/* ---------- Akt 3: Der Kirchenschlüssel ---------- */
const ACT3_INTRO = {
  pastor: 'Die Kostüme sitzen – wunderbar! Aber draußen steht schon die ganze Gemeinde im Schnee. Und die Haupttür ist abgeschlossen!',
  sms: 'Oh nein, den Kirchenschlüssel habe ich aus Versehen mit nach Hause genommen! Es gibt einen Ersatzschlüssel im Schlüsselkasten in der Turmkammer. Dort ist leider das Licht kaputt – nehmt die Taschenlampe. Den Code für den Kasten findet ihr auf der Liedtafel. Viel Glück! H. P.',
};

const DARK = {
  drawers: ['Advent', 'Weihnachten', 'Epiphanias', 'Gehört nicht zur Weihnachtszeit'],
  spots: [
    { id: 'violett', name: 'Violettes Tuch für Altar und Kanzel', x: 20, y: 67, w: 20, h: 38, icon: 'cloth', answer: 0, why: 'Violett ist die Farbe des Advents: Vorbereitung und Besinnung.', hint: 'Welche Farbe hatten die Altartücher im Advent? {{text:farben}}' },
    { id: 'weiss', name: 'Weißes Tuch mit goldenem Stern', x: 47, y: 35, w: 24, h: 30, icon: 'cloth', answer: 1, why: 'Weiß ist die Farbe der Freude. Ab Heiligabend hängt es an Altar und Kanzel.', hint: 'Welche Farbe ersetzt am Heiligabend das Violett? {{text:farben}}' },
    { id: 'kreide', name: 'Kreide und ein Zettel: 20*C+M+B+27', x: 74, y: 70, w: 16, h: 20, icon: 'star', answer: 2, why: 'Um den 6. Januar schreiben Sternsinger den Segen an die Türen: C+M+B heißt „Christus mansionem benedicat“ – Christus segne dieses Haus.', hint: 'Wann ziehen die Sternsinger los? {{text:farben}}' },
    { id: 'osterkerze', name: 'Große Kerze mit Kreuz, Alpha und Omega', x: 84, y: 27, w: 8, h: 36, icon: 'candle', answer: 3, why: 'Das ist die Osterkerze. Sie wird in der Osternacht angezündet und gehört zum Osterfestkreis.', hint: 'Bei welchem Fest wird diese große Kerze zum ersten Mal angezündet? {{text:farben}}' },
  ],
  box: { name: 'Der Schlüsselkasten', x: 51, y: 80, w: 13, h: 19 },
};

const SONGS = {
  intro: 'Neben dem Schlüsselkasten hängt die Liedtafel für die Christvesper. Frau Petersen hat die Nummern noch nicht eingesteckt, nur vier Zettel daneben geklebt. Sucht die Lieder im Gesangbuch. Die vier Nummern sind der Code.',
  clues: [
    { t: 'Eingangslied – ein Adventslied: „Die Tore sollen weit aufgehen, denn der König der Herrlichkeit kommt.“', eg: 1 },
    { t: 'Martin Luther hat es für seine Familie geschrieben. In der ersten Strophe singt der Engel.', eg: 24 },
    { t: 'Paul Gerhardt, ein evangelischer Pfarrer, schrieb es 1653: Jemand steht an der Krippe und staunt.', eg: 37 },
    { t: 'Zum ersten Mal 1818 in Oberndorf bei Salzburg gesungen – heute auf der ganzen Welt bekannt.', eg: 46 },
  ],
  book: [
    { eg: 1, t: 'Macht hoch die Tür, die Tor macht weit' },
    { eg: 8, t: 'Es kommt ein Schiff, geladen' },
    { eg: 13, t: 'Tochter Zion, freue dich' },
    { eg: 24, t: 'Vom Himmel hoch, da komm ich her' },
    { eg: 27, t: 'Lobt Gott, ihr Christen alle gleich' },
    { eg: 30, t: 'Es ist ein Ros entsprungen' },
    { eg: 37, t: 'Ich steh an deiner Krippen hier' },
    { eg: 43, t: 'Ihr Kinderlein, kommet' },
    { eg: 44, t: 'O du fröhliche' },
    { eg: 46, t: 'Stille Nacht, heilige Nacht' },
  ],
  why: {
    1: '„Macht hoch die Tür“ (EG 1) eröffnet das Gesangbuch – es beginnt wie das Kirchenjahr mit dem Advent.',
    24: 'Richtig: Luthers „Vom Himmel hoch“ (EG 24).',
    37: 'Richtig: Paul Gerhardt gehört zu den wichtigsten evangelischen Liederdichtern.',
    46: '„Stille Nacht“ stammt von einem katholischen Hilfspriester und einem Lehrer – heute singen es alle Kirchen.',
  },
  hints: ['Alle vier Lieder und ihre Dichter stehen im Sachtext {{text:lieder}}', 'Das Gesangbuch beginnt mit dem Advent: Das erste Lied hat die Nummer 1.'],
};

const RINGS = {
  intro: 'Mit dem Ersatzschlüssel lauft ihr zur Haupttür. Aber die alte Tür hat zusätzlich ein Walzenschloss. Frau Petersen hat daruntergeschrieben: „Nur ein wahrer Satz über Weihnachten öffnet die Tür.“',
  lead: 'An Weihnachten feiern Christen:',
  rings: [
    { q: 'Was geschieht?', options: ['Gott wird Mensch', 'der Winter beginnt', 'der Weihnachtsmann kommt', 'das Jahr geht zu Ende'], answer: 0, hint: 'Erste Walze: Lest den ersten Absatz von {{text:menschwerdung}}' },
    { q: 'Wie?', options: ['als mächtiger Kaiser', 'als kleines Kind im Stall', 'mit einem Heer von Soldaten', 'auf einer goldenen Wolke'], answer: 1, hint: 'Zweite Walze: Lest den zweiten Absatz von {{text:menschwerdung}}' },
    { q: 'Für wen?', options: ['nur für reiche Leute', 'nur für die Römer', 'für alle Menschen', 'nur für Könige'], answer: 2, hint: 'Dritte Walze: Lest den dritten Absatz von {{text:menschwerdung}}' },
  ],
  win: 'Die Walzen rasten ein. Mit einem Knarren schwingt die Tür auf – die Gemeinde kommt herein, und die Glocken beginnen zu läuten!',
};

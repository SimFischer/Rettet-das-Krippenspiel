/* ===== Inhalte: Rettet das Krippenspiel (Akt 1) =====
   Evangelischer Religionsunterricht, Klasse 6.
   Bibelzitate nach der Lutherbibel 1912 (gemeinfrei), behutsam an heutige Rechtschreibung angepasst. */

const LETTER = `
<p>Moin, liebes Krippenspiel-Team!</p>
<p>Heute ist Heiligabend. Um 15 Uhr beginnt in unserer Kirche die Christvesper – mit eurem Krippenspiel. Kostüme, Krippenfiguren und das Drehbuch liegen in der alten Kiste in der Sakristei.</p>
<p>Damit vorher niemand die Engelsflügel stibitzt, habe ich die Kiste mit <b>sechs Schlössern</b> gesichert. Und jetzt liege ich mit Grippe im Bett … Die Codes habe ich nicht aufgeschrieben. Aber wer die Advents- und Weihnachtszeit gut kennt, knackt jedes Schloss. Meine Notizen helfen euch.</p>
<p>Schafft ihr es bis zum Glockenläuten? Ich drücke euch die Daumen!</p>
<p class="sig">Eure Küsterin Hanne Petersen</p>`;

const STATIONS = [
  /* ---------------------------------------------------------- 1 */
  {
    id: 'kalender', name: 'Das Kalenderschloss', short: 'Advent', icon: 'cal',
    sub: 'Advent und Kirchenjahr',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Advent heißt Ankunft',
        art: 'window',
        html: `<p>Das Wort <span class="term">Advent</span> kommt aus dem Lateinischen: <i>adventus</i> heißt <b>Ankunft</b>.</p>
        <p>Im Advent bereiten sich Christinnen und Christen auf die Ankunft Jesu vor. Sie erinnern sich an seine Geburt in Bethlehem. Und sie hoffen, dass Christus am Ende der Zeit wiederkommt.</p>
        <p>Mit dem <b>1. Advent</b> beginnt das neue <b>Kirchenjahr</b>. Der Advent hat vier Sonntage. Die Tücher an Altar und Kanzel sind in dieser Zeit <b>violett</b>: die Farbe der Vorbereitung und des Nachdenkens.</p>`,
      },
      {
        type: 'mc', q: 'Was bedeutet das Wort „Advent“?',
        options: ['Ankunft', 'Kerzenzeit', 'Warten auf Schnee', 'Geschenkezeit'], correct: 0,
        explain: 'Genau: adventus = Ankunft. Christen warten im Advent auf die Ankunft Jesu.',
        hints: ['Lies noch einmal den ersten Satz in Frau Petersens Notiz.'],
      },
      {
        type: 'mc', q: 'Frau Petersen hat die Altartücher für den Advent schon aufgehängt. Welche Farbe haben sie?',
        swatches: ['#6c4b94', '#f4f1ea', '#2f6b45', '#b8322a'],
        options: ['Violett', 'Weiß', 'Grün', 'Rot'], correct: 0,
        explain: 'Violett steht für Vorbereitung und Besinnung. An Weihnachten und Epiphanias wechselt die Farbe zu Weiß, der Farbe der Freude.',
        hints: ['Die Farbe steht für Vorbereitung und Nachdenken. Sie ist auch auf dem Schloss-Bild zu sehen.'],
      },
      {
        type: 'mc', q: 'Womit beginnt das Kirchenjahr?',
        options: ['Mit dem 1. Advent', 'Mit dem 1. Januar', 'Mit Weihnachten', 'Mit Ostern'], correct: 0,
        explain: 'Richtig. Das Kirchenjahr beginnt schon vor dem Kalenderjahr – mit dem 1. Advent.',
        hints: ['Das Kirchenjahr ist nicht dasselbe wie das Kalenderjahr.'],
      },
      {
        type: 'tf', q: 'Schnellrunde: Stimmt das?',
        items: [
          { t: 'Der Advent hat immer vier Sonntage.', ok: true, why: 'Ja – egal, auf welchen Wochentag Heiligabend fällt.' },
          { t: 'Das Kirchenjahr beginnt am 1. Januar.', ok: false, why: 'Nein, es beginnt mit dem 1. Advent.' },
          { t: 'Am Ewigkeitssonntag, eine Woche vor dem 1. Advent, endet das alte Kirchenjahr.', ok: true, why: 'Ja. Am Ewigkeitssonntag (Totensonntag) denken evangelische Gemeinden an die Verstorbenen des Jahres.' },
          { t: 'Im Advent wird an die Ankunft Jesu gedacht – und an die Hoffnung, dass er wiederkommt.', ok: true, why: 'Genau: Erinnerung und Hoffnung gehören zusammen.' },
        ],
        hints: ['Alles, was ihr braucht, steht in Frau Petersens Notiz am Anfang.'],
      },
      {
        type: 'calendar',
        q: 'Der 4. Advent ist immer der letzte Sonntag vor dem 25. Dezember. Tippt im Kalender auf den 1. Advent 2026.',
        target: '2026-11-29',
        hints: ['Sucht zuerst den 4. Advent: den letzten Sonntag vor dem 25.12.', 'Der 4. Advent ist am 20.12. Geht von dort immer eine Woche zurück: 3. Advent, 2. Advent, 1. Advent.'],
      },
      {
        type: 'dial', kind: 'digits', format: ['TT', 'MM'], answer: '2911', lockIcon: 'cal',
        q: 'Frau Petersens Notiz am Schloss: „Das Kalenderschloss öffnet sich mit dem Datum des 1. Advents – erst der Tag, dann der Monat.“',
        hints: ['Ihr habt das Datum gerade im Kalender gefunden.', 'Der 1. Advent 2026 ist der 29. November: 29 11.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 2 */
  {
    id: 'lichterrad', name: 'Das Kerzenschloss', short: 'Wichern', icon: 'candle',
    sub: 'Wie der Adventskranz erfunden wurde',
    steps: [
      {
        type: 'info', kicker: 'Aus der Kirchenchronik', title: 'Hamburg, 1839',
        art: 'wheel',
        html: `<p>Im <b>Rauhen Haus</b> in Hamburg-Horn leben Kinder aus den ärmsten Vierteln der Stadt. Der evangelische Theologe <b>Johann Hinrich Wichern</b> kümmert sich um sie.</p>
        <p>Im Advent fragen die Kinder jeden Tag: „Wann ist endlich Weihnachten?“ Da hat Wichern eine Idee. Er baut ein großes Holzrad, so groß wie ein Wagenrad. Darauf stellt er für jeden <b>Sonntag eine große weiße Kerze</b> und für jeden <b>Werktag eine kleine rote Kerze</b>. Jeden Tag brennt eine Kerze mehr. An Heiligabend leuchten alle.</p>
        <p>Später kamen Tannenzweige dazu. Zu Hause ließ man die kleinen Kerzen weg – übrig blieben die vier Sonntagskerzen. So entstand der <b>Adventskranz</b>: in einem evangelischen Kinderheim, ganz in der Nähe von Schleswig-Holstein.</p>`,
      },
      {
        type: 'mc', q: 'Warum hat Wichern das Lichterrad gebaut?',
        options: [
          'Damit die Kinder sehen konnten, wie lange es noch bis Weihnachten dauert.',
          'Als Schmuck für den Hamburger Weihnachtsmarkt.',
          'Weil in der Kirche das Licht ausgefallen war.',
          'Weil ein alter Brauch aus der Römerzeit das so vorschrieb.',
        ], correct: 0,
        explain: 'Genau. Das Rad war ein Kalender aus Licht: Jeden Tag wurde es ein bisschen heller.',
        hints: ['Was haben die Kinder Wichern jeden Tag gefragt?'],
      },
      {
        type: 'mc', q: 'Wichern gründete später die „Innere Mission“. Daraus wurde die Diakonie. Was macht die Diakonie heute?',
        options: [
          'Sie ist das Hilfswerk der evangelischen Kirche und hilft z. B. Kindern, alten, kranken und armen Menschen.',
          'Sie verkauft Adventskränze und Kerzen.',
          'Sie ist ein katholischer Orden von Mönchen.',
          'Sie organisiert die Weihnachtsferien der Schulen.',
        ], correct: 0,
        explain: 'Richtig. Kindergärten, Pflegedienste, Beratungsstellen: Die Diakonie setzt fort, was Wichern begonnen hat – Nächstenliebe im Alltag.',
        hints: ['Wichern hat armen Kindern geholfen. Die Diakonie macht etwas Ähnliches – nur viel größer.'],
      },
      {
        type: 'tf', q: 'Schnellrunde: Stimmt das?',
        items: [
          { t: 'Wichern war ein evangelischer Theologe.', ok: true, why: 'Ja. Er gründete das Rauhe Haus und später die Innere Mission.' },
          { t: 'Der erste Adventskranz war aus Tannenzweigen gebunden.', ok: false, why: 'Nein, zuerst war es ein Holzrad. Das Tannengrün kam später dazu.' },
          { t: 'Die großen weißen Kerzen standen für die Sonntage.', ok: true, why: 'Genau. Daraus wurden die vier Kerzen unserer Adventskränze.' },
          { t: 'An Heiligabend brannten alle Kerzen auf dem Rad.', ok: true, why: 'Ja – dann war Weihnachten da.' },
        ],
        hints: ['Lest noch einmal die Kirchenchronik am Anfang dieses Schlosses.'],
      },
      {
        type: 'dial', kind: 'digits', format: ['rote Kerzen'], answer: '22', lockIcon: 'candle',
        showDays: true, wheelAfter: true,
        q: 'Stellt euch vor, Wichern baut sein Lichterrad für 2026: vom 1. Advent (29.11.) bis Heiligabend (24.12.). Wie viele <b>kleine rote Kerzen</b> braucht er? Die Zahl öffnet das Kerzenschloss.',
        hints: ['Rote Kerzen gibt es nur für Werktage. Zählt alle Tage und zieht die Sonntage ab.', 'Vom 29.11. bis 24.12. sind es 26 Tage. Davon sind 4 Sonntage.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 3 */
  {
    id: 'lukas', name: 'Das Schriftrollenschloss', short: 'Lukas 2', icon: 'scroll',
    sub: 'Die Weihnachtsgeschichte nach Lukas',
    steps: [
      {
        type: 'info', kicker: 'Das Drehbuch', title: 'Die Weihnachtsgeschichte im Lukasevangelium',
        art: 'window',
        html: `<p>Die bekannteste Weihnachtsgeschichte steht im <b>Lukasevangelium, Kapitel 2</b>. In der Christvesper wird sie vorgelesen – und im Krippenspiel nachgespielt.</p>
        <blockquote>„Fürchtet euch nicht! Siehe, ich verkündige euch große Freude, die allem Volk widerfahren wird; denn euch ist heute der Heiland geboren, welcher ist Christus, der Herr, in der Stadt Davids.“</blockquote>
        <p class="ref">Lukas 2,10–11 (Lutherbibel 1912)</p>
        <p><b>Heiland</b> ist ein altes Wort für <b>Retter</b>. Leider sind Frau Petersens Drehbuch-Szenen durcheinandergefallen …</p>`,
      },
      {
        type: 'fill',
        q: 'Ergänzt die Worte des Engels.',
        parts: ['„Denn euch ist heute der ', 0, ' geboren, welcher ist Christus, der Herr, in der Stadt ', 1, '.“'],
        gaps: [
          { answer: 'Heiland', choices: ['Kaiser', 'Heiland', 'Hirte', 'König'] },
          { answer: 'Davids', choices: ['Roms', 'Nazareths', 'Davids', 'Jerusalems'] },
        ],
        explain: 'Bethlehem gilt als die Stadt Davids, des berühmten Königs Israels. Schon der Prophet Micha hatte gesagt, dass aus Bethlehem ein Herrscher kommen wird (Micha 5,1).',
        hints: ['Schaut noch einmal in das Zitat auf der Notiz davor.'],
      },
      {
        type: 'mc', q: 'Warum hören bei Lukas zuerst die Hirten die gute Nachricht?',
        options: [
          'Hirten waren arm und hatten wenig Ansehen. Lukas zeigt: Gott kommt zuerst zu den Kleinen und Ausgegrenzten.',
          'Hirten waren damals die wichtigsten Leute im Land.',
          'Der Kaiser hatte befohlen, dass die Hirten es zuerst erfahren.',
          'Die Hirten hatten den Engel schon lange erwartet.',
        ], correct: 0,
        explain: 'Genau. Auch der erwachsene Jesus wendet sich besonders den Armen und Ausgegrenzten zu. Lukas erzählt das schon bei seiner Geburt.',
        hints: ['Denkt daran, wo Jesus geboren wird: nicht im Palast, sondern im Stall. Wer passt dazu?'],
      },
      {
        type: 'order', lockIcon: 'scroll', success: 'Klick – die Schriftrolle rollt sich auf!',
        q: 'Das Schriftrollenschloss hat sechs Bildtasten. Tippt die Szenen in der richtigen Reihenfolge an.',
        items: [
          { icon: 'crown', text: 'Kaiser Augustus befiehlt: Alle Menschen sollen sich in Steuerlisten eintragen lassen.' },
          { icon: 'staff', text: 'Josef zieht mit Maria von Nazareth nach Bethlehem.' },
          { icon: 'manger', text: 'Maria bringt ihren Sohn zur Welt und legt ihn in eine Futterkrippe – in der Herberge ist kein Platz.' },
          { icon: 'sheep', text: 'Auf dem Feld halten Hirten in der Nacht Wache bei ihrer Herde.' },
          { icon: 'angel', text: 'Ein Engel sagt: „Fürchtet euch nicht!“ Viele Engel loben Gott.' },
          { icon: 'speech', text: 'Die Hirten finden das Kind, erzählen allen davon und loben Gott.' },
        ],
        hints: ['Die Geschichte beginnt ganz oben bei der Macht: im Palast in Rom.', 'Erst kommt die Geburt im Stall, dann wechselt die Szene aufs Feld zu den Hirten.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 4 */
  {
    id: 'evangelien', name: 'Das Siegelschloss', short: 'Lk oder Mt?', icon: 'seal',
    sub: 'Zwei Weihnachtsgeschichten',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Zwei Evangelisten – zwei Geschichten',
        art: 'books',
        html: `<p>In der Bibel gibt es nicht nur eine Weihnachtsgeschichte, sondern zwei: im <b>Lukasevangelium</b> und im <b>Matthäusevangelium</b>. Beide erzählen von der Geburt Jesu – aber ganz unterschiedlich.</p>
        <p>Und manches, was wir aus Krippenspielen kennen, steht gar nicht in der Bibel!</p>
        <p class="note">Das Siegel bricht nur, wenn alles richtig sortiert ist. – H. P.</p>`,
      },
      {
        type: 'sort', lockIcon: 'seal',
        q: 'Tippt eine Karte an und dann den passenden Korb.',
        buckets: [
          { id: 'lk', title: 'Lukas', icon: 'sheep' },
          { id: 'mt', title: 'Matthäus', icon: 'star' },
          { id: 'no', title: 'Steht nicht in der Bibel', icon: 'cross' },
        ],
        items: [
          { t: 'Hirten auf dem Feld', b: 'lk', why: 'Die Hirten kommen nur bei Lukas vor.' },
          { t: 'Engelchor: „Ehre sei Gott in der Höhe“', b: 'lk', why: 'Die singenden Engel erscheinen den Hirten – bei Lukas.' },
          { t: 'Kaiser Augustus', b: 'lk', why: 'Lukas verbindet die Geburt mit der Weltgeschichte und nennt den römischen Kaiser.' },
          { t: 'Futterkrippe', b: 'lk', why: 'Nur Lukas erzählt von der Krippe. Bei Matthäus finden die Weisen das Kind in einem Haus.' },
          { t: 'Stern', b: 'mt', why: 'Der Stern führt die Weisen – bei Matthäus.' },
          { t: 'Weise aus dem Morgenland', b: 'mt', why: 'Die Sterndeuter aus dem Osten kommen nur bei Matthäus vor.' },
          { t: 'König Herodes', b: 'mt', why: 'Bei Matthäus fragen die Weisen in Jerusalem bei König Herodes nach.' },
          { t: 'Gold, Weihrauch und Myrrhe', b: 'mt', why: 'Diese Geschenke bringen die Weisen – bei Matthäus.' },
          { t: 'Ochse und Esel', b: 'no', why: 'Ochs und Esel kommen in keiner Weihnachtsgeschichte vor. Sie stammen aus einem Vers beim Propheten Jesaja (Jesaja 1,3) und kamen später in die Krippenbilder.' },
          { t: 'Drei Könige namens Caspar, Melchior und Balthasar', b: 'no', why: 'Matthäus sagt weder, wie viele es waren, noch dass sie Könige waren. Die Zahl drei kommt von den drei Geschenken, die Namen kamen erst Jahrhunderte später dazu.' },
          { t: 'Schnee in Bethlehem', b: 'no', why: 'Davon steht nichts in der Bibel. Schnee ist in Bethlehem sehr selten – das Bild kommt aus unseren Winterliedern.' },
          { t: 'Der Weihnachtsmann', b: 'no', why: 'Der Weihnachtsmann ist eine viel spätere Figur und kommt in der Bibel nicht vor.' },
        ],
        hints: ['Lukas erzählt von armen Leuten auf dem Feld. Matthäus erzählt von Königen, Sternen und kostbaren Geschenken.', 'Fragt euch bei jeder Karte: Habe ich das schon im Drehbuch nach Lukas gelesen? Wenn nicht: Ist es eine Figur aus dem Stall-Bild oder dem Winter?'],
      },
      {
        type: 'order', success: 'Die Matthäus-Geschichte stimmt!',
        q: 'Jetzt die Geschichte nach Matthäus (Kapitel 2): Tippt die Szenen in der richtigen Reihenfolge an.',
        items: [
          { icon: 'star', text: 'Weise im Morgenland sehen einen besonderen Stern aufgehen.' },
          { icon: 'crown', text: 'In Jerusalem fragen sie König Herodes: „Wo ist der neugeborene König?“' },
          { icon: 'scroll', text: 'Die Schriftgelehrten nennen Bethlehem. Der Stern geht vor den Weisen her.' },
          { icon: 'gift', text: 'Im Haus finden sie das Kind mit Maria, knien nieder und schenken Gold, Weihrauch und Myrrhe.' },
          { icon: 'back', text: 'Im Traum werden sie gewarnt und ziehen auf einem anderen Weg heim – nicht zurück zu Herodes.' },
        ],
        hints: ['Die Weisen wissen zuerst nicht, wo das Kind ist. Wen fragen sie wohl in der Hauptstadt?', 'Zum Schluss meiden sie Herodes. Das feiert ihr später im Bonusspiel „Der andere Heimweg“.'],
      },
      {
        type: 'mc', q: 'Warum erzählen Lukas und Matthäus so unterschiedlich?',
        options: [
          'Sie wollen zeigen, wer Jesus ist – jeder auf seine Weise. Es sind Glaubensgeschichten, keine Zeitungsberichte.',
          'Einer von beiden hat sich einfach geirrt.',
          'Matthäus hat bei Lukas abgeschrieben und Fehler gemacht.',
          'Die Seiten der Bibel sind später durcheinandergeraten.',
        ], correct: 0,
        explain: 'Genau. Lukas zeigt: Gott kommt zu den Armen. Matthäus zeigt: Jesus ist ein König – und er ist für alle Völker da, auch für Fremde aus fernen Ländern.',
        hints: ['Die Evangelisten wollten keinen Polizeibericht schreiben, sondern von ihrem Glauben erzählen.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 5 */
  {
    id: 'evangelisch', name: 'Das Notenschloss', short: 'Evangelisch', icon: 'note',
    sub: 'Evangelisch Weihnachten feiern',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Was ist evangelisch an Weihnachten?',
        art: 'note',
        html: `<p>Ihr spielt das Krippenspiel in einer <b>evangelischen</b> Kirche. Viele Weihnachtsbräuche sind in einer bestimmten Kirche entstanden: manche in der evangelischen, manche in der katholischen. Heute feiern viele Christinnen und Christen sie gemeinsam.</p>
        <p><b>Martin Luther</b> lehnte die Verehrung von Heiligen ab. Darum sollten die Kinder ihre Geschenke nicht mehr vom heiligen Nikolaus bekommen, sondern vom <b>„Heiligen Christ“</b> – mit Blick auf Jesus. Daraus wurde später das <b>Christkind</b>.</p>
        <p>Für die Weihnachtsfeier mit seiner Familie dichtete Luther um 1535 das Lied <b>„Vom Himmel hoch, da komm ich her“</b>.</p>`,
      },
      {
        type: 'sort', lockIcon: 'note',
        q: 'Woher kommt der Brauch? Tippt eine Karte an und dann den passenden Korb.',
        buckets: [
          { id: 'ev', title: 'Evangelische Wurzeln', icon: 'wreath' },
          { id: 'ka', title: 'Katholische Wurzeln', icon: 'manger' },
        ],
        items: [
          { t: 'Adventskranz', b: 'ev', why: 'Erfunden 1839 von Johann Hinrich Wichern im evangelischen Rauhen Haus in Hamburg.' },
          { t: 'Herrnhuter Stern mit 25 Zacken', b: 'ev', why: 'Entstanden im 19. Jahrhundert in einer Schule der evangelischen Herrnhuter Brüdergemeine – als Mathe-Bastelarbeit!' },
          { t: 'Der „Heilige Christ“ (Christkind) bringt die Geschenke', b: 'ev', why: 'Geht auf Martin Luther zurück. Heute bringt das Christkind übrigens oft gerade in katholischen Gegenden die Geschenke.' },
          { t: 'Lied „Vom Himmel hoch, da komm ich her“', b: 'ev', why: 'Martin Luther hat es um 1535 für seine Familie gedichtet.' },
          { t: 'Weihnachtskrippe mit Figuren', b: 'ka', why: 'Franz von Assisi stellte 1223 im italienischen Greccio die Geburt Jesu mit lebenden Tieren nach. Heute stehen Krippen auch in evangelischen Kirchen.' },
          { t: 'Sternsinger ziehen von Haus zu Haus', b: 'ka', why: 'Ein katholischer Brauch rund um den 6. Januar. Die Kinder schreiben den Segen C+M+B an die Tür: „Christus segne dieses Haus“. Heute machen an manchen Orten auch evangelische Kinder mit.' },
          { t: 'Nikolaus bringt die Geschenke', b: 'ka', why: 'Der Brauch kommt aus der Heiligenverehrung. Evangelische Christen sehen Nikolaus als Vorbild, weil er Armen geholfen hat – sie beten aber nicht zu Heiligen.' },
          { t: 'Christmette: Messe um Mitternacht', b: 'ka', why: 'Die Mitternachtsmesse ist eine katholische Tradition. In evangelischen Kirchen ist am Nachmittag die Christvesper mit Krippenspiel typisch.' },
        ],
        hints: ['Zwei Karten habt ihr heute schon kennengelernt: Wichern und Luther waren evangelisch.', 'Was mit Heiligen zu tun hat, kommt eher aus der katholischen Tradition.'],
      },
      {
        type: 'fill',
        q: 'Ergänzt Luthers erste Strophe. (Mär ist ein altes Wort für Nachricht.)',
        parts: ['„Vom Himmel hoch, da komm ich ', 0, ',<br>ich bring euch gute neue ', 1, ';<br>der guten Mär bring ich so viel,<br>davon ich singn und ', 2, ' will.“'],
        gaps: [
          { answer: 'her', choices: ['hin', 'her', 'dar'] },
          { answer: 'Mär', choices: ['Lieder', 'Mär', 'Sterne'] },
          { answer: 'sagen', choices: ['sagen', 'tanzen', 'schweigen'] },
        ],
        explain: 'Gut! Die Strophe reimt sich: her – Mär, viel – will.',
        hints: ['Achtet auf die Reime: her reimt sich auf …?'],
      },
      {
        type: 'dial', kind: 'letters', answer: 'ENGEL', alphabet: 'AEGHILNRST', lockIcon: 'note',
        q: 'Notiz am Notenschloss: „Wer singt die erste Strophe? Er kommt vom Himmel hoch und bringt eine gute Nachricht. Sein Name öffnet das Schloss.“',
        hints: ['Bei Lukas bringt er den Hirten die gute Nachricht.', 'Gesucht ist der Engel: E-N-G-E-L.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 6 */
  {
    id: 'epiphanias', name: 'Das Sternschloss', short: 'Epiphanias', icon: 'star',
    sub: 'Die Weisen aus dem Morgenland',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Epiphanias: Gott zeigt sich allen',
        art: 'star',
        html: `<p>Am <b>6. Januar</b> feiert die evangelische Kirche <span class="term">Epiphanias</span>. Das griechische Wort heißt <b>Erscheinung</b>. Gemeint ist: In Jesus wird Gott für <b>alle</b> Menschen sichtbar – auch für Menschen aus fernen Ländern.</p>
        <p>Dazu gehört die Geschichte von den <b>Weisen aus dem Morgenland</b> (Matthäus 2). Die Sterndeuter folgen einem Stern, fragen bei König Herodes in Jerusalem nach und finden das Kind in Bethlehem. Sie knien nieder und schenken <b>Gold, Weihrauch und Myrrhe</b>.</p>
        <p>In der katholischen Kirche heißt der Tag oft <b>Dreikönigstag</b>. Die Farbe im Gottesdienst ist weiß, wie an Weihnachten. Mit Epiphanias beginnt die Epiphaniaszeit. Die Weihnachtszeit klingt erst Anfang Februar aus.</p>`,
      },
      {
        type: 'mc', q: 'Was bedeutet das Wort „Epiphanias“?',
        options: ['Erscheinung', 'Dreikönig', 'Sternenfest', 'Ende von Weihnachten'], correct: 0,
        explain: 'Richtig: Erscheinung. Gott erscheint in Jesus – für die ganze Welt.',
        hints: ['Es ist ein griechisches Wort. Die Übersetzung steht in der Notiz.'],
      },
      {
        type: 'match',
        q: 'Christen haben die Geschenke der Weisen später gedeutet. Tippt ein Geschenk an und dann seine Bedeutung.',
        pairs: [
          { a: 'Gold', ai: 'gold', b: 'Zeichen für einen König' },
          { a: 'Weihrauch', ai: 'incense', b: 'Zeichen für Gott – sein Duft steigt beim Gebet zum Himmel' },
          { a: 'Myrrhe', ai: 'jar', b: 'Zeichen für einen Menschen, der leiden wird – Myrrhe ist ein Heil- und Salböl' },
        ],
        explain: 'So sagen die Geschenke: Jesus ist König, Gott und Mensch zugleich.',
        hints: ['Was trägt ein König auf dem Kopf? Woraus ist es gemacht?', 'Weihrauch benutzt man im Gottesdienst. Myrrhe ist ein Öl, das man für Kranke und Verstorbene verwendete.'],
      },
      {
        type: 'mc', q: 'Warum ist es wichtig, dass die Weisen aus einem fremden Land kommen?',
        options: [
          'Es zeigt: Jesus ist für alle Menschen auf der Welt gekommen.',
          'Weil es in Bethlehem keine Geschenke zu kaufen gab.',
          'Weil nur Fremde den Weg nach Bethlehem kannten.',
          'Weil König Herodes sie eingeladen hatte.',
        ], correct: 0,
        explain: 'Genau. Darum geht es an Epiphanias: Die gute Nachricht gilt der ganzen Welt.',
        hints: ['Denkt an die Bedeutung von Epiphanias: Gott wird für wen sichtbar?'],
      },
      {
        type: 'dial', kind: 'digits', format: ['TT', 'MM'], answer: '0601', lockIcon: 'star',
        q: 'Notiz am Sternschloss: „Zwischen Weihnachten und Epiphanias liegen zwölf Tage. Zählt vom 1. Weihnachtstag, dem 25. Dezember, zwölf Tage weiter. Das Datum öffnet das Schloss: erst Tag, dann Monat.“',
        hints: ['Der Dezember hat 31 Tage. Nach dem 31.12. geht es mit dem 1. Januar weiter.', 'Es ist der Tag von Epiphanias: 06 01.'],
      },
    ],
  },
];

/* Zwischenspiele: nach dem 2. und 4. geöffneten Schloss */
const INTERLUDES = { 2: 'sheep', 4: 'memory' };

/* Finale: Bühne nach Lukas */
const FIGURES = [
  { id: 'maria', t: 'Maria', icon: 'people', ok: true },
  { id: 'josef', t: 'Josef', icon: 'staff', ok: true },
  { id: 'kind', t: 'Kind in der Krippe', icon: 'manger', ok: true },
  { id: 'hirten', t: 'Hirten', icon: 'sheep', ok: true },
  { id: 'engel', t: 'Engel', icon: 'angel', ok: true },
  { id: 'weise', t: 'Weise aus dem Morgenland', icon: 'crown', ok: false, why: 'Die Weisen gehören zu Matthäus. Ihr Auftritt ist an Epiphanias – vielleicht im Januar-Gottesdienst!' },
  { id: 'herodes', t: 'König Herodes', icon: 'crown', ok: false, why: 'Herodes kommt nur bei Matthäus vor.' },
  { id: 'wmann', t: 'Weihnachtsmann', icon: 'santa', ok: false, why: 'Der Weihnachtsmann steht nicht in der Bibel.' },
  { id: 'stern', t: 'Stern über dem Stall', icon: 'star', ok: false, why: 'Bei Lukas leuchtet kein Stern – der Stern gehört zu Matthäus. (In vielen Krippenspielen ist er trotzdem dabei.)' },
];

const MEMORY_PAIRS = [
  { icon: 'wreath', t: 'Adventskranz' },
  { icon: 'angel', t: 'Engel' },
  { icon: 'manger', t: 'Krippe' },
  { icon: 'star', t: 'Stern' },
  { icon: 'sheep', t: 'Schaf' },
  { icon: 'gift', t: 'Geschenk' },
];

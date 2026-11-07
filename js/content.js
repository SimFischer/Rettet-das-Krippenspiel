/* ===== Inhalte: Rettet das Krippenspiel (Akt 1) =====
   Evangelischer Religionsunterricht, Klasse 6.
   Bibelzitate nach der Lutherbibel 1912 (gemeinfrei), behutsam an heutige Rechtschreibung angepasst. */

const LETTER = name => `
<p>Moin ${name}!</p>
<p>Heute ist Heiligabend. Um 15 Uhr beginnt in unserer Kirche der Gottesdienst am Heiligen Abend – mit dem Krippenspiel der Kinder. Kostüme, Krippenfiguren und das Drehbuch liegen in der alten Kiste in der Sakristei.</p>
<p>Damit vorher niemand die Engelsflügel stibitzt, habe ich die Kiste mit <b>sechs Schlössern</b> gesichert. Und jetzt liege ich mit Grippe im Bett … Die Codes habe ich nicht aufgeschrieben. Aber wer die Advents- und Weihnachtszeit gut kennt, knackt jedes Schloss. Alles, was du wissen musst, steht in meinem <b>Bücherregal</b>: eine Bibel und viele Sachtexte. Lies gründlich – dann schaffst du das! Kannst du mir helfen?</p>
<p>Schaffst du es bis zum Glockenläuten? Ich drücke dir die Daumen!</p>
<p class="sig">Deine Diakonin Hanne Petersen</p>`;

const STATIONS = [
  /* ---------------------------------------------------------- 1 */
  {
    id: 'kalender', name: 'Das Kalenderschloss', short: 'Advent', icon: 'cal',
    sub: 'Advent und Kirchenjahr', ref: 'text:advent',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Bald ist Weihnachten',
        art: 'window',
        html: `<p>Frau Petersen hat das Kalenderschloss mit Fragen zur Adventszeit gesichert: Was bedeutet das Wort Advent? Wann beginnt das Kirchenjahr? Und welche Farbe haben die Tücher am Altar?</p>
        <p>Die Antworten stehen in ihrem Bücherregal. Lies zuerst gründlich nach – dann knackst du das Schloss.</p>
        <p>{{text:advent}} {{text:farben}}</p>`,
      },
      {
        type: 'mc', q: 'Was bedeutet das Wort „Advent“?',
        options: ['Ankunft', 'Kerzenzeit', 'Warten auf Schnee', 'Geschenkezeit'], correct: 0,
        explain: 'Genau: adventus = Ankunft. Christen warten im Advent auf die Ankunft Jesu.',
        hints: ['Die Übersetzung steht im ersten Absatz des Sachtexts {{text:advent}}'],
      },
      {
        type: 'mc', q: 'Frau Petersen hat die Altartücher für den Advent schon aufgehängt. Welche Farbe haben sie?',
        swatches: ['#6c4b94', '#f4f1ea', '#2f6b45', '#b8322a'],
        options: ['Violett', 'Weiß', 'Grün', 'Rot'], correct: 0,
        explain: 'Violett steht für Vorbereitung und Besinnung. An Weihnachten und Epiphanias wechselt die Farbe zu Weiß, der Farbe der Freude.',
        ref: 'text:farben',
        hints: ['Im Bücherregal steht, welche Farbe zu welcher Zeit gehört: {{text:farben}}'],
      },
      {
        type: 'mc', q: 'Womit beginnt das Kirchenjahr?',
        options: ['Mit dem 1. Advent', 'Mit dem 1. Januar', 'Mit Weihnachten', 'Mit Ostern'], correct: 0,
        explain: 'Richtig. Das Kirchenjahr beginnt schon vor dem Kalenderjahr – mit dem 1. Advent.',
        hints: ['Das Kirchenjahr ist nicht dasselbe wie das Kalenderjahr. Lies nach: {{text:advent}}'],
      },
      {
        type: 'tf', q: 'Schnellrunde: Stimmt das?',
        items: [
          { t: 'Der Advent hat immer vier Sonntage.', ok: true, why: 'Ja – egal, auf welchen Wochentag Heiligabend fällt.' },
          { t: 'Das Kirchenjahr beginnt am 1. Januar.', ok: false, why: 'Nein, es beginnt mit dem 1. Advent.' },
          { t: 'Am Ewigkeitssonntag, eine Woche vor dem 1. Advent, endet das alte Kirchenjahr.', ok: true, why: 'Ja. Am Ewigkeitssonntag (Totensonntag) denken evangelische Gemeinden an die Verstorbenen des Jahres.' },
          { t: 'Im Advent wird an die Ankunft Jesu gedacht – und an die Hoffnung, dass er wiederkommt.', ok: true, why: 'Genau: Erinnerung und Hoffnung gehören zusammen.' },
        ],
        hints: ['Alle vier Aussagen kannst du im Sachtext prüfen: {{text:advent}}'],
      },
      {
        type: 'calendar',
        q: 'Der 4. Advent ist immer der letzte Sonntag vor dem 25. Dezember. Tippe im Kalender auf den 1. Advent 2026.',
        target: '2026-11-29',
        hints: ['Suche zuerst den 4. Advent: den letzten Sonntag vor dem 25.12. So steht es auch im Sachtext {{text:advent}}', 'Der 4. Advent ist am 20.12. Gehe von dort immer eine Woche zurück: 3. Advent, 2. Advent, 1. Advent.'],
      },
      {
        type: 'dial', kind: 'digits', format: ['TT', 'MM'], answer: '2012', lockIcon: 'cal', calendar: [[2026, 11]],
        q: 'Frau Petersens Notiz am Schloss: „Das Kalenderschloss öffnet sich mit dem Datum des <b>4. Advents</b> 2026 – erst der Tag, dann der Monat.“',
        hints: ['Der 4. Advent ist der letzte Sonntag vor dem 25. Dezember. Sonntage sind im Kalender rot.', 'Der letzte Sonntag vor dem 25.12.2026 ist der 20. Dezember: 20 12.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 2 */
  {
    id: 'lichterrad', name: 'Das Kerzenschloss', short: 'Wichern', icon: 'candle',
    sub: 'Wie der Adventskranz erfunden wurde', ref: 'text:wichern',
    steps: [
      {
        type: 'info', kicker: 'Aus der Kirchenchronik', title: 'Ein Rad voller Kerzen',
        art: 'wheel',
        html: `<p>In der Kirchenchronik klebt ein altes Bild: ein großes Holzrad voller Kerzen, darunter viele Kinder. Daneben hat Frau Petersen notiert: „Ohne dieses Rad gäbe es keinen Adventskranz!“</p>
        <p>Wer hat das Rad erfunden, warum – und wie viele Kerzen hatte es? Lies den Sachtext genau.</p>
        <p>{{text:wichern}}</p>`,
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
        hints: ['Was haben die Kinder Wichern jeden Tag gefragt? Lies nach: {{text:wichern}}'],
      },
      {
        type: 'mc', q: 'Wichern gründete später die „Innere Mission“. Daraus wurde die Diakonie. Was macht die Diakonie heute?',
        options: [
          'Sie ist das Hilfswerk der evangelischen Kirche und hilft zum Beispiel Kindern, alten, kranken und armen Menschen.',
          'Sie verkauft Adventskränze und Kerzen.',
          'Sie ist ein katholischer Orden von Mönchen.',
          'Sie organisiert die Weihnachtsferien der Schulen.',
        ], correct: 0,
        explain: 'Richtig. Kindergärten, Pflegedienste, Beratungsstellen: Die Diakonie setzt fort, was Wichern begonnen hat – Nächstenliebe im Alltag.',
        hints: ['Der letzte Absatz im Sachtext erklärt die Diakonie: {{text:wichern}}'],
      },
      {
        type: 'tf', q: 'Schnellrunde: Stimmt das?',
        items: [
          { t: 'Wichern war ein evangelischer Theologe.', ok: true, why: 'Ja. Er gründete das Rauhe Haus und später die Innere Mission.' },
          { t: 'Der erste Adventskranz war aus Tannenzweigen gebunden.', ok: false, why: 'Nein, zuerst war es ein Holzrad. Das Tannengrün kam später dazu.' },
          { t: 'Die großen weißen Kerzen standen für die Sonntage.', ok: true, why: 'Genau. Daraus wurden die vier Kerzen unserer Adventskränze.' },
          { t: 'An Heiligabend brannten alle Kerzen auf dem Rad.', ok: true, why: 'Ja – dann war Weihnachten da.' },
        ],
        hints: ['Jede Aussage findest du im Sachtext: {{text:wichern}}'],
      },
      {
        type: 'dial', kind: 'digits', format: ['rote Kerzen'], answer: '22', lockIcon: 'candle',
        showDays: true, wheelAfter: true,
        q: 'Stell dir vor, Wichern baut sein Lichterrad für 2026: vom 1. Advent (29.11.) bis Heiligabend (24.12.). Wie viele <b>kleine rote Kerzen</b> braucht er? Die Zahl öffnet das Kerzenschloss.',
        hints: ['Rote Kerzen gibt es nur für Werktage ({{text:wichern}}). Zähle alle Tage und ziehe die Sonntage ab.', 'Vom 29.11. bis 24.12. sind es 26 Tage. Davon sind 4 Sonntage.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 3 */
  {
    id: 'lukas', name: 'Das Schriftrollenschloss', short: 'Lukas 2', icon: 'scroll',
    sub: 'Die Weihnachtsgeschichte nach Lukas', ref: 'bibel:lk2',
    steps: [
      {
        type: 'info', kicker: 'Das Drehbuch', title: 'Das Drehbuch ist durcheinander',
        art: 'window',
        html: `<p>Das Drehbuch für das Krippenspiel ist vom Tisch gefallen. Jetzt liegen alle Szenen durcheinander!</p>
        <p>Die Vorlage für das Krippenspiel ist die Weihnachtsgeschichte im <b>Lukasevangelium, Kapitel 2</b>. Lies sie in der Bibel im Bücherregal. Achte besonders darauf, was der Engel zu den Hirten sagt.</p>
        <p>{{bibel:lk2}} {{text:hirten}}</p>`,
      },
      {
        type: 'fill',
        q: 'Ergänze die Worte des Engels.',
        parts: ['„Denn euch ist heute der ', 0, ' geboren, welcher ist Christus, der Herr, in der Stadt ', 1, '.“'],
        gaps: [
          { answer: 'Heiland', choices: ['Kaiser', 'Heiland', 'Hirte', 'König'] },
          { answer: 'Davids', choices: ['Roms', 'Nazareths', 'Davids', 'Jerusalems'] },
        ],
        explain: 'Bethlehem gilt als die Stadt Davids, des berühmten Königs Israels. Schon der Prophet Micha hatte gesagt, dass aus Bethlehem ein Herrscher kommen wird (Micha 5,1).',
        hints: ['Schlag den Vers in der Bibel nach: {{bibel:lk2}} – Vers 11.'],
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
        ref: 'text:hirten',
        hints: ['Lies im Sachtext, wie die Leute über Hirten dachten: {{text:hirten}}'],
      },
      {
        type: 'order', lockIcon: 'scroll', success: 'Klick – die Schriftrolle rollt sich auf!',
        q: 'Das Schriftrollenschloss hat sechs Bildtasten. Tippe die Szenen in der richtigen Reihenfolge an.',
        items: [
          { icon: 'crown', text: 'Kaiser Augustus befiehlt: Alle Menschen sollen sich in Steuerlisten eintragen lassen.' },
          { icon: 'staff', text: 'Josef zieht mit Maria von Nazareth nach Bethlehem.' },
          { icon: 'manger', text: 'Maria bringt ihren Sohn zur Welt und legt ihn in eine Futterkrippe – in der Herberge ist kein Platz.' },
          { icon: 'sheep', text: 'Auf dem Feld halten Hirten in der Nacht Wache bei ihrer Herde.' },
          { icon: 'angel', text: 'Ein Engel sagt: „Fürchtet euch nicht!“ Viele Engel loben Gott.' },
          { icon: 'speech', text: 'Die Hirten finden das Kind, erzählen allen davon und loben Gott.' },
        ],
        hints: ['Lies die Geschichte in der Bibel: {{bibel:lk2}}. Die Szenen kommen dort in derselben Reihenfolge vor.', 'Verse 1–3: Kaiser · 4–5: Reise · 6–7: Geburt · 8: Hirten · 9–14: Engel · 15–20: Hirten erzählen.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 4 */
  {
    id: 'evangelien', name: 'Das Siegelschloss', short: 'Lk oder Mt?', icon: 'seal',
    sub: 'Zwei Weihnachtsgeschichten', ref: 'text:zwei',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Zwei Geschichten in einem Krippenspiel',
        art: 'books',
        html: `<p>In der Bibel gibt es nicht nur eine Weihnachtsgeschichte, sondern zwei. In unseren Krippenspielen werden sie oft vermischt – und manches kommt dazu, was gar nicht in der Bibel steht.</p>
        <p>Lies in Frau Petersens Bücherregal nach, was bei Lukas und was bei Matthäus steht.</p>
        <p>{{text:zwei}} {{text:nichtbibel}} {{bibel:mt2}}</p>
        <p class="note">Das Siegel bricht nur, wenn alles richtig sortiert ist. – H. P.</p>`,
      },
      {
        type: 'sort', lockIcon: 'seal',
        q: 'Tippe eine Karte an und dann den passenden Korb.',
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
        hints: ['Im Sachtext {{text:zwei}} steht, was bei Lukas und was bei Matthäus vorkommt.', 'Für die dritte Spalte: {{text:nichtbibel}}'],
      },
      {
        type: 'order', success: 'Die Matthäus-Geschichte stimmt!',
        q: 'Jetzt die Geschichte nach Matthäus (Kapitel 2): Tippe die Szenen in der richtigen Reihenfolge an.',
        items: [
          { icon: 'star', text: 'Weise im Morgenland sehen einen besonderen Stern aufgehen.' },
          { icon: 'crown', text: 'In Jerusalem fragen sie König Herodes: „Wo ist der neugeborene König?“' },
          { icon: 'scroll', text: 'Die Schriftgelehrten nennen Bethlehem. Der Stern geht vor den Weisen her.' },
          { icon: 'gift', text: 'Im Haus finden sie das Kind mit Maria, knien nieder und schenken Gold, Weihrauch und Myrrhe.' },
          { icon: 'back', text: 'Im Traum werden sie gewarnt und ziehen auf einem anderen Weg heim – nicht zurück zu Herodes.' },
        ],
        ref: 'bibel:mt2',
        hints: ['Lies die Geschichte in der Bibel: {{bibel:mt2}}', 'Verse 1–2: Stern · 3–8: Herodes · 9–10: Stern führt nach Bethlehem · 11: Haus und Gaben · 12: anderer Weg.'],
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
        hints: ['Der letzte Absatz im Sachtext beantwortet die Frage: {{text:zwei}}'],
      },
    ],
  },
  /* ---------------------------------------------------------- 5 */
  {
    id: 'evangelisch', name: 'Das Notenschloss', short: 'Evangelisch', icon: 'note',
    sub: 'Evangelisch Weihnachten feiern', ref: 'text:konfessionen',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Evangelisch oder katholisch?',
        art: 'note',
        html: `<p>Das Krippenspiel findet in einer <b>evangelischen</b> Kirche statt. Viele Weihnachtsbräuche sind aber in einer bestimmten Kirche entstanden: manche in der evangelischen, manche in der katholischen.</p>
        <p>Was hat Martin Luther verändert? Woher kommen Adventskranz, Krippe und Sternsinger? Und welches Lied hat Luther für seine Familie gedichtet? Lies nach:</p>
        <p>{{text:konfessionen}} {{text:lieder}}</p>`,
      },
      {
        type: 'sort', lockIcon: 'note',
        q: 'Woher kommt der Brauch? Tippe eine Karte an und dann den passenden Korb.',
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
          { t: 'Christmette: Messe um Mitternacht', b: 'ka', why: 'Die Mitternachtsmesse ist eine katholische Tradition. In evangelischen Kirchen ist am Nachmittag ein Gottesdienst mit Krippenspiel typisch.' },
        ],
        hints: ['Alle acht Bräuche werden im Sachtext erklärt: {{text:konfessionen}}', 'Was mit Heiligen zu tun hat, kommt aus der katholischen Tradition.'],
      },
      {
        type: 'fill',
        q: 'Ergänze Luthers erste Strophe. (Mär ist ein altes Wort für Nachricht.)',
        parts: ['„Vom Himmel hoch, da komm ich ', 0, ',<br>ich bring euch gute neue ', 1, ';<br>der guten Mär bring ich so viel,<br>davon ich singn und ', 2, ' will.“'],
        gaps: [
          { answer: 'her', choices: ['hin', 'her', 'dar'] },
          { answer: 'Mär', choices: ['Lieder', 'Mär', 'Sterne'] },
          { answer: 'sagen', choices: ['sagen', 'tanzen', 'schweigen'] },
        ],
        explain: 'Gut! Die Strophe reimt sich: her – Mär, viel – will.',
        ref: 'text:lieder',
        hints: ['Die ganze Strophe steht im Sachtext {{text:lieder}}'],
      },
      {
        type: 'dial', kind: 'letters', answer: 'ENGEL', alphabet: 'AEGHILNRST', lockIcon: 'note',
        q: 'Notiz am Notenschloss: „Wer singt die erste Strophe? Er kommt vom Himmel hoch und bringt eine gute Nachricht. Sein Name öffnet das Schloss.“',
        hints: ['Lies nach, was ein Bote Gottes ist: {{text:engel}}', 'Gesucht ist der Engel: E-N-G-E-L.'],
      },
    ],
  },
  /* ---------------------------------------------------------- 6 */
  {
    id: 'epiphanias', name: 'Das Sternschloss', short: 'Epiphanias', icon: 'star',
    sub: 'Die Weisen aus dem Morgenland', ref: 'text:epiphanias',
    steps: [
      {
        type: 'info', kicker: 'Notiz von Frau Petersen', title: 'Das Fest am 6. Januar',
        art: 'star',
        html: `<p>Auf dem Sternschloss klebt ein Zettel: „Epiphanias“. Darunter hat Frau Petersen einen Stern und drei Geschenke gemalt.</p>
        <p>Was bedeutet das Wort? Was haben die Weisen aus dem Morgenland damit zu tun? Und was sollen ihre Geschenke sagen? Lies im Bücherregal nach:</p>
        <p>{{text:epiphanias}} {{bibel:mt2}}</p>`,
      },
      {
        type: 'mc', q: 'Was bedeutet das Wort „Epiphanias“?',
        options: ['Erscheinung', 'Dreikönig', 'Sternenfest', 'Ende von Weihnachten'], correct: 0,
        explain: 'Richtig: Erscheinung. Gott erscheint in Jesus – für die ganze Welt.',
        hints: ['Die Übersetzung steht im ersten Satz des Sachtexts: {{text:epiphanias}}'],
      },
      {
        type: 'match',
        q: 'Christen haben die Geschenke der Weisen später gedeutet. Tippe ein Geschenk an und dann seine Bedeutung.',
        pairs: [
          { a: 'Gold', ai: 'gold', b: 'Zeichen für einen König' },
          { a: 'Weihrauch', ai: 'incense', b: 'Zeichen für Gott – sein Duft steigt beim Gebet zum Himmel' },
          { a: 'Myrrhe', ai: 'jar', b: 'Zeichen für einen Menschen, der leiden wird – Myrrhe ist ein Heil- und Salböl' },
        ],
        explain: 'So sagen die Geschenke: Jesus ist König, Gott und Mensch zugleich.',
        hints: ['Der dritte Absatz im Sachtext erklärt die Gaben: {{text:epiphanias}}'],
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
        hints: ['Lies den zweiten Absatz: {{text:epiphanias}}'],
      },
      {
        type: 'dial', kind: 'digits', format: ['TT', 'MM'], answer: '0601', lockIcon: 'star', calendar: [[2026, 11], [2027, 0]],
        q: 'Notiz am Sternschloss: „Zwischen Weihnachten und Epiphanias liegen zwölf Tage. Zähle vom 1. Weihnachtstag, dem 25. Dezember, zwölf Tage weiter. Das Datum öffnet das Schloss: erst Tag, dann Monat.“',
        hints: ['Der Dezember hat 31 Tage. Nach dem 31.12. geht es mit dem 1. Januar weiter. Das Datum steht auch im Sachtext {{text:epiphanias}}', 'Es ist der Tag von Epiphanias: 06 01.'],
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

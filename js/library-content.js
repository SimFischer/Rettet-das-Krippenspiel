/* ===== Frau Petersens Bücherregal: Inhalte =====
   Bibeltexte nach der Lutherbibel 1912 (gemeinfrei), Rechtschreibung behutsam modernisiert.
   Sachtexte: bewusst ausführlich, damit die Lösungen aus dem Text erarbeitet werden. */

const BIBLE = [
  {
    id: 'lk1', ref: 'Lukas 1,26–38', title: 'Der Engel Gabriel bei Maria',
    verses: [
      [26, 'Und im sechsten Monat ward der Engel Gabriel gesandt von Gott in eine Stadt in Galiläa, die heißt Nazareth,'],
      [27, 'zu einer Jungfrau, die vertraut war einem Manne mit Namen Joseph, vom Hause David; und die Jungfrau hieß Maria.'],
      [28, 'Und der Engel kam zu ihr hinein und sprach: Gegrüßet seist du, Holdselige! Der Herr ist mit dir.'],
      [29, 'Da sie aber ihn sah, erschrak sie über seine Rede und gedachte: Welch ein Gruß ist das?'],
      [30, 'Und der Engel sprach zu ihr: Fürchte dich nicht, Maria! Du hast Gnade bei Gott gefunden.'],
      [31, 'Siehe, du wirst schwanger werden und einen Sohn gebären, des Namen sollst du Jesus heißen.'],
      ['…', ''],
      [38, 'Maria aber sprach: Siehe, ich bin des Herrn Magd; mir geschehe, wie du gesagt hast. Und der Engel schied von ihr.'],
    ],
    words: { 'vertraut': 'verlobt', 'Holdselige': 'Liebe, Schöne – ein freundlicher Gruß', 'Gnade': 'Gottes Liebe und Zuwendung, die man sich nicht verdienen muss', 'Magd': 'Dienerin' },
  },
  {
    id: 'mt1', ref: 'Matthäus 1,18–24', title: 'Josefs Traum',
    verses: [
      [18, 'Die Geburt Jesu Christi war aber also getan: Als Maria, seine Mutter, dem Joseph vertraut war, …'],
      [19, 'Joseph aber, ihr Mann, war fromm und wollte sie nicht in Schande bringen, gedachte aber, sie heimlich zu verlassen.'],
      [20, 'Indem er aber also gedachte, siehe, da erschien ihm ein Engel des Herrn im Traum und sprach: Joseph, du Sohn Davids, fürchte dich nicht, Maria, dein Gemahl, zu dir zu nehmen; denn das in ihr geboren ist, das ist von dem heiligen Geist.'],
      [21, 'Und sie wird einen Sohn gebären, des Namen sollst du Jesus heißen; denn er wird sein Volk selig machen von ihren Sünden.'],
      ['…', ''],
      [24, 'Da nun Joseph vom Schlaf erwachte, tat er, wie ihm des Herrn Engel befohlen hatte, und nahm sein Gemahl zu sich.'],
    ],
    words: { 'fromm': 'gläubig, rechtschaffen', 'Gemahl': 'Ehefrau', 'selig machen': 'retten' },
  },
  {
    id: 'lk2', ref: 'Lukas 2,1–20', title: 'Die Geburt Jesu',
    verses: [
      [1, 'Es begab sich aber zu der Zeit, dass ein Gebot von dem Kaiser Augustus ausging, dass alle Welt geschätzt würde.'],
      [2, 'Und diese Schätzung war die allererste und geschah zur Zeit, da Kyrenius Landpfleger in Syrien war.'],
      [3, 'Und jedermann ging, dass er sich schätzen ließe, ein jeglicher in seine Stadt.'],
      [4, 'Da machte sich auch auf Joseph aus Galiläa, aus der Stadt Nazareth, in das jüdische Land zur Stadt Davids, die da heißt Bethlehem, darum dass er von dem Hause und Geschlechte Davids war,'],
      [5, 'auf dass er sich schätzen ließe mit Maria, seinem vertrauten Weibe, die war schwanger.'],
      [6, 'Und als sie daselbst waren, kam die Zeit, dass sie gebären sollte.'],
      [7, 'Und sie gebar ihren ersten Sohn und wickelte ihn in Windeln und legte ihn in eine Krippe; denn sie hatten sonst keinen Raum in der Herberge.'],
      [8, 'Und es waren Hirten in derselben Gegend auf dem Felde bei den Hürden, die hüteten des Nachts ihre Herde.'],
      [9, 'Und siehe, des Herrn Engel trat zu ihnen, und die Klarheit des Herrn leuchtete um sie; und sie fürchteten sich sehr.'],
      [10, 'Und der Engel sprach zu ihnen: Fürchtet euch nicht! Siehe, ich verkündige euch große Freude, die allem Volk widerfahren wird;'],
      [11, 'denn euch ist heute der Heiland geboren, welcher ist Christus, der Herr, in der Stadt Davids.'],
      [12, 'Und das habt zum Zeichen: Ihr werdet finden das Kind in Windeln gewickelt und in einer Krippe liegen.'],
      [13, 'Und alsbald war da bei dem Engel die Menge der himmlischen Heerscharen, die lobten Gott und sprachen:'],
      [14, 'Ehre sei Gott in der Höhe und Friede auf Erden und den Menschen ein Wohlgefallen.'],
      [15, 'Und da die Engel von ihnen gen Himmel fuhren, sprachen die Hirten untereinander: Lasset uns nun gehen gen Bethlehem und die Geschichte sehen, die da geschehen ist, die uns der Herr kundgetan hat.'],
      [16, 'Und sie kamen eilend und fanden beide, Maria und Joseph, dazu das Kind in der Krippe liegen.'],
      [17, 'Da sie es aber gesehen hatten, breiteten sie das Wort aus, welches zu ihnen von diesem Kinde gesagt war.'],
      [18, 'Und alle, vor die es kam, wunderten sich der Rede, die ihnen die Hirten gesagt hatten.'],
      [19, 'Maria aber behielt alle diese Worte und bewegte sie in ihrem Herzen.'],
      [20, 'Und die Hirten kehrten wieder um, priesen und lobten Gott um alles, was sie gesehen und gehört hatten, wie denn zu ihnen gesagt war.'],
    ],
    words: { 'geschätzt': 'gezählt und in Steuerlisten eingetragen', 'Landpfleger': 'römischer Statthalter, eine Art Gouverneur', 'vertrautes Weib': 'Verlobte', 'Herberge': 'Unterkunft für Reisende', 'Hürden': 'Zäune, in denen die Schafe nachts stehen', 'Klarheit': 'heller Glanz', 'Heiland': 'Retter', 'Heerscharen': 'eine riesige Menge (von Engeln)', 'kundgetan': 'mitgeteilt' },
  },
  {
    id: 'mt2', ref: 'Matthäus 2,1–12', title: 'Die Weisen aus dem Morgenland',
    verses: [
      [1, 'Da Jesus geboren war zu Bethlehem im jüdischen Lande, zur Zeit des Königs Herodes, siehe, da kamen die Weisen vom Morgenlande gen Jerusalem und sprachen:'],
      [2, 'Wo ist der neugeborene König der Juden? Wir haben seinen Stern gesehen im Morgenlande und sind gekommen, ihn anzubeten.'],
      [3, 'Da das der König Herodes hörte, erschrak er und mit ihm das ganze Jerusalem.'],
      [4, 'Und ließ versammeln alle Hohenpriester und Schriftgelehrten unter dem Volk und erforschte von ihnen, wo Christus sollte geboren werden.'],
      [5, 'Und sie sagten ihm: Zu Bethlehem im jüdischen Lande; denn also steht geschrieben durch den Propheten:'],
      [6, '„Und du Bethlehem im jüdischen Lande bist mitnichten die kleinste unter den Fürsten Judas; denn aus dir soll mir kommen der Herzog, der über mein Volk Israel ein Herr sei.“'],
      [7, 'Da berief Herodes die Weisen heimlich und erlernte mit Fleiß von ihnen, wann der Stern erschienen wäre,'],
      [8, 'und wies sie gen Bethlehem und sprach: Ziehet hin und forschet fleißig nach dem Kindlein; und wenn ihr’s findet, so sagt mir’s wieder, dass ich auch komme und es anbete.'],
      [9, 'Als sie nun den König gehört hatten, zogen sie hin. Und siehe, der Stern, den sie im Morgenlande gesehen hatten, ging vor ihnen hin, bis dass er kam und stand oben über, da das Kindlein war.'],
      [10, 'Da sie den Stern sahen, wurden sie hoch erfreut'],
      [11, 'und gingen in das Haus und fanden das Kindlein mit Maria, seiner Mutter, und fielen nieder und beteten es an und taten ihre Schätze auf und schenkten ihm Gold, Weihrauch und Myrrhe.'],
      [12, 'Und Gott befahl ihnen im Traum, dass sie sich nicht sollten wieder zu Herodes lenken; und zogen durch einen andern Weg wieder in ihr Land.'],
    ],
    words: { 'Weise': 'gelehrte Sterndeuter', 'Morgenland': 'der Osten, das Land, wo die Sonne aufgeht', 'Schriftgelehrte': 'Fachleute für die heiligen Schriften', 'mitnichten': 'keineswegs', 'Herzog': 'Anführer, Herrscher', 'erlernte mit Fleiß': 'fragte genau aus' },
  },
  {
    id: 'mt2b', ref: 'Matthäus 2,13–14', title: 'Die Flucht nach Ägypten',
    verses: [
      [13, 'Da sie aber hinweggezogen waren, siehe, da erschien der Engel des Herrn dem Joseph im Traum und sprach: Stehe auf und nimm das Kindlein und seine Mutter zu dir und fliehe nach Ägyptenland und bleib allda, bis ich dir sage; denn es ist vorhanden, dass Herodes das Kindlein suche, es umzubringen.'],
      [14, 'Und er stand auf und nahm das Kindlein und seine Mutter zu sich bei der Nacht und entwich nach Ägyptenland.'],
    ],
    words: { 'entwich': 'floh' },
  },
  {
    id: 'propheten', ref: 'Jesaja 1,3 · Micha 5,1 · Psalm 24,7', title: 'Worte aus dem Alten Testament',
    verses: [
      ['Jes 1,3', 'Ein Ochse kennt seinen Herrn und ein Esel die Krippe seines Herrn; aber Israel kennt’s nicht, und mein Volk vernimmt’s nicht.'],
      ['Mi 5,1', 'Und du, Bethlehem Ephratha, die du klein bist unter den Tausenden in Juda, aus dir soll mir der kommen, der in Israel Herr sei.'],
      ['Ps 24,7', 'Machet die Tore weit und die Türen in der Welt hoch, dass der König der Ehren einziehe!'],
    ],
    words: { 'vernimmt’s': 'versteht es' },
  },
  {
    id: 'joh', ref: 'Johannes 8,12', title: 'Das Licht der Welt',
    verses: [[12, 'Da redete Jesus abermals zu ihnen und sprach: Ich bin das Licht der Welt. Wer mir nachfolgt, der wird nicht wandeln in der Finsternis, sondern wird das Licht des Lebens haben.']],
    words: {},
  },
];

const TEXTS = [
  {
    id: 'advent', title: 'Advent und das Kirchenjahr', icon: 'cal',
    html: `<p>Das Wort <b>Advent</b> kommt aus der lateinischen Sprache. <i>Adventus</i> bedeutet <b>Ankunft</b>. In der Adventszeit warten Christinnen und Christen auf die Ankunft von Jesus Christus. Dabei denken sie an zwei Dinge: Sie erinnern sich an seine Geburt in Bethlehem vor über 2000 Jahren. Und sie hoffen, dass Christus am Ende der Zeit wiederkommt und die Welt heil macht.</p>
    <p>Neben dem normalen Kalenderjahr gibt es in der Kirche ein eigenes <b>Kirchenjahr</b>. Es beginnt nicht am 1. Januar, sondern schon einige Wochen früher: mit dem <b>1. Advent</b>. Der Advent hat immer <b>vier Sonntage</b>. Der 4. Advent ist der letzte Sonntag vor dem 25. Dezember. Wer den 1. Advent finden will, sucht also zuerst den 4. Advent und zählt dann drei Wochen zurück.</p>
    <p>Eine Woche vor dem 1. Advent endet das alte Kirchenjahr mit dem <b>Ewigkeitssonntag</b>, auch Totensonntag genannt. In evangelischen Gemeinden denkt man an diesem Tag an die Menschen, die im vergangenen Jahr gestorben sind.</p>
    <p>Das Kirchenjahr hat zwei große Festkreise: den <b>Weihnachtsfestkreis</b> mit Advent, Weihnachten und Epiphanias und den <b>Osterfestkreis</b> mit Passionszeit, Ostern und Pfingsten.</p>`,
  },
  {
    id: 'farben', title: 'Farben und Zeichen im Gottesdienst', icon: 'candle',
    html: `<p>In evangelischen Kirchen hängen an Altar und Kanzel farbige Tücher. Man nennt sie <b>Paramente</b>. Ihre Farbe zeigt, welche Zeit im Kirchenjahr gerade ist.</p>
    <p><b>Violett</b> ist die Farbe der Vorbereitung, der Buße und des Nachdenkens. Sie hängt im <b>Advent</b> und in der Passionszeit vor Ostern. <b>Weiß</b> ist die Farbe der Freude und des Lichts. Sie gehört zu den großen Christusfesten: zu <b>Weihnachten</b>, zu <b>Epiphanias</b> und zu Ostern. Am Heiligabend wird darum das violette Tuch gegen ein weißes getauscht. <b>Rot</b> ist die Farbe des Heiligen Geistes und hängt zu Pfingsten. <b>Grün</b>, die Farbe des Wachsens, sieht man in den Zeiten ohne große Feste.</p>
    <p>Ein besonderes Zeichen ist die <b>Osterkerze</b>: eine große weiße Kerze mit einem Kreuz und den griechischen Buchstaben Alpha und Omega (Anfang und Ende). Sie wird in der Osternacht zum ersten Mal angezündet und gehört zum <b>Osterfestkreis</b>, nicht zur Weihnachtszeit.</p>
    <p>Zur Zeit um den 6. Januar gehören die <b>Sternsinger</b>. Sie schreiben mit Kreide einen Segen an die Haustüren, zum Beispiel <b>20*C+M+B+27</b>. Die Buchstaben bedeuten „Christus mansionem benedicat“: Christus segne dieses Haus. Die Zahlen sind die Jahreszahl.</p>`,
  },
  {
    id: 'wichern', title: 'Johann Hinrich Wichern und das Lichterrad', icon: 'wreath',
    html: `<p>Johann Hinrich Wichern wurde 1808 in Hamburg geboren. Er war ein <b>evangelischer Theologe</b>. In Hamburg gab es damals viele sehr arme Familien. Viele Kinder mussten betteln oder arbeiten und konnten nicht zur Schule gehen. 1833 gründete Wichern deshalb im Dorf Horn bei Hamburg das <b>Rauhe Haus</b>, ein Zuhause für Kinder und Jugendliche aus den ärmsten Vierteln der Stadt.</p>
    <p>Im Advent fragten die Kinder ihn jeden Tag: „Wann ist endlich Weihnachten?“ Darum baute Wichern <b>1839</b> eine Art Kalender aus Licht: ein großes <b>Holzrad</b>, so groß wie ein Wagenrad. Tannenzweige hatte es am Anfang noch nicht. Auf das Rad stellte er für jeden <b>Sonntag eine große weiße Kerze</b> und für jeden <b>Werktag eine kleine rote Kerze</b>. Jeden Tag wurde eine Kerze mehr angezündet. So konnten die Kinder sehen, wie lange es noch dauert. Am Heiligabend brannten alle Kerzen.</p>
    <p>Wie viele rote Kerzen man braucht, ist jedes Jahr anders. Es hängt davon ab, wie viele Werktage zwischen dem 1. Advent und Heiligabend liegen. Später schmückte man das Rad mit Tannengrün. In den Familien ließ man die vielen kleinen Kerzen weg. So entstand unser Adventskranz mit vier Kerzen.</p>
    <p>Wichern wollte, dass die Kirche sich um Menschen in Not kümmert. 1848 gründete er die <b>Innere Mission</b>. Daraus ist die <b>Diakonie</b> geworden, das große Hilfswerk der evangelischen Kirche. Diakonie heißt übersetzt „Dienst“. Zur Diakonie gehören heute zum Beispiel Kindergärten, Pflegedienste für alte und kranke Menschen, Beratungsstellen und Hilfe für Arme und Wohnungslose.</p>`,
  },
  {
    id: 'mariajosef', title: 'Maria und Josef', icon: 'people',
    html: `<p><b>Maria</b> lebte in dem kleinen Ort <b>Nazareth</b> in Galiläa. Sie war mit Josef verlobt. Der Evangelist Lukas erzählt, dass der <b>Engel Gabriel</b> zu ihr kam und ihr sagte, dass sie einen Sohn bekommen wird, den sie Jesus nennen soll. Maria erschrak, aber sie sagte Ja zu Gottes Plan (Lukas 1).</p>
    <p>Nach der Geburt in Bethlehem kamen die Hirten und erzählten, was der Engel ihnen gesagt hatte. Lukas schreibt, dass Maria daraufhin still blieb und über alles nachdachte: „Maria aber behielt alle diese Worte und bewegte sie in ihrem Herzen“ (Lukas 2,19).</p>
    <p><b>Josef</b> stammte aus der Familie des berühmten Königs David. Deshalb musste er zur Zählung des Kaisers in die <b>Stadt Davids</b> reisen: nach Bethlehem. Der Evangelist Matthäus erzählt besonders viel über Josef. Bei ihm erfährt Josef mehrmals <b>im Traum durch einen Engel</b>, was er tun soll: Er soll Maria heiraten (Matthäus 1,20), und später soll er mit Maria und dem Kind nach Ägypten fliehen (Matthäus 2,13). Josef tut jedes Mal, was der Engel ihm sagt.</p>`,
  },
  {
    id: 'engel', title: 'Engel – Boten Gottes', icon: 'angel',
    html: `<p>Das deutsche Wort <b>Engel</b> kommt vom griechischen Wort <i>angelos</i>. Das heißt <b>Bote</b>. Engel sind in der Bibel Boten Gottes: Sie bringen den Menschen eine Nachricht von Gott. Wichtig ist nicht, wie sie aussehen, sondern was sie sagen. Flügel haben Engel in der Bibel übrigens fast nie, die Flügel kamen erst später durch die Kunst dazu.</p>
    <p>In den Weihnachtsgeschichten haben Engel viel zu tun. Der Engel Gabriel besucht Maria in Nazareth. Bei Matthäus spricht ein Engel im Traum zu Josef. Und bei Lukas erscheint ein Engel nachts den Hirten auf dem Feld. Seine ersten Worte sind: <b>„Fürchtet euch nicht!“</b> Diese Worte sagen Engel in der Bibel sehr oft, denn die Menschen erschrecken, wenn Gott ihnen so nahe kommt.</p>
    <p>Danach singt ein großer Chor von Engeln: „Ehre sei Gott in der Höhe und Friede auf Erden.“</p>`,
  },
  {
    id: 'hirten', title: 'Hirten zur Zeit Jesu', icon: 'sheep',
    html: `<p>Hirten hüteten Schafe und Ziegen, die meistens anderen Leuten gehörten. Sie verdienten wenig Geld und waren <b>arm</b>. Oft waren sie Tag und Nacht draußen bei den Tieren, auch nachts auf dem Feld. Darum konnten sie nicht regelmäßig in den Gottesdienst gehen. Viele Leute in den Städten sahen auf Hirten <b>herab</b> und hielten sie für unzuverlässig. Hirten hatten also wenig Ansehen.</p>
    <p>Umso erstaunlicher ist es, dass im Lukasevangelium gerade die Hirten als Erste von der Geburt Jesu erfahren. Nicht der Kaiser, nicht die reichen Leute, sondern einfache Leute am Rand der Gesellschaft. Lukas will damit zeigen: <b>Gott kommt zuerst zu den Kleinen und Ausgegrenzten.</b> Das passt zum ganzen Leben von Jesus. Auch als Erwachsener hat er sich besonders um Arme, Kranke und Ausgestoßene gekümmert.</p>
    <p>Die Hirten bleiben nicht stumm. Nachdem sie das Kind in der Krippe gefunden haben, <b>erzählen sie allen davon und loben Gott</b> (Lukas 2,17–20). Damit werden sie die ersten, die die gute Nachricht weitersagen.</p>`,
  },
  {
    id: 'augustus', title: 'Kaiser Augustus', icon: 'laurel',
    html: `<p><b>Augustus</b> war zur Zeit von Jesu Geburt der römische Kaiser und damit der mächtigste Mann der damaligen Welt. Er herrschte von Rom aus über ein riesiges Reich rund um das Mittelmeer, zu dem auch das Land Israel gehörte.</p>
    <p>Lukas erzählt, dass Augustus befahl, alle Menschen in <b>Steuerlisten</b> einzutragen. Damit beginnt die Weihnachtsgeschichte: Wegen dieses Befehls müssen Maria und Josef nach Bethlehem reisen.</p>
    <p>Viele Menschen verehrten Augustus damals wie einen Gott. Auf Inschriften wurde er als <b>„Retter“</b> und als Bringer des Friedens gefeiert. Lukas stellt ihm ein armes Kind in einer Futterkrippe gegenüber. Und der Engel sagt über dieses Kind: „Euch ist heute der <b>Heiland</b> geboren“ – Heiland heißt Retter. Lukas will damit sagen: <b>Der wahre Retter ist nicht der mächtige Kaiser, sondern das Kind im Stall.</b> Gott zeigt sich nicht im Palast, sondern bei den Armen.</p>`,
  },
  {
    id: 'zwei', title: 'Zwei Weihnachtsgeschichten: Lukas und Matthäus', icon: 'scroll',
    html: `<p>Viele denken, es gäbe in der Bibel nur eine Weihnachtsgeschichte. Tatsächlich erzählen aber nur zwei Evangelien von der Geburt Jesu: <b>Lukas</b> und <b>Matthäus</b>. Und sie erzählen ganz verschieden.</p>
    <p>Bei <b>Lukas</b> beginnt alles mit dem Befehl von <b>Kaiser Augustus</b>. Maria und Josef reisen von Nazareth nach Bethlehem. Weil in der Herberge kein Raum ist, wird das Kind in eine <b>Futterkrippe</b> gelegt. Nachts erscheinen <b>Engel</b> den <b>Hirten auf dem Feld</b>, und ein Engelchor singt „Ehre sei Gott in der Höhe“. Lukas zeigt: Gott kommt zu den Armen und Kleinen.</p>
    <p>Bei <b>Matthäus</b> gibt es keine Hirten und keine Krippe. Stattdessen sehen <b>Weise aus dem Morgenland</b> einen <b>Stern</b>. Sie fragen in Jerusalem bei <b>König Herodes</b> nach dem neugeborenen König. Der Stern führt sie nach Bethlehem, wo sie das Kind in einem <b>Haus</b> finden und ihm <b>Gold, Weihrauch und Myrrhe</b> schenken. Danach muss die Familie vor Herodes nach Ägypten fliehen. Matthäus zeigt: Jesus ist ein König, und er ist für alle Völker da, sogar für Fremde aus fernen Ländern.</p>
    <p>Warum sind die Geschichten so verschieden? Die Evangelisten wollten keine Zeitungsberichte schreiben. Es sind <b>Glaubensgeschichten</b>. Jeder erzählt so, dass deutlich wird, wer Jesus für ihn ist. In unseren Krippenspielen werden beide Geschichten oft zu einer zusammengemischt.</p>`,
  },
  {
    id: 'nichtbibel', title: 'Was nicht in der Bibel steht', icon: 'cross',
    html: `<p>Vieles, was wir aus Krippenspielen, Liedern und Bildern kennen, steht gar nicht in der Bibel. Es kam später dazu, weil Menschen die Geschichte ausgeschmückt haben.</p>
    <p><b>Ochse und Esel:</b> In keiner Weihnachtsgeschichte werden Tiere im Stall erwähnt. Ochs und Esel stammen aus einem Satz des Propheten Jesaja: „Ein Ochse kennt seinen Herrn und ein Esel die Krippe seines Herrn“ (Jesaja 1,3). Weil darin das Wort „Krippe“ vorkommt, malte man die beiden Tiere später an die Krippe.</p>
    <p><b>Drei Könige:</b> Matthäus schreibt nur von „Weisen aus dem Morgenland“, also von Sterndeutern. Er sagt nicht, wie viele es waren, und er nennt sie nicht Könige. Weil sie drei Geschenke bringen, stellte man sich später drei Personen vor. Die Namen Caspar, Melchior und Balthasar kamen erst viele Jahrhunderte später dazu.</p>
    <p><b>Der Wirt:</b> In fast jedem Krippenspiel schickt ein unfreundlicher Wirt Maria und Josef weg. In der Bibel gibt es diesen Wirt nicht. Lukas schreibt nur: „denn sie hatten sonst keinen Raum in der Herberge.“ Den Wirt haben sich Krippenspiele ausgedacht, um zu zeigen, dass für Jesus kein Platz war.</p>
    <p><b>Schnee und Weihnachtsmann:</b> Von Schnee steht nichts in der Bibel – in Bethlehem schneit es nur selten. Und der Weihnachtsmann ist eine Figur, die erst in der Neuzeit entstanden ist.</p>`,
  },
  {
    id: 'konfessionen', title: 'Evangelisch und katholisch Weihnachten feiern', icon: 'note',
    html: `<p>Evangelische und katholische Christen feiern Weihnachten gemeinsam als Geburtsfest Jesu. Viele Bräuche sind aber in einer bestimmten Kirche entstanden.</p>
    <p><b>Evangelische Wurzeln:</b> Den <b>Adventskranz</b> erfand 1839 der evangelische Theologe Johann Hinrich Wichern in Hamburg. Der <b>Herrnhuter Stern</b> mit seinen 25 Zacken entstand im 19. Jahrhundert in einer Schule der evangelischen Herrnhuter Brüdergemeine – als Bastelarbeit im Matheunterricht. <b>Martin Luther</b> lehnte es ab, Heilige zu verehren und zu ihnen zu beten. Darum sollten die Kinder ihre Geschenke nicht mehr vom heiligen Nikolaus bekommen, sondern vom <b>„Heiligen Christ“</b>, also mit Blick auf Jesus. Daraus wurde später das <b>Christkind</b>. Luther dichtete um 1535 für seine Familie das Lied <b>„Vom Himmel hoch, da komm ich her“</b>. Typisch evangelisch ist auch die <b>Christvesper</b> am Nachmittag des Heiligabends, oft mit Krippenspiel.</p>
    <p><b>Katholische Wurzeln:</b> Die <b>Weihnachtskrippe</b> mit Figuren geht auf Franz von Assisi zurück, der 1223 im italienischen Ort Greccio die Geburt Jesu mit lebenden Tieren nachstellte. Die <b>Sternsinger</b> ziehen um den 6. Januar von Haus zu Haus, ein katholischer Brauch, bei dem Kinder Geld für andere Kinder sammeln. Dass der <b>Nikolaus</b> Geschenke bringt, kommt aus der Verehrung der Heiligen. Evangelische Christen sehen Nikolaus als Vorbild, weil er Armen geholfen hat, beten aber nicht zu ihm. Die <b>Christmette</b>, eine Messe um Mitternacht, ist eine katholische Tradition.</p>
    <p>Heute ist vieles <b>ökumenisch</b>, also gemeinsam: In evangelischen Kirchen stehen Krippen, evangelische Kinder gehen mit den Sternsingern, und in katholischen Gegenden bringt oft das Christkind die Geschenke.</p>`,
  },
  {
    id: 'lieder', title: 'Weihnachtslieder im Gesangbuch', icon: 'note',
    html: `<p>In evangelischen Kirchen singt man aus dem <b>Evangelischen Gesangbuch</b> (EG). Die Lieder sind nach dem Kirchenjahr geordnet. Darum beginnt das Gesangbuch mit dem Advent. Welche Lieder im Gottesdienst gesungen werden, steht vorne in der Kirche auf der <b>Liedtafel</b>: Dort steckt die Küsterin die Nummern der Lieder ein.</p>
    <p><b>EG 1 · „Macht hoch die Tür, die Tor macht weit“</b> ist das allererste Lied im Gesangbuch, ein Adventslied. Georg Weissel dichtete es 1623. Es nimmt Psalm 24 auf: Die Tore sollen weit aufgehen, denn der König der Herrlichkeit kommt.</p>
    <p><b>EG 24 · „Vom Himmel hoch, da komm ich her“</b> schrieb Martin Luther um 1535 für die Weihnachtsfeier mit seiner Familie. In der ersten Strophe singt der Engel:<br><i>„Vom Himmel hoch, da komm ich her, / ich bring euch gute neue Mär; / der guten Mär bring ich so viel, / davon ich singn und sagen will.“</i><br>„Mär“ ist ein altes Wort für Nachricht.</p>
    <p><b>EG 37 · „Ich steh an deiner Krippen hier“</b> dichtete 1653 <b>Paul Gerhardt</b>, ein evangelischer Pfarrer und einer der wichtigsten Liederdichter. Ein Mensch steht an der Krippe, staunt und schenkt dem Kind sein Herz.</p>
    <p><b>EG 46 · „Stille Nacht, heilige Nacht“</b> wurde am Heiligabend <b>1818 in Oberndorf bei Salzburg</b> zum ersten Mal gesungen. Den Text schrieb der katholische Hilfspriester Joseph Mohr, die Melodie der Lehrer Franz Xaver Gruber. Heute wird es auf der ganzen Welt gesungen.</p>
    <p>Weitere Lieder: EG 8 „Es kommt ein Schiff, geladen“ und EG 13 „Tochter Zion“ (Advent), EG 27 „Lobt Gott, ihr Christen alle gleich“, EG 30 „Es ist ein Ros entsprungen“, EG 43 „Ihr Kinderlein, kommet“ und EG 44 „O du fröhliche“ (Weihnachten).</p>`,
  },
  {
    id: 'epiphanias', title: 'Epiphanias und die Gaben der Weisen', icon: 'star',
    html: `<p>Am <b>6. Januar</b>, zwölf Tage nach dem 1. Weihnachtstag, feiert die evangelische Kirche <b>Epiphanias</b>. Das Wort kommt aus dem Griechischen und heißt <b>Erscheinung</b>. Gemeint ist: In Jesus wird Gott für die Menschen sichtbar – und zwar für <b>alle</b> Menschen, nicht nur für das Volk Israel. Die Farbe im Gottesdienst ist weiß, wie an Weihnachten. Mit Epiphanias beginnt die Epiphaniaszeit; die Weihnachtszeit klingt erst Anfang Februar aus. In der katholischen Kirche heißt der Tag oft <b>Dreikönigstag</b>.</p>
    <p>Zu Epiphanias gehört die Geschichte von den <b>Weisen aus dem Morgenland</b> (Matthäus 2). Sie waren Sterndeuter aus einem fernen Land im Osten. Dass gerade <b>Fremde</b> als Erste kommen, um Jesus anzubeten, zeigt: Jesus ist für die ganze Welt gekommen.</p>
    <p>Die Weisen schenken <b>Gold, Weihrauch und Myrrhe</b>. Christen haben diese Geschenke später gedeutet: <b>Gold</b> ist das Metall der Kronen – ein Zeichen für einen <b>König</b>. <b>Weihrauch</b> wird im Gottesdienst verbrannt; sein Duft steigt beim Gebet zum Himmel – ein Zeichen für <b>Gott</b>. <b>Myrrhe</b> ist ein kostbares Heil- und Salböl, mit dem man Kranke pflegte und Verstorbene salbte – ein Zeichen für einen <b>Menschen</b>, der leiden und sterben wird. So sagen die Gaben zusammen: Jesus ist König, Gott und Mensch.</p>
    <p>Die Krone der Weisen hat im Krippenspiel nach Lukas also nichts zu suchen. Sie kommt am 6. Januar zum Einsatz.</p>`,
  },
  {
    id: 'menschwerdung', title: 'Was feiern Christen an Weihnachten?', icon: 'heart',
    html: `<p>An Weihnachten feiern Christen nicht einfach einen Geburtstag. Sie glauben: In Jesus ist <b>Gott selbst Mensch geworden</b>. Gott bleibt nicht fern im Himmel, sondern kommt ganz nah zu den Menschen.</p>
    <p>Dabei kommt Gott nicht als mächtiger Kaiser mit Soldaten und Palast. Er kommt <b>als kleines Kind</b>, arm, in einem Stall, in eine Futterkrippe gelegt. Das zeigt: Gott ist besonders bei den Kleinen, Schwachen und Armen.</p>
    <p>Und die gute Nachricht gilt nicht nur für wenige. Die Hirten aus der Gegend von Bethlehem hören sie zuerst, die Weisen kommen aus einem fernen Land. Der Engel sagt: „Ich verkündige euch große Freude, die <b>allem Volk</b> widerfahren wird.“ Weihnachten ist ein Fest <b>für alle Menschen</b>.</p>`,
  },
];

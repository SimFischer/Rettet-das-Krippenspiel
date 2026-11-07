# Rettet das Krippenspiel!

Escape-Abenteuer für den evangelischen Religionsunterricht, Klasse 6 (45 Minuten), zu Advent, Weihnachten und Epiphanias. Reines HTML, CSS und JavaScript, ohne Build-Schritt, Konto oder Tracking. Läuft über GitHub Pages auf dem iPad (Safari, Querformat empfohlen).

**Spielen:** https://simfischer.github.io/Rettet-das-Krippenspiel/

## Ablauf

| Teil | Inhalt | Spielform |
|---|---|---|
| Prolog | Brief der Küsterin Hanne Petersen: Heiligabend, die Krippenspiel-Kiste ist verschlossen | – |
| **Akt 1 · Die Kiste** | Sechs Schlösser: Advent und Kirchenjahr · Wichern und der Adventskranz · Lukas 2 · Lukas oder Matthäus? · evangelische und katholische Wurzeln · Epiphanias | Multiple Choice, Schnellrunde, Kalender, Zahlen- und Buchstabenschloss, Reihenfolge, Sortieren, Zuordnen, Lückentext; Zwischenspiele nach dem 2. und 4. Schloss |
| **Akt 2 · Die Kostüme** | Sechs Kinder beschreiben ihre Rolle (Maria, Josef, Engel, Hirte, Wirt, Kaiser Augustus); passendes Kostüm wählen und eine Frage zur Rolle beantworten; die Krone der Weisen kommt ins Regal für den 6. Januar | Spielfigur von oben durch die Kirche steuern (Tippen zum Laufen, Pfeiltasten) |
| **Akt 3 · Der Kirchenschlüssel** | Turmkammer mit Taschenlampe absuchen und Gegenstände dem Kirchenjahr zuordnen · Liedtafel mit EG-Nummern als Code · Walzenschloss an der Kirchentür mit dem Kernsatz zur Menschwerdung | Lampensuche, Code-Rätsel, Walzenschloss |
| Finale | Reflexionssatz, Urkunde | – |
| Schatzkammer | Der andere Heimweg (Schleichspiel zu Mt 2,12), Kerzenwächter, Hirten suchen Schafe, Sternen-Memory | Bonus |

Lehrkraftbereich: unten auf dem Startbildschirm, PIN **2412**. Dort stehen Stundenverlauf, alle Lösungen und fachliche Hinweise; außerdem Sprünge zu Akt 2 und 3, Freigabe der Schatzkammer und Zurücksetzen.

## Dateien

```
index.html
css/style.css
js/art.js            Icons und Vektor-Platzhalter (Kiste, Lichterrad, Kranz, Figuren)
js/content.js        Inhalte Akt 1 (sechs Schlösser)
js/content-acts.js   Inhalte Akt 2 und 3
js/walk.js           Top-down-Engine (Tippen zum Laufen, Wegsuche, Wachen mit Sichtkegeln) und Karten
js/engine.js         Spielstand, Bildschirme, Aufgabentypen, Lehrkraftbereich
js/acts.js           Akt 2 (Kostüme) und Akt 3 (Schlüssel)
js/games.js          Zwischen- und Bonusspiele
assets/              gemalte Bilder (siehe ASSET-PROMPTS.md)
tests/check.mjs      Inhalts- und Kartenprüfung: node tests/check.mjs
```

## Bilder

Alle Bilder sind optional: Fehlt eine Datei, zeichnet das Spiel einen Platzhalter. Die Prompts für ChatGPT mit Dateinamen, Formaten und den genauen Positionen für Karten stehen in [ASSET-PROMPTS.md](ASSET-PROMPTS.md).

## Datenschutz

Der Spielstand liegt nur im Browser des jeweiligen iPads (localStorage). Es werden keine Daten verschickt. Teamnamen bitte als Fantasienamen wählen.

## Quellen für die Inhalte

Bibelzitate nach der Lutherbibel 1912 (gemeinfrei). Fachliche Grundlagen: Unterrichtsmaterialien der Lehrkraft (RAAbits, Persen „Gemeinsam durch das Kirchenjahr“, Friedrich „Religion 5–10“), evangelisch.de (Wichern-Adventskranz, Luther und das Christkind), Sonntagsblatt (Herrnhuter Stern), EKiR-Übersicht zum Kirchenjahr, Liednummern nach dem Evangelischen Gesangbuch.

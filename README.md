# Funktion
Dieses NodeJS Script führt eine Abfrage bei der App Divera24/7 aus. Es wurde bisher die Abfrage "last-alarm" getestet. Idealerweise führt man das Script auf einem PI aus, da es hierfür ausgelegt ist (und auch nur mit entsprechenden GPIO Pins funktioniert)
## Installation und Nutzung
Als Erstes muss node installiert werden.

```bash
$ sudo apt install nodejs python
```
Daraufhin klont man das Repo.

```bash
$ git clone https://github.com/Befrog57/divera-alarmlicht.git
```
Nun kopiert man `.env.dist` nach `.env` und passt die Variablen für sich an.

Es müssen ebenfalls einige Abhängigkeiten installiert werden. **Achtung** hierfür muss man sich im git-repo befinden.

```bash
$ npm install axios console-stamp dotenv onoff
```
Zu guter Letzt kann man `alarmlicht.js` ausführen.

```bash
$ node alarmlicht.js
```

## Troubleshooting:
- Man sollte die Pinbelegung vom PI beachten, damit man die IO's richtig anschließt. [Hier](https://www.elektronik-kompendium.de/sites/raspberry-pi/1907101.html) kann man diese nachlesen.
- Auf Desktop-Systemen, wird das Programm voraussichtlich nicht lauffähig sein, da diese mit IO's nichts anfangen können
  - Hier müsste man einige einfache Änderungen am Code vornehmen, um das Programm zu testen
- Immer noch nicht lauffähig?
  - Ist die .env Datei richtig bearbeitet?
  - Sind alle Dependencies mit npm installiert?

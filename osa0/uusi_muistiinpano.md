```mermaid
sequenceDiagram
    participant selain
    participant palvelin
    
    selain->>palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note [{content: "teksti", date: "2023-09-01}]

    Note right of selain: Muistiinpanon sisältö lähetetään palvelimelle JSON-muodossa.

    palvelin->>selain: 302 FOUND, uudelleenohjaus osoitteeseen https://studies.cs.helsinki.fi/exampleapp/notes
    selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    palvelin-->>selain: HTML-koodi
    selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    palvelin-->>selain: main.css
    selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    palvelin-->>selain: main.js

    Note right of selain: Selain alkaa suorittaa js-koodia, joka pyytää JSON-datan palvelimelta.

    selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    palvelin-->>selain: [{content: "ensimmäinen teksti", date: "2023-08-01"}, ..., {content: "teksti", date: "2023-09-01}]

    Note right of selain: Selain suorittaa tapahtumankäsittelijän, joka renderöi muistiinpanot näytölle. Viimeisenä renderöidään myös listan uusin alkio, juuri luotu muistiinpano.
```

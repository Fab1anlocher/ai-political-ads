# IT-Architektur & IT-Flow Diagramme

> Artefakt der Bachelor-Thesis «KI-politische Werbebanner» – Berner Fachhochschule (BFH)  
> Diese Diagramme dokumentieren die technische Architektur und den Datenfluss der Applikation, ohne den Quellcode zu verändern.

---

## 1. IT-Architektur

Das folgende Diagramm zeigt die Komponentenstruktur der Applikation mit allen Schichten (Client, Server, externe APIs) und deren Abhängigkeiten.

![IT-Architektur Diagramm](./it-architecture.png)

### Schichtbeschreibung

| Schicht | Technologie | Beschreibung |
|---|---|---|
| **Browser / Client** | Next.js 16 · React 19 · Framer Motion · Tailwind CSS 4 | Single-Page-App mit drei Screens und wiederverwendbaren UI-Komponenten |
| **Next.js Server** | Next.js App Router · API Routes | Serverseitige Validierung, Prompt-Aufbereitung und API-Abstraktion |
| **Externe KI-APIs** | OpenAI DALL-E 3 / Google Gemini Imagen | Bildgenerierung auf Basis des aufbereiteten Prompts |
| **Konfiguration** | `.env.local` | `API_KEY`, `API_PROVIDER`, `IMAGE_MODEL` |

### Wichtige Dateien

| Datei | Zweck |
|---|---|
| `app/page.tsx` | Haupt-App · State Management · Screen-Navigation |
| `app/api/generate/route.ts` | POST-Handler · Validierung · Prompt-Auswahl |
| `lib/prompts.ts` | Prompt-Vorlagen für beide Volksabstimmungen |
| `lib/api-client.ts` | Abstraktion für OpenAI und Google Gemini |
| `lib/types.ts` | TypeScript-Interfaces (`ProfilDaten`, `AbstimmungsTyp`) |
| `components/WelcomeScreen.tsx` | Screen 1 – Disclaimer & Start |
| `components/SurveyForm.tsx` | Screen 2 – Profilerfassung |
| `components/ResultScreen.tsx` | Screen 3 – Bildanzeige & Download |

---

## 2. IT-Flow (Datenfluss / Sequenzdiagramm)

Das folgende Diagramm zeigt den vollständigen Ablauf von der Nutzereingabe bis zur Anzeige des generierten Banners.

![IT-Flow Diagramm](./it-flow.png)

### Ablaufbeschreibung

1. **Willkommensscreen** – Nutzer öffnet die App, liest den Disclaimer, klickt «Weiter»
2. **Profilerfassung** – Nutzer gibt demographische und psychographische Daten ein und wählt die Abstimmung
3. **API-Aufruf** – Frontend sendet `POST /api/generate` mit `{profil, abstimmung}`
4. **Prompt-Aufbereitung** – Server wählt die passende Vorlage und ersetzt alle Platzhalter mit den Profildaten
5. **Bildgenerierung** – `api-client.ts` leitet den Prompt an OpenAI DALL-E 3 oder Google Gemini weiter
6. **Ergebnisanzeige** – Das generierte Bild (Base64 PNG) wird im `ResultScreen` angezeigt und kann heruntergeladen werden

---

## 3. Mermaid-Quellcode

Die Diagramme wurden mit [Mermaid](https://mermaid.js.org/) erstellt. Die Quell-Dateien liegen im gleichen Verzeichnis:

- [`it-architecture.mmd`](./it-architecture.mmd) – IT-Architektur (Graph)
- [`it-flow.mmd`](./it-flow.mmd) – IT-Flow (Sequenzdiagramm)

### IT-Architektur (Mermaid-Code)

```mermaid
graph TB
    subgraph Browser["🌐 Browser / Client"]
        direction TB
        subgraph ReactApp["Next.js React SPA"]
            PG["page.tsx\nState Management\n(schritt, bildUrl, laedt, fehler, abstimmung)"]
            subgraph Screens["Screens"]
                WS["WelcomeScreen\nDisclaimer · Start-Button"]
                SF["SurveyForm\nProfile Form"]
                RS["ResultScreen\nImage Display · Download"]
            end
            subgraph UIComponents["UI Components"]
                SL["Slider"]
                DD["Dropdown"]
                SC["SegmentedControl"]
                ST["Stepper"]
                BT["Button"]
            end
        end
        WS -->|onWeiter| PG
        SF -->|onGenerieren profil| PG
        PG -->|bildUrl / laedt / fehler| RS
        SF --- UIComponents
    end

    PG -->|"POST /api/generate\nbody: {profil, abstimmung}"| APIRT

    subgraph Server["🖥️ Next.js Server"]
        APIRT["/api/generate/route.ts\nInput Validation\nAbstimmung Selection"]
        PR["lib/prompts.ts\nPrompt Templates\npromptAufbereiten()"]
        AC["lib/api-client.ts\nbildGenerieren()\nProvider Routing"]
        TY["lib/types.ts\nProfilDaten\nGenerierungsAntwort\nAbstimmungsTyp"]
        APIRT -->|vorlage + profil| PR
        PR -->|prepared prompt| AC
        APIRT -.->|types| TY
    end

    AC -->|"API_PROVIDER=openai\nclient.images.generate()"| OAI
    AC -->|"API_PROVIDER=gemini\nai.models.generateContent()"| GEM

    subgraph ExternalAPIs["☁️ External AI APIs"]
        OAI["OpenAI API\nDALL-E 3\n1024×1024px\nresponse_format: b64_json"]
        GEM["Google Gemini API\nImagen Model\ninlineData base64 PNG"]
    end

    OAI -->|"data:image/png;base64,..."| AC
    GEM -->|"data:image/png;base64,..."| AC
    AC -->|"bildUrl (base64)"| APIRT
    APIRT -->|"JSON { bildUrl }"| PG

    subgraph EnvConfig["⚙️ Environment Config (.env.local)"]
        ENV["API_KEY\nAPI_PROVIDER\nIMAGE_MODEL"]
    end

    AC -.->|reads| ENV

    style Browser fill:#f0f7ff,stroke:#3b82f6,stroke-width:2px
    style Server fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style ExternalAPIs fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style EnvConfig fill:#fdf4ff,stroke:#9333ea,stroke-width:2px
```

### IT-Flow (Mermaid-Code)

```mermaid
sequenceDiagram
    actor User as Nutzer
    participant WS as WelcomeScreen
    participant PG as page.tsx
    participant SF as SurveyForm
    participant RS as ResultScreen
    participant API as /api/generate
    participant PR as prompts.ts
    participant AC as api-client.ts
    participant AI as AI API

    User->>WS: App öffnen
    WS-->>User: Disclaimer anzeigen
    User->>WS: Weiter klicken
    WS->>PG: onWeiter()
    PG->>SF: setSchritt('umfrage')

    Note over SF: Demographische Daten eingeben
    User->>SF: Alter / Geschlecht / Wohnumgebung
    User->>SF: Bildung / Beruf / Haushaltsgrösse

    Note over SF: Psychographische Daten eingeben
    User->>SF: Politische Richtung (1-10)
    User->>SF: Entscheidungsstil (1-10)
    User->>SF: Risikobereitschaft (1-10)

    User->>SF: Abstimmung wählen
    User->>SF: Banner generieren klicken
    SF->>PG: onGenerieren(profil)
    PG->>PG: setSchritt('ergebnis') + setLaedt(true)
    PG->>RS: Ladeanimation anzeigen

    PG->>API: POST /api/generate {profil + abstimmung}

    API->>API: Eingabe validieren

    alt abstimmung = zivildienstgesetz
        API->>PR: PROMPT_ZIVILDIENSTGESETZ
    else abstimmung = nachhaltigkeitsinitiative
        API->>PR: PROMPT_NACHHALTIGKEITSINITIATIVE
    end

    PR->>PR: promptAufbereiten(vorlage + profil)
    Note over PR: Platzhalter ersetzen mit Profildaten
    PR-->>API: Fertiger Prompt-String

    API->>AC: bildGenerieren(prompt)

    alt API_PROVIDER = openai
        AC->>AI: OpenAI DALL-E 3 generieren
        AI-->>AC: Base64 Bilddaten
    else API_PROVIDER = gemini
        AC->>AI: Google Gemini Imagen generieren
        AI-->>AC: Base64 Bilddaten (inlineData)
    end

    AC-->>API: PNG Base64 Bild-URL
    API-->>PG: HTTP 200 JSON mit bildUrl
    PG->>PG: setBildUrl + setLaedt(false)
    PG->>RS: bildUrl übergeben
    RS-->>User: Generiertes Banner anzeigen

    alt Bild herunterladen
        User->>RS: Bild herunterladen klicken
        RS->>User: PNG-Datei speichern
    else Neue Eingabe
        User->>RS: Neue Eingabe klicken
        RS->>PG: onNeueEingabe()
        PG->>SF: setSchritt('umfrage')
    end
```

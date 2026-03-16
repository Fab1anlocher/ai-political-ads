# KI-Politische Werbebanner

> Bachelor Thesis – Berner Fachhochschule

Eine Next.js App, die personalisierte politische Werbebilder für Schweizer Volksabstimmungen generiert. Die App nutzt Umfragedaten, um via KI-API (OpenAI DALL-E oder Google Gemini Imagen) massgeschneiderte Werbebilder zu erzeugen.

## Features

- **3-Screen Single-Page-App**: Willkommen → Umfrage → Ergebnis
- **Apple-inspiriertes UI**: Minimalistisch, Framer Motion Animationen, Inter-Font
- **Unterstützte KI-APIs**: OpenAI (DALL-E 3) und Google Gemini (Imagen)
- **Kein persistenter Speicher**: Keine Datenbank, keine Datenspeicherung
- **Erweiterbar**: Struktur ermöglicht einfache Ergänzung weiterer Volksabstimmungen

## Schnellstart

### 1. Dependencies installieren

```bash
npm install
```

### 2. Umgebungsvariablen konfigurieren

```bash
cp .env.local.example .env.local
```

Tragen Sie Ihren API-Schlüssel in `.env.local` ein:

```env
API_KEY=dein_api_key_hier
API_PROVIDER=openai          # "openai" oder "gemini"
IMAGE_MODEL=dall-e-3          # z.B. "dall-e-3" oder "imagen-3.0-generate-002"
```

### 3. Entwicklungsserver starten

```bash
npm run dev
```

Die App ist unter [http://localhost:3000](http://localhost:3000) verfügbar.

## Deployment auf Vercel

1. Repository mit Vercel verbinden
2. Umgebungsvariablen in Vercel-Projekteinstellungen eintragen:
   - `API_KEY`
   - `API_PROVIDER`
   - `IMAGE_MODEL`
3. Deployen

## Dateistruktur

```
app/
  layout.tsx              # Root-Layout mit Fonts und Metadata
  page.tsx                # Haupt-App mit Step-Navigation
  globals.css             # Globale Styles inkl. Slider-Styling
  api/
    generate/
      route.ts            # API Route Handler für Bildgenerierung
components/
  WelcomeScreen.tsx       # Screen 1 – Willkommen / Disclaimer
  SurveyForm.tsx          # Screen 2 – Umfrage / Profildaten
  ResultScreen.tsx        # Screen 3 – Ergebnis / Download
  ui/
    Slider.tsx            # Slider mit Wertanzeige
    Dropdown.tsx          # Searchable Dropdown
    SegmentedControl.tsx  # Segmented Control (Radiogruppe)
    Stepper.tsx           # Stepper (+ / −)
    Button.tsx            # Pill-förmiger Button (primär/sekundär)
lib/
  prompts.ts              # Prompt-Vorlagen (PROMPT_VORLAGE_1, PROMPT_VORLAGE_2)
  api-client.ts           # API-Abstraktionsschicht (OpenAI/Gemini)
  types.ts                # TypeScript-Typen für Profildaten
```

## Erweiterung: Zweite Volksabstimmung

1. `lib/prompts.ts`: `PROMPT_VORLAGE_2` befüllen
2. `app/api/generate/route.ts`: Vorlage für `abstimmung2` eintragen
3. `app/page.tsx`: Abstimmungsauswahl in die UI integrieren

## Technologie

- **Framework**: Next.js 16+ (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Animationen**: Framer Motion
- **KI-APIs**: OpenAI SDK, Google Generative AI SDK

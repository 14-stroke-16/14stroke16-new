# Conditional Field — Contentful App

A Contentful **App Framework** field editor that **greys out (or hides)** a text field until another field on the same entry has a chosen value. Generic and reusable: drop it on any short/long-text field in any content type and configure it per assignment with instance parameters.

**First use case:** grey out `heroHeadline` (the brand tagline) on the `homepage` type whenever `heroHeadlineSource` = `Article title`, since the tagline is ignored in that mode.

---

## How it behaves

- Watches the **controlling field**'s value live. When the condition isn't met it disables its own input (greyed) — or hides it, if `mode = hide`.
- **Never clears the value** — a greyed tagline is kept and applies again when the condition flips back.
- **Fails open:** if misconfigured (controlling field missing), it stays editable so no one gets locked out.
- Short-text fields render a single-line input; long-text fields render a textarea.

Instance parameters (set per field assignment):

| Param | Meaning | Example |
|---|---|---|
| `controllingField` | field ID that gates this one | `heroHeadlineSource` |
| `disableWhenValue` | comma-separated values that GREY OUT this field | `Article title` |
| `enableWhenValue` | *alternative* to the above — values that ENABLE it (everything else greys) | `Brand tagline` |
| `mode` | `disable` (default) or `hide` | `disable` |

Use **either** `disableWhenValue` **or** `enableWhenValue`. For the hero, `disableWhenValue = Article title` is the right one (an unset source still shows the tagline, matching the site's logic).

---

## Local development

```bash
cd contentful-app
npm install
npm run dev     # serves on http://localhost:5173
```

Point the App Definition's URL at `http://localhost:5173` while developing (see below); Contentful loads the app from there live.

Build for production:

```bash
npm run build   # type-checks, then outputs dist/
```

---

## One-time Contentful setup (needs Organization admin)

### 1. Create the App Definition
**Organization settings → Apps → Create app.**
- **Name:** Conditional Field
- **App URL:** `http://localhost:5173` for dev. For production, use the hosted bundle (step 4).
- **Locations:** tick
  - *App configuration screen*
  - *Entry field* → allowed field types: **Short text** and **Long text**
- **Instance parameters:** add these four (Entry field → Instance parameters):
  - `controllingField` — Short text — required
  - `disableWhenValue` — Short text
  - `enableWhenValue` — Short text
  - `mode` — Short text (or Enumeration with values `disable`, `hide`) — default `disable`

### 2. Install it into the `sandbox` environment
From the app's page, **Install** to the space, choosing the `sandbox` environment.

### 3. Assign it to a field
Content model → `homepage` → `heroHeadline` field → **Appearance** → pick **Conditional Field**, then set instance params:
- `controllingField` = `heroHeadlineSource`
- `disableWhenValue` = `Article title`
- `mode` = `disable`

(Claude can also set this assignment via the Contentful MCP once the app definition exists — just share the app definition ID.)

### 4. Ship the hosted bundle (Contentful-hosted)
```bash
npm run build
npx @contentful/app-scripts upload --bundle-dir ./dist
```
Then set the App Definition to use the uploaded (hosted) bundle instead of localhost. (The `upload` CLI needs Node 22+ and a CMA token; or use the "Hosted by Contentful" upload in the app definition UI with a zip of `dist/`.)

---

## Limitations
- A field app **replaces** the field's built-in widget, so this renders a plain input/textarea (fine for the tagline — the site renders `heroHeadline` as plain text with line breaks anyway). It is intended for short/long **text** fields, not rich text or references.
- `mode = hide` collapses the **input**, but Contentful still draws the field **label** (the label isn't part of the app). For a truly hidden field, remove it from the content type. `disable` (grey-out) is the recommended default.

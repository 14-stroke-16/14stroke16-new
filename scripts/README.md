# Optimising videos before uploading to Contentful

Decorative videos on the homepage (hero, featured, editorial backgrounds) should
be run through `encode-video.sh` before they go into Contentful. Raw exports
(especially `.mov` off a phone or camera) are large and often **won't autoplay on
iPhones**. Encoding to H.264 / `yuv420p` / faststart, with audio stripped, makes
them load fast and autoplay reliably.

This is a one-person job — whoever prepares the assets.

---

## One-time setup

Install `ffmpeg`:

```bash
brew install ffmpeg
```

(No Homebrew? Install it from https://brew.sh first.)

---

## Optimising a clip

From the project folder:

```bash
./scripts/encode-video.sh my-clip.mov
```

That produces `my-clip-web.mp4` next to the original — upload **that** to
Contentful, not the original.

### Options

| Option | Default | What it does |
| --- | --- | --- |
| `--max-width` | `1920` | Caps the width; height scales to match |
| `--crf` | `20` | Quality. Lower = sharper but bigger (18–23 is the useful range) |

```bash
./scripts/encode-video.sh my-clip.mov out.mp4 --max-width 1600 --crf 22
```

---

## About looping

Background videos loop automatically on the site (via `<video loop>`). The
restart only looks seamless if the **clip itself loops** — i.e. its last frame
flows into its first. Encoding can't change that; a clip that doesn't loop will
show a small jump at the restart no matter how it's encoded.

---

## No command line? (same result in a GUI)

[HandBrake](https://handbrake.fr/) (free, Mac/Windows) does the same optimisation:

1. Open the clip, choose a **Web** preset.
2. Tick **Web Optimized**.
3. Under *Audio*, remove the audio track (decorative video is muted anyway, and
   no audio = most reliable iOS autoplay).
4. Export as `.mp4` and upload.

---

## What the script produces

H.264 / `yuv420p`, audio stripped, `+faststart` (metadata at the front so
playback starts immediately), scaled to the max width with even dimensions — the
format that loads fast and autoplays muted on iOS Safari.

> iOS **Low Power Mode** blocks muted autoplay regardless of encoding — if a
> video won't autoplay on a specific phone, check that first; the poster image
> shows in that case.

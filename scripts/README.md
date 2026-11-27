# Encoding videos before uploading to Contentful

Decorative videos on the homepage (hero, featured, editorial backgrounds) should
be run through `encode-video.sh` before they go into Contentful. It does two
things in one pass:

1. **Makes them load fast and autoplay on iPhones.** Raw exports (especially
   `.mov` off a phone or camera) are large and often won't autoplay on iOS
   Safari. Encoding to H.264 / `yuv420p` / faststart, with audio stripped, fixes
   both.
2. **Makes the loop seamless.** Background videos loop forever; without this the
   video visibly jumps when it restarts.

This is a one-person job — whoever prepares the assets.

---

## One-time setup

Install `ffmpeg`:

```bash
brew install ffmpeg
```

(No Homebrew? Install it from https://brew.sh first.)

---

## Encoding a clip

From the project folder:

```bash
./scripts/encode-video.sh my-clip.mov
```

That produces `my-clip-web.mp4` next to the original — upload **that** to
Contentful, not the original.

### Loop styles

- **Crossfade (default)** — dissolves the end back into the start. Works on any
  clip; the restart is a soft, brief fade instead of a hard jump. Note this is a
  *dissolve* — if you want no visible transition at all, use boomerang or supply
  footage that already loops.
  ```bash
  ./scripts/encode-video.sh my-clip.mov
  ```
- **Boomerang** — plays forward then backwards. *Perfectly* seamless (no
  dissolve), best for abstract/texture clips (smoke, water, light, fabric).
  **Don't** use it for footage with people or clear directional motion — it
  looks like it rewinds.
  ```bash
  ./scripts/encode-video.sh my-clip.mov out.mp4 --loop boomerang
  ```
- **None** — just optimise, no loop processing (for a clip that already loops,
  or one not meant to loop).
  ```bash
  ./scripts/encode-video.sh my-clip.mov out.mp4 --loop none
  ```

### Options

| Option | Default | What it does |
| --- | --- | --- |
| `--loop` | `crossfade` | `crossfade`, `boomerang` or `none` |
| `--fade` | `0.5` | Crossfade length in seconds. **Lower it (`0.3`) if the dissolve is too noticeable**; raise it (`0.8`–`1.0`) for a softer blend |
| `--max-width` | `1920` | Caps the width; height scales to match |
| `--crf` | `20` | Quality. Lower = sharper but bigger (18–23 is the useful range) |

**Always preview the result before uploading** — open the `-web.mp4` in a player
(QuickTime/VLC), let it loop, and watch the restart.

---

## No command line? (optimise only)

If you only need to optimise (not auto-loop) and don't want the terminal,
[HandBrake](https://handbrake.fr/) (free, Mac/Windows) works:

1. Open the clip, choose a **Web** preset.
2. Tick **Web Optimized**.
3. Under *Audio*, remove the audio track (decorative video is muted anyway, and
   no audio = most reliable iOS autoplay).
4. Export as `.mp4` and upload.

HandBrake can't make a clip loop seamlessly — for that use the script, or supply
footage that already loops.

---

## What the script produces

H.264 / `yuv420p`, audio stripped, `+faststart` (metadata at the front so
playback starts immediately), scaled to the max width with even dimensions — the
format that loads fast and autoplays muted on iOS Safari.

> iOS **Low Power Mode** blocks muted autoplay regardless of encoding — if a
> video won't autoplay on a specific phone, check that first; the poster image
> shows in that case.

#!/usr/bin/env bash
#
# encode-video.sh — optimise a decorative video for upload to Contentful.
#
# Makes a clip load fast and autoplay (muted) reliably on iOS Safari:
#   H.264 + yuv420p + faststart, audio stripped, scaled to a sane max width.
# Raw exports (especially .mov off a phone/camera) are large and often won't
# autoplay on iPhones; this fixes both.
#
# This does NOT touch looping. A background video loops via the site's
# <video loop>, but the restart only looks seamless if the clip itself loops
# (its last frame flows into its first). Encoding can't change that.
#
# Usage:
#   ./scripts/encode-video.sh input.mov [output.mp4]
#   ./scripts/encode-video.sh input.mov out.mp4 --max-width 1600 --crf 22
#
# Requires ffmpeg:  brew install ffmpeg
#
set -euo pipefail

MAX_WIDTH="1920"
CRF="20"           # lower = higher quality / bigger file (18-23 is a good range)
IN=""
OUT=""

# --- parse args ----------------------------------------------------------------
while [[ $# -gt 0 ]]; do
  case "$1" in
    --max-width) MAX_WIDTH="${2:-}"; shift 2 ;;
    --crf)       CRF="${2:-}"; shift 2 ;;
    -h|--help)   sed -n '2,19p' "$0"; exit 0 ;;
    -*)          echo "Unknown option: $1" >&2; exit 1 ;;
    *)
      if [[ -z "$IN" ]]; then IN="$1"
      elif [[ -z "$OUT" ]]; then OUT="$1"
      else echo "Too many arguments: $1" >&2; exit 1
      fi
      shift ;;
  esac
done

# --- checks --------------------------------------------------------------------
command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg not found. Install with: brew install ffmpeg" >&2; exit 1; }
[[ -n "$IN" ]] || { echo "No input file. Usage: ./scripts/encode-video.sh input.mov [output.mp4]" >&2; exit 1; }
[[ -f "$IN" ]] || { echo "Input not found: $IN" >&2; exit 1; }

# default output name: <input-basename>-web.mp4
if [[ -z "$OUT" ]]; then
  base="${IN##*/}"; base="${base%.*}"
  OUT="${base}-web.mp4"
fi

echo "→ input:  $IN"
echo "→ output: $OUT"

ffmpeg -y -i "$IN" \
  -vf "scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos,format=yuv420p" \
  -an -c:v libx264 -profile:v main -crf "$CRF" -preset slow \
  -movflags +faststart -pix_fmt yuv420p \
  "$OUT"

echo "✓ done → $OUT"

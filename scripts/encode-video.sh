#!/usr/bin/env bash
#
# encode-video.sh — prepare a decorative video for upload to Contentful.
#
# Does two things in one pass:
#   1. Web/iOS optimisation: H.264 + yuv420p + faststart, audio stripped, scaled
#      to a sane max width. This is what makes clips load fast and autoplay
#      (muted) reliably on iOS Safari.
#   2. A baked-in seamless loop, so the hero/background video doesn't visibly
#      jump when it restarts. Two loop styles:
#        - crossfade (default): dissolves the end back into the start. Works on
#          any clip; the restart is a soft fade instead of a hard cut.
#        - boomerang: plays forward then reversed. Perfectly seamless by
#          construction — best for abstract/texture clips (smoke, water, light).
#          Avoid for footage with people or clear directional motion (it looks
#          like it rewinds).
#        - none: just optimise, no loop processing.
#
# Usage:
#   ./scripts/encode-video.sh input.mov [output.mp4]
#   ./scripts/encode-video.sh input.mov out.mp4 --loop boomerang
#   ./scripts/encode-video.sh input.mov out.mp4 --loop crossfade --fade 0.6
#   ./scripts/encode-video.sh input.mov out.mp4 --loop none --max-width 1600
#
# Requires ffmpeg + ffprobe:  brew install ffmpeg
#
set -euo pipefail

LOOP="crossfade"
FADE="0.5"
MAX_WIDTH="1920"
CRF="20"           # lower = higher quality / bigger file (18-23 is a good range)
IN=""
OUT=""

# --- parse args ----------------------------------------------------------------
while [[ $# -gt 0 ]]; do
  case "$1" in
    --loop)      LOOP="${2:-}"; shift 2 ;;
    --fade)      FADE="${2:-}"; shift 2 ;;
    --max-width) MAX_WIDTH="${2:-}"; shift 2 ;;
    --crf)       CRF="${2:-}"; shift 2 ;;
    -h|--help)   sed -n '2,30p' "$0"; exit 0 ;;
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
command -v ffmpeg  >/dev/null 2>&1 || { echo "ffmpeg not found. Install with: brew install ffmpeg" >&2; exit 1; }
command -v ffprobe >/dev/null 2>&1 || { echo "ffprobe not found. Install with: brew install ffmpeg" >&2; exit 1; }
[[ -n "$IN" ]] || { echo "No input file. Usage: ./scripts/encode-video.sh input.mov [output.mp4]" >&2; exit 1; }
[[ -f "$IN" ]] || { echo "Input not found: $IN" >&2; exit 1; }
[[ "$LOOP" =~ ^(crossfade|boomerang|none)$ ]] || { echo "--loop must be crossfade, boomerang or none" >&2; exit 1; }

# default output name: <input-basename>-web.mp4
if [[ -z "$OUT" ]]; then
  base="${IN##*/}"; base="${base%.*}"
  OUT="${base}-web.mp4"
fi

# shared encode settings: strip audio, scale to max width (even dims), web-opt
SCALE="scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos,format=yuv420p"
ENC=(-an -c:v libx264 -profile:v main -crf "$CRF" -preset slow -movflags +faststart -pix_fmt yuv420p)

echo "→ input:  $IN"
echo "→ output: $OUT"
echo "→ loop:   $LOOP"

# --- build + run ---------------------------------------------------------------
if [[ "$LOOP" == "crossfade" ]]; then
  # Duration is needed to place the crossfade at the seam.
  DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")"
  # Need enough length for a straight middle plus the fade at each end.
  MIN="$(awk -v f="$FADE" 'BEGIN{print f*2.2}')"
  if awk -v d="$DUR" -v m="$MIN" 'BEGIN{exit !(d < m)}'; then
    echo "  clip is only ${DUR}s — too short for a ${FADE}s crossfade; using boomerang instead." >&2
    LOOP="boomerang"
  else
    OFF="$(awk -v d="$DUR" -v f="$FADE" 'BEGIN{printf "%.3f", d - f}')"
    # Crossfade two copies of the clip at the seam, then keep the window
    # [fade, duration] so both ends land on the same frame → seamless loop.
    FILTER="[0:v]split[a][b];[a][b]xfade=transition=fade:duration=${FADE}:offset=${OFF}[xf];[xf]trim=start=${FADE}:end=${DUR},setpts=PTS-STARTPTS,${SCALE}[v]"
    ffmpeg -y -i "$IN" -filter_complex "$FILTER" -map "[v]" "${ENC[@]}" "$OUT"
  fi
fi

if [[ "$LOOP" == "boomerang" ]]; then
  FILTER="[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0,${SCALE}[v]"
  ffmpeg -y -i "$IN" -filter_complex "$FILTER" -map "[v]" "${ENC[@]}" "$OUT"
fi

if [[ "$LOOP" == "none" ]]; then
  ffmpeg -y -i "$IN" -vf "$SCALE" "${ENC[@]}" "$OUT"
fi

echo "✓ done → $OUT"
echo "  Tip: preview the loop before uploading — open $OUT in a player and watch the restart."

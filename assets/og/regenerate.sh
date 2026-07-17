#!/usr/bin/env bash
# Regenerate public/og-image.jpg (1200x630) from og-template.html.
#
# The old card was baked in a design tool; this makes it reproducible. Edit the
# copy in og-template.html, then run this. Requires: Google Chrome, ImageMagick
# (`magick`), python3. Renders at 2x for crisp text, then downscales to an exact
# 1200x630 progressive JPEG.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # assets/og
ASSETS="$(cd "$HERE/.." && pwd)"                        # assets  (served root)
REPO="$(cd "$ASSETS/.." && pwd)"                        # repo root
PORT="${PORT:-8791}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$REPO/public/og-image.jpg"
PROFILE="$(mktemp -d)"   # throwaway profile — never touch the user's real Chrome data

( cd "$ASSETS" && python3 -m http.server "$PORT" >/tmp/og-server.log 2>&1 & echo $! >/tmp/og-server.pid )
trap 'kill "$(cat /tmp/og-server.pid 2>/dev/null)" 2>/dev/null || true; pkill -f "$PROFILE" 2>/dev/null || true; rm -rf "$PROFILE"' EXIT
sleep 1

rm -f "$HERE/og-raw.png"
# Headless Chrome sometimes won't exit after --screenshot (keep-alive font
# connections), so run it in the background and poll for the PNG instead of
# blocking on the process.
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
  --user-data-dir="$PROFILE" --no-first-run --no-default-browser-check --no-pings \
  --force-device-scale-factor=2 --window-size=1200,630 \
  --default-background-color=00000000 --run-all-compositor-stages-before-draw \
  --virtual-time-budget=8000 \
  --screenshot="$HERE/og-raw.png" \
  "http://localhost:$PORT/og/og-template.html" >/tmp/og-chrome.log 2>&1 &
CHROME_PID=$!

for _ in $(seq 1 60); do
  [ -s "$HERE/og-raw.png" ] && break
  sleep 0.5
done
sleep 1                                   # let the write settle
kill "$CHROME_PID" 2>/dev/null || true
pkill -f "$PROFILE" 2>/dev/null || true

[ -s "$HERE/og-raw.png" ] || { echo "ERROR: Chrome did not produce a screenshot" >&2; exit 1; }

magick "$HERE/og-raw.png" -resize 1200x630 -gravity center -extent 1200x630 \
  -strip -interlace JPEG -sampling-factor 4:2:0 -quality 90 "$OUT"
rm -f "$HERE/og-raw.png"

echo "Wrote $OUT ($(sips -g pixelWidth -g pixelHeight "$OUT" 2>/dev/null | awk '/pixelWidth|pixelHeight/{print $2}' | paste -sd x -))"

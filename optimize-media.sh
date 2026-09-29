#!/bin/bash

set -e

echo "======================================"
echo " OJAS INN MEDIA OPTIMIZATION"
echo " Originals will NOT be modified"
echo "======================================"

SRC="public/images"
OUT="public/images/optimized"

mkdir -p "$OUT"

echo ""
echo "Optimizing images..."

find "$SRC" \
  \( -path "$SRC/optimized" -o -path "$SRC/optimized/*" \) -prune \
  -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 |
while IFS= read -r -d '' file; do

    relative="${file#$SRC/}"
    output="$OUT/${relative%.*}.webp"

    mkdir -p "$(dirname "$output")"

    # Skip if already generated.
    if [ -f "$output" ]; then
        echo "SKIP: $output"
        continue
    fi

    echo "IMAGE: $file"

    magick "$file" \
      -auto-orient \
      -resize "1600x1600>" \
      -strip \
      -quality 82 \
      "$output"

done

echo ""
echo "Optimizing videos..."

find "$SRC" \
  \( -path "$SRC/optimized" -o -path "$SRC/optimized/*" \) -prune \
  -o -type f -iname "*.mp4" -print0 |
while IFS= read -r -d '' file; do

    relative="${file#$SRC/}"
    output="$OUT/${relative%.*}.mp4"

    mkdir -p "$(dirname "$output")"

    if [ -f "$output" ]; then
        echo "SKIP: $output"
        continue
    fi

    echo "VIDEO: $file"

    ffmpeg -y \
      -hide_banner \
      -loglevel error \
      -i "$file" \
      -vf "scale='min(1280,iw)':-2" \
      -an \
      -c:v libx264 \
      -preset medium \
      -crf 28 \
      -movflags +faststart \
      -pix_fmt yuv420p \
      "$output"

done

echo ""
echo "======================================"
echo " OPTIMIZATION COMPLETE"
echo "======================================"

echo ""
echo "Original media:"
du -sh "$SRC"

echo ""
echo "Optimized media:"
du -sh "$OUT"

echo ""
echo "Generated files:"
find "$OUT" -type f | sort

echo ""
echo "Done. Originals were NOT changed."

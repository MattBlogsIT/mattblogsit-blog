#!/bin/bash

# Script to generate WebP versions of all existing images
# This maintains the original JPEG/PNG files as fallbacks

echo "=========================================="
echo "  WebP Batch Generator"
echo "=========================================="
echo ""

# Check if required tools are installed
MISSING_TOOLS=""
command -v cwebp >/dev/null 2>&1 || MISSING_TOOLS="$MISSING_TOOLS webp"

if [ -n "$MISSING_TOOLS" ]; then
    echo "❌ Missing required tools:$MISSING_TOOLS"
    echo ""
    echo "Please install them first:"
    echo "  macOS: brew install webp"
    echo "  Linux: sudo apt-get install webp"
    exit 1
fi

# Change to script directory if run from elsewhere
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/.."

IMG_DIR="assets/img"

if [ ! -d "$IMG_DIR" ]; then
    echo "❌ Directory not found: $IMG_DIR"
    exit 1
fi

echo "📁 Scanning directory: $IMG_DIR"
echo ""

# Counter for statistics
TOTAL_COUNT=0
GENERATED_COUNT=0
SKIPPED_COUNT=0
TOTAL_SAVINGS=0

# Process all JPEG and PNG images
find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | sort | while read -r FILEPATH; do
    FILENAME=$(basename "$FILEPATH")
    WEBP_PATH="${FILEPATH%.*}.webp"

    TOTAL_COUNT=$((TOTAL_COUNT + 1))

    # Skip if WebP version already exists
    if [ -f "$WEBP_PATH" ]; then
        echo "⏭️  Skipping $FILENAME (WebP already exists)"
        SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
        continue
    fi

    # Get original size
    ORIGINAL_SIZE=$(stat -f%z "$FILEPATH" 2>/dev/null || stat -c%s "$FILEPATH")
    ORIGINAL_SIZE_KB=$((ORIGINAL_SIZE / 1024))

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📸 Converting: $FILENAME (${ORIGINAL_SIZE_KB}KB)"

    # Generate WebP with quality 85
    cwebp -q 85 "$FILEPATH" -o "$WEBP_PATH" 2>/dev/null

    if [ -f "$WEBP_PATH" ]; then
        WEBP_SIZE=$(stat -f%z "$WEBP_PATH" 2>/dev/null || stat -c%s "$WEBP_PATH")
        WEBP_SIZE_KB=$((WEBP_SIZE / 1024))
        SAVINGS=$((ORIGINAL_SIZE - WEBP_SIZE))
        SAVINGS_KB=$((SAVINGS / 1024))

        if [ $ORIGINAL_SIZE -gt 0 ]; then
            PERCENT=$((SAVINGS * 100 / ORIGINAL_SIZE))
        else
            PERCENT=0
        fi

        echo "   ✅ WebP created: ${WEBP_SIZE_KB}KB"
        echo "   💾 Saved: ${SAVINGS_KB}KB (${PERCENT}%)"

        GENERATED_COUNT=$((GENERATED_COUNT + 1))
        TOTAL_SAVINGS=$((TOTAL_SAVINGS + SAVINGS))
    else
        echo "   ❌ Failed to create WebP"
    fi
done

# Print summary
echo ""
echo "=========================================="
echo "  Conversion Complete!"
echo "=========================================="
echo "📊 Summary:"
echo "   Total images found: $TOTAL_COUNT"
echo "   WebP generated: $GENERATED_COUNT"
echo "   Skipped (already exist): $SKIPPED_COUNT"
echo "   Total space saved: $((TOTAL_SAVINGS / 1024 / 1024))MB"
echo ""
echo "✨ All done!"
echo ""
echo "Note: Original JPEG/PNG files are preserved as fallbacks."
echo "Use {% include webp-image.html %} in posts to serve WebP with fallbacks."

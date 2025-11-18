#!/bin/bash

# Image Optimization Script for Matt Blogs IT
# Optimizes all images in assets/img directory
# Supports: JPG, PNG, GIF with WebP conversion

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MAX_SIZE_KB=500
JPEG_QUALITY=85
PNG_QUALITY=85
WEBP_QUALITY=85
MAX_WIDTH=1200
IMG_DIR="assets/img"
BACKUP_DIR="_backup/images_$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Image Optimization Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check for required tools
check_dependencies() {
    local missing=0

    echo -e "${YELLOW}Checking dependencies...${NC}"

    if ! command -v identify &> /dev/null; then
        echo -e "${RED}✗ ImageMagick not found${NC}"
        echo "  Install: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)"
        missing=1
    else
        echo -e "${GREEN}✓ ImageMagick found${NC}"
    fi

    if ! command -v optipng &> /dev/null; then
        echo -e "${YELLOW}⚠ OptiPNG not found (optional)${NC}"
        echo "  Install: brew install optipng (macOS) or apt-get install optipng (Linux)"
    else
        echo -e "${GREEN}✓ OptiPNG found${NC}"
    fi

    if ! command -v jpegoptim &> /dev/null; then
        echo -e "${YELLOW}⚠ jpegoptim not found (optional)${NC}"
        echo "  Install: brew install jpegoptim (macOS) or apt-get install jpegoptim (Linux)"
    else
        echo -e "${GREEN}✓ jpegoptim found${NC}"
    fi

    if ! command -v cwebp &> /dev/null; then
        echo -e "${YELLOW}⚠ WebP tools not found (optional)${NC}"
        echo "  Install: brew install webp (macOS) or apt-get install webp (Linux)"
    else
        echo -e "${GREEN}✓ WebP tools found${NC}"
    fi

    echo ""

    if [ $missing -eq 1 ]; then
        echo -e "${RED}Missing required dependencies. Please install them first.${NC}"
        exit 1
    fi
}

# Create backup
create_backup() {
    echo -e "${YELLOW}Creating backup...${NC}"
    mkdir -p "$BACKUP_DIR"

    # Only backup images we'll be optimizing
    find "$IMG_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \) -exec cp --parents {} "$BACKUP_DIR/" \;

    echo -e "${GREEN}✓ Backup created: $BACKUP_DIR${NC}"
    echo ""
}

# Get file size in KB
get_size_kb() {
    local file="$1"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        stat -f%z "$file" | awk '{print int($1/1024)}'
    else
        # Linux
        stat -c%s "$file" | awk '{print int($1/1024)}'
    fi
}

# Optimize JPEG images
optimize_jpeg() {
    local file="$1"
    local size_before=$(get_size_kb "$file")

    # Skip if already optimized (under threshold)
    if [ "$size_before" -lt "$MAX_SIZE_KB" ]; then
        return 0
    fi

    echo -e "${YELLOW}Optimizing JPEG: $(basename "$file") (${size_before}KB)${NC}"

    # Resize if too large
    local width=$(identify -format "%w" "$file")
    if [ "$width" -gt "$MAX_WIDTH" ]; then
        mogrify -resize "${MAX_WIDTH}>" -quality "$JPEG_QUALITY" "$file"
    else
        mogrify -quality "$JPEG_QUALITY" "$file"
    fi

    # Further optimize with jpegoptim if available
    if command -v jpegoptim &> /dev/null; then
        jpegoptim --max="$JPEG_QUALITY" --strip-all "$file" > /dev/null 2>&1
    fi

    local size_after=$(get_size_kb "$file")
    local saved=$((size_before - size_after))
    local percent=$((saved * 100 / size_before))

    echo -e "${GREEN}  ✓ Saved ${saved}KB (${percent}%) → ${size_after}KB${NC}"
}

# Optimize PNG images
optimize_png() {
    local file="$1"
    local size_before=$(get_size_kb "$file")

    # Skip if already optimized
    if [ "$size_before" -lt "$MAX_SIZE_KB" ]; then
        return 0
    fi

    echo -e "${YELLOW}Optimizing PNG: $(basename "$file") (${size_before}KB)${NC}"

    # Resize if too large
    local width=$(identify -format "%w" "$file")
    if [ "$width" -gt "$MAX_WIDTH" ]; then
        mogrify -resize "${MAX_WIDTH}>" -quality "$PNG_QUALITY" "$file"
    fi

    # Optimize with optipng if available
    if command -v optipng &> /dev/null; then
        optipng -o2 -quiet "$file" 2>&1
    fi

    local size_after=$(get_size_kb "$file")
    local saved=$((size_before - size_after))

    if [ "$saved" -gt 0 ]; then
        local percent=$((saved * 100 / size_before))
        echo -e "${GREEN}  ✓ Saved ${saved}KB (${percent}%) → ${size_after}KB${NC}"
    else
        echo -e "${BLUE}  → Already optimized${NC}"
    fi
}

# Convert to WebP
convert_to_webp() {
    local file="$1"
    local webp_file="${file%.*}.webp"

    # Skip if WebP already exists
    if [ -f "$webp_file" ]; then
        return 0
    fi

    if command -v cwebp &> /dev/null; then
        local size_before=$(get_size_kb "$file")

        if [ "$size_before" -gt 100 ]; then  # Only convert if >100KB
            echo -e "${BLUE}Converting to WebP: $(basename "$file")${NC}"
            cwebp -q "$WEBP_QUALITY" "$file" -o "$webp_file" > /dev/null 2>&1

            local size_after=$(get_size_kb "$webp_file")
            local saved=$((size_before - size_after))

            if [ "$saved" -gt 0 ]; then
                local percent=$((saved * 100 / size_before))
                echo -e "${GREEN}  ✓ WebP saved ${saved}KB (${percent}%) → ${size_after}KB${NC}"
            fi
        fi
    fi
}

# Process GIF files
optimize_gif() {
    local file="$1"
    local size_before=$(get_size_kb "$file")

    echo -e "${YELLOW}Checking GIF: $(basename "$file") (${size_before}KB)${NC}"

    if [ "$size_before" -gt "$MAX_SIZE_KB" ]; then
        echo -e "${RED}  ⚠ Large GIF detected - consider converting to video or optimizing manually${NC}"
        echo -e "${BLUE}  Suggestion: Use https://ezgif.com/optimize for GIF optimization${NC}"
    fi
}

# Main optimization process
optimize_all() {
    local total_saved=0
    local files_processed=0

    echo -e "${BLUE}Starting optimization process...${NC}"
    echo ""

    # Process JPEG files
    while IFS= read -r -d '' file; do
        optimize_jpeg "$file"
        convert_to_webp "$file"
        ((files_processed++))
    done < <(find "$IMG_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" \) -print0)

    # Process PNG files
    while IFS= read -r -d '' file; do
        optimize_png "$file"
        convert_to_webp "$file"
        ((files_processed++))
    done < <(find "$IMG_DIR" -type f -name "*.png" -print0)

    # Process GIF files
    while IFS= read -r -d '' file; do
        optimize_gif "$file"
        ((files_processed++))
    done < <(find "$IMG_DIR" -type f -name "*.gif" -print0)

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Optimization Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "Files processed: ${files_processed}"
    echo -e "Backup location: ${BACKUP_DIR}"
    echo ""
}

# Generate report
generate_report() {
    echo -e "${BLUE}Generating size report...${NC}"
    echo ""

    local total_size=0
    local large_files=0

    echo "Images over ${MAX_SIZE_KB}KB:"
    echo "----------------------------"

    while IFS= read -r -d '' file; do
        local size=$(get_size_kb "$file")
        if [ "$size" -gt "$MAX_SIZE_KB" ]; then
            echo "  $(basename "$file"): ${size}KB"
            ((large_files++))
        fi
        total_size=$((total_size + size))
    done < <(find "$IMG_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \) -print0)

    echo ""
    echo "Total image size: $((total_size / 1024))MB"
    echo "Images over ${MAX_SIZE_KB}KB: ${large_files}"
    echo ""

    if [ "$large_files" -gt 0 ]; then
        echo -e "${YELLOW}⚠ Warning: ${large_files} images still exceed ${MAX_SIZE_KB}KB${NC}"
        echo -e "${YELLOW}  Consider manual optimization for these files${NC}"
    else
        echo -e "${GREEN}✓ All images are under ${MAX_SIZE_KB}KB${NC}"
    fi
}

# Main execution
main() {
    check_dependencies

    # Ask for confirmation
    echo -e "${YELLOW}This will optimize all images in ${IMG_DIR}${NC}"
    echo -e "${YELLOW}A backup will be created at ${BACKUP_DIR}${NC}"
    echo ""
    read -p "Continue? (y/N) " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi

    create_backup
    optimize_all
    generate_report

    echo ""
    echo -e "${GREEN}Done! Remember to test your site and commit the changes.${NC}"
    echo -e "${BLUE}To restore from backup: cp -r ${BACKUP_DIR}/${IMG_DIR}/* ${IMG_DIR}/${NC}"
}

# Run main function
main

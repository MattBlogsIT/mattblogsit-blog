# Scripts Directory

Automation scripts for the Matt Blogs IT blog.

## Available Scripts

### `optimize-images.sh`

**Purpose:** Batch optimize all images in `assets/img` directory

**Features:**
- Compresses JPEGs and PNGs
- Converts large images to WebP format
- Creates backup before optimization
- Provides detailed optimization report
- Respects 500KB size limit

**Usage:**
```bash
./scripts/optimize-images.sh
```

**Requirements:**
- ImageMagick (required)
- OptiPNG (optional but recommended)
- jpegoptim (optional but recommended)
- WebP tools (optional but recommended)

**Installation:**
```bash
# macOS
brew install imagemagick optipng jpegoptim webp

# Ubuntu/Debian
sudo apt-get install imagemagick optipng jpegoptim webp
```

**What it does:**
1. Creates backup in `_backup/images_<timestamp>`
2. Resizes images >1200px wide
3. Compresses JPEGs to 85% quality
4. Optimizes PNGs losslessly
5. Converts large images (>100KB) to WebP
6. Generates size report

**Safety:**
- Always creates backup before modifying
- Prompts for confirmation
- Provides restore commands

---

### `setup-git-hooks.sh`

**Purpose:** Configure git to use custom hooks from `.githooks` directory

**Features:**
- Sets `core.hooksPath` to `.githooks`
- Validates hook installation
- Lists available hooks

**Usage:**
```bash
./scripts/setup-git-hooks.sh
```

**Requirements:**
- Git 2.9+ (for `core.hooksPath` support)

**What it does:**
1. Configures git to use `.githooks` directory
2. Displays installed hooks
3. Shows usage instructions

**Installed Hooks:**
- `pre-commit` - Validates image sizes before commit

---

## Script Development

### Adding New Scripts

1. Create script in `scripts/` directory
2. Make executable: `chmod +x scripts/new-script.sh`
3. Add shebang: `#!/bin/bash`
4. Use `set -e` for error handling
5. Add color output for better UX
6. Document in this README

### Script Guidelines

**Error Handling:**
```bash
set -e  # Exit on error
set -u  # Exit on undefined variable
set -o pipefail  # Exit on pipe failures
```

**Color Output:**
```bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}✓ Success message${NC}"
echo -e "${RED}✗ Error message${NC}"
echo -e "${YELLOW}⚠ Warning message${NC}"
```

**User Confirmation:**
```bash
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi
```

### Testing Scripts

```bash
# Check syntax without executing
bash -n scripts/script-name.sh

# Run with verbose output
bash -x scripts/script-name.sh

# Test with ShellCheck (if installed)
shellcheck scripts/script-name.sh
```

---

## Troubleshooting

### Permission Denied

```bash
# Make script executable
chmod +x scripts/script-name.sh
```

### Command Not Found

```bash
# Run with explicit bash
bash scripts/script-name.sh

# Check if script is in correct directory
ls -la scripts/
```

### Git Hooks Not Running

```bash
# Check hooks path configuration
git config core.hooksPath

# Re-run setup
./scripts/setup-git-hooks.sh
```

---

## Related Documentation

- [IMAGE_OPTIMIZATION.md](../IMAGE_OPTIMIZATION.md) - Image optimization workflow
- [FUTURE_ENHANCEMENTS.md](../FUTURE_ENHANCEMENTS.md) - Planned improvements
- [CLAUDE.md](../CLAUDE.md) - Development guidelines

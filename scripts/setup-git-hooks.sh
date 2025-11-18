#!/bin/bash

# Git Hooks Setup Script
# Configures git to use custom hooks from .githooks directory

set -e

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  Git Hooks Setup${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

# Configure git to use .githooks directory
echo -e "${BLUE}Configuring git to use .githooks directory...${NC}"
git config core.hooksPath .githooks

echo -e "${GREEN}✓ Git hooks configured successfully${NC}"
echo ""

echo -e "${BLUE}Available hooks:${NC}"
for hook in .githooks/*; do
    if [ -f "$hook" ] && [ -x "$hook" ]; then
        hook_name=$(basename "$hook")
        echo -e "  ${GREEN}✓${NC} $hook_name"
    fi
done

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo -e "${BLUE}Hooks will now run automatically:${NC}"
echo -e "  • pre-commit: Validates image sizes before commit"
echo ""
echo -e "${BLUE}To bypass hooks (not recommended):${NC}"
echo -e "  git commit --no-verify"
echo ""

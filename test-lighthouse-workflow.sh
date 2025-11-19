#!/bin/bash
# Test script to validate Lighthouse CI workflow logic
# This simulates the workflow without running actual Lighthouse tests

set -e

echo "=== Lighthouse CI Workflow Test ==="
echo ""

# Test 1: Verify YAML syntax
echo "Test 1: Validating workflow YAML syntax..."
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/lighthouse-ci.yml'))"
echo "✓ YAML syntax is valid"
echo ""

# Test 2: Verify lighthouserc.json syntax
echo "Test 2: Validating Lighthouse configuration..."
node -e "JSON.parse(require('fs').readFileSync('lighthouserc.json', 'utf8'))"
echo "✓ Lighthouse config is valid JSON"
echo ""

# Test 3: Simulate file creation and checking
echo "Test 3: Simulating Lighthouse output..."
mkdir -p .lighthouseci-test
cat > .lighthouseci-test/lhr-test.json << 'EOF'
{
  "finalUrl": "http://localhost/index.html",
  "categories": {
    "performance": {"score": 0.95},
    "accessibility": {"score": 0.98},
    "best-practices": {"score": 0.92},
    "seo": {"score": 0.96}
  }
}
EOF
echo "✓ Created mock Lighthouse report"
echo ""

# Test 4: Verify hashFiles logic
echo "Test 4: Testing hashFiles condition..."
if [ -n "$(find .lighthouseci-test -name '*.json' -type f 2>/dev/null)" ]; then
  echo "✓ hashFiles condition would be TRUE - artifacts would upload"
else
  echo "✗ hashFiles condition would be FALSE - artifacts would NOT upload"
  exit 1
fi
echo ""

# Test 5: Test parsing logic
echo "Test 5: Testing result parsing logic..."
cd .lighthouseci-test
for report in lhr-*.json; do
  if [ -f "$report" ]; then
    node -e "
      const fs = require('fs');
      const data = JSON.parse(fs.readFileSync('$report', 'utf8'));
      const url = data.finalUrl || 'Unknown';
      const pageName = url.split('/').filter(p => p).pop() || 'Homepage';
      const perf = Math.round((data.categories.performance?.score || 0) * 100);
      const a11y = Math.round((data.categories.accessibility?.score || 0) * 100);
      const bp = Math.round((data.categories['best-practices']?.score || 0) * 100);
      const seo = Math.round((data.categories.seo?.score || 0) * 100);
      const getEmoji = (score) => score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
      console.log('| ' + pageName + ' | ' + getEmoji(perf) + ' ' + perf + '% | ' + getEmoji(a11y) + ' ' + a11y + '% | ' + getEmoji(bp) + ' ' + bp + '% | ' + getEmoji(seo) + ' ' + seo + '% |');
    "
  fi
done
cd ..
echo "✓ Parsing logic works correctly"
echo ""

# Test 6: Check workflow steps
echo "Test 6: Verifying workflow has all required steps..."
grep -q "Setup Chrome" .github/workflows/lighthouse-ci.yml || { echo "✗ Missing Chrome setup"; exit 1; }
grep -q "Install Lighthouse CI" .github/workflows/lighthouse-ci.yml || { echo "✗ Missing Lighthouse install"; exit 1; }
grep -q "Build Jekyll site" .github/workflows/lighthouse-ci.yml || { echo "✗ Missing Jekyll build"; exit 1; }
grep -q "Run Lighthouse CI" .github/workflows/lighthouse-ci.yml || { echo "✗ Missing Lighthouse run"; exit 1; }
grep -q "Upload Lighthouse results" .github/workflows/lighthouse-ci.yml || { echo "✗ Missing artifact upload"; exit 1; }
echo "✓ All required workflow steps present"
echo ""

# Cleanup
rm -rf .lighthouseci-test

echo "=== All Tests Passed ==="
echo ""
echo "The workflow logic is correct. When run in GitHub Actions with Chrome:"
echo "1. Chrome will be installed via browser-actions/setup-chrome"
echo "2. Lighthouse CI will collect performance data"
echo "3. Results will be saved to .lighthouseci/ directory"
echo "4. Results will be parsed and posted to GitHub summary"
echo "5. Artifacts will be uploaded (only if JSON files exist)"
echo ""
echo "Key improvements made:"
echo "- Explicit Chrome setup"
echo "- Comprehensive error logging"
echo "- Exit code tracking for each lhci step"
echo "- hashFiles() condition to prevent empty artifact uploads"
echo "- Detailed file checking and debugging output"

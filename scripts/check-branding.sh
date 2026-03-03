#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Keep this regex in sync with branding policy.
PATTERN='tap4\.ai|Tap4 AI|tap4 ai|tap4-ai|tap4ai|Tap4-AI'

if rg -n --hidden \
  -g '!.git' \
  -g '!.next' \
  -g '!node_modules' \
  -g '!scripts/check-branding.sh' \
  -e "$PATTERN" .; then
  echo ""
  echo "Branding check failed: found legacy Tap4 branding tokens."
  exit 1
fi

echo "Branding check passed."

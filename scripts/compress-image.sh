#!/usr/bin/env bash
# Compress a full-size thumbnail original into the public feed thumbnail.
# Usage: scripts/compress-image.sh --in mailer-assets/thumbnail-originals/<slug>.jpg --slug <slug> [--out-dir public/static-mailers]
set -euo pipefail
exec node "$(dirname "$0")/make-thumbnail.mjs" "$@"

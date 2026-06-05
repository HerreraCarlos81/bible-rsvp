#!/usr/bin/env bash
# Deploy Bible RSVP static files to AWS S3.
#
# Usage:
#   ./deploy.sh              # interactive confirm
#   ./deploy.sh --dry-run    # preview only
#   ./deploy.sh -y           # deploy without prompt
#   ./deploy.sh --inspect-only
#
# Environment:
#   BIBLE_RSVP_S3_BUCKET       (default: bible-reading.online)
#   BIBLE_RSVP_CLOUDFRONT_ID   optional CloudFront distribution ID
#   AWS_PROFILE                optional AWS CLI profile

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_BUCKET="bible-reading.online"
BUCKET="${BIBLE_RSVP_S3_BUCKET:-$DEFAULT_BUCKET}"
AWS_PROFILE="${AWS_PROFILE:-}"
DRY_RUN=false
SKIP_CONFIRM=false
DELETE_ORPHANS=false
INSPECT_ONLY=false

aws_cli() {
  if [[ -n "$AWS_PROFILE" ]]; then
    aws --profile "$AWS_PROFILE" "$@"
  else
    aws "$@"
  fi
}

print_layout() {
  cat <<EOF

Target bucket: $BUCKET

s3://$BUCKET/
├── index.html
├── manifest.json
├── sw.js
├── css/
│   └── styles.css
└── js/
    ├── i18n.js
    └── script.js

Current remote objects:
EOF
  aws_cli s3 ls "s3://$BUCKET/" --recursive --human-readable --summarize || true
}

usage() {
  cat <<EOF
Usage: $0 [OPTIONS]

Options:
  --bucket NAME     S3 bucket (default: $DEFAULT_BUCKET)
  --profile NAME    AWS CLI profile
  --dry-run         Preview uploads only
  -y, --yes         Skip confirmation
  --delete          Remove remote files not in deploy set
  --inspect-only    List bucket only, do not deploy
  -h, --help        Show this help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --bucket)
      BUCKET="$2"
      shift 2
      ;;
    --profile)
      AWS_PROFILE="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    -y|--yes)
      SKIP_CONFIRM=true
      shift
      ;;
    --delete)
      DELETE_ORPHANS=true
      shift
      ;;
    --inspect-only)
      INSPECT_ONLY=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

echo "\$ aws sts get-caller-identity --output json"
aws_cli sts get-caller-identity --output json

print_layout

if [[ "$INSPECT_ONLY" == true ]]; then
  exit 0
fi

SYNC_ARGS=(
  s3 sync "$ROOT" "s3://$BUCKET/"
  --exclude "*"
  --include "index.html"
  --include "manifest.json"
  --include "sw.js"
  --include "css/*"
  --include "js/*"
  --cache-control "public, max-age=300, must-revalidate"
  --metadata-directive REPLACE
)

if [[ "$DELETE_ORPHANS" == true ]]; then
  SYNC_ARGS+=(--delete)
fi

if [[ "$DRY_RUN" == true ]]; then
  SYNC_ARGS+=(--dryrun)
fi

if [[ "$DRY_RUN" == false && "$SKIP_CONFIRM" == false ]]; then
  read -r -p $'\nDeploy to s3://'"$BUCKET"'/? [y/N] ' answer
  case "$answer" in
    y|Y|yes|Yes) ;;
    *) echo "Cancelled."; exit 0 ;;
  esac
fi

echo ""
echo "\$ aws ${SYNC_ARGS[*]}"
aws_cli "${SYNC_ARGS[@]}"

if [[ "$DRY_RUN" == true ]]; then
  echo ""
  echo "Dry run complete — no files uploaded."
  exit 0
fi

echo ""
echo "Deploy finished successfully."
echo "Website bucket: https://${BUCKET}.s3-website-us-east-1.amazonaws.com/"
echo "Custom domain (if configured): https://${BUCKET}/"

if [[ -n "${BIBLE_RSVP_CLOUDFRONT_ID:-}" ]]; then
  echo ""
  echo "Creating CloudFront invalidation for $BIBLE_RSVP_CLOUDFRONT_ID ..."
  echo "\$ aws cloudfront create-invalidation ..."
  aws_cli cloudfront create-invalidation \
    --distribution-id "$BIBLE_RSVP_CLOUDFRONT_ID" \
    --paths "/*" \
    --output json
else
  echo ""
  echo "Tip: set BIBLE_RSVP_CLOUDFRONT_ID to invalidate CloudFront after deploy."
fi
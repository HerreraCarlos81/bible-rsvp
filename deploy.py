#!/usr/bin/env python3
"""
Deploy Bible RSVP static files to AWS S3.

Bucket layout (bible-reading.online):
    s3://bible-reading.online/
    ├── index.html          # site entry (S3 website index)
    ├── manifest.json       # PWA manifest
    ├── sw.js               # service worker
    ├── css/
    │   └── styles.css
    └── js/
        ├── i18n.js
        └── script.js

Requires: AWS CLI v2 configured (aws sts get-caller-identity).

Usage:
    python3 deploy.py              # interactive confirm
    python3 deploy.py --dry-run    # preview only
    python3 deploy.py -y           # deploy without prompt

Environment:
    BIBLE_RSVP_S3_BUCKET   (default: bible-reading.online)
    BIBLE_RSVP_CLOUDFRONT_ID   optional distribution ID for cache invalidation
    AWS_PROFILE            optional AWS CLI profile
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_BUCKET = "bible-reading.online"

# Only app assets — excludes README, agent.md, instruction.md, serve.py, deploy.py, .git
SYNC_INCLUDES = [
    "index.html",
    "manifest.json",
    "sw.js",
    "css/*",
    "js/*",
]

# S3 structure documentation (from live bucket inspection)
BUCKET_LAYOUT = """
s3://{bucket}/
├── index.html
├── manifest.json
├── sw.js
├── css/
│   └── styles.css
└── js/
    ├── i18n.js
    └── script.js
"""


def aws_cmd(*args: str, profile: str | None = None) -> list[str]:
    cmd = ["aws"]
    if profile:
        cmd.extend(["--profile", profile])
    cmd.extend(args)
    return cmd


def run(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess:
    print("$", " ".join(cmd))
    return subprocess.run(cmd, cwd=ROOT, check=check)


def verify_aws(profile: str | None) -> None:
    result = run(aws_cmd("sts", "get-caller-identity", "--output", "json", profile=profile))
    if result.returncode != 0:
        sys.exit("AWS CLI not configured or credentials invalid.")


def inspect_bucket(bucket: str, profile: str | None) -> None:
    print(f"\nTarget bucket: {bucket}")
    print(BUCKET_LAYOUT.format(bucket=bucket))
    print("Current remote objects (app paths):")
    run(
        aws_cmd(
            "s3", "ls", f"s3://{bucket}/",
            "--recursive", "--human-readable", "--summarize",
            profile=profile,
        ),
        check=False,
    )


def build_sync_command(
    bucket: str,
    dry_run: bool,
    profile: str | None,
    delete_orphans: bool,
) -> list[str]:
    cmd = aws_cmd(
        "s3", "sync",
        str(ROOT),
        f"s3://{bucket}/",
        "--exclude", "*",
    )
    for pattern in SYNC_INCLUDES:
        cmd.extend(["--include", pattern])

    if delete_orphans:
        cmd.append("--delete")

    if dry_run:
        cmd.append("--dryrun")

    # Cache: HTML/JS/SW should update quickly for users
    cmd.extend([
        "--cache-control", "public, max-age=300, must-revalidate",
        "--metadata-directive", "REPLACE",
    ])

    return cmd


def invalidate_cloudfront(distribution_id: str, profile: str | None) -> None:
    print(f"\nCreating CloudFront invalidation for {distribution_id} ...")
    run(
        aws_cmd(
            "cloudfront", "create-invalidation",
            "--distribution-id", distribution_id,
            "--paths", "/*",
            "--output", "json",
            profile=profile,
        ),
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Deploy static site to S3")
    parser.add_argument(
        "--bucket",
        default=os.environ.get("BIBLE_RSVP_S3_BUCKET", DEFAULT_BUCKET),
        help=f"S3 bucket name (default: {DEFAULT_BUCKET})",
    )
    parser.add_argument(
        "--profile",
        default=os.environ.get("AWS_PROFILE"),
        help="AWS CLI profile name",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be uploaded without uploading",
    )
    parser.add_argument(
        "-y", "--yes",
        action="store_true",
        help="Skip confirmation prompt",
    )
    parser.add_argument(
        "--delete",
        action="store_true",
        help="Remove remote files not in deploy set (careful)",
    )
    parser.add_argument(
        "--inspect-only",
        action="store_true",
        help="Only show bucket layout and remote listing",
    )
    args = parser.parse_args()

    verify_aws(args.profile)
    inspect_bucket(args.bucket, args.profile)

    if args.inspect_only:
        return

    sync_cmd = build_sync_command(
        args.bucket, args.dry_run, args.profile, args.delete
    )

    if not args.dry_run and not args.yes:
        answer = input(f"\nDeploy to s3://{args.bucket}/ ? [y/N] ").strip().lower()
        if answer not in ("y", "yes"):
            print("Cancelled.")
            return

    print()
    result = run(sync_cmd, check=False)
    if result.returncode != 0:
        sys.exit(result.returncode)

    if args.dry_run:
        print("\nDry run complete — no files uploaded.")
        return

    print("\nDeploy finished successfully.")
    print(f"Website bucket: https://{args.bucket}.s3-website-us-east-1.amazonaws.com/")
    print(f"Custom domain (if configured): https://{args.bucket}/")

    cf_id = os.environ.get("BIBLE_RSVP_CLOUDFRONT_ID")
    if cf_id:
        invalidate_cloudfront(cf_id, args.profile)
    else:
        print(
            "\nTip: set BIBLE_RSVP_CLOUDFRONT_ID to invalidate CloudFront after deploy."
        )


if __name__ == "__main__":
    main()